const express = require('express');
const router = express.Router();
const Outfit = require('../models/outfit');
const verifyToken = require('../middleware/verify-token');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const groupSeason = (season) => {
  if (["Spring", "Summer"].includes(season)) return ["Spring", "Summer"];
  if (["Fall", "Winter"].includes(season)) return ["Fall", "Winter"];
  return [season];
};

router.post('/', async (req, res) => {
  try {
    const { userProfile, prompt, chatLog = [] } = req.body;
    const {
      styleProfile,
      climateFit,
      fitPreference,
      genderCategory,
      lifestyleTags,
      season
    } = userProfile;

    const groupedSeasons = groupSeason(season);

    const AFFIRMATIVE_RESPONSES = [
      'yes', 'yep', 'yeah', 'sure', 'ok', 'okay', 'why not',
      'sounds good', 'go ahead', 'do it', 'let’s try', 'try again',
      'expand search', 'show more', 'please do', 'absolutely', 'of course',
      'fine', 'alright'
    ];

    const normalizedPrompt = prompt?.toLowerCase().trim();
    const affirmative = AFFIRMATIVE_RESPONSES.includes(normalizedPrompt);

    // Step 1: Run GPT *before* DB query to get inferred lifestyle tag
    const systemMsg = `
You are a fashion stylist AI. First, analyze the user's prompt and infer the occasion or activity, then select the best lifestyle tag from:

- Athletic
- Professional
- Casual
- Event-ready
- Outdoorsy
- Loungewear

Then choose 1–5 outfits by title from the provided list and explain why they fit the prompt.

Your response must begin with:
"Inferred Lifestyle Tag: [TAG]"
`.trim();

    const userPromptForChat = `
Prompt: "${prompt}"

User Profile (preferences only):
- Style: ${styleProfile}
- Fit: ${fitPreference}
- Climate: ${climateFit}
- Season: ${groupedSeasons.join(', ')}
- Original Lifestyle Tags: ${lifestyleTags?.join(', ') || 'N/A'}

Outfits to choose from:
(No outfits yet. Just infer the tag from the prompt.)
`.trim();

    const tagInferenceMessages = [
      { role: 'system', content: systemMsg },
      { role: 'user', content: userPromptForChat }
    ];

    const inference = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      messages: tagInferenceMessages,
      max_tokens: 150
    });

    const tagText = inference?.choices?.[0]?.message?.content;
    const inferredMatch = tagText?.match(/Inferred Lifestyle Tag:\s*(.*)/i);
    const inferredLifestyleTag = inferredMatch?.[1]?.trim();

    console.log('🔍 Inferred Lifestyle Tag:', inferredLifestyleTag);

    let outfitQuery = { genderCategory };

    if (affirmative) {
      const relaxedFilter = Math.random() < 0.5
        ? { season: { $in: groupedSeasons } }
        : { climateFit };

      outfitQuery = {
        ...outfitQuery,
        ...relaxedFilter,
        ...(inferredLifestyleTag ? { lifestyleTags: { $in: [inferredLifestyleTag] } } : {})
      };
    } else {
      outfitQuery = {
        ...outfitQuery,
        styleProfile,
        fitPreference,
        climateFit,
        season: { $in: groupedSeasons },
        ...(inferredLifestyleTag ? { lifestyleTags: { $in: [inferredLifestyleTag] } } : {})
      };
    }

    const outfits = await Outfit.find(outfitQuery).limit(40);
    const relaxed = affirmative;

    if (!outfits.length) {
      return res.status(200).json({
        outfits: [],
        explanation: `I'm not finding a match yet. Would you like me to expand the search by relaxing some filters? Just type “yes” to try.`,
        inferredTag: inferredLifestyleTag || null,
        relaxed
      });
    }

    const outfitSummaries = outfits.map((o, i) => {
      const tags = [
        o.styleProfile,
        o.climateFit,
        o.season,
        o.fitPreference,
        o.genderCategory,
        ...(o.lifestyleTags || [])
      ];
      return `Option ${i + 1}: ${o.title}\nTags: ${tags.join(', ')}\nDescription: ${o.description || 'No description'}\n`;
    }).join('\n');

    const selectionPrompt = `
        Prompt: "${prompt}"
        
        User Profile:
        - Style: ${styleProfile}
        - Fit: ${fitPreference}
        - Gender: ${genderCategory}
        - Climate Fit: ${climateFit}
        - Season: ${groupedSeasons.join(', ')}
        - Inferred Lifestyle Tag: ${inferredLifestyleTag || 'unknown'}
        
        Choose the 1–5 best outfit(s) by title from the list below.
        Only refer to outfits by their exact title.
        
        For your response:
        - Gender cannot be changed
        - Use a numbered list (1–5)
        - Start each line with the outfit title
        - After a dash, write one short sentence explaining why it's a good fit
        - Do not repeat the outfit’s description or tags
        
        Example:
        1. Boho Investment Chic – Perfect for a relaxed but polished office look.
        2. Comfy Street Layers – Great for casual city walking in cooler climates.
    `.trim();

    const selectionMessages = [
      { role: 'system', content: `You are a stylist. Pick from the list. Only use exact titles.` },
      { role: 'user', content: selectionPrompt + '\n\n' + outfitSummaries }
    ];

    const selection = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.75,
      messages: selectionMessages,
      max_tokens: 700
    });

    const aiText = selection?.choices?.[0]?.message?.content;

    if (!aiText) {
      return res.status(500).json({ err: 'No response from OpenAI.' });
    }

    const matchedOutfits = outfits.filter(outfit =>
      aiText.toLowerCase().includes(outfit.title.toLowerCase())
    );

    if (!matchedOutfits.length) {
      return res.status(200).json({
        outfits: [],
        explanation: `Hmm, the AI couldn't confidently pick a match. Want me to try expanding the filters? Just say “yes” or “sure.”`,
        inferredTag: inferredLifestyleTag || null,
        relaxed
      });
    }

    res.status(200).json({
      outfits: matchedOutfits,
      explanation: aiText,
      inferredTag: inferredLifestyleTag || null,
      relaxed
    });

  } catch (err) {
    console.error('aiAgent error:', err);
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
export const quizTagMap = {
    q1: {
      "male": { genderCategory: "Male" },
      "female": { genderCategory: "Female" },
      "Nonbinary": { genderCategory: "Nonbinary" },
    },
  
    q2: {
      "Friendly, casual, athletic": { styleProfile: ["Casual"], lifestyleTags: ["Athletic"] },
      "Confident, sophisticated, independent": { styleProfile: ["Minimalist", "Classic"], lifestyleTags: ["Professional"] },
      "Creative, adventurous, open-minded": { styleProfile: ["Boho", "ecclectic/artsy"] },
      "Reserved, sensitive, empathetic": { styleProfile: ["Minimalist"], lifestyleTags: ["Loungewear"] },
    },
  
    q3: {
      "Neutral colors": { styleProfile: ["Minimalist"] },
      "Bright colors": { styleProfile: ["Preppy", "Streetwear"] },
      "Pastels": { styleProfile: ["Boho", "Preppy"] },
      "Bold, contrasting colors": { styleProfile: ["Grunge/edgy", "Avant-Garde"] },
      "It doesn't matter": {},
      "All Colors": { styleProfile: ["ecclectic/artsy"] },
    },
  
    q4: {
      "Netflix and Chill": { lifestyleTags: ["Loungewear"] },
      "Working": { lifestyleTags: ["Professional"] },
      "Partying and clubbing": { lifestyleTags: ["Event-ready"] },
      "Playing a sport": { lifestyleTags: ["Athletic", "Outdoorsy"] },
    },
  
    q5: {
      "Flashy shoes": { styleProfile: ["Streetwear"] },
      "Coat": { styleProfile: ["Classic"] },
      "blazer": { styleProfile: ["Preppy"] },
      '"It" bag': { styleProfile: ["Retro"] },
      "vintage jacket": { styleProfile: ["Retro"] },
    },
  
    // Female Specific
    q6_f: {
      "Scarf": { lifestyleTags: ["Loungewear"] },
      "beanie": { lifestyleTags: ["Casual"] },
      "Wide-brimmed hat": { styleProfile: ["Boho"] },
      "glasses": { styleProfile: ["Classic"] },
      "necklace": { styleProfile: ["Preppy"] },
      "earrings": { styleProfile: ["ecclectic/artsy"] },
      "watch": { styleProfile: ["Minimalist"] },
    },
  
    q7_f: {
      "A-Line": { styleProfile: ["Preppy"] },
      "Maxi": { styleProfile: ["Boho"] },
      "Bodycon": { styleProfile: ["Streetwear"] },
      "Shirt Dress": { styleProfile: ["Minimalist"] },
    },
  
    q8_f: {
      "Fitted and Tailored": { fitPreference: "Fitted" },
      "Flowy and loose": { fitPreference: "Oversized" },
      "Balanced (mix of both)": { fitPreference: "Relaxed" },
    },
  
    q9_f: {
      "Solid colors": { styleProfile: ["Minimalist"] },
      "animal prints": { styleProfile: ["ecclectic/artsy"] },
      "floral and feminine prints": { styleProfile: ["Boho"] },
      "stripes and plaid": { styleProfile: ["Preppy"] },
    },
  
    q10_f: {
      "Look put together and polished": { styleProfile: ["Classic"] },
      "to experiment and have fun with fashion": { styleProfile: ["ecclectic/artsy", "Avant-Garde"] },
      "be comfortable yet stylish": { styleProfile: ["Casual"] },
      "make a bold fashion statement": { styleProfile: ["Grunge/edgy"] },
    },
  
    // Male Specific
    q6_m: {
      "slim": { fitPreference: "Fitted" },
      "regular": { fitPreference: "Relaxed" },
      "oversized": { fitPreference: "Oversized" },
    },
  
    q7_m: {
      "sneakers": { lifestyleTags: ["Athletic"] },
      "loafersdress shoes": { lifestyleTags: ["Professional"] },
      "boots": { lifestyleTags: ["Outdoorsy"] },
      "sandals": { lifestyleTags: ["Casual"] },
    },
  
    q8_m: {
      "classic and timeless (suits, polo shirts)": { styleProfile: ["Classic"] },
      "casual and relaxed (t-shirts, jeans, hoodies)": { styleProfile: ["Casual"] },
      "bold and experimental (layering, unique accessories)": { styleProfile: ["Grunge/edgy", "Avant-Garde"] },
    },
  
    q9_m: {
      "watch only": { styleProfile: ["Minimalist"] },
      "minimal jewelry": { styleProfile: ["Preppy"] },
      "statement pieces (chains, hats, sunglasses)": { styleProfile: ["Streetwear"] },
    },
  
    q10_m: {
      "bomber jacket": { styleProfile: ["Streetwear"] },
      "trench coat": { styleProfile: ["Classic"] },
      "hoodie": { styleProfile: ["Casual"] },
      "denim jacket": { styleProfile: ["Retro"] },
    },
  
    // Androgynous Specific
    q6_n: {
      "slim": { fitPreference: "Fitted" },
      "regular": { fitPreference: "Relaxed" },
      "oversized": { fitPreference: "Oversized" },
    },
  
    q7_n: {
      "breaking gender norms": { styleProfile: ["Avant-Garde"] },
      "minimal and neutral": { styleProfile: ["Minimalist"] },
      "experimental and bold": { styleProfile: ["ecclectic/artsy"] },
      "comfort first": { styleProfile: ["Casual"] },
    },
  
    q8_n: {
      "oversized jackets, baggy jeans": { styleProfile: ["Grunge/edgy"] },
      "unisex clothing, platform boots": { styleProfile: ["Streetwear"] },
      "t-shirt dresses, tote bags": { styleProfile: ["Boho"] },
    },
  
    q9_n: {
      "solid neutrals": { styleProfile: ["Minimalist"] },
      "pinstripes or subtle prints": { styleProfile: ["Preppy"] },
      "graphic or bold prints": { styleProfile: ["Streetwear"] },
      "mixed fabrics": { styleProfile: ["Avant-Garde"] },
    },
  
    q10_n: {
      "tailored coat or structured blazer": { styleProfile: ["Classic"] },
      "leather or denim jacket": { styleProfile: ["Grunge/edgy", "Retro"] },
      "oversized hoodies or jacket": { styleProfile: ["Casual"] },
      "trench or longline coat": { styleProfile: ["Minimalist"] },
    },
  
    q11_n: {
      "defy traditional gender expectations": { styleProfile: ["Avant-Garde"] },
      "mix masculine and feminine elements": { styleProfile: ["ecclectic/artsy"] },
      "create an authentic, personal signature look": { styleProfile: ["Streetwear"] },
      "confidence over categories": { styleProfile: ["Minimalist"] },
    }
  };
  
  module.exports = { quizTagMap };
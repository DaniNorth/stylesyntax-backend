// utils/quizQuestions.js
// q#:=everyone, q#_f=female, q#_m=male q#_n=nonbinary 
const quizQuestions = {
    q1: {
      text: "Describe yourself",
      type: "single",
      options: ["male", "female", "nonbinary"]
    },
    q2: {
      text: "What best describes your personality?",
      type: "single",
      options: [
        "Friendly, casual, athletic",
        "Confident, sophisticated, independent",
        "Creative, adventurous, open-minded",
        "Reserved, sensitive, empathetic"
      ]
    },
    q3: {
      text: "What is your favorite color palette?",
      type: "single",
      options: [
        "Neutral colors",
        "Bright colors",
        "Pastels",
        "Bold, contrasting colors",
        "It doesn't matter",
        "All Colors"
      ]
    },
    q4: {
      text: "What is your idea of fun?",
      type: "single",
      options: [
        "Netflix and Chill",
        "Working",
        "Partying and clubbing",
        "Playing a sport"
      ]
    },
    q5: {
      text: "What is your statement piece?",
      type: "single",
      options: [
        "Flashy shoes",
        "Coat",
        "blazer",
        '"It" bag',
        "vintage jacket"
      ]
    },
    // for the girls
    q6_f: {
        text: "What accessory are you most likely to wear?",
        type: "single",
        options: [
          "Scarf",
          "beanie",
          "Wide-brimmed hat",
          "glasses",
          "necklace",
          "earrings",
          "watch"
        ]
      },
      q7_f: {
        text: "What type of dress do you feel most confident in?",
        type: "single",
        options: [
          "A-Line",
          "Maxi",
          "Bodycon",
          "Shirt Dress"
        ]
      },
      q8_f: {
        text: "How do you like your clothes to fit?",
        type: "single",
        options: [
          "Fitted and Tailored",
          "Flowy and loose",
          "Balanced (mix of both)"
        ]
      },
      q9_f: {
        text: "What kind of patterns do you prefer?",
        type: "single",
        options: [
          "Solid colors",
          "animal prints",
          "floral and feminine prints",
          "stripes and plaid"
        ]
      },
      q10_f: {
        text: "What is your ultimate fashion goal?",
        type: "single",
        options: [
          "Look put together and polished",
          "to experiment and have fun with fashion",
          "be comfortable yet stylish",
          "make a bold fashion statement"
        ]
      },
      
      q11_f: {
        text: "Which shoes do you gravitate towards the most?",
        type: "single",
        options: [
          "Ankle boots",
          "Sneakers",
          "Heels",
          "Slides or sandals"
        ]
    },
    
    // mens section
    q6_m: {
      text: "What fit do you prefer?",
      type: "single",
      options: ["slim", "regular", "oversized"]
    },
    q7_m: {
      text: "What's your go-to shoe style?",
      type: "single",
      options: ["sneakers", "loafers/dress shoes", "boots", "sandals"]
    },
    q8_m: {
      text: "What best describes your style?",
      type: "single",
      options: [
        "classic and timeless (suits, polo shirts)",
        "casual and relaxed (t-shirts, jeans, hoodies)",
        "bold and experimental (layering, unique accessories)"
      ]
    },
    q9_m: {
      text: "How do you accessorize?",
      type: "single",
      options: ["watch only", "minimal jewelry", "statement pieces (chains, hats, sunglasses)"]
    },
    q10_m: {
      text: "What type of outerwear do you prefer?",
      type: "single",
      options: ["bomber jacket", "trench coat", "hoodie", "denim jacket"]
    },

    q11_m: {
        text: "What’s your go-to pants style?",
        type: "single",
        options: [
          "Tailored trousers",
          "Jeans",
          "Joggers or sweats",
          "Cargo pants"
        ]
      },
  
    // nonbinary section
    q6_n: {
      text: "What fit do you prefer?",
      type: "single",
      options: ["slim", "regular", "oversized"]
    },
    q7_n: {
      text: "How would you describe your approach to fashion?",
      type: "single",
      options: [
        "breaking gender norms",
        "minimal and neutral",
        "experimental and bold",
        "comfort first"
      ]
    },
    q8_n: {
      text: "What best describes your style?",
      type: "single",
      options: [
        "oversized jackets, baggy jeans",
        "unisex clothing, platform boots",
        "t-shirt dresses, tote bags"
      ]
    },
    q9_n: {
      text: "What patterns or textures do you prefer?",
      type: "single",
      options: [
        "solid neutrals",
        "pinstripes or subtle prints",
        "graphic or bold prints",
        "mixed fabrics"
      ]
    },
    q10_n: {
      text: "What type of outerwear do you prefer?",
      type: "single",
      options: [
        "tailored coat or structured blazer",
        "leather or denim jacket",
        "oversized hoodies or jacket",
        "trench or longline coat"
      ]
    },
    q11_n: {
      text: "What is your fashion goal?",
      type: "single",
      options: [
        "defy traditional gender expectations",
        "mix masculine and feminine elements",
        "create an authentic, personal signature look",
        "confidence over categories"
      ]
    }
  };
  
  module.exports = { quizQuestions };
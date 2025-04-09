export interface Persona {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  specialties: string[];
  style: {
    voice: string;
    traits: string[];
  };
  tunes: string[];
  genAICourse: {
    promoteLine: string;
    courseLink: string;
    examples: string[];
  };
}

export const personas: Persona[] = [
  {
    id: "hitesh",
    name: "Hitesh Choudhary",
    title: "Tech Educator & Entrepreneur",
    bio: "Passionate about teaching programming with a focus on practical knowledge and real-world applications.",
    avatar: "https://github.com/hiteshchoudhary.png",
    specialties: ["JavaScript", "Python", "Web Development", "Blockchain", "AI"],
    style: {
      voice: "Hanji! Hamesha Hindi mein baat karte hain, thoda mazaak, thodi chai aur bhot saara code. Funny tone ke saath har baat relatable hoti hai.",
      traits: ["funny", "relatable", "chai-lover", "inspirational", "desi techie"]
    },
    tunes: [
      "Hanji! Unboxing ho gayi h guys 😁 Bhut mehnat lagti h is T-shirt ke liye!",
      "Chai aur code, bs isi mein zindagi set hai ☕💻",
      "Hum padha rhe hain, aap padh lo... chai pe milte rahenge 😄",
      "Full stack Data Science cohort start ho rha h bhai, live class me milte h 🔥",
      "Code karo, chill karo, lekin pehle chai lao ☕😎"
    ],
    genAICourse: {
      promoteLine: "Hanji! Gen AI course le lo bhai, aapke liye banaya h specially. Live class me chill aur coding dono milegi ☕🔥",
      courseLink: "https://chaicode.dev/genai",
      examples: [
        "Hanji bhai, Gen AI course abhi le lo, warna regret karega later! 🤖💥",
        "AI seekhna hai? Chai leke aao aur iss course me ghus jao 😎☕"
      ]
    }
  },
  {
    id: "piyush",
    name: "Piyush Garg",
    title: "Software Engineer & Content Creator",
    bio: "Full-stack developer who loves sharing programming knowledge and system design concepts.",
    avatar: "https://github.com/piyushgarg-dev.png",
    specialties: ["System Design", "React", "Node.js", "DSA", "Career Advice"],
    style: {
      voice: "Dekho bhai! Full-on desi swag ke saath, sab kuch Hindi mein samjhate hain, funny emojis ke saath. Straightforward + mazedaar!",
      traits: ["funny", "straight-shooter", "relatable", "energetic", "mentor-type"]
    },
    tunes: [
      "Dekho bhai, Docker seekh lo, coupon DOCKERPRO use karo 🤓🔥",
      "Bhai, great work man! 🔥🔥",
      "Patila wale log dhyaan se suno, backend ka concept clear karo 😎💻",
      "System design ka dar khatam, bhai coding se pyaar badhao 🧠❤️",
      "Dekho bhai, DSA nhi seekha to internship me dukh hoga 😭"
    ],
    genAICourse: {
      promoteLine: "Dekho bhai, Gen AI ka course le lo. Puri life set ho jayegi. Hitesh bhai ke saath LIVE aane ka mauka bhi milega! 😎🔥",
      courseLink: "https://chaicode.dev/genai",
      examples: [
        "Dekho bhai, Gen AI abhi lena h to lo, warna FOMO ho jayega 🤖🧠🔥",
        "Bhai, Gen AI course liya? Nahi? Patila miss kar raha tu 😂💥"
      ]
    }
  }
];

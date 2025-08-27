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
    id: "shubham",
    name: "Shubham Londhe",
    title: "Developer Advocate & Educator @ AWS",
    bio: "Creator of the GenAI + DevOps course. Developer Advocate with 8+ years of experience in DevOps, development, and platform engineering. Helping developers and engineers master cloud-native, AI-powered automation through real-world projects.",
    avatar: "https://github.com/LondheShubham153.png",
    specialties: ["Cloud-Native Solutions", "DevOps", "Platform Engineering", "AI Tools", "Mentorship"],
    style: {
      voice: "Friendly, supportive, and hands-on—guides with clarity, real-world context, and a bit of desi flair.",
      traits: ["mentor-type", "supportive", "cloud-savvy", "encouraging"],
    },
    tunes: [
      "Master GenAI + DevOps with me—build real-world projects on AWS!",
      "Cloud-native to AI-driven workflows—saath mein sikhenge 🚀",
      "Mentorship + hands-on coding = career growth 💡",
    ],
    genAICourse: {
      promoteLine: "Ready to supercharge your DevOps career? Join my GenAI + DevOps course—hands-on projects, real AWS workflows, and AI-driven automation.",
      courseLink: "https://trainwithshubham.com/genai-devops",
      examples: [
        "Learn GenAI + DevOps from scratch—projects, mentorship, and AWS insights with me!",
        "Automate your infra the smart way—enroll in my GenAI + DevOps course today 🚀",
      ],
    },
  },
  {
    id: "sandip",
    name: "Sandip Das",
    title: "AWS Container Hero & Sr Cloud DevOps Engineer",
    bio: "AWS Container Hero and HashiCorp Ambassador. Partnering with Shubham Londhe to promote and mentor learners in the GenAI + DevOps course. Brings expertise in Kubernetes, Terraform, and secure container-first architectures.",
    avatar: "https://github.com/sd031.png",
    specialties: ["Containers & Kubernetes", "Infrastructure Security", "Cloud Architecture", "Terraform & HashiCorp", "Knowledge Sharing"],
    style: {
      voice: "Tech-pro, detailed yet accessible—codes secure infrastructures with clarity and shares with the community.",
      traits: ["technical", "educational", "insightful", "mentor"],
    },
    tunes: [
      "Level up your DevOps with GenAI + AWS containers 🚀",
      "Join me and Shubham in shaping the next-gen DevOps engineers 💡",
      "Kubernetes + Terraform + GenAI = Future-proof infra 🔥",
    ],
    genAICourse: {
      promoteLine: "Supporting Shubham’s GenAI + DevOps course—helping learners master containers, infra as code, and AI-driven automation.",
      courseLink: "https://trainwithshubham.com/genai-devops",
      examples: [
        "Join the GenAI + DevOps journey with me and Shubham—containers + AI + automation 💥",
        "Want to master containers in a GenAI world? This course is for you 🚀",
      ],
    },
  },
  {
    id: "amitabh",
    name: "Amitabh Soni",
    title: "DevOps Engineer @ TWS",
    bio: "Learner of Shubham Londhe’s GenAI + DevOps course. Passionate about mastering CI/CD, Terraform, Kubernetes, and AI-powered automation. Sharing learnings, projects, and growth as part of the community.",
    avatar: "https://github.com/Amitabh-DevOps.png",
    specialties: ["CI/CD Automation", "IaC with Terraform & Ansible", "Docker & Kubernetes", "Monitoring (Prometheus, Grafana)", "Infrastructure Reliability"],
    style: {
      voice: "Practical, results-driven, and collaborative—learning with curiosity and applying DevOps concepts hands-on.",
      traits: ["detail-oriented", "learner", "collaborative", "hands-on"],
    },
    tunes: [
      "Learning GenAI + DevOps from Shubham—hands-on AWS projects every week 🔥",
      "From Terraform to AI automation—growing one step at a time 📈",
      "Community-driven learning is the best kind of DevOps 💡",
    ],
    genAICourse: {
      promoteLine: "Currently enrolled in Shubham’s GenAI + DevOps course—building smart pipelines, AI-powered infra, and sharing progress with the community.",
      courseLink: "https://trainwithshubham.com/genai-devops",
      examples: [
        "As a learner in the GenAI + DevOps course, I’m building projects and automating smarter 🚀",
        "Growing in DevOps with Shubham’s mentorship—this course is a game-changer 💡",
      ],
    },
  },
];

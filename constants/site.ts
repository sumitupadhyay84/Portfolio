export const siteConfig = {
  name: "Sumit Upadhyay",
  firstName: "Sumit",
  lastName: "Upadhyay",
  initials: "SU",
  role: "AI-Full Stack Developer",
  rotatingRoles: ["FULL STACK DEV", "MERN DEVELOPER", "AI INTEGRATION "],
  summary:
    "Passionate AI-Full Stack Developer with experience building scalable web applications using React, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, MongoDB, Prisma, and modern cloud technologies.",
  heroTagline:
    "I build intelligent digital experiences combining high-performance code with striking visual design.",
  aboutHeadline: "Building Scalable Web Applications & Cloud Ready Systems",
  aboutDescription:
    "Passionate Full Stack Developer with experience building scalable web applications using React, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, MongoDB, Prisma, and modern cloud technologies.",
  aboutHighlights: [
    "With multiple production-ready projects built",
    "available for remote opportunities worldwide",
  ],
  email: "sumitupadhyay852@gmail.com",
  phone: "+91 8433198122",
  location: "Noida, India",
  github: "https://github.com/sumitupadhyay84/",
  linkedin: "https://www.linkedin.com/in/sumit-upadhyay-7579aa225/",
  whatsapp: "https://wa.me/918433198122?text=Hi",
  resumeUrl: "",
  image: "/images/developer-avatar.png",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const aboutTags = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Javascript",
  "Docker",
  "Git",
  "AWS",
  "python",
  "C++",
  "MySQL",
  "CI/CD",
  "FastAPI",
  "Microservices",
  "MVC Architecture",
  "Docker",
  "Git",
  "GitHub",
  "Postman",
  "RAG",
  "Cursor",
  "Redis",
  "AWS",
  "Agile",
  "Tailwind CSS",
  "Redux",
  "Shadcn UI",
  "Responsive Design"
];

export const skills = [
  { name: "React", icon: "/svgs/react.svg" },
  { name: "Next.js", icon: "/svgs/nextjs.svg" },
  { name: "TypeScript", icon: "/svgs/typescript.svg" },
  { name: "JavaScript", icon: "/svgs/javascript.svg" },
  { name: "Node.js", icon: "/svgs/nodejs.svg" },
  { name: "Express", icon: "/svgs/express.svg" },
  { name: "PostgreSQL", icon: "/svgs/postgresql.svg" },
  { name: "MongoDB", icon: "/svgs/mongodb.svg" },
  { name: "Prisma", icon: "/svgs/prisma.svg" },
  { name: "Tailwind CSS", icon: "/svgs/tailwind.svg" },
  { name: "Docker", icon: "/svgs/docker.svg" },
  { name: "Git", icon: "/svgs/git.svg" },
  { name: "GitHub", icon: "/svgs/github.svg" },
  { name: "AWS", icon: "/svgs/aws.svg" },
  { name: "Python", icon: "" },
  { name: "C++", icon: "" },
  { name: "MySQL", icon: "" },
  { name: "CI/CD", icon: "" },
  { name: "FastAPI", icon: "" },
  { name: "Microservices", icon: "" },
  { name: "MVC", icon: "" },
  { name: "Postman", icon: "" },
  { name: "RAG", icon: "" },
  { name: "Redis", icon: "" },
  { name: "Agile", icon: "" },
  { name: "Redux", icon: "" },
  { name: "Shadcn UI", icon: "" },
  { name: "Responsive", icon: "" },
];

export const education = [
  {
    id: 1,
    type: "College",
    degree: "Bachelor of Technology | Computer Science",
    institution: "Galgotias College of Engineering and Technology",
    period: "2021 - 2025",
    description: [
      "Specialized in full-stack web development and cloud-native systems.",
      "Completed capstone project on scalable SaaS architecture.",
    ],
  },
  {
    id: 2,
    type: "12th Grade",
    degree: "Higher Secondary Education",
    institution: "BLS International School",
    period: "2018 - 2020",
    description: [
      "Scored top marks in Computer Science and Mathematics.",
      "Participated in regional science exhibitions.",
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Morpheme Webnexus Pvt. Ltd | 1 year Experience",
    subtitle: "Muti-Tenant E-commerce Platform SaaS Dashboard(innorade)",
    description: [
      "Engineered backend features for a multi-tenant SaaS platform serving 5,000+ client workspaces using Node.js, Express.js, PostgreSQL, and Prisma ORM.",
      "Architected a robust multi-tenant system leveraging a single backend and database, supporting over 5,000 unique client instances and accelerating onboarding by 30%.",
      "Created efficient Prisma data models and optimized PostgreSQL queries for products, orders, inventory, and payments, improving application performance and maintainability.",
      "Engineered a custom Stripe Payment Intent flow, reducing average transaction confirmation time by 15 seconds and increasing successful payment completions by 10%."
    ],
    tech: ["Node.js", "Express.js", "PostgreSQL", "Prisma", "Stripe", "AI", "Docker", "AWS", "CI/CD"],
    image: "/images/innorade.png",
  },
  {
    id: 2,
    title: "Mellow Corporation | 6 Months Internship",
    subtitle: "Resume Management System",
    description: [
      "Built 12+ REST APIs serving 5,000+ requests per day.",
      "Optimized MongoDB queries, reducing API response time by 35%. ",
      "Reduced frontend loading time by 25% through efficient data fetching and route optimization. ",
      "Improved state management across 20+ React components using Redux.",
      "Participated in 25+ Agile sprint meetings and reviewed 40+ pull requests, improving code quality and reducing production bugs.",
    ],
    tech: ["React", "Node.js", "MongoDB", "Express", "Redux", "Agile", "GIT", "GitHub", "PostgreSQL", "Docker", "CI/CD"],
    github: "#",
    live: "#",
    image: "/images/resume-management.png",
    features: [
      "RESTful API with validation",
      "Admin management console",
      "Responsive UI with motion design",
    ],
  },
  {
    id: 3,
    title: "MERN AI Chatbot",
    subtitle: "AI Chatbot Application",
    description:
      ["Optimized API request handling and error management, improving application reliability and reducing response latency.",
        "Applied Context API for centralized state management, improving authentication flow and ensuring consistent user sessions.",
        "Developed chat history persistence using MongoDB, allowing users to access previous conversations across sessions."],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Typescript", "JWT", "bcrypt", "OpenAI API", "MUI"],
    github: "https://github.com/sumitupadhyay84/MERN-OpenAI-chatbot",
    live: "https://github.com/sumitupadhyay84/MERN-OpenAI-chatbot",
    image: "/images/AI-chatbot.png",
    features: [
      "Containerized deployment pipeline",
      "Secure payment integration placeholder",
      "SEO and performance optimized frontend",
    ],
  },
  {
    id: 4,
    title: "Food Delivery App",
    subtitle: "Food Delivery Web Application using React and Node.js",
    description: [
      "Enforced role-based access control (RBAC) for Admin and Customer modules, enabling secure product management, order tracking, and user administration.",
      "Created RESTful APIs using Express.js and implemented secure authentication with JWT and HTTP-only cookies.",
      "Crafted a responsive user interface to provide a seamless user experience with minimal latency.",
      "Integrated Stripe Payment to streamline secure payment processing, reducing payment confirmation time by 15 seconds."
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "Component-based Architecture"],
    github: "https://github.com/sumitupadhyay84/food-delivery-application",
    live: "https://food-delivery-application-khyc.vercel.app/",
    image: "/images/food.png",
    features: [
      "RESTful API with validation",
      "Admin management console",
      "Responsive UI with motion design",
    ],
  },
];

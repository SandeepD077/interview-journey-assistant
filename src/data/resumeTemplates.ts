export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  category: 'modern' | 'classic' | 'creative' | 'minimalist' | 'executive';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: string[];
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "A clean, contemporary design with a sidebar for contact information and skills",
    previewImage: "/resume-templates/modern-template.png",
    category: "modern",
    colors: {
      primary: "#2563eb",
      secondary: "#64748b", 
      accent: "#f1f5f9"
    },
    features: ["Two-column layout", "Icon integration", "Clean typography", "ATS-friendly"]
  },
  {
    id: "professional",
    name: "Classic Professional", 
    description: "A traditional layout focused on experience and achievements with professional styling",
    previewImage: "/resume-templates/professional-template.png",
    category: "classic",
    colors: {
      primary: "#1f2937",
      secondary: "#6b7280",
      accent: "#f9fafb"
    },
    features: ["Single-column layout", "Traditional format", "Professional styling", "Easy to read"]
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "A bold design that showcases creativity and personality with vibrant colors",
    previewImage: "/resume-templates/creative-template.png", 
    category: "creative",
    colors: {
      primary: "#7c3aed",
      secondary: "#a855f7",
      accent: "#faf5ff"
    },
    features: ["Creative layout", "Color accents", "Portfolio focus", "Visual impact"]
  },
  {
    id: "minimalist",
    name: "Minimalist Clean",
    description: "Simple and elegant design focusing on content with minimal distractions",
    previewImage: "/resume-templates/minimalist-template.svg",
    category: "minimalist", 
    colors: {
      primary: "#000000",
      secondary: "#525252",
      accent: "#ffffff"
    },
    features: ["Ultra-clean design", "Maximum readability", "Subtle formatting", "Content-focused"]
  },
  {
    id: "executive",
    name: "Executive Leadership",
    description: "Sophisticated design for senior professionals and executives with premium styling",
    previewImage: "/resume-templates/executive-template.svg",
    category: "executive",
    colors: {
      primary: "#1e40af",
      secondary: "#3730a3",
      accent: "#eff6ff"
    },
    features: ["Executive styling", "Leadership focus", "Premium design", "Senior-level format"]
  },
  {
    id: "tech",
    name: "Tech Specialist",
    description: "Modern template optimized for developers and tech professionals",
    previewImage: "/resume-templates/tech-template.svg",
    category: "modern",
    colors: {
      primary: "#059669",
      secondary: "#047857",
      accent: "#ecfdf5"
    },
    features: ["Code-friendly", "Skills showcase", "Project highlights", "GitHub integration"]
  },
  {
    id: "academic",
    name: "Academic Scholar",
    description: "Formal template designed for researchers, professors, and academic professionals",
    previewImage: "/resume-templates/academic-template.svg",
    category: "classic",
    colors: {
      primary: "#92400e",
      secondary: "#a16207",
      accent: "#fefbeb"
    },
    features: ["Publication focus", "Research highlights", "Academic formatting", "Citation ready"]
  },
  {
    id: "startup",
    name: "Startup Innovator",
    description: "Dynamic template for entrepreneurs and startup professionals",
    previewImage: "/resume-templates/startup-template.svg",
    category: "creative",
    colors: {
      primary: "#dc2626",
      secondary: "#b91c1c",
      accent: "#fef2f2"
    },
    features: ["Innovation focus", "Achievement metrics", "Growth mindset", "Impact-driven"]
  }
];

export interface ResumeFormData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
    github?: string;
    website?: string;
    summary: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    description?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    expiration?: string;
  }>;
}

export const defaultResumeData: ResumeFormData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    website: "",
    summary: ""
  },
  education: [
    {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: ""
    }
  ],
  experience: [
    {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    }
  ],
  skills: [""],
  projects: [
    {
      title: "",
      description: "",
      technologies: [""],
      link: ""
    }
  ],
  certifications: [
    {
      name: "",
      issuer: "",
      date: "",
      expiration: ""
    }
  ]
};

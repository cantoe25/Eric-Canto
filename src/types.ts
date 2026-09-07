export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  category: string;
  year: string;
  description: string;
  image: string;
  imageAlt: string;
  techStack: string[];
  metrics?: string;
  liveUrl?: string;
  repoUrl?: string;
  caseStudyDetails?: {
    challenge: string;
    solution: string;
    architecture: string[];
    results: string[];
  };
}

export interface WorkExperience {
  id: string;
  role: string;
  period: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  highlight?: string;
}

export interface TechnicalValidation {
  title: string;
  verified: boolean;
}

export interface VolunteerItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface LanguageItem {
  language: string;
  level: string;
}


export interface Project {
  id: string;
  title: string;
  description: string; // Short description for card
  longDescription: string; // Detailed description for modal
  imageUrl: string;
  tags: string[]; // For filtering and display
  projectUrl?: string; // Link to live project
  repoUrl?: string; // Link to GitHub repo
  technologies: string[]; // List of technologies used
  dataAiHint?: string; // For placeholder image search keywords
}

// Other types can be added here later if needed for Achievements, Certifications, etc.
// export interface Achievement {
//   id: string;
//   title: string;
//   organization?: string;
//   description: string;
//   imageUrl: string;
//   dataAiHint?: string;
// }

// export interface Certification {
//   id: string;
//   title: string;
//   issuingOrganization: string;
//   description: string;
//   imageUrl: string;
//   dataAiHint?: string;
// }

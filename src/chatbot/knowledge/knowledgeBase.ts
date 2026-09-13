// src/chatbot/knowledge/knowledgeBase.ts
import { madhiveExperience } from './experience';
import { icimsExperienceL2, icimsExperienceL1, icimsInternDev, icimsInternTest } from './experience';
import { wrkshpGlobal } from './experience';
import { notableProjects } from './projects';
import { technicalSkills } from './skills';
import { educationEntries } from './education';

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'experience' | 'project' | 'skill' | 'education' | 'achievement';
  content: string;
  // Optional fields for enhanced functionality
  dateRange?: string;
  technologies?: string[];
  impact?: string[];
  metrics?: string[];
  experience?: string[]; // For skills: which roles used this skill
}

// Combine all knowledge base entries
export const knowledgeBase: KnowledgeDocument[] = [
  // Experience entries
  ...madhiveExperience,
  ...icimsExperienceL2,
  ...icimsExperienceL1,
  ...icimsInternDev,
  ...icimsInternTest,
  ...wrkshpGlobal,

  // Project entries
  ...notableProjects,

  // Skill entries
  ...technicalSkills,

  // Education entries
  ...educationEntries
];

// Helper functions for retrieval
export const getKnowledgeById = (id: string): KnowledgeDocument | undefined => {
  return knowledgeBase.find(doc => doc.id === id);
};

export const getKnowledgeByCategory = (category: KnowledgeDocument['category']): KnowledgeDocument[] => {
  return knowledgeBase.filter(doc => doc.category === category);
};

export const getKnowledgeByTitle = (title: string): KnowledgeDocument[] => {
  return knowledgeBase.filter(doc => doc.title.toLowerCase().includes(title.toLowerCase()));
};

export const searchKnowledgeContent = (query: string): KnowledgeDocument[] => {
  const lowerQuery = query.toLowerCase();
  return knowledgeBase.filter(doc => 
    doc.title.toLowerCase().includes(lowerQuery) || 
    doc.content.toLowerCase().includes(lowerQuery)
  );
};

// Export counts for verification
export const knowledgeBaseStats = {
  total: knowledgeBase.length,
  byCategory: {
    experience: knowledgeBase.filter(doc => doc.category === 'experience').length,
    project: knowledgeBase.filter(doc => doc.category === 'project').length,
    skill: knowledgeBase.filter(doc => doc.category === 'skill').length,
    education: knowledgeBase.filter(doc => doc.category === 'education').length,
    achievement: knowledgeBase.filter(doc => doc.category === 'achievement').length
  }
};
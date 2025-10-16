import React from 'react';

export interface DiagnosisResult {
  differentialDiagnosis: string[];
  allopathicTreatment: string;
  ayurvedicTreatment: string;
  dietPlan: string[];
  yogaRoutine: string[];
  naturopathyTips: string[];
}

export interface SkillCourse {
  name: string;
  eligibility: string;
  description: string;
  icon: React.ReactNode;
  detailedDescription: string;
  careerPaths: string[];
}

export interface WellnessTip {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// FIX: Expanded EBookCategory to include all categories used in the application.
export type EBookCategory = 'Health & Wellness' | 'Spirituality & Philosophy' | 'Medical Guides' | 'Inspirational Biographies' | 'Skill Training Manuals' | 'Environmental Awareness';

export interface EBook {
    id: number;
    title: string;
    author: string;
    category: EBookCategory;
    coverUrl: string;
    synopsis: string;
    publicationDate: string;
    pageCount: number;
}

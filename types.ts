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
}

export interface WellnessTip {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export type EBookCategory = 'Health & Wellness' | 'Spirituality & Philosophy' | 'Medical Guides';

export interface EBook {
    id: number;
    title: string;
    author: string;
    category: EBookCategory;
    coverUrl: string;
}

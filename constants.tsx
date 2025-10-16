import React from 'react';
import type { EBook, SkillCourse, WellnessTip } from '../types';

// Icons
export const ICONS = {
  HOME: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  HEART_PULSE: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  SKILLS: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  TREE: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-8"/><path d="m12 14-4-4-2 2"/><path d="m12 14 4-4 2 2"/><path d="M12 14 8 18"/><path d="M12 14l4 4"/><path d="M16 6a4 4 0 1 0-8 0c0 2 4 6 4 6s4-4 4-6"/><path d="M12 6V2"/></svg>,
  BRAIN_CIRCUIT: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6a2 2 0 100-4 2 2 0 000 4zm0 14a2 2 0 100-4 2 2 0 000 4zm6-8a2 2 0 100-4 2 2 0 000 4zm-12 0a2 2 0 100-4 2 2 0 000 4z" /></svg>,
  BOOKS: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  INFO: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', path: '/', icon: ICONS.HOME },
  { name: 'Health Assistant', path: '/health-assistant', icon: ICONS.HEART_PULSE },
  { name: 'Skill Development', path: '/skills', icon: ICONS.SKILLS },
  { name: 'Tree Mission', path: '/tree-mission', icon: ICONS.TREE },
  { name: 'Mental Wellness', path: '/wellness', icon: ICONS.BRAIN_CIRCUIT },
  { name: 'E-Book Library', path: '/ebooks', icon: ICONS.BOOKS },
  { name: 'Our Work', path: '/our-work', icon: ICONS.INFO },
];

// Skill Courses
export const SKILL_COURSES: SkillCourse[] = [
    {
        name: 'Organic Farming',
        eligibility: '10th Pass',
        description: 'Learn sustainable and organic farming techniques to improve crop yield and soil health. This course covers everything from composting to pest control.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.158 2.05A1 1 0 0014.22 3.5l.89 3.553a1 1 0 01-.623 1.18l-3.955 1.582a1 1 0 00-.623 1.18l.89 3.554a1 1 0 01-.623 1.18L6.4 17.5a1 1 0 00-.938 1.45l2.05 4.102A1 1 0 008.938 24h6.125a1 1 0 00.938-.948l2.05-4.1" /></svg>,
        detailedDescription: 'This comprehensive course delves into the principles of organic agriculture. Topics include soil biology, composting techniques, creating natural pesticides from local herbs, crop rotation strategies for soil enrichment, and water conservation methods like drip irrigation. Students will gain practical experience in our model organic farm.',
        careerPaths: ['Organic Farm Manager', 'Sustainable Agriculture Consultant', 'Urban Gardener', 'Compost Production Specialist', 'Entrepreneur in Organic Products'],
    },
    {
        name: 'Computer Basics',
        eligibility: '8th Pass',
        description: 'Gain fundamental computer skills, including internet browsing, email, and office software. Essential for the modern digital world.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        detailedDescription: 'This course is designed for absolute beginners. You will learn to operate a computer, use essential software like Microsoft Office (Word, Excel), browse the internet safely, manage email accounts, and understand the basics of file management. The curriculum also includes an introduction to digital payments and online government services.',
        careerPaths: ['Data Entry Operator', 'Office Assistant', 'Receptionist', 'Cyber Cafe Manager', 'Freelance Virtual Assistant'],
    },
    {
        name: 'Tailoring & Stitching',
        eligibility: 'No minimum',
        description: 'Learn the art of sewing, from basic stitches to creating garments. A valuable skill for personal use or starting a small business.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>,
        detailedDescription: 'From mastering the sewing machine to pattern making and cutting techniques, this course covers all aspects of tailoring. You will learn to stitch various types of clothing, perform alterations, and understand different fabrics. Advanced modules include embroidery and design principles, empowering you to start your own boutique.',
        careerPaths: ['Boutique Owner', 'Fashion Designer Assistant', 'Alteration Specialist', 'Industrial Garment Stitcher', 'Custom Tailor'],
    },
];

// Wellness Tips
export const WELLNESS_TIPS: WellnessTip[] = [
    {
        title: 'Mindful Breathing',
        description: 'Practice deep, slow breathing for 5-10 minutes daily to calm your nervous system, reduce stress, and improve mental clarity.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    },
    {
        title: 'Gratitude Practice',
        description: 'Take time each day to acknowledge things you are grateful for. This practice can shift your perspective and increase overall happiness.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
        title: 'Connect with Nature',
        description: 'Spend time outdoors, whether it\'s a walk in a park or sitting by a tree. Nature has a grounding and restorative effect on the mind.',
        icon: ICONS.TREE,
    },
    {
        title: 'Mindful Movement',
        description: 'Engage in gentle exercises like yoga or tai chi to connect your mind and body, release tension, and improve your mood.',
        icon: ICONS.HEART_PULSE,
    },
];

// E-Book Library
export const EBOOKS: EBook[] = [
  { id: 1, title: 'The Wellness Guide', author: 'Dr. Jane Doe', category: 'Health & Wellness', coverUrl: 'https://placehold.co/200x300/a2d5ac/ffffff?text=Book+1', synopsis: 'A comprehensive guide to understanding your body and achieving holistic health through balanced nutrition, exercise, and mindfulness.', publicationDate: '2023-05-15', pageCount: 250 },
  { id: 2, title: 'Mindful Living', author: 'John Smith', category: 'Spirituality & Philosophy', coverUrl: 'https://placehold.co/200x300/a2d5ac/ffffff?text=Book+2', synopsis: 'Explore the principles of mindfulness and meditation to find peace and presence in your daily life. A journey to a calmer, more focused you.', publicationDate: '2022-11-20', pageCount: 180 },
  { id: 3, title: 'First-Aid Handbook', author: 'Community Health', category: 'Medical Guides', coverUrl: 'https://placehold.co/200x300/a2d5ac/ffffff?text=Book+3', synopsis: 'An essential, easy-to-follow guide for handling common injuries and emergencies. A must-have for every home and community.', publicationDate: '2021-02-10', pageCount: 120 },
  { id: 4, title: 'Life of a Visionary', author: 'History Writers', category: 'Inspirational Biographies', coverUrl: 'https://placehold.co/200x300/a2d5ac/ffffff?text=Book+4', synopsis: 'The inspiring true story of a social reformer who dedicated their life to community upliftment and environmental conservation.', publicationDate: '2023-09-01', pageCount: 320 },
  { id: 5, title: 'Organic Farming 101', author: 'Green Thumbs', category: 'Skill Training Manuals', coverUrl: 'https://placehold.co/200x300/a2d5ac/ffffff?text=Book+5', synopsis: 'A practical, step-by-step manual for starting your own organic farm, covering everything from soil health to marketing your produce.', publicationDate: '2022-04-22', pageCount: 200 },
  { id: 6, title: 'Our Planet, Our Home', author: 'Eco Watchers', category: 'Environmental Awareness', coverUrl: 'https://placehold.co/200x300/a2d5ac/ffffff?text=Book+6', synopsis: 'An eye-opening look at the state of our environment and the simple, impactful actions we can take to protect our planet for future generations.', publicationDate: '2023-01-30', pageCount: 150 },
  { id: 7, title: 'Yoga for Everyday Life', author: 'Wellness Today', category: 'Health & Wellness', coverUrl: 'https://placehold.co/200x300/a2d5ac/ffffff?text=Book+7', synopsis: 'Discover gentle yoga routines and breathing exercises that can be easily integrated into your daily life to improve flexibility, reduce stress, and enhance well-being.', publicationDate: '2021-08-12', pageCount: 190 },
  { id: 8, title: 'The Art of Meditation', author: 'Peaceful Mind', category: 'Spirituality & Philosophy', coverUrl: 'https://placehold.co/200x300/a2d5ac/ffffff?text=Book+8', synopsis: 'A beginner-friendly guide to various meditation techniques. Learn to quiet your mind, cultivate inner peace, and unlock your true potential.', publicationDate: '2020-06-05', pageCount: 160 },
];

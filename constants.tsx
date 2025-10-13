import React from 'react';
import { bookCovers } from './assets';

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
export const SKILL_COURSES = [
    {
        name: 'Organic Farming',
        eligibility: '10th Pass',
        description: 'Learn sustainable and organic farming techniques to improve crop yield and soil health. This course covers everything from composting to pest control.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    },
    {
        name: 'Yoga and Meditation',
        eligibility: 'Anyone',
        description: 'Discover the mental and physical benefits of yoga and meditation. This course is suitable for all levels, from beginners to advanced practitioners.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.25278C12 6.25278 10.6922 3.75 8.4375 3.75C6.18281 3.75 4.5 5.43281 4.5 7.6875C4.5 11.3437 8.25 14.25 12 17.25C15.75 14.25 19.5 11.3437 19.5 7.6875C19.5 5.43281 17.8172 3.75 15.5625 3.75C13.3078 3.75 12 6.25278 12 6.25278Z" /></svg>
    },
    {
        name: 'Financial Literacy',
        eligibility: '12th Pass',
        description: 'Gain control over your finances with this comprehensive course on budgeting, saving, investing, and debt management.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
    },
    {
        name: 'Digital Marketing',
        eligibility: 'Graduate',
        description: 'Master the art of online marketing, including SEO, social media, and content strategy, to boost your business or career.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    }
];

export const EBOOK_CATEGORIES = [
  { name: 'All', value: 'all' },
  { name: 'Fiction', value: 'fiction' },
  { name: 'Non-Fiction', value: 'non-fiction' },
  { name: 'Science', value: 'science' },
  { name: 'History', value: 'history' },
  { name: 'Technology', value: 'technology' },
];

export const EBOOKS = [
  {
    title: 'The Digital Fortress',
    author: 'Dan Brown',
    category: 'fiction',
    cover: 'https://covers.openlibrary.org/b/id/8264783-L.jpg',
    url: 'https://openlibrary.org/works/OL48389W/Digital_Fortress'
  },
  {
    title: 'Cosmos',
    author: 'Carl Sagan',
    category: 'science',
    cover: 'https://covers.openlibrary.org/b/id/8264783-L.jpg',
    url: 'https://openlibrary.org/works/OL48389W/Digital_Fortress'
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'history',
    cover: 'https://covers.openlibrary.org/b/id/8264783-L.jpg',
    url: 'https://openlibrary.org/works/OL48389W/Digital_Fortress'
  }
];

export const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
import React, { useState } from 'react';
import { generateIntegrativeWellnessPlan } from '../services/geminiService';
import type { DiagnosisResult } from '../types';
import Card from './common/Card';
import Loader from './common/Loader';
import { ICONS } from '../constants';

const HealthAssistantPage: React.FC = () => {
    const [symptoms, setSymptoms] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('Male');
    const [reports, setReports] = useState('');
    const [result, setResult] = useState<DiagnosisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!symptoms || !age) {
            setError('Please fill in at least Symptoms and Age.');
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const ageNum = parseInt(age, 10);
            const wellnessPlan = await generateIntegrativeWellnessPlan(symptoms, ageNum, sex, reports);
            setResult(wellnessPlan);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const ResultSection: React.FC<{title: string; items: string[] | string; icon: React.ReactNode}> = ({ title, items, icon }) => (
        <Card className="mb-6">
            <h3 className="flex items-center text-xl font-bold text-emerald-700 mb-3 border-b pb-2">
                <span className="mr-3">{icon}</span>
                {title}
            </h3>
            {Array.isArray(items) ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {items.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            ) : (
                <p className="text-gray-700">{items}</p>
            )}
        </Card>
    );

    return (
        <div className="max-w-4xl mx-auto animate-fadeIn">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">AI-Powered Integrative Wellness</h1>
            <p className="text-xl font-semibold text-center text-emerald-600 mb-4">Rog Mukt Bharat Before 2035</p>
            <p className="text-center text-gray-500 mb-8">Enter your details to receive a holistic wellness guide. This is for educational purposes and not a substitute for professional medical advice.</p>
            
            <Card>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <input type="number" id="age" value={age} onChange={e => setAge(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g., 35" />
                        </div>
                        <div>
                            <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                            <select id="sex" value={sex} onChange={e => setSex(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
                        <textarea id="symptoms" rows={4} value={symptoms} onChange={e => setSymptoms(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g., Persistent headache, fatigue, and dry cough for 3 days."></textarea>
                    </div>
                    <div>
                        <label htmlFor="reports" className="block text-sm font-medium text-gray-700 mb-1">Medical Reports Summary (Optional)</label>
                        <textarea id="reports" rows={3} value={reports} onChange={e => setReports(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g., Blood pressure is slightly high (140/90 mmHg). Vitamin D levels are low."></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" disabled={loading} className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-300 disabled:cursor-not-allowed">
                            {loading ? <Loader /> : 'Generate Wellness Plan'}
                        </button>
                    </div>
                </form>
            </Card>

            {error && <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md text-center">{error}</div>}
            
            {result && (
                <div className="mt-10 animate-fadeInUp">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Integrative Wellness Plan</h2>
                    <ResultSection title="Differential Diagnosis" items={result.differentialDiagnosis} icon={ICONS.HEART_PULSE} />
                    <ResultSection title="Allopathic Suggestions" items={result.allopathicTreatment} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>} />
                    <ResultSection title="Ayurvedic Treatment" items={result.ayurvedicTreatment} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-4-3-4-1.33 0-2.5 1-3 2.5" /><path d="M12 22a7 7 0 0 1-7-7c0-2 1-4 3-4 1.33 0 2.5 1 3 2.5" /><path d="M14 13.5a3 3 0 0 1-4 0" /><path d="M12 18V2" /><path d="m5 10 7-8 7 8" /></svg>} />
                    <ResultSection title="Diet Plan" items={result.dietPlan} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a4 4 0 1 0-8 0" /><path d="M12 16c-3.5 0-6 2.5-6 5h12c0-2.5-2.5-5-6-5z" /><path d="m18.5 12.5 2.5-2.5" /><path d="m21 10-5.5 5.5" /><path d="M2.5 12.5 9 19" /></svg>} />
                    <ResultSection title="Yoga Routine" items={result.yogaRoutine} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c0-3 2.5-5 5-5s5 2 5 5c0 3-2.5 5-5 5s-5-2-5-5z"/><path d="M12 12c0-3 2.5-5 5-5s5 2 5 5c0 3-2.5 5-5 5s-5-2-5-5z"/><path d="M7 7c0-3 2.5-5 5-5s5 2 5 5c0 3-2.5 5-5 5s-5-2-5-5z"/></svg>} />
                    <ResultSection title="Naturopathy Tips" items={result.naturopathyTips} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 2.5a2.5 2.5 0 0 1 0 5c-1 0-1.8-.4-2.5-1" /><path d="M6.5 2.5a2.5 2.5 0 0 0 0 5c1 0 1.8-.4 2.5-1" /><path d="M12 16.5V22" /><path d="m10 19 2-2.5 2 2.5" /><path d="M12 2v9.5" /><path d="M11.5 12.5C4.55 12.5 2 15.3 2 19h20c0-3.7-2.55-6.5-9.5-6.5Z" /></svg>} />
                </div>
            )}
        </div>
    );
};

export default HealthAssistantPage;
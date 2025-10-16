
import React, { useState } from 'react';
import { generateIntegrativeWellnessPlan, interpretWellnessPlan } from '../services/geminiService';
import type { DiagnosisResult } from '../types';
import Card from './common/Card';
import Loader from './common/Loader';
import { ICONS } from '../constants';

interface ReportFile {
    file: File;
    description: string;
}

const fileToBase64 = (file: File): Promise<{mimeType: string, data: string}> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        const mimeType = result.substring(result.indexOf(':') + 1, result.indexOf(';'));
        const data = result.split(',')[1];
        resolve({ mimeType, data });
    };
    reader.onerror = (error) => reject(error);
  });

const getFriendlyErrorMessage = (error: any): string => {
    const message = error.message?.toLowerCase() || '';

    if (message.includes('api key')) {
        return 'There is a configuration issue with the AI service. Please contact support.';
    }
    if (message.includes('network') || message.includes('fetch failed')) {
        return 'A network error occurred. Please check your internet connection and try again.';
    }
    if (message.includes('blocked')) {
        return 'Your request was blocked due to safety concerns. Please review your input for any sensitive content and try rephrasing.';
    }
    if (message.includes('400')) {
        return 'There seems to be an issue with the data provided. Please double-check your inputs and try again.';
    }
    if (message.includes('500') || message.includes('503') || message.includes('server')) {
        return 'The AI service is currently unavailable or experiencing issues. Please try again in a few moments.';
    }
    
    return error.message || 'An unexpected error occurred. Please try again.';
};


const HealthAssistantPage: React.FC = () => {
    const [symptoms, setSymptoms] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('Male');
    const [reports, setReports] = useState('');
    const [reportFiles, setReportFiles] = useState<ReportFile[]>([]);
    const [result, setResult] = useState<DiagnosisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [interpretation, setInterpretation] = useState<string | null>(null);
    const [interpreting, setInterpreting] = useState(false);
    const [shareConfirmation, setShareConfirmation] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const validFiles: ReportFile[] = [];
            const errors: string[] = [];

            newFiles.forEach((file: File) => {
                if (reportFiles.some(existing => existing.file.name === file.name && existing.file.lastModified === file.lastModified)) {
                    return;
                }
                if (!['image/png', 'image/jpeg'].includes(file.type)) {
                    errors.push(`- ${file.name}: Invalid file type. Only PNG or JPG images are accepted.`);
                    return;
                }
                if (file.size > 10 * 1024 * 1024) { // 10MB
                    errors.push(`- ${file.name}: File is too large. Maximum size is 10MB.`);
                    return;
                }
                validFiles.push({ file, description: '' });
            });

            if (errors.length > 0) {
                setFileError(`Please fix the following issues:\n${errors.join('\n')}`);
            } else {
                setFileError(null);
            }

            setReportFiles(prevFiles => [...prevFiles, ...validFiles]);
            if(e.target) e.target.value = '';
        }
    };
    
    const handleRemoveFile = (fileName: string) => {
        setReportFiles(prevFiles => prevFiles.filter(item => item.file.name !== fileName));
    };

    const handleDescriptionChange = (fileName: string, description: string) => {
        setReportFiles(prevFiles =>
            prevFiles.map(item =>
                item.file.name === fileName ? { ...item, description } : item
            )
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!symptoms || !age) {
            setError('Please fill in at least Symptoms and Age.');
            return;
        }
        setLoading(true);
        setError(null);
        setFileError(null);
        setResult(null);
        setInterpretation(null);
        setShareConfirmation(null);

        try {
            let filesData: Array<{ mimeType: string; data: string; description: string }> | null = null;
            if (reportFiles.length > 0) {
                filesData = await Promise.all(
                    reportFiles.map(async (item) => {
                        const { mimeType, data } = await fileToBase64(item.file);
                        return { mimeType, data, description: item.description };
                    })
                );
            }
            const ageNum = parseInt(age, 10);
            const wellnessPlan = await generateIntegrativeWellnessPlan(symptoms, ageNum, sex, reports, filesData);
            setResult(wellnessPlan);

            setInterpreting(true);
            try {
                const planInterpretation = await interpretWellnessPlan(wellnessPlan);
                setInterpretation(planInterpretation);
            } catch (interpErr: any) {
                console.error("Interpretation failed:", interpErr.message);
                setInterpretation("Could not generate an interpretation for this report, but the main plan is available below.");
            } finally {
                setInterpreting(false);
            }

        } catch (err: any) {
            setError(getFriendlyErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };
    
    const handleShareReport = async () => {
        if (!result) return;

        const formattedReport = `
Integrative Wellness Plan Summary

Disclaimer: This is an AI-generated guide for educational purposes and not a substitute for professional medical advice.

Differential Diagnosis:
- ${result.differentialDiagnosis.join('\n- ')}

Allopathic Suggestions:
${result.allopathicTreatment}

Ayurvedic Treatment:
${result.ayurvedicTreatment}

Diet Plan:
- ${result.dietPlan.join('\n- ')}

Yoga Routine:
- ${result.yogaRoutine.join('\n- ')}

Naturopathy Tips:
- ${result.naturopathyTips.join('\n- ')}
        `.trim().replace(/^        /gm, '');

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Integrative Wellness Plan',
                    text: formattedReport,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(formattedReport);
                setShareConfirmation('Report copied to clipboard!');
                setTimeout(() => setShareConfirmation(null), 3000);
            } catch (err) {
                console.error('Failed to copy report:', err);
                setShareConfirmation('Failed to copy report.');
                setTimeout(() => setShareConfirmation(null), 3000);
            }
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Medical Report(s) (Optional, Image)</label>
                        <p className="text-xs text-gray-500 mb-2">Providing reports (e.g., blood tests, scans) helps the AI create a more accurate and personalized wellness plan.</p>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                                        <span>Upload files</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg" multiple />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                            </div>
                        </div>
                        {fileError && <div className="mt-3 p-3 bg-red-100 text-red-800 rounded-md text-sm whitespace-pre-wrap font-medium">{fileError}</div>}
                         {reportFiles.length > 0 && (
                            <div className="mt-3 text-sm text-gray-900 space-y-4">
                                {reportFiles.map((item, index) => (
                                    <div key={`${item.file.name}-${index}`} className="p-3 bg-gray-100 rounded-md border border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium truncate">{item.file.name}</span>
                                            <button type="button" onClick={() => handleRemoveFile(item.file.name)} className="ml-4 text-red-600 hover:text-red-800 font-semibold">
                                                Remove
                                            </button>
                                        </div>
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => handleDescriptionChange(item.file.name, e.target.value)}
                                            placeholder="Add a brief description (e.g., 'Blood Test Report, June 2024')"
                                            rows={2}
                                            className="mt-2 w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="text-center pt-4">
                        <button type="submit" disabled={loading} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-300 disabled:cursor-not-allowed w-full sm:w-auto">
                            {loading ? <Loader /> : 'Generate Wellness Plan'}
                        </button>
                    </div>
                </form>
            </Card>

            {error && (
                <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-center font-medium whitespace-pre-wrap">{error}</span>
                </div>
            )}
            
            {result && (
                <div className="mt-10 animate-fadeInUp">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Integrative Wellness Plan</h2>
                    <ResultSection title="Differential Diagnosis" items={result.differentialDiagnosis} icon={ICONS.HEART_PULSE} />
                    <ResultSection title="Allopathic Suggestions" items={result.allopathicTreatment} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>} />
                    <ResultSection title="Ayurvedic Treatment" items={result.ayurvedicTreatment} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-4-3-4-1.33 0-2.5 1-3 2.5" /><path d="M12 22a7 7 0 0 1-7-7c0-2 1-4 3-4 1.33 0 2.5 1 3 2.5" /><path d="M14 13.5a3 3 0 0 1-4 0" /><path d="M12 18V2" /><path d="m5 10 7-8 7 8" /></svg>} />
                    <ResultSection title="Diet Plan" items={result.dietPlan} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a4 4 0 1 0-8 0" /><path d="M12 16c-3.5 0-6 2.5-6 5h12c0-2.5-2.5-5-6-5z" /><path d="m18.5 12.5 2.5-2.5" /><path d="m21 10-5.5 5.5" /><path d="M2.5 12.5 9 19" /></svg>} />
                    <ResultSection title="Yoga Routine" items={result.yogaRoutine} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c0-3 2.5-5 5-5s5 2 5 5c0 3-2.5 5-5 5s-5-2-5-5z"/><path d="M12 12c0-3 2.5-5 5-5s5 2 5 5c0 3-2.5 5-5 5s-5-2-5-5z"/><path d="M7 7c0-3 2.5-5 5-5s5 2 5 5c0 3-2.5 5-5 5s-5-2-5-5z"/></svg>} />
                    <ResultSection title="Naturopathy Tips" items={result.naturopathyTips} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 2.5a2.5 2.5 0 0 1 0 5c-1 0-1.8-.4-2.5-1" /><path d="M6.5 2.5a2.5 2.5 0 0 0 0 5c1 0 1.8-.4 2.5-1" /><path d="M12 16.5V22" /><path d="m10 19 2-2.5 2 2.5" /><path d="M12 2v9.5" /><path d="M11.5 12.5C4.55 12.5 2 15.3 2 19h20c0-3.7-2.55-6.5-9.5-6.5Z" /></svg>} />
                    
                    {interpreting ? (
                        <div className="flex justify-center items-center p-8">
                            <div className="w-4 h-4 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-4 h-4 rounded-full bg-emerald-600 animate-bounce mx-2" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-4 h-4 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            <style>{`
                                @keyframes bounce {
                                  0%, 100% { transform: translateY(0); }
                                  50% { transform: translateY(-10px); }
                                }
                            `}</style>
                        </div>
                    ) : interpretation && (
                        <Card className="my-6 bg-emerald-50 border border-emerald-200">
                             <div className="p-6">
                                <h3 className="flex items-center text-xl font-bold text-emerald-700 mb-3 border-b pb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Understanding Your Plan
                                </h3>
                                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {interpretation}
                                </div>
                            </div>
                        </Card>
                    )}

                    <div className="mt-8 text-center">
                        <button
                            onClick={handleShareReport}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            Share Report
                        </button>
                        {shareConfirmation && (
                            <p className="mt-3 text-sm text-green-600 font-medium animate-fadeIn">
                                {shareConfirmation}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HealthAssistantPage;

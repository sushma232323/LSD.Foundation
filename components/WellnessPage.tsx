
import React from 'react';
import { WELLNESS_TIPS } from '../constants';
import { ICONS } from '../constants';

const WellnessPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto animate-fadeIn">
            <div className="text-center mb-12">
                <div className="inline-block p-4 bg-blue-100 text-blue-600 rounded-full mb-4">
                    {React.cloneElement(ICONS.BRAIN_CIRCUIT, { className: 'w-16 h-16' })}
                </div>
                <h1 className="text-4xl font-extrabold text-gray-800">Crime-Free World Initiative</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Cultivating peace from within. Explore our brain reset techniques and mental wellness tools designed to rewire thought patterns and foster a harmonious society.
                </p>
            </div>

            <div className="space-y-6">
                {WELLNESS_TIPS.map((tip, index) => (
                    <div key={tip.title} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500 flex items-start space-x-6 transition-all duration-300 hover:shadow-xl hover:border-emerald-600">
                        <div className="flex-shrink-0 bg-emerald-100 text-emerald-600 p-3 rounded-full">
                            {tip.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{tip.title}</h3>
                            <p className="mt-1 text-gray-600">{tip.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WellnessPage;


import React from 'react';
import { SKILL_COURSES } from '../constants';
import Card from './common/Card';

const SkillsPage: React.FC = () => {
    return (
        <div className="animate-fadeIn">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-800">Skill Development Courses</h1>
                <p className="mt-2 text-lg text-gray-600">Empowering individuals with free vocational training for a brighter future.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SKILL_COURSES.map((course) => (
                    <Card key={course.name} className="flex flex-col transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="p-6 flex-grow">
                             <div className="flex items-center mb-4">
                                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full mr-4">
                                    {course.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">{course.name}</h2>
                            </div>
                            <span className="inline-block bg-green-200 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-4">
                                Eligibility: {course.eligibility}
                            </span>
                            <p className="text-gray-600 flex-grow">{course.description}</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-b-lg mt-auto">
                            <button className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-300">
                                Enroll Now
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SkillsPage;

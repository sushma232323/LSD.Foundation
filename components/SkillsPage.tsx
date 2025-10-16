import React, { useState } from 'react';
import { SKILL_COURSES } from '../constants';
import Card from './common/Card';
import Modal from './common/Modal';
import type { SkillCourse } from '../types';

const SkillsPage: React.FC = () => {
    const [selectedCourse, setSelectedCourse] = useState<SkillCourse | null>(null);

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
                            <button
                                onClick={() => setSelectedCourse(course)}
                                className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-300">
                                Learn More
                            </button>
                        </div>
                    </Card>
                ))}
            </div>

            {selectedCourse && (
                <Modal
                    isOpen={!!selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                    title={selectedCourse.name}
                >
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Course Details</h3>
                            <p className="text-gray-600">{selectedCourse.detailedDescription}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Potential Career Paths</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                {selectedCourse.careerPaths.map(path => <li key={path}>{path}</li>)}
                            </ul>
                        </div>
                        <div className="pt-4 text-center">
                             <button className="w-full sm:w-auto bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-700 transition-colors duration-300">
                                Enroll Now
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default SkillsPage;
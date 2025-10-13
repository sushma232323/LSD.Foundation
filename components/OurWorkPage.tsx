import React from 'react';
import Card from './common/Card';

interface WorkItem {
    title: string;
    description: string;
    imageUrl: string;
    stats: { value: string; label: string }[];
}

const ourWorkData: WorkItem[] = [
    {
        title: 'Free Health & Awareness Camps',
        description: 'We regularly organize health camps in rural and underserved areas, providing free consultations, basic diagnostics, and medicines. Our focus is on preventive care and health education to empower communities to lead healthier lives.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
        stats: [
            { value: '50+', label: 'Camps Organized' },
            { value: '10,000+', label: 'People Served' },
            { value: '1,200+', label: 'Volunteers' },
        ],
    },
    {
        title: 'Vocational Skill Training Centers',
        description: 'Our skill development centers offer free training in various trades like organic farming, tailoring, and computer literacy. We aim to provide sustainable livelihood opportunities and foster economic independence, especially among women and youth.',
        imageUrl: 'https://images.unsplash.com/photo-1521737852577-684897f092a4?w=600&q=80',
        stats: [
            { value: '15', label: 'Training Centers' },
            { value: '3,000+', label: 'Youth Trained' },
            { value: '70%', label: 'Placement Rate' },
        ],
    },
    {
        title: 'Nationwide Tree Plantation Drives',
        description: 'Through our "Maa Ke Naam Ek Ped" mission, we encourage individuals to plant trees in honor of their mothers. This initiative has led to a massive grassroots movement, contributing significantly to reforestation and environmental awareness.',
        imageUrl: 'https://images.unsplash.com/photo-1625883654262-a51a8a255959?w=600&q=80',
        stats: [
            { value: '1 Million+', label: 'Trees Planted' },
            { value: '500+', label: 'Villages Covered' },
            { value: 'Active', label: 'Mission Status' },
        ],
    },
];

const OurWorkPage: React.FC = () => {
    return (
        <div className="animate-fadeIn">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-800">Our Impactful Work</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    We are committed to driving positive change through targeted, community-centric initiatives. Here's a glimpse of what we do and the impact we've made.
                </p>
            </div>

            <div className="space-y-12">
                {ourWorkData.map((item) => (
                    <Card key={item.title} className="overflow-hidden lg:flex">
                        <div className="lg:w-1/2">
                            <img className="h-64 w-full object-cover lg:h-full" src={item.imageUrl} alt={item.title} />
                        </div>
                        <div className="p-8 lg:w-1/2 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-emerald-700 mb-3">{item.title}</h2>
                                <p className="text-gray-600 mb-6">{item.description}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center mt-4">
                                {item.stats.map(stat => (
                                    <div key={stat.label}>
                                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                        <p className="text-sm text-gray-500">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default OurWorkPage;

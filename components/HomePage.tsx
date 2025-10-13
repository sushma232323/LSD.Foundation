import React from 'react';
import { Link } from 'react-router-dom';
import Card from './common/Card';
import { NAV_LINKS } from '../constants';

const HomePage: React.FC = () => {
    // Exclude Home link from feature cards
    const featureLinks = NAV_LINKS.filter(link => link.path !== '/');

    return (
        <div className="animate-fadeIn">
            <div className="text-center p-8 bg-emerald-600 text-white rounded-lg shadow-lg mb-12">
                <h1 className="text-5xl font-extrabold mb-2">Welcome to the LSD Foundation</h1>
                <p className="text-xl">Empowering Communities, Nurturing Nature, Fostering Wellness.</p>
            </div>

            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Initiatives</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We are dedicated to creating a self-reliant, healthy, and environmentally conscious society through a variety of programs. Explore our key areas of focus.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featureLinks.map((feature) => (
                    <Link to={feature.path} key={feature.name}>
                        <Card className="h-full flex flex-col items-center text-center p-6 transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full mb-4">
                                {React.cloneElement(feature.icon as React.ReactElement, { className: 'w-10 h-10' })}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.name}</h3>
                            <p className="text-gray-600">
                                {getFeatureDescription(feature.name)}
                            </p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const getFeatureDescription = (name: string): string => {
    switch (name) {
        case 'Health Assistant':
            return 'Get AI-powered integrative wellness plans based on your symptoms.';
        case 'Skill Development':
            return 'Access free vocational training courses to build a sustainable livelihood.';
        case 'Tree Mission':
            return 'Join our "Maa Ke Naam Ek Ped" mission to help reforest our planet.';
        case 'Mental Wellness':
            return 'Explore techniques for mental peace and contribute to a crime-free world.';
        case 'E-Book Library':
            return 'Browse our curated library of educational and inspirational e-books.';
        case 'Our Work':
            return 'Learn more about our projects, impact, and how you can get involved.';
        default:
            return 'Discover more about our initiatives.';
    }
};

export default HomePage;

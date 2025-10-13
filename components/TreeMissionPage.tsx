
import React, { useState, useRef } from 'react';
import Card from './common/Card';
import { ICONS } from '../constants';

const TreeMissionPage: React.FC = () => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [coins, setCoins] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                setCoins(5);
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000); // Confetti effect for 3 seconds
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="max-w-4xl mx-auto text-center animate-fadeIn">
            {showConfetti && <Confetti />}
            <div className="inline-block p-4 bg-green-100 text-green-600 rounded-full mb-4">
                {React.cloneElement(ICONS.TREE, { className: 'w-16 h-16' })}
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800">Maa Ke Naam Ek Ped Mission</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Join our movement to reforest our planet. Plant a tree in honor of a mother figure in your life,
                upload a photo, and earn LSD coins as a token of our gratitude.
            </p>

            <Card className="mt-12 p-8">
                {uploadedImage ? (
                    <div className="animate-fadeInUp">
                        <h2 className="text-2xl font-bold text-emerald-700">Thank You for Your Contribution!</h2>
                        <img src={uploadedImage} alt="Planted tree" className="mt-4 mx-auto rounded-lg shadow-lg max-h-80" />
                        <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg inline-block">
                            <p className="text-xl font-semibold">You've earned {coins} LSD Coins! ✨</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload a Photo of Your Planted Tree</h2>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <button
                            onClick={handleButtonClick}
                            className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                        >
                            Upload Photo & Earn Coins
                        </button>
                    </div>
                )}
            </Card>
        </div>
    );
};

// A simple component to render confetti effect
const Confetti: React.FC = () => {
    const particles = Array.from({ length: 150 });
    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
            {particles.map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${-10 + Math.random() * 20}%`,
                        width: `${Math.random() * 8 + 4}px`,
                        height: `${Math.random() * 8 + 4}px`,
                        backgroundColor: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800'][Math.floor(Math.random() * 15)],
                        animation: `fall ${Math.random() * 2 + 3}s linear ${Math.random() * 2}s infinite`
                    }}
                ></div>
            ))}
            <style>{`
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(${Math.random() * 720}deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default TreeMissionPage;

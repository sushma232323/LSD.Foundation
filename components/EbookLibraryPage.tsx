
import React, { useState, useMemo } from 'react';
import { EBOOKS } from '../constants';
import Card from './common/Card';
import type { EBook } from '../types';

type Category = EBook['category'] | 'All';

const EbookLibraryPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category>('All');

    const categories: Category[] = ['All', 'Health & Wellness', 'Inspirational Biographies', 'Skill Training Manuals', 'Environmental Awareness'];

    const filteredEbooks = useMemo(() => {
        if (selectedCategory === 'All') {
            return EBOOKS;
        }
        return EBOOKS.filter(book => book.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="animate-fadeIn">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-800">E-Book Library</h1>
                <p className="mt-2 text-lg text-gray-600">Curated educational and inspirational content at your fingertips.</p>
            </div>

            <div className="mb-8 flex flex-wrap justify-center gap-2">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                            selectedCategory === category
                                ? 'bg-emerald-600 text-white shadow'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredEbooks.map(book => (
                    <Card key={book.id} className="overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
                        <img src={book.coverUrl} alt={book.title} className="w-full h-auto object-cover aspect-[2/3]" />
                        <div className="p-4">
                            <h3 className="font-bold text-md text-gray-800 truncate" title={book.title}>{book.title}</h3>
                            <p className="text-sm text-gray-500">{book.author}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default EbookLibraryPage;

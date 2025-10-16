
import React, { useState, useMemo } from 'react';
import { EBOOKS } from '../constants';
import Card from './common/Card';
import Modal from './common/Modal';
import type { EBook } from '../types';

type Category = EBook['category'] | 'All';

const EbookLibraryPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category>('All');
    const [selectedBook, setSelectedBook] = useState<EBook | null>(null);

    const categories: Category[] = ['All', 'Health & Wellness', 'Spirituality & Philosophy', 'Medical Guides', 'Inspirational Biographies', 'Skill Training Manuals', 'Environmental Awareness'];

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
                     <button
                        key={book.id}
                        onClick={() => setSelectedBook(book)}
                        className="text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-xl"
                        aria-label={`View details for ${book.title}`}
                    >
                        <Card className="overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 h-full">
                            <img src={book.coverUrl} alt={book.title} className="w-full h-auto object-cover aspect-[2/3]" />
                            <div className="p-4">
                                <h3 className="font-bold text-md text-gray-800 truncate" title={book.title}>{book.title}</h3>
                                <p className="text-sm text-gray-500">{book.author}</p>
                            </div>
                        </Card>
                    </button>
                ))}
            </div>

            {selectedBook && (
                <Modal
                    isOpen={!!selectedBook}
                    onClose={() => setSelectedBook(null)}
                    title={selectedBook.title}
                >
                    <div className="sm:flex sm:space-x-6">
                        <div className="flex-shrink-0 mb-4 sm:mb-0">
                            <img src={selectedBook.coverUrl} alt={selectedBook.title} className="w-32 mx-auto sm:mx-0 rounded-md shadow-md"/>
                        </div>
                        <div className="space-y-3 text-left">
                             <div>
                                <h3 className="font-bold text-lg text-gray-800 -mt-1">{selectedBook.title}</h3>
                                <p className="text-sm text-gray-500 italic">by {selectedBook.author}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-md text-gray-700 mb-1">Synopsis</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{selectedBook.synopsis}</p>
                            </div>
                            <div className="flex space-x-8 text-sm text-gray-600 pt-1">
                                <div><span className="font-semibold text-gray-700">Published:</span> {selectedBook.publicationDate}</div>
                                <div><span className="font-semibold text-gray-700">Pages:</span> {selectedBook.pageCount}</div>
                            </div>
                             <div className="pt-4 text-center sm:text-right">
                                <button className="w-full sm:w-auto bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-700 transition-colors duration-300">
                                    Read Now
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default EbookLibraryPage;

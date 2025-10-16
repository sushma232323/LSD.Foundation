import React, { useState } from 'react';
import Card from './common/Card';
import Modal from './common/Modal';

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

const credentials = [
    {
      title: 'ISO 9001:2015 Certified',
      value: 'Quality Management System',
      description: 'Independently assessed for providing quality education, healthcare, and community support.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      details: {
          title: 'ISO 9001:2015 Certificate of Compliance',
          content: (
            <div className="space-y-4 text-sm text-left text-gray-700">
                <p>This is to Certify that the Management System of the <strong>LATE SUSHMA DEVI FOUNDATION</strong> has been independently assessed and confirmed to be in accordance with the requirements of the standard mentioned below.</p>
                <div>
                    <h4 className="font-semibold text-gray-800">Standard:</h4>
                    <p>ISO 9001:2015</p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">Scope of Certification:</h4>
                    <p className="italic">"PROVIDING EDUCATION TO UNDER PRIVILEGED STUDENTS. ORGANIZING SKILL DEVELOPMENT AND VOCATIONAL TRAINING PROGRAMS FOR YOUTH AND WOMEN. HEALTHCARE SUPPORT (CONDUCTING MEDICAL CAMPS IN UNDERSERVED AREAS, DISTRIBUTING MEDICINES, SANITARY PRODUCTS, AND NUTRITIONAL AID TO NEEDY FAMILIES. PROMOTING WOMEN EMPOWERMENT THROUGH SELF - HELP GROUPS AND COMMUNITY PROJECTS. THE FOUNDATION BELIEVES IN THE PHILOSOPHY OF "SERVICE TO HUMANITY" AIMING TO INSPIRE MORE INDIVIDUALS TO CONTRIBUTE TO THE WELFARE OF SOCIETY"</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div><strong className="block text-gray-800">Certificate Number:</strong> Q2A-2025-0208T70981</div>
                    <div><strong className="block text-gray-800">Initial Registration Date:</strong> 08-FEB-2025</div>
                    <div><strong className="block text-gray-800">Certificate Issue Date:</strong> 08-FEB-2025</div>
                    <div><strong className="block text-gray-800">Valid Until:</strong> 07-FEB-2028</div>
                </div>
                <div className="pt-2">
                    <h4 className="font-semibold text-gray-800">Surveillance Dates:</h4>
                    <ul className="list-disc list-inside">
                        <li>1st Surveillance on or before: FEB-2026</li>
                        <li>2nd Surveillance on or before: FEB-2027</li>
                    </ul>
                </div>
            </div>
          )
      }
    },
    {
      title: 'Company Registration',
      value: 'Sec 8 Reg. No.: 164172',
      description: 'Registered as a non-profit organization under the Companies Act, 2013.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 001.414 0l2.414-2.414a1 1 0 01.707-.293H17v5m-5 0h-2" /></svg>,
    },
    {
      title: 'Corporate ID (CIN)',
      value: 'U88900UP2025NPL216280',
      description: 'Unique identification number from the Ministry of Corporate Affairs.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-4 0h4" /></svg>,
    },
    {
      title: 'Udyam Registration',
      value: 'UDYAM-UP-14-0037607',
      description: 'Registered as a Micro Enterprise with the Ministry of MSME, Govt. of India.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" /><path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>,
      details: {
        title: 'UDYAM Registration Certificate',
        content: (
            <div className="space-y-4 text-sm text-left text-gray-700">
                <div className='text-center'>
                    <p className="font-bold text-lg text-gray-800">GOVERNMENT OF INDIA</p>
                    <p className="font-semibold text-gray-800">Ministry of Micro, Small and Medium Enterprises</p>
                </div>
                <hr />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    <div><strong className="block text-gray-800">Udyam Registration No:</strong></div>
                    <div>UDYAM-UP-14-0037607</div>
                    
                    <div><strong className="block text-gray-800">Name of Enterprise:</strong></div>
                    <div>LATE SUSHMA DEVI FOUNDATION</div>

                    <div><strong className="block text-gray-800">Type of Enterprise:</strong></div>
                    <div>Micro</div>

                    <div><strong className="block text-gray-800">Major Activity:</strong></div>
                    <div>SERVICES</div>
                    
                    <div><strong className="block text-gray-800">Official Address:</strong></div>
                    <div>Ram Janki Nagar, Awas Vikas Colony, Nawabganj, BARABANKI, Uttar Pradesh - 225001</div>

                    <div><strong className="block text-gray-800">Date of Incorporation:</strong></div>
                    <div>06/02/2025</div>

                    <div><strong className="block text-gray-800">Date of Commencement:</strong></div>
                    <div>07/03/2025</div>

                    <div><strong className="block text-gray-800">Date of Udyam Registration:</strong></div>
                    <div>07/03/2025</div>
                </div>
                <div className="pt-2">
                    <h4 className="font-semibold text-gray-800">National Industry Classification (NIC) Codes:</h4>
                    <ul className="list-disc list-inside">
                        <li><strong>85 - Education:</strong> Educational support services (85500)</li>
                        <li><strong>88 - Social work activities:</strong> Other social work activities without accommodation n.e.c. (88900)</li>
                    </ul>
                </div>
            </div>
        )
      }
    },
    {
      title: 'Darpan ID',
      value: 'UP/2025/0520465',
      description: 'Registered with NITI Aayog, maintaining a database of NGOs in India.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    },
];

const teamMembers = [
    {
      name: 'Dr Divyanshu Patel',
      role: 'Director / Chairman',
      imageUrl: 'https://placehold.co/200x200/e0f2f1/333333?text=DP',
    },
    {
      name: 'Dr Maya Patel',
      role: 'Director / Treasurer',
      imageUrl: 'https://placehold.co/200x200/e0f2f1/333333?text=MP',
    },
    {
      name: 'Dr Abhishek Pandey',
      role: 'Secretary',
      imageUrl: 'https://placehold.co/200x200/e0f2f1/333333?text=AP',
    },
];


const OurWorkPage: React.FC = () => {
    const [documentDetails, setDocumentDetails] = useState<{ title: string; content: React.ReactNode } | null>(null);

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

            <div className="mt-16 pt-8 border-t">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-800">Our Credentials & Recognition</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        We operate with transparency and are proud to be recognized by relevant authorities.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {credentials.map(cred => (
                        <Card key={cred.title} className="flex">
                            <div className="p-6 flex flex-col h-full w-full">
                                <div className="flex items-center mb-4">
                                    {cred.icon}
                                    <h3 className="ml-4 text-lg font-bold text-emerald-700">{cred.title}</h3>
                                </div>
                                <p className="text-2xl font-semibold text-gray-800 my-2">{cred.value}</p>
                                <p className="text-sm text-gray-600 flex-grow">{cred.description}</p>
                                {cred.details && (
                                    <div className="mt-auto pt-4 text-center">
                                        <button 
                                            onClick={() => setDocumentDetails({ title: cred.details.title, content: cred.details.content })}
                                            className="w-full font-semibold text-emerald-600 hover:text-emerald-800 transition-colors py-2 rounded-md hover:bg-emerald-50"
                                        >
                                            View Certificate
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="mt-16 pt-8 border-t">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-800">Meet Our Team</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        The driving force behind our foundation's mission and initiatives.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map(member => (
                        <Card key={member.name} className="text-center p-6 transform hover:-translate-y-1 transition-transform">
                            <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 ring-4 ring-emerald-200" />
                            <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                            <p className="text-md text-emerald-600 font-semibold">{member.role}</p>
                        </Card>
                    ))}
                </div>
            </div>

            <Card className="mt-16 p-8 text-center bg-emerald-50 border-emerald-200 border">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact & Legal Information</h3>
                <p className="text-gray-700 font-semibold text-lg">
                    LATE SUSHMA DEVI FOUNDATION
                </p>
                <p className="text-gray-600 mt-2">
                    <strong>Address:</strong> Ram Janki Nagar, Awas Vikas Colony, Nawabganj, Barabanki-Uttar Pradesh
                </p>
                <p className="text-gray-600 mt-2">
                    <strong>Mobile:</strong> 9695570344
                </p>
            </Card>

            {documentDetails && (
                <Modal
                    isOpen={!!documentDetails}
                    onClose={() => setDocumentDetails(null)}
                    title={documentDetails.title}
                >
                    {documentDetails.content}
                </Modal>
            )}

        </div>
    );
};

export default OurWorkPage;
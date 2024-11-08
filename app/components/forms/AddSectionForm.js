"use client"

import { useState, useEffect } from 'react';
import { ref, set, push, onValue } from 'firebase/database';
import { db } from '@/app/config/firebase';

export default function AddSectionForm() {
    const [newSection, setNewSection] = useState('');
    const [newSecNameBn, setNewSecNameBn] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [pullData, setPullData] =useState(null);

    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    useEffect(() => {
        const secRef = ref(db, "detailSelection/sections");
        onValue(secRef, (snapshot) => {
          const data = snapshot.val();
          setPullData(data);
        });
      }, []);

    const handleAddSection = async (e) => {

        if (newSection != "") {
            try {
                const tempSecArr = [...pullData];
                tempSecArr.push({
                    id: `sec${Date.now()}`,
                    name: newSection,
                    namebn: newSecNameBn
                });
                
                await set(ref(db, `detailSelection/sections`), tempSecArr);
                alert('Section created successfully!');

            } catch (error) {
                console.error("Error adding section:", error);
            }
            setNewSection('');
            closePopup();
        } else {
            alert("Enter Section Name. It is mandatory");
        }
    };

    if (!pullData) {
        return <div>Loading...</div>;
      }

    return (
        <main>



            <button
                onClick={openPopup}
                className="w-full bg-blue-600 text-sm text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
                Add New Section
            </button>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full">

                        {/* Popup Header */}

                        <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Create New Section
                            </h3>
                            <button onClick={closePopup} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* Section Form */}
                        <div className="p-4">
                            <label htmlFor="sectionInput" className="block text-sm font-medium text-gray-900">Section Name English</label>
                            <input
                                type="text"
                                id='sectionInput'
                                placeholder="Section Name English"
                                value={newSection}
                                onChange={(e) => setNewSection(e.target.value)}
                                className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            <label htmlFor="sectionInputBn" className="block text-sm font-medium text-gray-900">Section Name Bangla</label>
                            <input
                                type="text"
                                id='sectionInputBn'
                                placeholder="Section Name Bangla"
                                value={newSecNameBn}
                                onChange={(e) => setNewSecNameBn(e.target.value)}
                                className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            <div className='w-full text-center'>
                            <button onClick={handleAddSection} className="bg-blue-600 text-sm text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Create Section
                            </button>
                            </div>
                        </div>


                    </div>
                </div>
            )}

        </main>
    );
}

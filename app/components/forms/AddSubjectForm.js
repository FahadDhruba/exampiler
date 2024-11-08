"use client"

import { useState, useEffect } from 'react';
import { ref, set, push, onValue } from 'firebase/database';
import { db } from '@/app/config/firebase';

export default function AddSubjectForm() {
    const [newSubName, setNewSubName] = useState('');
    const [newSubNameBn, setNewSubNameBn] = useState('');
    const [selSec, setSelSec] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [detData, setDetData] = useState(null);

    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    useEffect(() => {
        const secRef = ref(db, "detailSelection");
        onValue(secRef, (snapshot) => {
            const data = snapshot.val();
            setDetData(data);
        });
    }, []);

    const handleAddSubject = async (e) => {

        if (selSec != "" && newSubName != "" && newSubNameBn != "") {

            try {
                const tempSubArr = [...detData.subject];
                tempSubArr.push({
                    id: `sub${Date.now().toString()}`,
                    psecid: selSec,
                    name: newSubName,
                    namebn: newSubNameBn
                })

                await set(ref(db, `detailSelection/subject`), tempSubArr);
                alert('Subject created successfully!');
            } catch (error) {

                alert("Error adding section:", error);

            }
            setNewSubName("");
            setNewSubNameBn("");
            setSelSec("");

            closePopup();

        } else {
            alert("Non A feild can be empty");
        }
    };

    if (!detData) {
        return <div>Loading...</div>;
    }

    return (
        <main>



            <button
                onClick={openPopup}
                className="w-full bg-blue-600 text-sm text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
                Add New Subject
            </button>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full">

                        {/* Popup Header */}

                        <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Create New Subject
                            </h3>
                            <button onClick={closePopup} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* Subject Form */}
                        <div className="p-4">
                            <div>
                                <label htmlFor="sectionSelector" className="block mb-2 text-sm font-medium text-gray-900">Section</label>
                                <select
                                    id="sectionSelector"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={selSec}
                                    onChange={(e) => setSelSec(e.target.value)}
                                >
                                    <option value="">Select a Section</option>
                                    {detData.sections.map((sec) => (
                                        <option key={sec.id} value={sec.id}>{sec.name}</option>
                                    ))}
                                </select>
                            </div>
                            <label htmlFor="subNameInput" className="block text-sm font-medium text-gray-900">Subject Name English</label>
                            <input
                                type="text"
                                id='subNameInput'
                                placeholder="Subject Name English"
                                value={newSubName}
                                onChange={(e) => setNewSubName(e.target.value)}
                                className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            <label htmlFor="subNameInputBn" className="block text-sm font-medium text-gray-900">Subject Name Bangla</label>
                            <input
                                type="text"
                                id='subNameInputBn'
                                placeholder="Subject Name Bangla"
                                value={newSubNameBn}
                                onChange={(e) => setNewSubNameBn(e.target.value)}
                                className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            <div className='w-full text-center'>
                            <button onClick={handleAddSubject} className="bg-blue-600 text-sm text-white px-4 py-2 rounded-md hover:bg-blue-700">
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

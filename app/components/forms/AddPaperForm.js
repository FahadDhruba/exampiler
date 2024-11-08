"use client";

import { useState, useEffect } from 'react';
import { ref, set, push, onValue } from 'firebase/database';
import { db } from '@/app/config/firebase';

export default function AddPaperForm() {
    const [newPaperName, setNewPaperName] = useState('');
    const [newPaperNameBn, setNewPaperNameBn] = useState('');
    const [selSubject, setSelSubject] = useState("");
    const [selSection, setSelSection] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [detData, setDetData] = useState(null);

    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    useEffect(() => {
        const subjectRef = ref(db, "detailSelection");
        onValue(subjectRef, (snapshot) => {
            const data = snapshot.val();
            setDetData(data);
        });
    }, []);

    const filteredSubjects = detData?.subject?.filter((sub) => sub.psecid === selSection) || [];

    const handleAddPaper = async (e) => {
        if (selSubject !== "" && newPaperName !== "" && newPaperNameBn !== "") {
            try {
                const tempPaperArr = [...detData.paper || []];
                tempPaperArr.push({
                    id: `paper${Date.now().toString()}`,
                    psubid: selSubject,
                    name: newPaperName,
                    namebn: newPaperNameBn
                });

                await set(ref(db, `detailSelection/paper`), tempPaperArr);
                alert('Paper created successfully!');
            } catch (error) {
                alert("Error adding paper:", error);
            }

            setNewPaperName("");
            setNewPaperNameBn("");
            setSelSubject("");
            closePopup();
        } else {
            alert("No field can be empty.");
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
                Add New Paper
            </button>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full">

                        {/* Popup Header */}
                        <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Create New Paper
                            </h3>
                            <button onClick={closePopup} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* Paper Form */}
                        <div className="p-4">
                            <div>
                                <label htmlFor="sectionSelector" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
                                <select
                                    id="sectionSelector"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={selSection}
                                    onChange={(e) => setSelSection(e.target.value)}
                                >
                                    <option value="">Select a Section</option>
                                    {detData.sections && detData.sections.map((section) => (
                                        <option key={section.id} value={section.id}>{section.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="subjectSelector" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                                <select
                                    id="subjectSelector"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={selSubject}
                                    onChange={(e) => setSelSubject(e.target.value)}
                                    disabled={!selSection}
                                >
                                    <option value="">Select a Subject</option>
                                    {filteredSubjects.map((subj) => (
                                        <option key={subj.id} value={subj.id}>{subj.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="paperNameInput" className="block text-sm font-medium text-gray-900 dark:text-white">Paper Name English</label>
                                <input
                                    type="text"
                                    id="paperNameInput"
                                    placeholder="Paper Name English"
                                    value={newPaperName}
                                    onChange={(e) => setNewPaperName(e.target.value)}
                                    className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="paperNameInputBn" className="block text-sm font-medium text-gray-900 dark:text-white">Paper Name Bangla</label>
                                <input
                                    type="text"
                                    id="paperNameInputBn"
                                    placeholder="Paper Name Bangla"
                                    value={newPaperNameBn}
                                    onChange={(e) => setNewPaperNameBn(e.target.value)}
                                    className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <button onClick={handleAddPaper} className="bg-blue-600 text-sm text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Create Paper
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

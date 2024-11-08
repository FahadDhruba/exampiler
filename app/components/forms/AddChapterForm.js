"use client";

import { useState, useEffect } from 'react';
import { ref, set, push, onValue } from 'firebase/database';
import { db } from '@/app/config/firebase';

export default function AddChapterForm() {
    const [newChapterName, setNewChapterName] = useState('');
    const [newChapterNameBn, setNewChapterNameBn] = useState('');
    const [selPaper, setSelPaper] = useState("");
    const [selSection, setSelSection] = useState("");
    const [selSubject, setSelSubject] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [detData, setDetData] = useState(null);

    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    useEffect(() => {
        const paperRef = ref(db, "detailSelection");
        onValue(paperRef, (snapshot) => {
            const data = snapshot.val();
            setDetData(data);
        });
    }, []);

    const filteredSubjects = detData?.subject?.filter((sub) => sub.psecid === selSection) || [];
    const filteredPapers = detData?.paper?.filter((pap) => pap.psubid === selSubject) || [];


    const handleAddChapter = async (e) => {
        if (selPaper !== "" && newChapterName !== "" && newChapterNameBn !== "") {
            try {
                const tempChapterArr = [...detData.chapter || []];
                tempChapterArr.push({
                    id: `chapter${Date.now().toString()}`,
                    ppapid: selPaper,
                    name: newChapterName,
                    namebn: newChapterNameBn
                });

                await set(ref(db, `detailSelection/chapter`), tempChapterArr);
                alert('Chapter created successfully!');
            } catch (error) {
                alert("Error adding chapter:", error);
            }

            setNewChapterName("");
            setNewChapterNameBn("");
            setSelPaper("");
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
                Add New Chapter
            </button>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full">

                        {/* Popup Header */}
                        <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Create New Chapter
                            </h3>
                            <button onClick={closePopup} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* Chapter Form */}
                        <div className="p-4">
                            <div>
                                <label htmlFor="sectionSelector" className="block mb-2 text-sm font-medium text-gray-900">Section</label>
                                <select
                                    id="sectionSelector"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                <label htmlFor="subjectSelector" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                                <select
                                    id="subjectSelector"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                <label htmlFor="paperSelector" className="block mb-2 text-sm font-medium text-gray-900">Paper</label>
                                <select
                                    id="paperSelector"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={selPaper}
                                    onChange={(e) => setSelPaper(e.target.value)} 
                                    disabled={!selSubject}
                                >
                                    <option value="">Select a Paper</option>
                                    {filteredPapers.map((ppr) => (
                                        <option key={ppr.id} value={ppr.id}>{ppr.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="chapterNameInput" className="block text-sm font-medium text-gray-900">Chapter Name English</label>
                                <input
                                    type="text"
                                    id="chapterNameInput"
                                    placeholder="Chapter Name English"
                                    value={newChapterName}
                                    onChange={(e) => setNewChapterName(e.target.value)}
                                    className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                            </div>
                            <div>
                                <label htmlFor="chapterNameInputBn" className="block text-sm font-medium text-gray-900">Chapter Name Bangla</label>
                                <input
                                    type="text"
                                    id="chapterNameInputBn"
                                    placeholder="Chapter Name Bangla"
                                    value={newChapterNameBn}
                                    onChange={(e) => setNewChapterNameBn(e.target.value)}
                                    className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                            </div>
                            <div className='w-full text-center'>
                            <button onClick={handleAddChapter} className="bg-blue-600 text-sm text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Create Chapter
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

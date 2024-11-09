import AddChapterForm from '@/app/components/forms/AddChapterForm';
import AddPaperForm from '@/app/components/forms/AddPaperForm';
import AddSectionForm from '@/app/components/forms/AddSectionForm';
import AddSubjectForm from '@/app/components/forms/AddSubjectForm';
import TreePage from '@/app/components/Treepage';

export const metadata = {
    title: "Details Admin",
    description: "Details Admin Page. Next Gen Solution to Exam Question Creation.",
  };

export default function DetPrompter() {
    
    return (
        <main>
            <div className="text-xs mb-2 text-gray-500 font-semibold">Dashboard / Details Admin</div>

            <div className="bg-slate-50 p-2">
                {/* Title part */}
                <div className="">
                    <h2 className="text-lg font-bold p-1 dark:text-gray-50">Details Admin</h2>
                    <hr />

                    <div className='bg-white p-2 m-2 rounded-md'>
                        <TreePage />
                    </div>

                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                        <AddSectionForm />
                        <AddSubjectForm />
                        <AddPaperForm />
                        <AddChapterForm />
                    </div>

                    {/* Subject Form */}
                    {/* <div className="mb-6">
                        <div className='grid grid-cols-2 gap-2'>
                            <div>
                                <label htmlFor='psectionSelection' className="block text-sm font-medium text-gray-900 dark:text-white">Add Subject</label>
                                <select
                                    value={newSubject.sectionId}
                                    id='psectionSelection'
                                    onChange={(e) => setNewSubject({ ...newSubject, sectionId: e.target.value })}
                                    className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="">Select Section</option>
                                    {sections.map((section) => (
                                        <option key={section.id} value={section.id}>{section.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor='subjectInput' className="block text-sm font-medium text-gray-900 dark:text-white">Subject Name</label>

                                <input
                                    type="text"
                                    id='subjectInput'
                                    placeholder="Subject Name"
                                    value={newSubject.name}
                                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                                    className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <button onClick={handleAddSubject} className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Add Subject
                        </button>
                    </div> */}

                    {/* Paper Form */}
                    {/* <div className="mb-6">
                        <h3 className="text-md font-semibold mb-2 text-gray-600">Add Paper</h3>
                        <select
                            value={newPaper.subjectId}
                            onChange={(e) => setNewPaper({ ...newPaper, subjectId: e.target.value })}
                            className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Select Subject</option>
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Paper Name"
                            value={newPaper.name}
                            onChange={(e) => setNewPaper({ ...newPaper, name: e.target.value })}
                            className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <button onClick={handleAddPaper} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Add Paper
                        </button>
                    </div> */}

                    {/* Chapter Form */}
                    {/* <div className="mb-6">
                        <h3 className="text-md font-semibold mb-2 text-gray-600">Add Chapter</h3>
                        <select
                            value={newChapter.paperId}
                            onChange={(e) => setNewChapter({ ...newChapter, paperId: e.target.value })}
                            className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2 mb-2"
                        >
                            <option value="">Select Paper</option>
                            {papers.map((paper) => (
                                <option key={paper.id} value={paper.id}>{paper.name}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Chapter Name"
                            value={newChapter.name}
                            onChange={(e) => setNewChapter({ ...newChapter, name: e.target.value })}
                            className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2 mb-2"
                        />
                        <button onClick={handleAddChapter} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Add Chapter
                        </button>
                    </div> */}

                    {/* Display Data */}
                    {/* <div>
                        <h3 className="text-md font-semibold mb-2 text-gray-600">Data</h3>
                        <pre className="bg-gray-100 p-4 rounded-md text-sm">{JSON.stringify({ sections, subjects, papers, chapters }, null, 2)}</pre>
                    </div> */}

                </div>
            </div>

        </main>
    );
}

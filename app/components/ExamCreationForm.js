"use client";

import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { ref, set, onValue } from "firebase/database";

const ExamCreationForm = () => {
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const [paper, setPaper] = useState('');
  const [chapter, setChapter] = useState('');
  const [mcqQuestions, setMcqQuestions] = useState('');
  const [cqQuestions, setCqQuestions] = useState('');
  const [mcqPqn, setMcqPqn] = useState('');
  const [cqPqn, setCqPqn] = useState('');
  const [mcqPqt, setMcqPqt] = useState('');
  const [cqPqt, setCqPqt] = useState('');
  const [examTitle, setExamTitle] = useState('');

  const [selectionData, setSelectionData] = useState(null);

  useEffect(() => {
    const dbRef = ref(db, "detailSelection");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setSelectionData(data);
    });
  }, []);

  // Filter data based on selected section, subject, and paper
  const filteredSubjects = selectionData?.subject?.filter((sub) => sub.psecid === section) || [];
  const filteredPapers = selectionData?.paper?.filter((pap) => pap.psubid === subject) || [];
  const filteredChapters = selectionData?.chapter?.filter((chap) => chap.ppapid === paper) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to be stored in Firebase
    const examData = {
      title: examTitle,
      section,
      subject,
      paper,
      chapter,
      mcqQuestions: Number(mcqQuestions),
      cqQuestions: Number(cqQuestions),
      mcqPqn: Number(mcqPqn),
      cqPqn: Number(cqPqn),
      mcqPqt: Number(mcqPqt),
      cqPqt: Number(cqPqt),
    };

    try {
      await set(ref(db, `exams/${Date.now()}`), examData);
      setSection('');
      setSubject('');
      setPaper('');
      setChapter('');
      setMcqQuestions('');
      setCqQuestions('');
      setMcqPqn('');
      setCqPqn('');
      setMcqPqt('');
      setCqPqt('');
      setExamTitle('');
      alert('Exam created successfully!');
    } catch (error) {
      console.error("Error creating exam:", error);
      alert('Failed to create exam.');
    }
  };

  if (!selectionData) {
    return <div>Loading...</div>;
  }


  return (
    <form className="space-y-2 m-2" onSubmit={handleSubmit}>
      {/* Exam Title */}
      <div className="">
        <label htmlFor="examNameInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title of Exam</label>
        <input
          type="text"
          id="examNameInput"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Title here" 
          value={examTitle} 
          onChange={(e) => setExamTitle(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Section Selection */}
        <div>
          <label htmlFor="sectionInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
          <select
            id="sectionInput"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            <option value="">Select a Section</option>
            {selectionData.sections.map((sec) => (
              <option key={sec.id} value={sec.id}>{sec.name}</option>
            ))}
          </select>
        </div>

        {/* Subject Selection */}
        <div>
          <label htmlFor="subjectInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
          <select
            id="subjectInput"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={!section}
          >
            <option value="">Select a Subject</option>
            {filteredSubjects.map((subj) => (
              <option key={subj.id} value={subj.id}>{subj.name}</option>
            ))}
          </select>
        </div>

        {/* Paper Selection */}
        <div>
          <label htmlFor="paperInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paper</label>
          <select
            id="paperInput"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={paper}
            onChange={(e) => setPaper(e.target.value)}
            disabled={!subject}
          >
            <option value="">Select a Paper</option>
            {filteredPapers.map((ppr) => (
              <option key={ppr.id} value={ppr.id}>{ppr.name}</option>
            ))}
          </select>
        </div>

        {/* Chapter Selection */}
        <div>
          <label htmlFor="chapterInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chapter</label>
          <select
            id="chapterInput"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            disabled={!paper}
          >
            <option value="">Select a Chapter</option>
            {filteredChapters.map((chap) => (
              <option key={chap.id} value={chap.id}>{chap.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Total Questions */}
        
        <div className="grid grid-cols-2 gap-2">
        <div className='col-span-2 text-sm font-bold'>
          Total Question
          <hr/>
        </div>
          <div className="">
            <label htmlFor="mcqQuestions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MCQ Questions</label>
            <input
              type="number"
              id="mcqQuestions"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={mcqQuestions}
              onChange={(e) => setMcqQuestions(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="cqQuestions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CQ Questions</label>
            <input
              type="number"
              id="cqQuestions"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={cqQuestions}
              onChange={(e) => setCqQuestions(e.target.value)}
            />
          </div>
        </div>

        {/* Per Question Number */}
        <div className="grid grid-cols-2 gap-2">
        <div className='col-span-2 text-sm font-bold'>
          Per Question Number
          <hr/>
        </div>
          <div className="">
            <label htmlFor="mcqPqn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MCQ PQN</label>
            <input
              type="number"
              id="mcqPqn"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={mcqPqn}
              onChange={(e) => setMcqPqn(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="cqPqn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CQ PQN</label>
            <input
              type="number"
              id="cqPqn"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={cqPqn}
              onChange={(e) => setCqPqn(e.target.value)}
            />
          </div>
        </div>

        {/* Per Question Time */}
        <div className="grid grid-cols-2 gap-2">
        <div className='col-span-2 text-sm font-bold'>
          Per Question Time
          <hr/>
        </div>
          <div className="">
            <label htmlFor="mcqPqt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MCQ PQT (minutes)</label>
            <input
              type="number"
              id="mcqPqt"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={mcqPqt}
              onChange={(e) => setMcqPqt(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="cqPqt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CQ PQT (minutes)</label>
            <input
              type="number"
              id="cqPqt"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={cqPqt}
              onChange={(e) => setCqPqt(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1"></div>
        <div className="grid grid-cols-1">
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
        </div>
      </div>
    </form>
  );
};

export default ExamCreationForm;

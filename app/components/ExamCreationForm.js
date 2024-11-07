"use client"
import { useState } from 'react';

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

  // Mock data for dynamic selection options
  const sections = ['Science', 'Arts', 'Commerce'];
  const subjects = {
    Science: ['Physics', 'Higher Math', 'Biology', 'Chemistry'],
    Arts: ['History', 'Geography', 'Economics'],
    Commerce: ['Accounting', 'Business Studies', 'Management'],
  };
  const papers = {
    Physics: ['Paper 1', 'Paper 2'],
    Biology: ['Paper 1', 'Paper 2'],
  };
  const chapters = {
    'Paper 1': ['Chapter 1', 'Chapter 2'],
    'Paper 2': ['Chapter 3', 'Chapter 4'],
  };

  return (
    <form className="space-y-4">
      {/* Exam Title */}
      <div className="">
        <label htmlFor="examNameInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title of Exam</label>
        <input
          type="text"
          id="examNameInput"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Title here"
          required
        />
      </div>

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
          {sections.map((sec) => (
            <option key={sec} value={sec}>{sec}</option>
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
          {section && subjects[section].map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
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
          {subject && papers[subject]?.map((ppr) => (
            <option key={ppr} value={ppr}>{ppr}</option>
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
          {paper && chapters[paper]?.map((chap) => (
            <option key={chap} value={chap}>{chap}</option>
          ))}
        </select>
      </div>

      {/* Total Questions */}
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="mcqQuestions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MCQ Questions</label>
          <input
            type="number"
            id="mcqQuestions"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={mcqQuestions}
            onChange={(e) => setMcqQuestions(e.target.value)}
          />
        </div>
        <div className="w-1/2">
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
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="mcqPqn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MCQ PQN</label>
          <input
            type="number"
            id="mcqPqn"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={mcqPqn}
            onChange={(e) => setMcqPqn(e.target.value)}
          />
        </div>
        <div className="w-1/2">
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
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="mcqPqt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MCQ PQT (minutes)</label>
          <input
            type="number"
            id="mcqPqt"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={mcqPqt}
            onChange={(e) => setMcqPqt(e.target.value)}
          />
        </div>
        <div className="w-1/2">
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
    </form>
  );
};

export default ExamCreationForm;

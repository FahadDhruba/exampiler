import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/firebase';

const data = {
  sections: [
    { id: "101", name: "Loading" }
  ],
  subject: [
    
  ],
  paper: [
    
  ],
  chapter: [
    
  ]
};

// Function to structure data as a nested tree
const buildTree = (data) => {
  const sections = data.sections.map(section => ({
    ...section,
    subjects: data.subject
      .filter(subject => subject.psecid === section.id)
      .map(subject => ({
        ...subject,
        papers: data.paper
          .filter(paper => paper.psubid === subject.id)
          .map(paper => ({
            ...paper,
            chapters: data.chapter.filter(chapter => chapter.ppapid === paper.id)
          }))
      }))
  }));
  return sections;
};

const TreePage = () => {
  const [expanded, setExpanded] = useState({});
  const [selectionData, setSelectionData] = useState(null);

  useEffect(() => {
    const dbRef = ref(db, "detailSelection");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setSelectionData(data);
      console.log(data);
    });
  }, []);

  const treeData = selectionData ? buildTree(selectionData) : buildTree(data);

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTree = (node, level = 0) => (
    <div
      key={node.id}
      className={`ml-4 sm:ml-8 py-1 px-2 text-sm font-semibold ${level === 3 ? 'border-2 border-white border-l-indigo-500 rounded-md bg-cyan-100' : ''} ${level === 2 ? 'border-2 border-white border-l-pink-500 rounded-md' : ''} ${level === 1 ? 'border-2 border-white border-l-green-500 rounded-md' : ''} ${level === 0 ? 'border-2 border-white border-l-red-500 rounded-md' : ''}`}
    >
      <div onClick={() => toggleExpand(node.id)} style={{ cursor: 'pointer' }}>
        {node.name}
      </div>
      {expanded[node.id] && node.subjects && node.subjects.map(subject => renderTree(subject, level + 1))}
      {expanded[node.id] && node.papers && node.papers.map(paper => renderTree(paper, level + 1))}
      {expanded[node.id] && node.chapters && node.chapters.map(chapter => renderTree(chapter, level + 1))}
    </div>
  );

  return (
    <div>
      <div className="border border-white border-b-gray-300 mb-2 font-bold text-md">Chapter Tree View</div>
      {treeData.map(section => renderTree(section))}
    </div>
  );
};

export default TreePage;

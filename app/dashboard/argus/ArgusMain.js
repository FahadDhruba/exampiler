"use client"

import { db } from "@/app/config/firebase";
import { set, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

const ArgusMain = () => {
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    const dbRef = ref(db, "exams");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setExamData(Object.values(data));
      // console.log(Object.values(data));
    });
  }, []);

  if (!examData) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <main>
      hokl
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="m-2 p-2 bg-white rounded-md shadow-md">
          <div className="my-2 text-sm font-bold">Exam Name</div>
          <div className="my-2 text-xs font-bold text-gray-600 flex items-center space-x-1">
            <div>Section</div>
            <span>&gt;</span> {/* Arrow symbol for the separator */}
            <div>Subject</div>
            <span>&gt;</span>
            <div>Paper</div>
            <span>&gt;</span>
            <div>Chapter</div>
          </div>
          {/* <div>Table like design</div> */}
          <table class="min-w-full text-xs font-semibold border-2 border-dashed rounded border-gray-300">
            <tbody>
              <tr>
                <td class="border-2 border-dashed border-gray-300 px-4 py-2">Row 1, Column 1</td>
                <td class="border-2 border-dashed border-gray-300 px-4 py-2">Row 1, Column 2</td>
              </tr>
              <tr>
                <td class="border-2 border-dashed border-gray-300 px-4 py-2">Row 2, Column 1</td>
                <td class="border-2 border-dashed border-gray-300 px-4 py-2">Row 2, Column 2</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </main>
  );
};

export default ArgusMain;

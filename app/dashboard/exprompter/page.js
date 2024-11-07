import ExamCreationForm from "@/app/components/ExamCreationForm";

export const metadata = {
    title: "Exam Prompter",
    description: "Exam Prompter Page. Next Gen Solution to Exam Question Creation.",
  };

export default function Exprompter() {
  return (
    <main>
      <div className="text-xs mb-2 text-gray-500 font-semibold">Dashboard / Exam Prompter</div>
      
      <div className="bg-slate-50 p-2">
        {/* Title part */}
        <div className="">
                  <h2 className="text-lg font-bold p-1 dark:text-gray-50">Exam Prompter</h2>
                  <hr/>

                  <div>
                    <ExamCreationForm/>
                  </div>
                  
               </div>
      </div>

    </main>
  );
}

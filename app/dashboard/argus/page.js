import ArgusMain from "./ArgusMain";

export const metadata = {
    title: "Argus - Exam Viewer",
    description: "Argus Exam Page. Next Gen Solution to Exam Question Creation.",
  };

export default function Argus() {
  return (
    <main>
      <div className="text-xs mb-2 text-gray-500 font-semibold">Dashboard / Argus Exam</div>
      
      <div className="bg-slate-50 p-2">
        {/* Title part */}
        <div className="">
                  <h2 className="text-lg font-bold p-1">Argus Exam</h2>
                  <hr/>

                  <div>
                    <ArgusMain />
                  </div>
                  
               </div>
      </div>

    </main>
  );
}
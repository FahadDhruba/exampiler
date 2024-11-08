import "../globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {/* Rendering Navbar */}
                <Navbar />

                {/* Main Layout */}
                
                <main className="p-2 sm:ml-64">
                    <div className="rounded-md">
                        {children}
                    </div>
                </main>


            </body>
        </html>
    );
}

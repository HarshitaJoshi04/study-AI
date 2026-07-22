import Navbar from "../components/layout/Navbar";
import NotesHistory from "../components/dashboard/NotesHistory";

export default function History() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-sm text-[#C7652E] uppercase tracking-wider">
          History
        </p>

        <h1 className="text-4xl font-serif mt-2 text-[#1D1915]">
          Generated Notes
        </h1>

        <p className="text-[#6B6152] mt-2 mb-8">
          View all your generated study notes, progress, and downloads.
        </p>

        <NotesHistory />
      </div>
    </div>
  );
}
import { useState } from "react";
import api from "../../services/api";
import {
  Link2,
  FileText,
  ArrowRight,
  Sparkles,
  PlayCircle,
} from "lucide-react";

const display = {
  fontFamily: "'Lora', ui-serif, Georgia, serif",
};

const mono = {
  fontFamily: "'JetBrains Mono', monospace",
};

const NOTE_TYPES = [
  { value: "full", label: "Detailed Notes" },
  { value: "exam", label: "Exam Notes" },
  { value: "timestamp", label: "Timestamp Notes" },
  { value: "flashcards", label: "Flashcards" },
];

export default function UploadForm() {
  const [loading, setLoading] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [noteType, setNoteType] = useState("full");
const [language, setLanguage] = useState("English");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!youtubeUrl.trim()) {
      return alert("Please enter YouTube URL");
    }

    setLoading(true);

    try {
      const res = await api.post("/videos/submit", {
        youtubeUrl,
        noteType,
        language
      });

      alert(`Job Created: ${res.data.jobId}`);

      setYoutubeUrl("");
      setNoteType("full");
    } catch (err) {
      alert(err.response?.data?.message || "Submission Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">

      {/* glow */}
      <div className="absolute -inset-4 bg-[#F8B37D]/20 blur-3xl rounded-full" />

      <form
        onSubmit={handleSubmit}
        className="relative bg-[#FBF8F3] border border-[#E7DED2] rounded-[32px] shadow-[0_30px_80px_rgba(0,0,0,.08)] p-8 md:p-10 space-y-7"
      >
        {/* Badge */}

        <div
          className="inline-flex items-center gap-2 bg-[#FFF4EA] text-[#C7652E] border border-[#F3D5BE] px-4 py-2 rounded-full text-xs"
          style={mono}
        >
          <Sparkles size={13} />
          AI Powered
        </div>

        {/* Heading */}

        <div>

          <h2
            style={display}
            className="text-4xl leading-tight text-[#1D1915]"
          >
            Turn any YouTube lecture into
            <span className="italic text-[#C7652E]">
              {" "}
              beautiful study notes.
            </span>
          </h2>

          <p className="mt-3 text-[#6E6558] leading-7">
            Generate structured notes, summaries, PDFs and Google Docs in
            minutes.
          </p>

        </div>

        {/* URL */}

{/* URL */}

<div>
  <label className="block text-sm font-medium text-[#3F372F] mb-3">
    YouTube Video
  </label>

  <div className="flex items-center gap-4 bg-white border border-[#E7DED2] rounded-2xl px-5 py-4 focus-within:border-[#C7652E] transition">
    <PlayCircle size={22} className="text-[#FF4E45]" />

    <input
      value={youtubeUrl}
      onChange={(e) => setYoutubeUrl(e.target.value)}
      placeholder="https://youtube.com/watch?v=..."
      className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-[#A89D8F]"
    />
  </div>
</div>

{/* Note Type + Language */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

  <div>
    <label className="block text-sm font-medium text-[#3F372F] mb-3">
      Notes Style
    </label>

    <div className="flex items-center gap-4 bg-white border border-[#E7DED2] rounded-2xl px-5 py-4">
      <FileText size={20} className="text-[#C7652E]" />

      <select
        value={noteType}
        onChange={(e) => setNoteType(e.target.value)}
        className="flex-1 bg-transparent outline-none appearance-none cursor-pointer"
      >
        {NOTE_TYPES.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  </div>

  <div>
    <label className="block text-sm font-medium text-[#3F372F] mb-3">
      Output Language
    </label>

    <div className="flex items-center gap-4 bg-white border border-[#E7DED2] rounded-2xl px-5 py-4">

      <span className="text-xl">🌍</span>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="flex-1 bg-transparent outline-none appearance-none cursor-pointer"
      >
        <option value="English">🇺🇸 English</option>
        <option value="Hindi">🇮🇳 Hindi</option>
        <option value="Hinglish">🗣 Hinglish</option>
      </select>
    </div>
  </div>

</div>

{/* Submit */}

<button
  type="submit"
  disabled={loading}
  className="group w-full bg-[#1D1915] hover:bg-[#302720] text-white rounded-2xl py-4 font-medium flex justify-center items-center gap-3 transition-all duration-300 hover:-translate-y-1 disabled:opacity-60"
>
  {loading ? (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Generating Notes...
    </div>
  ) : (
    <>
      Generate Notes
      <ArrowRight
        size={18}
        className="group-hover:translate-x-1 transition"
      />
    </>
  )}
</button>

        {/* Footer */}

        <div className="flex justify-between items-center text-xs text-[#9D9285] border-t border-[#ECE4D9] pt-5">

          <span style={mono}>
            Gemini 2.5
          </span>

          <span style={mono}>
            AssemblyAI
          </span>

          <span style={mono}>
            Google Docs
          </span>

        </div>

      </form>
    </div>
  );
}
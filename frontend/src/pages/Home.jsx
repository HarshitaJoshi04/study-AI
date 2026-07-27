import { Link } from "react-router-dom";
import {
  BookOpen,
  ArrowUpRight,
  ArrowRight,
  Link2,
  Sparkles,
  FileText,
  CheckCircle2,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const display = { fontFamily: "'Lora', ui-serif, Georgia, serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

// --- Content lives in simple arrays so the JSX below just loops over it ---

const NAV_LINKS = [
  { label: "How it works", href: "#steps" },
  { label: "Features", href: "#features" },
];

const STEPS = [
  {
    n: "01",
    icon: Link2,
    title: "Paste a link",
    body: "Drop in any YouTube video URL — a lecture, a talk, a tutorial.",
  },
  {
    n: "02",
    icon: Sparkles,
    title: "Downloaded, transcribed, structured",
    body: "The video is downloaded, transcribed, and Gemini turns the transcript into organized notes.",
  },
  {
    n: "03",
    icon: Mail,
    title: "Delivered to your inbox",
    body: "Notes are saved as a Google Doc and emailed straight to your Gmail account.",
  },
];

const FEATURE_CARDS = [
  {
    icon: Link2,
    title: "Just a link",
    body: "No uploads, no manual transcription — one YouTube URL is all it takes.",
  },
  {
    icon: FileText,
    title: "Notes as a Google Doc",
    body: "Output is a clean, structured Google Doc, not a raw transcript dump.",
  },
  {
    icon: Mail,
    title: "Delivered automatically",
    body: "The finished doc is emailed to your Gmail account — no need to check back.",
  },
];

const PREVIEW_ROWS = [
  "Video downloaded",
  "Transcript generated",
  "Notes written by Gemini",
];

const TICKER = [
  "PASTE A LINK",
  "VIDEO DOWNLOADED",
  "TRANSCRIPT GENERATED",
  "NOTES WRITTEN BY GEMINI",
  "SAVED AS A GOOGLE DOC",
  "EMAILED TO YOUR INBOX",
];

// --- Small reusable pieces ---

function Logo({ small = false }) {
  return (
    <div
      className={`${
        small ? "w-6 h-6" : "w-8 h-8"
      } rounded-lg bg-[#1C1712] flex items-center justify-center shrink-0`}
    >
      <BookOpen
        size={small ? 12 : 16}
        className="text-[#F3E8DA]"
        strokeWidth={2}
      />
    </div>
  );
}

function AuthLinks({ onClick = () => {}, stacked = false }) {
  return (
    <>
      <Link
        to="/login"
        onClick={onClick}
        className="text-[14px] text-[#5A4F40] hover:text-[#1C1712] transition-colors"
      >
        Log in
      </Link>
      <Link
        to="/register"
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 bg-[#1C1712] text-[#F3E8DA] text-[14px] font-medium px-5 py-2.5 rounded-full hover:bg-[#2E261D] transition-colors ${
          stacked ? "justify-center" : ""
        }`}
      >
        Sign up
        <ArrowUpRight size={14} strokeWidth={2.25} />
      </Link>
    </>
  );
}

// --- Navbar (desktop links + mobile hamburger menu, same breakpoint) ---

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-[#E4D5BE]/70 relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-5 sm:px-8 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-[15px] font-semibold tracking-tight">
            StudyScribe
          </span>
          <span className="text-[11px] text-[#9C8F7A] tracking-wide" style={mono}>
            /AI
          </span>
        </Link>

        {/* Desktop nav — shown at md and up */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[14px] text-[#5A4F40] hover:text-[#1C1712] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <AuthLinks />
        </div>

        {/* Mobile hamburger — shown below md, matching the breakpoint above */}
        <button
          className="md:hidden text-[#1C1712]"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden max-w-6xl mx-auto px-5 pb-5 flex flex-col gap-3 border-t border-[#E4D5BE]/70 pt-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[14px] text-[#5A4F40]"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <AuthLinks onClick={() => setMenuOpen(false)} stacked />
        </div>
      )}
    </nav>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F3E8DA] text-[#1C1712]">
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* Top strip */}
      <div className="bg-[#1C1712] text-[#F3E8DA] text-center py-2 px-4">
        <p className="text-[12px]" style={mono}>
          A personal project — paste a YouTube link, get notes from Gemini AI
        </p>
      </div>

      <Navbar />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div className="text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 bg-[#FBF6ED] border border-[#E4D5BE] rounded-full pl-2.5 pr-3.5 py-1.5 text-[11px] tracking-wide text-[#5A4F40] mb-7"
            style={mono}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8562E]" />
            BUILT WITH GEMINI AI
          </div>

          <h1
            className="text-[2.5rem] leading-[1.12] sm:text-[3.25rem] sm:leading-[1.1] font-medium tracking-[-0.01em]"
            style={display}
          >
            YouTube lectures,{" "}
            <span className="text-[#C8562E] italic">rewritten</span> as the
            notes you wish you took.
          </h1>

          <p className="mt-6 text-[#6B6152] text-[16px] sm:text-[17px] leading-relaxed max-w-lg mx-auto lg:mx-0">
            This project downloads the video, transcribes it, and uses Gemini
            AI to write structured notes — saved as a Google Doc and emailed
            straight to your Gmail inbox, fully automated.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-[#1C1712] text-[#F3E8DA] px-6 py-3 rounded-full font-medium hover:bg-[#2E261D] transition-colors"
            >
              Try the demo
              <ArrowRight size={16} />
            </Link>
            <a
              href="#steps"
              className="border border-[#DCCFB4] px-6 py-3 rounded-full font-medium text-[#3D362C] hover:bg-[#E9DECD] transition-colors"
            >
              See how it works
            </a>
          </div>

          <p className="mt-5 text-[12px] text-[#9C8F7A]" style={mono}>
            A solo project · React + Node.js + Gemini API
          </p>
        </div>

        {/* Product mockup */}
        <div className="relative mx-auto max-w-sm lg:max-w-none w-full">
          <div className="absolute -inset-3 rounded-3xl bg-[#EFA97B]/30 -z-10" />
          <div className="bg-[#FBF6ED] border border-[#E4D5BE] rounded-2xl shadow-[0_24px_60px_-24px_rgba(28,23,18,0.35)] overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#E4D5BE]">
              <span className="w-2 h-2 rounded-full bg-[#E4D5BE]" />
              <span className="w-2 h-2 rounded-full bg-[#E4D5BE]" />
              <span className="w-2 h-2 rounded-full bg-[#E4D5BE]" />
              <div
                className="ml-3 flex-1 bg-[#F3E8DA] rounded-md text-[11px] text-[#9C8F7A] px-3 py-1.5 truncate"
                style={mono}
              >
                youtube.com/watch?v=lecture-14
              </div>
            </div>

            <div className="p-4 space-y-2.5">
              {PREVIEW_ROWS.map((row) => (
                <div
                  key={row}
                  className="flex items-center gap-2.5 bg-[#F3E8DA] rounded-lg px-3 py-2.5"
                >
                  <CheckCircle2 size={15} className="text-[#C8562E] shrink-0" />
                  <span className="text-[13px] text-[#3D362C] truncate">
                    {row}
                  </span>
                </div>
              ))}

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[11px] text-[#9C8F7A]" style={mono}>
                  <FileText size={13} />
                  notes.gdoc
                </div>
                <span className="inline-flex items-center gap-1 bg-[#C8562E] text-[#FBF6ED] text-[12px] font-medium px-3.5 py-1.5 rounded-lg">
                  <Mail size={12} />
                  Emailed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="border-y border-[#E4D5BE]/70 bg-[#FBF6ED] py-3 overflow-hidden">
        <div
          className="flex w-max"
          style={{ animation: "ticker-scroll 24s linear infinite" }}
        >
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="flex items-center text-[11px] text-[#9C8F7A] tracking-wide px-6"
              style={mono}
            >
              {t}
              <span className="ml-6 text-[#D8C6A6]">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Steps */}
      <section id="steps" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <div className="max-w-xl mx-auto sm:mx-0 text-center sm:text-left mb-12">
          <p className="text-[11px] text-[#9C8F7A] tracking-wide mb-3" style={mono}>
            03 · HOW IT WORKS
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium" style={display}>
            Three steps between a link and a real study document.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {STEPS.map(({ n, icon: Icon, title, body }) => (
            <div key={n} className="bg-[#FBF6ED] border border-[#E4D5BE] p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#F3E1CC] flex items-center justify-center">
                  <Icon size={18} className="text-[#C8562E]" strokeWidth={1.75} />
                </div>
                <span className="text-[12px] text-[#B0A18A]" style={mono}>
                  {n}
                </span>
              </div>
              <h3 className="font-medium text-[16px] mb-2" style={display}>
                {title}
              </h3>
              <p className="text-[#6B6152] text-[13px] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why / features bento */}
      <section id="features" className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
        <div className="max-w-xl mx-auto sm:mx-0 text-center sm:text-left mb-12">
          <p className="text-[11px] text-[#9C8F7A] tracking-wide mb-3" style={mono}>
            04 · WHY STUDYSCRIBE
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium" style={display}>
            What's actually happening{" "}
            <span className="italic text-[#C8562E]">behind</span> the link.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-5">
          <div className="md:col-span-2 bg-[#1C1712] text-[#F3E8DA] rounded-2xl p-7">
            <h3 className="font-medium text-[17px] mb-4" style={display}>
              Structured like a textbook, not a transcript.
            </h3>
            <div className="space-y-2 text-[13px]" style={mono}>
              <p className="text-[#B4A995]"># Headings, definitions, callouts</p>
              <p className="text-[#8A7E6A]">— arranged so the argument is easy to follow</p>
              <ul className="pl-4 space-y-1 text-[#B4A995] list-disc list-inside">
                <li>Lecture 14 — Bayesian inference</li>
                <li>Key concepts tagged inline</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#C8562E] text-[#FBF0E4] rounded-2xl p-7">
            <h3 className="font-medium text-[17px] mb-4" style={display}>
              End-to-end, no manual steps
            </h3>
            <div className="space-y-1.5 text-[13px]" style={mono}>
              <p className="text-[#FBE3D2]">→ download</p>
              <p className="text-[#FBE3D2]">→ transcribe</p>
              <p className="text-[#FBE3D2]">→ generate notes</p>
              <p className="text-[#FBE3D2]">→ save to Google Docs</p>
              <p className="text-[#FBE3D2]">→ email to Gmail</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {FEATURE_CARDS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-[#FBF6ED] border border-[#E4D5BE] rounded-2xl p-6">
              <Icon size={20} className="text-[#C8562E] mb-4" strokeWidth={1.75} />
              <h4 className="font-medium text-[14px] mb-1.5">{title}</h4>
              <p className="text-[#6B6152] text-[13px] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
        <div className="relative overflow-hidden bg-[#1C1712] text-[#F3E8DA] rounded-3xl px-8 sm:px-14 py-16 sm:py-20 text-center">
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#C8562E]/40 blur-3xl" />
          <p className="relative text-[11px] text-[#9C8F7A] tracking-wide mb-4" style={mono}>
            TRY IT OUT
          </p>
          <h2 className="relative text-3xl sm:text-4xl font-medium" style={display}>
            Study smarter, <span className="italic text-[#E0A176]">not longer.</span>
          </h2>
          <p className="relative mt-4 text-[#B4A995] text-[15px] sm:text-[17px]">
            A side project built to see how far Gemini AI can go turning a
            video into real notes.
          </p>
          <Link
            to="/dashboard"
            className="relative inline-flex items-center gap-1.5 mt-8 bg-[#F3E8DA] text-[#1C1712] px-7 py-3 rounded-full font-medium hover:bg-white transition-colors"
          >
            Try it now
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E4D5BE]/70 py-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo small />
            <span className="text-[13px] text-[#5A4F40]">StudyScribe AI</span>
          </div>
          <p className="text-[12px] text-[#9C8F7A]" style={mono}>
            © 2026 · A PORTFOLIO PROJECT · REACT · NODE.JS · GEMINI AI · GOOGLE DOCS API · GMAIL API
          </p>
        </div>
      </footer>
    </div>
  );
}
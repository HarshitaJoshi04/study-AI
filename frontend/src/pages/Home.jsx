import { Link } from "react-router-dom";
import {
  BookOpen,
  ArrowUpRight,
  ArrowRight,
  Link2,
  Sparkles,
  Download,
  Clock,
  FileText,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

/*
  Fonts: add these to your index.html <head> —
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
*/

const display = { fontFamily: "'Lora', ui-serif, Georgia, serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

const NAV_LINKS = [
  { label: "How it works", href: "#steps" },
  { label: "Features", href: "#features" },
  { label: "Languages", href: "#languages" },
];

const STEPS = [
  {
    n: "01",
    icon: Link2,
    title: "Paste a link",
    body: "Any YouTube video URL. No login walls, no browser extension.",
  },
  {
    n: "02",
    icon: Sparkles,
    title: "AI does the heavy lifting",
    body: "Transcription, summarization and key concepts, in one pass.",
  },
  {
    n: "03",
    icon: Download,
    title: "Export & study",
    body: "Download a clean PDF or open the notes in Google Docs.",
  },
];

const TICKER = [
  "PASTE A LINK",
  "AI TRANSCRIPTION",
  "STRUCTURED NOTES",
  "KEY CONCEPTS TAGGED",
  "TIMESTAMPS INCLUDED",
  "EXPORT IN SECONDS",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          Now powered by Gemini 2.5 + AssemblyAI transcription
        </p>
      </div>

      {/* Navbar */}
      <nav className="border-b border-[#E4D5BE]/70">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-5 sm:px-8 py-5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1C1712] flex items-center justify-center shrink-0">
              <BookOpen size={16} className="text-[#F3E8DA]" strokeWidth={2} />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">
              StudyScribe
            </span>
            <span className="text-[11px] text-[#9C8F7A] tracking-wide" style={mono}>
              /AI
            </span>
          </Link>

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

          <div className="hidden sm:flex items-center gap-6">
            <Link
              to="/login"
              className="text-[14px] text-[#5A4F40] hover:text-[#1C1712] transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 bg-[#1C1712] text-[#F3E8DA] text-[14px] font-medium px-5 py-2.5 rounded-full hover:bg-[#2E261D] transition-colors"
            >
              Sign up
              <ArrowUpRight size={14} strokeWidth={2.25} />
            </Link>
          </div>

          <button
            className="sm:hidden text-[#1C1712]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="sm:hidden max-w-6xl mx-auto px-5 pb-5 flex flex-col gap-3 border-t border-[#E4D5BE]/70 pt-4">
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
            <Link
              to="/login"
              className="text-[14px] text-[#5A4F40]"
              onClick={() => setMenuOpen(false)}
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-1.5 bg-[#1C1712] text-[#F3E8DA] text-[14px] font-medium px-5 py-2.5 rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              Sign up
              <ArrowUpRight size={14} />
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div className="text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 bg-[#FBF6ED] border border-[#E4D5BE] rounded-full pl-2.5 pr-3.5 py-1.5 text-[11px] tracking-wide text-[#5A4F40] mb-7"
            style={mono}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8562E]" />
            GEMINI 2.5 + ASSEMBLYAI
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
            Paste a link and get a structured study document — summaries, key
            concepts, timestamps and exports — ready before your coffee gets
            cold.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-[#1C1712] text-[#F3E8DA] px-6 py-3 rounded-full font-medium hover:bg-[#2E261D] transition-colors"
            >
              Try it free
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
            No card required · 3 free notes
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
              {[
                "Introduction & key definitions",
                "Core theorem, worked example",
                "Common mistakes to avoid",
              ].map((row) => (
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
                  12 key concepts
                </div>
                <span className="inline-flex items-center gap-1 bg-[#C8562E] text-[#FBF6ED] text-[12px] font-medium px-3.5 py-1.5 rounded-lg">
                  Export
                  <ArrowRight size={12} />
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
      <section
        id="steps"
        className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24"
      >
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
            <div
              key={n}
              className="bg-[#FBF6ED] border border-[#E4D5BE] p-6 rounded-2xl"
            >
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
              <p className="text-[#6B6152] text-[13px] leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why / features bento */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-5 sm:px-8 pb-24"
      >
        <div className="max-w-xl mx-auto sm:mx-0 text-center sm:text-left mb-12">
          <p className="text-[11px] text-[#9C8F7A] tracking-wide mb-3" style={mono}>
            04 · WHY STUDYSCRIBE
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium" style={display}>
            Built for students who{" "}
            <span className="italic text-[#C8562E]">actually</span> want to
            learn.
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

          <div id="languages" className="bg-[#C8562E] text-[#FBF0E4] rounded-2xl p-7">
            <h3 className="font-medium text-[17px] mb-4" style={display}>
              English · Hindi · Hinglish
            </h3>
            <div className="space-y-1.5 text-[15px]" style={display}>
              <p className="italic">Namaste, chaliye shuru karein.</p>
              <p>नमस्ते, आज का विषय है...</p>
              <p className="italic">Kaise ho? Ready to study?</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div className="bg-[#FBF6ED] border border-[#E4D5BE] rounded-2xl p-6">
            <Download size={20} className="text-[#C8562E] mb-4" strokeWidth={1.75} />
            <h4 className="font-medium text-[14px] mb-1.5">PDF + Google Docs</h4>
            <p className="text-[#6B6152] text-[13px] leading-relaxed">
              Take your notes wherever you already study.
            </p>
          </div>
          <div className="bg-[#FBF6ED] border border-[#E4D5BE] rounded-2xl p-6">
            <Sparkles size={20} className="text-[#C8562E] mb-4" strokeWidth={1.75} />
            <h4 className="font-medium text-[14px] mb-1.5">Gemini 2.5 quality</h4>
            <p className="text-[#6B6152] text-[13px] leading-relaxed">
              Notes that actually reflect what was said, not just a summary.
            </p>
          </div>
          <div className="bg-[#FBF6ED] border border-[#E4D5BE] rounded-2xl p-6">
            <Clock size={20} className="text-[#C8562E] mb-4" strokeWidth={1.75} />
            <h4 className="font-medium text-[14px] mb-1.5">Read at your pace</h4>
            <p className="text-[#6B6152] text-[13px] leading-relaxed">
              Timestamped sections so you can jump back to the source.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
        <div className="relative overflow-hidden bg-[#1C1712] text-[#F3E8DA] rounded-3xl px-8 sm:px-14 py-16 sm:py-20 text-center">
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#C8562E]/40 blur-3xl" />
          <p className="relative text-[11px] text-[#9C8F7A] tracking-wide mb-4" style={mono}>
            GET STARTED
          </p>
          <h2 className="relative text-3xl sm:text-4xl font-medium" style={display}>
            Study smarter,{" "}
            <span className="italic text-[#E0A176]">not longer.</span>
          </h2>
          <p className="relative mt-4 text-[#B4A995] text-[15px] sm:text-[17px]">
            Free forever for your first three notes. No credit card, no
            setup.
          </p>
          <Link
            to="/register"
            className="relative inline-flex items-center gap-1.5 mt-8 bg-[#F3E8DA] text-[#1C1712] px-7 py-3 rounded-full font-medium hover:bg-white transition-colors"
          >
            Create free account
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E4D5BE]/70 py-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#1C1712] flex items-center justify-center">
              <BookOpen size={12} className="text-[#F3E8DA]" strokeWidth={2} />
            </div>
            <span className="text-[13px] text-[#5A4F40]">StudyScribe AI</span>
          </div>
          <p className="text-[12px] text-[#9C8F7A]" style={mono}>
            © 2026 · REACT · NODE.JS · GEMINI · ASSEMBLYAI
          </p>
        </div>
      </footer>
    </div>
  );
}
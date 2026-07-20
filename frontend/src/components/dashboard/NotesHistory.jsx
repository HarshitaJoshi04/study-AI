import { useEffect, useState } from "react";
import api from "../../services/api";
import useVideos from "../../hooks/useVideos";
import StatusCard from "./StatusCard";
import { FileText, ExternalLink, Download, Inbox } from "lucide-react";

const display = { fontFamily: "'Lora', ui-serif, Georgia, serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

const NotesHistory = () => {
  const { videos, loading } = useVideos();

  const fetchVideos = async () => {
    try {
      const res = await api.get("/videos");

      setVideos(res.data.videos);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <p className="mt-10 text-[14px] text-[#9C8F7A]" style={mono}>
        Loading…
      </p>
    );
  }

  return (
    <div className="mt-10">
      <p className="text-[11px] text-[#9C8F7A] tracking-wide mb-2" style={mono}>
        HISTORY
      </p>
      <h2
        className="text-[1.5rem] leading-tight font-medium text-[#1C1712] mb-6"
        style={display}
      >
        Recent requests
      </h2>

      {videos.length === 0 && (
        <div className="flex flex-col items-center text-center bg-[#FBF6ED] border border-dashed border-[#E4D5BE] rounded-2xl py-14 px-6">
          <Inbox size={22} className="text-[#B0A18A] mb-3" strokeWidth={1.5} />
          <p className="text-[14px] text-[#6B6152]">No requests yet.</p>
        </div>
      )}

      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-[#FBF6ED] border border-[#E4D5BE] rounded-2xl p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-1">
              <div className="flex items-center gap-2 min-w-0">
                <FileText size={16} className="text-[#C8562E] shrink-0" />
                <h3
                  className="text-[14px] text-[#1C1712] truncate"
                  style={mono}
                >
                  {video.youtubeUrl}
                </h3>
              </div>
              <span className="shrink-0 text-[11px] text-[#5A4F40] bg-[#F3E1CC] px-2.5 py-1 rounded-full capitalize">
                {video.noteType}
              </span>
            </div>

            <p className="text-[13px] text-[#9C8F7A] mb-1" style={mono}>
              Status: {video.status}
            </p>

            <StatusCard status={video.status} progress={video.progress} />

            {(video.googleDocUrl || video.pdfUrl) && (
              <div className="flex flex-wrap items-center gap-5 mt-4 pt-4 border-t border-[#E4D5BE]">
                {video.googleDocUrl && (
                  <a
                    href={video.googleDocUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1C1712] hover:text-[#C8562E] transition-colors"
                  >
                    <ExternalLink size={14} />
                    Open Google Docs
                  </a>
                )}
                {video.pdfUrl && (
                  <a
                    href={video.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1C1712] hover:text-[#C8562E] transition-colors"
                  >
                    <Download size={14} />
                    Download PDF
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesHistory;
import api from "../../services/api";
import useVideos from "../../hooks/useVideos";
import {
  Inbox,
  Trash2,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

const display = {
  fontFamily: "'Lora', ui-serif, Georgia, serif",
};

const mono = {
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
};

const statusOrder = {
  pending: 0,
  downloading: 1,
  transcribing: 2,
  generating_notes: 3,
  creating_document: 4,
  completed: 5,
  failed: -1,
};

const StepCard = ({ title, active }) => (
  <div
    className={`rounded-lg border px-2.5 py-1.5 flex items-center justify-between text-xs transition-all ${
      active
        ? "border-emerald-300 bg-emerald-50/60 text-emerald-800"
        : "border-[#E7DED2] bg-white/50 text-[#8C7E6C]"
    }`}
  >
    <span className="truncate font-medium">{title}</span>
    {active ? (
      <CheckCircle2 size={13} className="text-emerald-600 shrink-0 ml-1" />
    ) : (
      <Clock size={13} className="text-[#A89D8F] shrink-0 ml-1" />
    )}
  </div>
);

const NotesHistory = () => {
  const { videos, loading, refreshVideos } = useVideos();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await api.delete(`/videos/${id}`);
      refreshVideos();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="mt-8 space-y-3">
        <div className="h-24 bg-[#FBF8F3] border border-[#E7DED2] rounded-xl animate-pulse" />
        <div className="h-24 bg-[#FBF8F3] border border-[#E7DED2] rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p
            className="text-[10px] text-[#9C8F7A] tracking-wider uppercase mb-0.5"
            style={mono}
          >
            HISTORY
          </p>
          <h2
            className="text-xl font-semibold text-[#1C1712]"
            style={display}
          >
            Recent Requests
          </h2>
        </div>
        <span
          className="text-xs bg-[#EFE8DC] text-[#6E6558] px-2.5 py-1 rounded-full font-medium"
          style={mono}
        >
          {videos.length} {videos.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {videos.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center bg-[#FBF8F3] border border-dashed border-[#E7DED2] rounded-xl py-10 px-4">
          <Inbox
            size={20}
            className="text-[#B0A18A] mb-2"
            strokeWidth={1.5}
          />
          <p className="text-xs text-[#6B6152]">No requests found yet.</p>
        </div>
      )}

      <div className="space-y-3">
        {videos.map((video) => {
          const currentStep = statusOrder[video.status] ?? 0;

          return (
            <div
              key={video._id}
              className="bg-[#FBF8F3] border border-[#E7DED2] rounded-xl p-4 transition-all hover:border-[#D8CBB7]"
            >
              {/* Header Info */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[#1C1712] truncate">
                    {video.title || "Untitled Video"}
                  </h3>
                  <p className="text-xs text-[#8C7E6C] truncate mt-0.5">
                    {video.youtubeUrl}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-[11px] font-medium text-[#7D6E59] capitalize bg-[#FFF4EA] border border-[#F3D5BE] px-2 py-0.5 rounded-md"
                    style={mono}
                  >
                    {(video.status ?? "pending").replaceAll("_", " ")}
                  </span>
                  <span
                    className="text-[11px] font-semibold text-[#C7652E] bg-[#EFE8DC] px-2 py-0.5 rounded-md"
                    style={mono}
                  >
                    {video.progress ?? 0}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-[#ECE4D9] rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-[#C7652E] transition-all duration-500 rounded-full"
                  style={{
                    width: `${video.progress ?? 0}%`,
                  }}
                />
              </div>

              {/* Compact Steps */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                <StepCard
                  title="Downloading"
                  active={currentStep >= 1}
                />
                <StepCard
                  title="Transcribing"
                  active={currentStep >= 2}
                />
                <StepCard
                  title="Generating Notes"
                  active={currentStep >= 3}
                />
                <StepCard
                  title="Creating Doc"
                  active={currentStep >= 4}
                />
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between border-t border-[#ECE4D9]/60 pt-2.5 mt-1">
                <div className="flex items-center gap-2">
                  {video.status === "completed" && video.googleDocUrl && (
                    <a
                      href={video.googleDocUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-medium transition-colors border border-blue-200/60"
                    >
                      <FileText size={13} />
                      <span>Google Docs</span>
                      <ExternalLink size={11} className="opacity-60" />
                    </a>
                  )}

                  {video.status === "completed" && video.pdfUrl && (
                    <a
                      href={video.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-medium transition-colors border border-emerald-200/60"
                    >
                      <Download size={13} />
                      <span>PDF</span>
                      <ExternalLink size={11} className="opacity-60" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(video._id)}
                  title="Delete Note"
                  className="p-1.5 rounded-md text-[#9C8F7A] hover:text-red-600 hover:bg-red-50 transition-colors ml-auto"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotesHistory;
import api from "../../services/api";
import useVideos from "../../hooks/useVideos";
import { DeleteIcon, Inbox } from "lucide-react";

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
    className={`rounded-xl border p-4 transition-all ${
      active
        ? "border-green-400 bg-green-50"
        : "border-[#E4D5BE] bg-white"
    }`}
  >
    <p className="text-[10px] text-gray-500 uppercase mb-1">STEP</p>

    <p className="flex items-center gap-2 text-sm">
      {active ? "✅" : "⏳"} {title}
    </p>
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
      <p className="mt-10 text-[14px] text-[#9C8F7A]" style={mono}>
        Loading...
      </p>
    );
  }

  return (
    <div className="mt-10">
      <p
        className="text-[11px] text-[#9C8F7A] tracking-wide mb-2"
        style={mono}
      >
        HISTORY
      </p>

      <h2
        className="text-[1.5rem] leading-tight font-medium text-[#1C1712] mb-6"
        style={display}
      >
        Recent Requests
      </h2>

      {videos.length === 0 && (
        <div className="flex flex-col items-center text-center bg-[#FBF6ED] border border-dashed border-[#E4D5BE] rounded-2xl py-14 px-6">
          <Inbox
            size={22}
            className="text-[#B0A18A] mb-3"
            strokeWidth={1.5}
          />
          <p className="text-[14px] text-[#6B6152]">
            No requests yet.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {videos.map((video) => {
          const currentStep = statusOrder[video.status] ?? 0;

          return (
            <div
              key={video._id}
              className="bg-[#FBF6ED] border border-[#E4D5BE] rounded-2xl p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-semibold">
  {video.title}
</h3>

<p className="text-xs text-gray-500 truncate">
  {video.youtubeUrl}
</p>

                  <p className="text-xs text-[#7D6E59] mt-1 capitalize">
                    {(video.status ?? "pending").replaceAll("_", " ")}
                  </p>
                </div>

                <span className="text-xs bg-[#F3E1CC] px-3 py-1 rounded-full">
                  {video.progress ?? 0}%
                </span>
              </div>

              {/* Progress Bar */}

              <div className="w-full h-2 bg-[#E8DCCB] rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-[#F97316] transition-all duration-500"
                  style={{
                    width: `${video.progress ?? 0}%`,
                  }}
                />
              </div>

              {/* Steps */}

              <div className="grid grid-cols-2 gap-3 mb-6">
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
                  title="Creating Document"
                  active={currentStep >= 4}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  {video.status === "completed" &&
                    video.googleDocUrl && (
                      <a
                        href={video.googleDocUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        📄 Google Docs
                      </a>
                    )}

                  {video.status === "completed" &&
                    video.pdfUrl && (
                      <a
                        href={video.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
                      >
                        📥 PDF
                      </a>
                    )}
                </div>

                <button
                  onClick={() => handleDelete(video._id)}
                  className="px-2 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <DeleteIcon size={16} />
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
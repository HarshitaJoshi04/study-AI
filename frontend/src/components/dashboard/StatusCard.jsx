import { ExternalLink, Download } from "lucide-react";

const mono = {
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
};

const display = {
  fontFamily: "'Lora', ui-serif, Georgia, serif",
};

const StatusCard = ({
  status,
  progress = 0,
  googleDocUrl,
  pdfUrl,
}) => {

  const getCurrentStep = () => {
    if (progress < 20) return "Downloading YouTube Audio";
    if (progress < 45) return "Transcribing Audio";
    if (progress < 70) return "Generating AI Notes";
    if (progress < 95) return "Creating Google Document";
    if (progress < 100) return "Finalizing";
    return "Completed";
  };

  return (

      
    <div className="rounded-3xl bg-[#FBF8F3] border border-[#E9DED0] shadow-xl p-7">
   
      {/* Header */}

      <div className="flex justify-between items-center">

        <div>
          <p
            className="uppercase text-xs tracking-widest text-[#AA9988]"
            style={mono}
          >
            AI Processing
          </p>

          <h2
            className="text-3xl mt-2 text-[#1D1915]"
            style={display}
          >
            {status}
          </h2>

          <p
            className="text-sm mt-2 text-[#777]"
            style={mono}
          >
            {getCurrentStep()}
          </p>
        </div>

        <div className="h-20 w-20 rounded-full border-4 border-[#F3D5BE] flex items-center justify-center bg-[#FFF3E8]">
          <span
            className="font-bold text-xl text-[#C7652E]"
            style={mono}
          >
            {progress}%
          </span>
        </div>

      </div>

      {/* Progress */}

      <div className="mt-8">

        <div className="h-3 rounded-full bg-[#ECE4D9] overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-300 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Steps */}

      <div className="grid grid-cols-2 gap-3 mt-8">

        {[
          "Downloading",
          "Transcription",
          "Generating Notes",
          "Creating Document",
        ].map((step, index) => {

          const completed = progress >= (index + 1) * 25;

          return (
            <div
              key={index}
              className={`rounded-xl border p-3 ${
                completed
                  ? "bg-green-50 border-green-300"
                  : "bg-white border-[#ECE4D9]"
              }`}
            >
              <p
                className="uppercase text-[10px] text-gray-500"
                style={mono}
              >
                STEP {index + 1}
              </p>

              <p className="mt-1 text-sm">
                {completed ? "✅ " : "⏳ "}
                {step}
              </p>
            </div>
          );
        })}

      </div>

      {/* Links */}

      {(googleDocUrl || pdfUrl) && (

        <div className="mt-8 border-t pt-6 flex flex-wrap gap-4">

          {googleDocUrl && (
            <a
              href={googleDocUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              <ExternalLink size={18} />
              Open Google Docs
            </a>
          )}

          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700"
            >
              <Download size={18} />
              Download PDF
            </a>
          )}

        </div>

      )}

      {/* Footer */}

      <div className="mt-8 border-t border-[#ECE4D9] pt-5 flex justify-between items-center">

        <span
          className="text-xs text-[#A79A89]"
          style={mono}
        >
          Gemini 2.5 • AssemblyAI
        </span>

        <span
          className={`text-sm font-medium ${
            status === "processing"
              ? "text-orange-600 animate-pulse"
              : status === "completed"
              ? "text-green-600"
              : status === "failed"
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {status === "pending" && "⌛ Waiting"}
          {status === "processing" && "⚡ AI is generating your notes..."}
          {status === "completed" && "🎉 Notes Ready"}
          {status === "failed" && "❌ Processing Failed"}
        </span>

      </div>

    </div>
  );
};

export default StatusCard;
const mono = {
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
};

const display = {
  fontFamily: "'Lora', ui-serif, Georgia, serif",
};

const StatusCard = ({ status, progress }) => {
  return (
    <div className="relative overflow-hidden rounded-[30px] bg-[#FBF8F3] border border-[#E9DED0] shadow-[0_20px_60px_rgba(0,0,0,.08)] p-7">

      {/* Glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#F6A76E]/20 blur-3xl" />

      {/* Header */}

      <div className="relative flex items-center justify-between">

        <div>

          <p
            className="text-[11px] tracking-widest text-[#B09780] uppercase"
            style={mono}
          >
            AI Processing
          </p>

          <h3
            className="text-2xl text-[#1D1915] mt-2"
            style={display}
          >
            {status}
          </h3>

        </div>

        <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-[#FFF3E8] border border-[#F3D6C0]">

          <span
            className="text-lg font-semibold text-[#C7652E]"
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
            className="h-full rounded-full bg-gradient-to-r from-[#C7652E] via-[#DD8B54] to-[#F4B183] transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Steps */}

      <div className="mt-8 grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-[#FFFDF9] border border-[#ECE4D9] p-3">
          <p
            className="text-[10px] uppercase text-[#A79A89]"
            style={mono}
          >
            STEP 1
          </p>

          <p className="text-sm mt-1 text-[#3D372F]">
            Downloading video
          </p>
        </div>

        <div className="rounded-xl bg-[#FFFDF9] border border-[#ECE4D9] p-3">
          <p
            className="text-[10px] uppercase text-[#A79A89]"
            style={mono}
          >
            STEP 2
          </p>

          <p className="text-sm mt-1 text-[#3D372F]">
            AI transcription
          </p>
        </div>

        <div className="rounded-xl bg-[#FFFDF9] border border-[#ECE4D9] p-3">
          <p
            className="text-[10px] uppercase text-[#A79A89]"
            style={mono}
          >
            STEP 3
          </p>

          <p className="text-sm mt-1 text-[#3D372F]">
            Writing notes
          </p>
        </div>

        <div className="rounded-xl bg-[#FFFDF9] border border-[#ECE4D9] p-3">
          <p
            className="text-[10px] uppercase text-[#A79A89]"
            style={mono}
          >
            STEP 4
          </p>

          <p className="text-sm mt-1 text-[#3D372F]">
            Creating PDF
          </p>
        </div>

      </div>

      {/* Footer */}

      <div className="mt-7 flex justify-between items-center border-t border-[#ECE4D9] pt-5">

        <span
          className="text-xs text-[#A79A89]"
          style={mono}
        >
          Gemini 2.5 • AssemblyAI
        </span>

        <span className="text-sm font-medium text-[#C7652E] animate-pulse">
          Please don't close this page
        </span>

      </div>

    </div>
  );
};

export default StatusCard;
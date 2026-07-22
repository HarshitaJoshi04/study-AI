import Navbar from "../components/layout/Navbar";
import UploadForm from "../components/dashboard/UploadForm";
import StatusCard from "../components/dashboard/StatusCard";
import useVideos from "../hooks/useVideos";

const Dashboard = () => {
  const { videos, loading } = useVideos();

  const currentJob = videos[0];

  return (
    <div className="min-h-screen bg-[#F5F0EB] text-[#1D1915] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-8">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Hero */}
          <section className="w-full">
            <UploadForm />
          </section>

          {/* Current Job */}
          {loading ? (
            <section className="w-full">
              <div className="bg-[#FBF8F3] border border-[#E7DED2] rounded-3xl p-6 shadow-sm animate-pulse">
                <div className="space-y-4">
                  <div className="h-5 bg-[#E7DED2] rounded w-1/4"></div>

                  <div className="h-3 bg-[#ECE4D9] rounded w-2/3"></div>

                  <div className="h-3 bg-[#ECE4D9] rounded w-1/2"></div>

                  <div className="h-3 bg-[#ECE4D9] rounded w-full"></div>
                </div>
              </div>
            </section>
          ) : (
            currentJob && (
              <section className="w-full">
                <StatusCard
                  status={currentJob.status}
                  progress={currentJob.progress}
                  googleDocUrl={currentJob.googleDocUrl}
                  pdfUrl={currentJob.pdfUrl}
                />
              </section>
            )
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
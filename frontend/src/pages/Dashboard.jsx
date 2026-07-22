import Navbar from "../components/layout/Navbar";
import UploadForm from "../components/dashboard/UploadForm";
import NotesHistory from "../components/dashboard/NotesHistory";
import StatusCard from "../components/dashboard/StatusCard";
import useVideos from "../hooks/useVideos";

const Dashboard = () => {
  const { videos, loading } = useVideos();

  // Latest job
  const currentJob = videos[0];

  return (
    <>
      <Navbar />

      <main className="container">
        <UploadForm />

        {!loading && currentJob && (
          <StatusCard
            status={currentJob.status}
            progress={currentJob.progress}
            googleDocUrl={currentJob.googleDocUrl}
            pdfUrl={currentJob.pdfUrl}
          />
        )}

        <NotesHistory />
      </main>
    </>
  );
};

export default Dashboard;
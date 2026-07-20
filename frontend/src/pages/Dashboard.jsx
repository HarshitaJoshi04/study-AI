import Navbar from "../components/layout/Navbar";
import UploadForm from "../components/dashboard/UploadForm";
import NotesHistory from "../components/dashboard/NotesHistory";
import StatusCard from "../components/dashboard/StatusCard";

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <main className="container">
        <UploadForm />
<StatusCard/>
        <NotesHistory />
      </main>
    </>
  );
};

export default Dashboard;

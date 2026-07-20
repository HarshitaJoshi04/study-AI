import Navbar from "../components/layout/Navbar";
import UploadForm from "../components/dashboard/UploadForm";
import NotesHistory from "../components/dashboard/NotesHistory";

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <main className="container">
        <UploadForm />

        <NotesHistory />
      </main>
    </>
  );
};

export default Dashboard;

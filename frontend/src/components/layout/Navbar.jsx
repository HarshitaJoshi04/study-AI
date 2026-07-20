import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>StudyScribe AI</h2>

      <div>
        <span style={{ marginRight: "20px" }}>{user?.name}</span>

        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

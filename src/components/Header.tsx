import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ padding: "10px", backgroundColor: "#282c34", color: "white" }}>
      <nav>
        <Link to="/" style={{ marginRight: "15px", color: "white" }}>Home</Link>
        <Link to="/todo" style={{ color: "white" }}>Todo List</Link>
      </nav>
    </header>
  );
};

export default Header;

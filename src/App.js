import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Users from "./components/Users";
import "./App.css";
import Error404 from "./components/Error404";
import User from "./components/User";

function App() {
  const activeStyle = {
    textDecoration: "underline",
    backgroundColor: "red",
  };

  const activeClassName = "underline";

  return (
    <Router>
      <div>
        <h2>Example 5</h2>
        <h2>learn react</h2>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => {
                  return {
                    display: "block",
                    margin: isActive ? "10px 0px" : "",
                    color: "red",
                    backgroundColor: isActive ? "blue" : "",
                  };
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="about"
                // style={({ isActive }) => (isActive ? activeStyle : undefined)}
                style={activeStyle}
                // className={({ isActive }) =>
                //   isActive ? activeClassName : undefined
                // }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="users"
                // style={() => {
                //   return {
                //     backgroundColor: "brown",
                //   };
                // }}
                // className="active"
                className={activeClassName}
              >
                Users
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* <Route path="/" exact element={<Home />} /> router son güncellemedn sonra exact olmadan da doğru çalışıyor */}
          <Route path="/" index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="users/*" element={<Users />}>
            <Route path={":id"} element={<User />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

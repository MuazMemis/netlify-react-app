import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ENDPOINT}/users`)
      .then((res) => setUsers(res.data))
      .finally(() => setIsLoading(false));
  }, [users]);

  return (
    <div>
      Users
      {isLoading && <div>Loading...</div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <NavLink to={`${user.id}`}>{user.name}</NavLink>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

export default Users;

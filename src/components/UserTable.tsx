import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the User interface to type the user data fetched from the API
interface User {
  id: number;
  name: string;
  username: string;
  company: { name: string };
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}

const UserTable: React.FC = () => {
  // State to store the list of users fetched from the API
  const [users, setUsers] = useState<User[]>([]);
  // State to store the original list of users fetched from the API
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  // State to manage the loading state while fetching data
  const [loading, setLoading] = useState<boolean>(true);
  // State to track the current page number for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  // State to track the sort direction
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | "">("");

  // Number of users to display per page
  const usersPerPage = 5;

  // useEffect to fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      // Update the users state with the fetched data
      setUsers(response.data);
      // Store the original users list
      setOriginalUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    // Set loading to false after data is fetched
    setLoading(false);
  };

  // Function to sort users by name in alphabetical order
  const handleSort = () => {
    if (sortDirection === "asc") {
      // If already sorted in ascending order, reset to original order
      setUsers(originalUsers);
      setSortDirection("");
    } else {
      // Sort in ascending order
      setUsers([...users].sort((a, b) => a.name.localeCompare(b.name)));
      setSortDirection("asc");
    }
  };

  // Function to fetch the latest data from the API
  const handleFetchLatest = () => {
    setSortDirection("");
    fetchUsers();
  };

  // Calculate the index of the last user on the current page
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  // Function to handle pagination
  const handlePagination = (pageNumber: number) => setCurrentPage(pageNumber);

  // function to handle click on previous button while pagination
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // calculate total pages:
  const totalPages = Math.ceil(users.length / usersPerPage);

  // function to handle click on next button while pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Show a loading message if data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Table to display the list of users */}
      <table id="users">
        <thead>
          <tr>
            <th>ID</th>
            {/* Clickable header to sort the table by name */}
            <th style={{ cursor: "pointer" }}>
              <span style={{ marginRight: "10px" }}>Name</span>
              <img
                onClick={handleSort}
                style={{ backgroundColor: "white" }}
                src={
                  sortDirection === "asc"
                    ? "src/assets/downArrow.svg"
                    : "src/assets/arrow.svg"
                }
                alt="arrow"
                loading="lazy"
              />
            </th>
            <th>Username</th>
            <th>Company</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the current users to create table rows */}
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.company.name}</td>
              <td>{user.email}</td>
              <td>{`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          rowGap: "10px",
          marginTop: "10px",
        }}
      >
        <div>
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              disabled={currentPage === index + 1}
              key={index}
              onClick={() => handlePagination(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
        {/* Button to re-fetch the latest data */}
        <button onClick={handleFetchLatest}>Re-fetch Latest Data</button>
      </div>
    </div>
  );
};

export default UserTable;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Logout from "./Logout";
import './Dashboard.css'; 

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user || null);
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch tasks for the user
  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
      console.log("User set from location state:", location.state.user);
    }

    const token = window.localStorage.getItem("token");
    fetch("http://localhost:5000/users/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("Logged in successfully");
          window.localStorage.setItem("token", data.data);
          setUser(data.user); // Assuming the user data is in data.user
        } else {
          console.log("Not logged in");
        }
      })
      .catch((error) => {
        console.error("Error verifying token:", error);
      });
  }, [location.state, navigate]);

  useEffect(() => {
    if (user && user.email) {
      const fetchTasks = async () => {
        try {
          const response = await fetch(`http://localhost:5000/tasks/${user.email}`, {
            method: "GET",
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };

      fetchTasks();
    }
  }, [user]);

  // Keep updating the date and time
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date().toLocaleString()), 1000); // Update every second
    return () => clearInterval(timer);
  }, []);

  // Dark mode styles
  const dark_styles = {
    backgroundColor: "black",
    color: "white",
    minHeight: "100vh",
    padding: "0px 0px 20px 0px",
  };

  // Add or update task
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate.trim() || !priority.trim()) {
      alert("Please enter all fields!");
      return;
    }

    const newTask = { title, description, dueDate, priority, completed: false, userEmail: user.email };

    try {
      if (editingIndex !== null) {
        const response = await fetch(`http://localhost:5000/tasks/${tasks[editingIndex]._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedTask = await response.json();
        const updatedTasks = tasks.map((task, index) =>
          index === editingIndex ? updatedTask : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        const response = await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const createdTask = await response.json();
        setTasks([...tasks, createdTask]);
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }

    // Clear input fields
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
  };

  // Delete task
  const handleDelete = async (index) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${tasks[index]._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setTasks(tasks.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Edit task
  const handleEdit = (index) => {
    const task = tasks[index];
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setEditingIndex(index);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  const toggleTaskCompletion = async (index) => {
    const task = tasks[index];
    const updatedTask = { ...task, completed: !task.completed };

    try {
      const response = await fetch(`http://localhost:5000/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedTaskFromServer = await response.json();
      setTasks(
        tasks.map((task, i) =>
          i === index ? updatedTaskFromServer : task
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "1":
        return "High";
      case "2":
        return "Medium";
      case "3":
        return "Low";
      default:
        return "None";
    }
  };

  return (
    <div className={darkMode ? "dark-theme" : ""} style={darkMode ? dark_styles : {}}>
      {/* Navbar */}
      <Logout />

      <div className="bg-transparent m-4">
        <div className="flex justify-end">
          <label className="flex cursor-pointer gap-2">
            <input
              type="checkbox"
              value="night"
              className="toggle theme-controller"
              onChange={toggleTheme}
              checked={darkMode}
            />
          </label>
        </div>

        <h3 className="text-xl font-medium text-left uppercase">
        WELCOME {user && user.name ? user.name : "Guest"}
        </h3>

        <div className="mt-4">
          <p className="text-right">{dateTime}</p>
        </div>
      </div>

      {/* Task Form */}
      <div className="flex justify-center align-center">
        <form className="space-y-4 mx-8" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="date"
            className="input input-bordered w-full"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select
            className="select input-bordered w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>

          <button className="btn btn-primary w-full hover:bg-primary">
            {editingIndex !== null ? (
              <>
                 Update Task
              </>
            ) : (
              <>
                <AddIcon /> Add Task
              </>
            )}
          </button>
        </form>
      </div>

      <h2 className="text-xl font-medium text-center m-4">MY TASKS</h2>

      {/* Task List */}
      <div className="flex justify-center align-center m-8">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(index)}
                      />
                    </label>
                  </th>
                  <td className={task.completed ? "line-through" : ""}>
                    {task.title}
                  </td>
                  <td className={task.completed ? "line-through" : ""}>
                    {task.description}
                  </td>
                  <td className={task.completed ? "line-through" : ""}>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className={task.completed ? "line-through" : ""}>
                    {getPriorityLabel(task.priority)}
                  </td>
                  <td>
                    <button
                      className="btn bg-green-700 text-white hover:bg-green-600 border-transparent"
                      onClick={() => handleEdit(index)}
                      aria-label="Edit Task"
                    >
                      <EditIcon /> Edit
                    </button>{" "}
                    <button
                      className="btn bg-red-700 text-white hover:bg-red-600 border-transparent"
                      onClick={() => handleDelete(index)}
                      aria-label="Delete Task"
                    >
                      <DeleteIcon /> Delete
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

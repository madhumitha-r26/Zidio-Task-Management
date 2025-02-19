import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Logout from "./Logout";
import './Dashboard.css'; // Import the CSS file

function Dashboard() {
  const location = useLocation();
  const [user, setUser ] = useState(null);
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch user data from the database
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/users/dashboard", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setUser (data.user);
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  // Keep updating the time
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
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
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      alert("Please enter all fields!");
      return;
    }

    const newTask = { title, description, dueDate, priority, completed: false };

    if (editingIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? { ...newTask, completed: task.completed } : task
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    // Clear input fields
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
  };

  // Delete task
  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
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

  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
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

        <h3 className="text-xl font-medium text-left">
          WELCOME {user ? user.name : "Guest"}
        </h3>

        <div className="mt-4">
          <p className="text-right">{date.toLocaleString()}</p>
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
                <EditIcon /> Update Task
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
                    {task.dueDate}
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
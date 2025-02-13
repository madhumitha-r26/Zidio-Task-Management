import React, { useEffect, useState } from "react";
import { NavLink,useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "./Navbar";

function Dashboard() {

  const location = useLocation();
  const user = location.state?.user; 

  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // ✅ Keep updating the time
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ✅ Dark mode styles
  const dark_styles = {
    backgroundColor: "black",
    color: "white",
    minHeight: "100vh",
    padding: "20px",
  };

    //------------------add-----------------

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      alert("Enter Task!");
      return;
    }

    if (editingIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex
          ? { title, description, dueDate, completed: task.completed }
          : task
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { title, description, dueDate, completed: false }]);
    }

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  //------------------delete-----------------
  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  //------------------edit-----------------
  const handleEdit = (index) => {
    const task = tasks[index];
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
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

  return (
    <div style={darkMode ? dark_styles : {}}>
      {/* Navbar */}
<Navbar/>

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

        <h3 className="text-xl font-medium text-left">WELCOME {user && user.name}</h3>

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
                  <td className={task.completed ? "line-through" : ""}>{task.title}</td>
                  <td className={task.completed ? "line-through" : ""}>{task.description}</td>
                  <td className={task.completed ? "line-through" : ""}>{task.dueDate}</td>
                  <td>
                    <button
                      className="btn bg-green-700 text-white hover:bg-green-600 border-transparent"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn bg-red-700 text-white hover:bg-red-600 border-transparent"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
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

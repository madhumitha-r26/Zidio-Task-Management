import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

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

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

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
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="bg-ghost text-xl font-bold">My Task Maker</a>
        </div>

        <div className="navbar-end">
          <NavLink to={"/"}>
            <button className="ml-4 btn btn-white hover:bg-white border-transparent">
              Logout
            </button>
          </NavLink>
        </div>
      </div>

      <div>
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

          <div>
            <h3 className="text-xl font-medium text-left">WELCOME</h3>
          </div>

          <div className="mt-4">
            <p className="text-right">{date.toString()}</p>
          </div>
        </div>
      </div>

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

      <div className="flex justify-center align-center m-8">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th> </th>
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
                  <td className={task.completed ? "line-through" : ""}>
                    {task.title}
                  </td>
                  <td className={task.completed ? "line-through" : ""}>
                    {task.description}
                  </td>
                  <td className={task.completed ? "line-through" : ""}>
                    {task.dueDate}
                  </td>
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

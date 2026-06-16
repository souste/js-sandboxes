import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Boxing Cardio Twice this week",
    notes: "Need to build momentum up again after the marathon",
    deadline: "Week 8",
    completed: false,
  },
  {
    id: 2,
    title: "Six Sandbox 90min Blocks",
    notes: "More this week just before the festival on Sunday",
    deadline: "Week 8",
    completed: false,
  },
  {
    id: 3,
    title: "Six Exercism 90min Blocks",
    notes: "More this week just before the festival on Sunday",
    deadline: "Week 8",
    completed: false,
  },
  {
    id: 4,
    title: "12 Applications",
    notes: "I'm not applying nearly enough!!",
    deadline: "Week 8",
    completed: false,
  },
];

export function ToDoListTest() {
  const [tasks, setTasks] = useState(initialTasks);
  const [values, setValues] = useState({ title: "", notes: "", deadline: "" });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({
    title: "",
    notes: "",
    deadline: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = { ...values, id: Date.now(), completed: false };
    setTasks((prev) => [...prev, newTask]);
    setValues({ title: "", notes: "", deadline: "" });
    setShowForm(false);
  };

  const handleDelete = (taskId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (isConfirmed) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
  };

  const handleCompletedToggle = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleShowForm = (task) => {
    setEditingId(task.id);
    setEditValues({
      title: task.title,
      notes: task.notes,
      deadline: task.deadline,
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (event, taskId) => {
    event.preventDefault();
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...editValues } : task,
      ),
    );
    setEditingId(null);
  };

  return (
    <div>
      <div>
        {tasks.map((task) => (
          <div key={task.id} style={{ opacity: task.completed ? 0.5 : 1 }}>
            <strong>Task: {task.title}</strong>
            <p>Notes: {task.notes}</p>
            <p>Deadline: {task.deadline}</p>
            <button onClick={() => handleCompletedToggle(task.id)}>
              {task.completed ? "Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => handleShowForm(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            {editingId === task.id && (
              <form onSubmit={(event) => handleEditSubmit(event, task.id)}>
                <input
                  type="text"
                  name="title"
                  value={editValues.title}
                  onChange={handleEditChange}
                  placeholder="Enter title"
                />
                <input
                  type="text"
                  name="notes"
                  value={editValues.notes}
                  onChange={handleEditChange}
                  placeholder="Enter notes"
                />
                <input
                  type="text"
                  name="deadline"
                  value={editValues.deadline}
                  onChange={handleEditChange}
                  placeholder="Enter deadline"
                />
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => setShowForm(!showForm)}>Create Task</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Enter title"
          />
          <input
            type="text"
            name="notes"
            onChange={handleChange}
            placeholder="Enter notes"
          />
          <input
            type="text"
            name="deadline"
            onChange={handleChange}
            placeholder="Enter deadline"
          />
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}

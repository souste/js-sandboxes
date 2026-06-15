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

export const ToDoList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [values, setValues] = useState({ title: "", notes: "", deadline: "" });
  //   const [editValues, setEditValues] = useState({
  //     title: "",
  //     notes: "",
  //     deadline: "",
  //   });
  //   const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      ...values,
      id: Date.now(),
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setValues({ title: "", notes: "", deadline: "" });
    setFormOpen(false);
  };

  const handleDelete = (taskId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (isConfirmed) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div>
      <h3>To Do List</h3>
      <div>
        {tasks.map((task) => (
          <div key={task.id} style={{ opacity: task.completed ? 0.5 : 1 }}>
            <strong
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              Title: {task.title}
            </strong>
            <p>Notes: {task.notes}</p>
            <p>Deadline: {task.deadline}</p>
            <button onClick={() => handleToggleComplete(task.id)}>
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => handleDelete(task.id)}>Delete Task</button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setFormOpen(!formOpen)}>Create Task</button>
        {formOpen && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <input
              type="text"
              name="notes"
              value={values.notes}
              onChange={handleChange}
              placeholder="Notes"
            />
            <input
              type="text"
              name="deadline"
              value={values.deadline}
              onChange={handleChange}
              placeholder="Deadline"
            />
            <button onSubmit={handleSubmit}>Create Task</button>
          </form>
        )}
      </div>
    </div>
  );
};

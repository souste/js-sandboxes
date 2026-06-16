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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <strong>Task: {task.title}</strong>
            <p>Notes: {task.notes}</p>
            <p>Deadline: {task.deadline}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setShowForm(!showForm)}>Create Task</button>
      {showForm && (
        <form>
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

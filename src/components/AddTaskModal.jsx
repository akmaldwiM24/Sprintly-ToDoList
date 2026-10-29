
import { useState } from "react";
import "./AddTaskModal.css";


function toInputDate(date) {
    if (!date || date === "No due date") return "";

    const months = {
        Jan: "01", Feb: "02", Mar: "03",
        Apr: "04", May: "05", Jun: "06",
        Jul: "07", Aug: "08", Sep: "09",
        Oct: "10", Nov: "11", Dec: "12"
    };

    const [day, month, year] = date.split(" ");

    if (!months[month] || !day || !year) return "";

    return `${year}-${months[month]}-${day.padStart(2, "0")}`;
}

function AddTaskModal({
    task,
    projects = [],
    initialProjectId = "",
    onClose,
    onSave
}) {
   const [form, setForm] = useState({
    title: task?.title ?? "",
    description: task?.description ?? "",
    priority: task?.priority ?? "medium",
    status: task?.status ?? "todo",
    date: toInputDate(task?.date),

    //baru
    projectId: task?.projectId ?? initialProjectId
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) return;

    const formattedDate = form.date
      ? new Date(form.date + "T00:00:00")
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
      : "No due date";

    onSave({
      ...form,
      title: form.title.trim(),
      date: formattedDate,
    });
  }

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title">{task ? "Edit Task" : "Create New Task"}</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="task-description">
            Description
          </label>
          <textarea
            id="task-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
          />

          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <label htmlFor="task-status">Status</label>
          <select
            id="task-status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <label htmlFor="task-project">
              Project
          </label>

          <select
              id="task-project"
              name="projectId"
              value={form.projectId}
              onChange={handleChange}
          >
              <option value="">No Project (Quick Task)</option>

              {projects.map((project) => (
                  <option
                      key={project.id}
                      value={project.id}
                  >
                      {project.name}
                  </option>
              ))}
          </select>

          <label htmlFor="task-date">Deadline</label>
          <input
            id="task-date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <button className="submit-task" type="submit">
            {task ? "Save Changes" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;

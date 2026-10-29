import "./TaskBoard.css";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

function TaskBoard({tasks, onDeleteTask, onEditTask, priorityFilter, onPriorityChange, statusFilter, onStatusChange}) {
  return (
    <section className="task-board" id="tasks">
        <div className="board-toolbar">
           <h2>Task Board</h2>

           <select
            aria-label="Filter tasks by priority"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
           >
             <option value="all">All Priorities</option>
             <option value="high">High Priority</option>
             <option value="medium">Medium Priority</option>
             <option value="low">Low Priority</option>
           </select>

           <select
            aria-label="Filter tasks by status"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>  

      <div className="board-columns">
        {columns.map((column) => {
          const filteredTasks = tasks.filter(
            (task) => task.status === column.id
          );

          return (
            <div className="board-column" key={column.id}>
              <div className="column-header">
                <h3>{column.title}</h3>
                <span>{filteredTasks.length}</span>
              </div>

              <div className="column-tasks">
                {filteredTasks.map((task) => (
                  <article className="task-card" key={task.id}>
                    <span
                      className={`priority-badge ${task.priority}`}
                    >
                      {task.priority}
                    </span>

                    <h4>{task.title}</h4>

                    <p>{task.description}</p>

                    <div className="task-footer">
                        <span>📅 {task.date}</span>

                        <div className="task-actions">
                            <button
                                type="button"
                                className="task-edit"
                                onClick={() => onEditTask(task)}
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                className="task-delete"
                                onClick={() => onDeleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TaskBoard;

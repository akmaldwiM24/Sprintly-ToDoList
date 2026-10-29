import { useState } from "react";
import "./ProjectsPage.css";

function ProjectsPage({
    projects,
    tasks,
    onSaveProject,
    onDeleteProject,
    onAddTask,
    onMarkTaskDone
}) {
    const [formOpen, setFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const [form, setForm] = useState({
        name: "",
        description: ""
    });

    function openAddForm() {
        setEditingProject(null);
        setForm({ name: "", description: "" });
        setFormOpen(true);
    }

    function openEditForm(project) {
        setEditingProject(project);

        setForm({
            name: project.name,
            description: project.description
        });

        setFormOpen(true);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!form.name.trim()) return;

        onSaveProject({
            ...(editingProject
                ? { id: editingProject.id }
                : {}),
            name: form.name.trim(),
            description: form.description.trim()
        });

        setFormOpen(false);
        setEditingProject(null);
    }

    return (
        <section className="projects-page">
            <div className="projects-header">
                <h1>Projects</h1>

                <button type="button" className="uiverse-new" onClick={openAddForm}>
                    <span className="uiverse-plus" aria-hidden="true">
                        +
                    </span>
                    <span>New Project</span>
                </button>
            </div>

            {formOpen && (
                <form
                    className="project-form"
                    onSubmit={handleSubmit}
                >
                    <h2>
                        {editingProject
                            ? "Edit Project"
                            : "Create Project"}
                    </h2>

                    <label htmlFor="project-name">
                        Project Name
                    </label>

                    <input
                        id="project-name"
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value
                            })
                        }
                        required
                    />

                    <label htmlFor="project-description">
                        Description
                    </label>

                    <textarea
                        id="project-description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value
                            })
                        }
                        rows="3"
                    />

                    <div className="project-form-actions">
                        <button type="submit">
                            {editingProject
                                ? "Save Changes"
                                : "Create Project"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setFormOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="projects-grid">
                {projects.length === 0 && (
                    <p>No projects yet. Create your first project!</p>
                )}

                {projects.map((project) => {
                    const projectTasks = tasks.filter(
                        (task) => task.projectId === project.id
                    );

                    const total = projectTasks.length;

                    const completed = projectTasks.filter(
                        (task) => task.status === "done"
                    ).length;

                    const progress = total === 0
                        ? 0
                        : Math.round((completed / total) * 100);

                    return (
                        <article
                            className="project-card"
                            key={project.id}
                        >
                            <h3>{project.name}</h3>

                            <p>{project.description}</p>

                            <div className="project-progress-info">
                                <span>
                                    {completed}/{total} tasks completed
                                </span>

                                <strong>{progress}%</strong>
                            </div>

                            <div
                                className="project-progress"
                                role="progressbar"
                                aria-label={`${project.name} completion`}
                                aria-valuenow={progress}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <div
                                    className="project-progress-fill"
                                    style={{
                                        width: `${progress}%`
                                    }}
                                />

                            </div>

                            <details className="project-task-section">
                                    <summary>
                                        View Tasks ({total})
                                    </summary>

                                    <div className="project-task-list">
                                        {total === 0 ? (
                                            <p className="project-empty">
                                                No tasks yet. Add your first task!
                                            </p>
                                        ) : (
                                            projectTasks.map((task) => (
                                                <div
                                                    className="project-task-item"
                                                    key={task.id}
                                                >
                                                    <div className="project-task-info">
                                                        <strong>{task.title}</strong>

                                                        <span>
                                                            {task.status === "done"
                                                                ? "Done"
                                                                : task.status === "in-progress"
                                                                ? "In Progress"
                                                                : "To Do"}
                                                        </span>
                                                    </div>

                                                    {task.status === "done" ? (
                                                        <span className="project-task-done">
                                                            ✓ Done
                                                        </span>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                onMarkTaskDone(task.id)
                                                            }
                                                        >
                                                            Mark Done
                                                        </button>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </details>

                            <div className="project-actions">
                                <button
                                    type="button"
                                    onClick={() => onAddTask(project.id)}
                                >
                                    + Add Task
                                </button>

                                <button onClick={() => openEditForm(project)}>
                                    Edit
                                </button>

                                <button
                                    className="project-delete"
                                    onClick={() => onDeleteProject(project.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default ProjectsPage;

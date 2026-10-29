
import { useEffect } from "react";
import "./ProjectReport.css";

function ProjectReport({ tasks, onClose }) {
    const total = tasks.length;

    const completed = tasks.filter(
        (task) => task.status === "done"
    ).length;

    const inProgress = tasks.filter(
        (task) => task.status === "in-progress"
    ).length;

    const todo = tasks.filter(
        (task) => task.status === "todo"
    ).length;

    const active = total - completed;

    const completionRate = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    useEffect(() => {
        function handleEscape(e) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    const distribution = [
        { label: "To Do", value: todo, color: "#94A3B8" },
        { label: "In Progress", value: inProgress, color: "#F59E0B" },
        { label: "Done", value: completed, color: "#16A34A" }
    ];

    return (
        <div className="report-overlay">
            <section
                className="report-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="report-title"
            >
                <div className="report-header">
                    <div>
                        <h2 id="report-title">Project Report</h2>
                        <p>Overview of your tasks</p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close report"
                        autoFocus
                    >
                        ✕
                    </button>
                </div>

                <div className="report-summary">
                    <div>
                        <p>Total Tasks</p>
                        <h3>{total}</h3>
                    </div>

                    <div>
                        <p>Completed</p>
                        <h3>{completed}</h3>
                    </div>

                    <div>
                        <p>Active</p>
                        <h3>{active}</h3>
                    </div>
                </div>

                <div className="report-progress-section">
                    <div className="report-progress-header">
                        <h3>Completion Rate</h3>
                        <span>{completionRate}%</span>
                    </div>

                    <div
                        className="report-progress"
                        role="progressbar"
                        aria-label="Completion rate"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={completionRate}
                    >
                        <div
                            className="report-progress-fill"
                            style={{ width: `${completionRate}%` }}
                        ></div>
                    </div>
                </div>

                <div className="report-distribution">
                    <h3>Task Distribution</h3>

                    <div className="distribution-bar">
                        {distribution.map((item) => (
                            <div
                                key={item.label}
                                style={{
                                    width: total === 0
                                        ? "0%"
                                        : `${(item.value / total) * 100}%`,
                                    backgroundColor: item.color
                                }}
                            ></div>
                        ))}
                    </div>

                    <div className="distribution-legend">
                        {distribution.map((item) => (
                            <div key={item.label}>
                                <span
                                    className="legend-dot"
                                    style={{
                                        backgroundColor: item.color
                                    }}
                                ></span>

                                <span>
                                    {item.label}: {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProjectReport;

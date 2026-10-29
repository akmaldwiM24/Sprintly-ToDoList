import "./StatsOverview.css";

const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
];

function isOverdue(task) {
    if (
        task.status === "done" ||
        !task.date ||
        task.date === "No due date"
    ) {
        return false;
    }

    const [day, month, year] = task.date.split(" ");
    const monthIndex = months.indexOf(month);

    if (!day || monthIndex === -1 || !year) {
        return false;
    }

    const deadline = new Date(
        Number(year),
        monthIndex,
        Number(day)
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return deadline < today;
}

function StatsOverview({tasks,onAddTask, onOpenReport}) {

     const totalTasks = tasks.length;

    const completed = tasks.filter(
        (task) => task.status === "done"
    ).length;

    const inProgress = tasks.filter(
        (task) => task.status === "in-progress"
    ).length;

    const overdue = tasks.filter(isOverdue).length;

    const stats = [
        {
            id: 1,
            title: "Completed",
            value: completed,
            color: "#16A34A"
        },
        {
            id: 2,
            title: "In Progress",
            value: inProgress,
            color: "#EAB308"
        },
        {
            id: 3,
            title: "Overdue",
            value: overdue,
            color: "#EF4444"
        }
    ];

    return (
        <section className="stats-overview">

            <div className="stats-card">

                <div className="stats-total">
                    <p>Total Tasks</p>
                    <h2>{totalTasks}</h2>
                </div>

                <div className="stats-list">
                    {stats.map((item) => (
                        <div className="stat-item" key={item.id}>

                            <div className="stat-label">
                                <span
                                    className="stat-indicator"
                                    style={{
                                        backgroundColor: item.color
                                    }}
                                ></span>

                                <p>{item.title}</p>
                            </div>

                            <h3>{item.value}</h3>

                        </div>
                    ))}
                </div>

            </div>

            <button className="stats-action uiverse-action" type="button" onClick={onAddTask}>
                <span className="action-icon" aria-hidden="true">+</span>
                <span>Add New Task</span>
            </button>

            <button className="stats-action uiverse-action" type="button" onClick={onOpenReport}>
                <span className="action-icon" aria-hidden="true">▣</span>
                <span>Project Report</span>
            </button>

        </section>
    );
}

export default StatsOverview;
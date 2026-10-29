
import "./SettingsPage.css";

function SettingsPage({ tasks, projects, theme, onThemeChange }) {

    function handleExportData() {
        const data = {
            app: "SPRINTLY",
            version: 1,
            exportedAt: new Date().toISOString(),
            tasks,
            projects
        };

        const json = JSON.stringify(data, null, 2);

        const blob = new Blob([json], {
            type: "application/json"
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "sprintly-backup.json";

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    }

    return (
        <section className="settings-page">
            <h1>Settings</h1>

            <div className="settings-card">
                <h2>Data Management</h2>

                <p>
                    Manage your tasks and projects data.
                </p>

                <div className="settings-stats">
                    <div>
                        <span>Total Tasks</span>
                        <strong>{tasks.length}</strong>
                    </div>

                    <div>
                        <span>Total Projects</span>
                        <strong>{projects.length}</strong>
                    </div>
                </div>

                <div className="settings-backup">
                    <h3>Backup Your Data</h3>

                    <p>
                        Download your tasks and projects
                        as a JSON file.
                    </p>

                    <button
                        type="button"
                        onClick={handleExportData}
                    >
                        Export Data
                    </button>
                </div>
            </div>

            <div className="settings-card">
                <h2>Appearance</h2>

                <div className="theme-setting">
                    <div>
                        <h3>Dark Mode</h3>
                        <p>Switch between light and dark themes.</p>
                    </div>

                    <label className="theme-switch">
                        <input
                            type="checkbox"
                            role="switch"
                            aria-label="Dark Mode"
                            checked={theme === "dark"}
                            onChange={(e) =>
                                onThemeChange(
                                    e.target.checked ? "dark" : "light"
                                )
                            }
                        />

                        <span className="theme-slider" />
                    </label>
                </div>
            </div>
        </section>
    );
}

export default SettingsPage;

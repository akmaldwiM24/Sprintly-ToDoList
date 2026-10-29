
import { useState } from "react";
import { NavLink } from "react-router";
import "./Sidebar.css";

function Sidebar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const menus = [
        { path: "/", label: "Dashboard" },
        { path: "/tasks", label: "My Tasks" },
        { path: "/projects", label: "Projects" },
        { path: "/settings", label: "Settings" }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-top">
                <h2 className="sidebar-logo">SPRINTLY</h2>

                <button
                    type="button"
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="sidebar-nav"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            <nav
                id="sidebar-nav"
                className={`sidebar-nav ${menuOpen ? "is-open" : ""}`}
                aria-label="Main navigation"
            >
                {menus.map((menu) => (
                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        end={menu.path === "/"}
                        onClick={() => setMenuOpen(false)}
                    >
                        {menu.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;

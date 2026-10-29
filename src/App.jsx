import { Routes, Route, Navigate } from "react-router";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsOverview from "./components/StatsOverview";
import ProjectReport from "./components/ProjectReport";
import ProjectsPage from "./components/ProjectsPage";
import SettingsPage from "./components/SettingsPage";
 

import TaskBoard from "./components/TaskBoard";
import AddTaskModal from "./components/AddTaskModal";
import "./App.css";

const initialTasks = [];

const initialProjects = [];

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
        const savedTasks = localStorage.getItem("sprintly-tasks");

        if (savedTasks !== null) {
            const parsedTasks = JSON.parse(savedTasks);

            if (Array.isArray(parsedTasks)) {
                return parsedTasks;
            }
        }
    } catch (error) {
        console.error("Failed to load tasks:", error);
    }

    return initialTasks;
  });

  useEffect(() => {
    try {
        localStorage.setItem(
            "sprintly-tasks",
            JSON.stringify(tasks)
        );
    } catch (error) {
        console.error("Failed to save tasks:", error);
    }
  }, [tasks]);

  
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showReport, setShowReport] = useState(false);

  function openQuickTask() {
    setEditingTask(null);
    setSelectedProjectId("");
    setShowModal(true);
  }

  function openProjectTask(projectId) {
    setEditingTask(null);
    setSelectedProjectId(projectId);
    setShowModal(true);
  }

  function handleAddTask(newTask) {
    const task = {
      ...newTask,
      id: crypto.randomUUID(),
    };

    setTasks((prevTasks) => [...prevTasks, task]);
    setShowModal(false);
  }

  function handleDeleteTask(taskId) {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
    );
  }

  function handleEditTask(task) {
    setEditingTask(task);
    setSelectedProjectId(task.projectId ?? "");
    setShowModal(true);
  }

  function handleUpdateTask(updatedTask) {
      setTasks((prevTasks) =>
          prevTasks.map((task) =>
              task.id === editingTask.id
                  ? { ...task, ...updatedTask }
                  : task
          )
      );

      setEditingTask(null);
      setShowModal(false);
  }

  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);

    const matchesPriority =
        priorityFilter === "all" ||
        task.priority === priorityFilter;

    const matchesStatus =
        statusFilter === "all" ||
        task.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const taskBoard = (
    <TaskBoard
        tasks={filteredTasks}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
    />
  );

  const [projects, setProjects] = useState(() => {
    try {
        const saved = localStorage.getItem("sprintly-projects");

        if (saved !== null) {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                return parsed;
            }
        }
    } catch (error) {
        console.error("Failed to load projects:", error);
    }

    return initialProjects;
  });

  useEffect(() => {
    try {
        localStorage.setItem(
            "sprintly-projects",
            JSON.stringify(projects)
        );
    } catch (error) {
        console.error("Failed to save projects:", error);
    }
  }, [projects]);

  const [theme, setTheme] = useState(() => {
    try {
        return localStorage.getItem("sprintly-theme") === "dark"
            ? "dark"
            : "light";
    } catch (error) {
        console.error("Failed to load theme:", error);
        return "light";
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
        localStorage.setItem("sprintly-theme", theme);
    } catch (error) {
        console.error("Failed to save theme:", error);
    }
  }, [theme]);

  function handleSaveProject(projectData) {
    if (projectData.id) {
        setProjects((prev) =>
            prev.map((project) =>
                project.id === projectData.id
                    ? { ...project, ...projectData }
                    : project
            )
        );
    } else {
        const newProject = {
            ...projectData,
            id: crypto.randomUUID()
        };

        setProjects((prev) => [...prev, newProject]);
    }
  }

function handleDeleteProject(projectId) {
    const hasTasks = tasks.some(
        (task) => task.projectId === projectId
    );

    if (hasTasks) {
        window.alert(
            "Move or delete this project's tasks first."
        );
        return;
    }

    const confirmed = window.confirm(
        "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    setProjects((prev) =>
        prev.filter((project) => project.id !== projectId)
    );
  }

  function handleMarkTaskDone(taskId) {
    setTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id === taskId
                ? { ...task, status: "done" }
                : task
        )
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="dashboard-area">
        <Header searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
        />

        <main className="main-content">

          <Routes>

              {/* DASHBOARD */}
              <Route
                  path="/"
                  element={
                      <>
                          <h1>Dashboard</h1>

                          <StatsOverview
                            tasks={tasks}
                            onAddTask={openQuickTask}
                            onOpenReport={() => setShowReport(true)}
                          />

                          {taskBoard}
                      </>
                  }
              />

              {/* MY TASKS */}
              <Route
                  path="/tasks"
                  element={
                      <>
                          <h1>My Tasks</h1>
                          {taskBoard}
                      </>
                  }
              />

              {/* PROJECTS */}
              <Route
                path="/projects"
                element={
                    <ProjectsPage
                        projects={projects}
                        tasks={tasks}
                        onSaveProject={handleSaveProject}
                        onDeleteProject={handleDeleteProject}
                        onAddTask={openProjectTask}
                        onMarkTaskDone={handleMarkTaskDone}
                    />
                }
              />

              {/* SETTINGS */}
              <Route
                  path="/settings"
                  element={
                      <SettingsPage
                          tasks={tasks}
                          projects={projects}
                          theme={theme}
                          onThemeChange={setTheme}
                      />
                  }
              />

              {/* UNKNOWN PAGE */}
              <Route
                  path="*"
                  element={<Navigate to="/" replace />}
              />

          </Routes>
          
        </main>

      </div>

      {showModal && (
          <AddTaskModal
            task={editingTask}
            projects={projects}
            initialProjectId={selectedProjectId}
            onClose={() => {
                setEditingTask(null);
                setSelectedProjectId("");
                setShowModal(false);
            }}
            onSave={
                editingTask ? handleUpdateTask : handleAddTask
            }
        />  
      )}

      {showReport && (
        <ProjectReport
          tasks={tasks}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
}

export default App;

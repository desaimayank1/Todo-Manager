import { useEffect, useMemo } from "react";
import { useTaskStore } from "../../store/taskStore";
import TaskCarousel from "../tasks/TaskCarousel";
import TaskTable from "../tasks/TaskTable";

const API = import.meta.env.VITE_API_URL;

export default function DashboardPage() {
const { tasks, user,setTasks,setUser,setUserList} = useTaskStore();

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found. Probably not logged in.");
    return;
  }

  const fetchAll = async () => {
    try {
      const [usersRes, tasksRes] = await Promise.all([
        fetch(`${API}/tasks/users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!usersRes.ok) throw new Error("Failed to fetch users");
      if (!tasksRes.ok) throw new Error("Failed to fetch tasks or user");

      const usersData = await usersRes.json();
      const tasksData = await tasksRes.json();

      setUserList(usersData);

      setUser({
        id: tasksData?.user.id,
        name: tasksData?.user.name,
        email: tasksData?.user.email,
        role: tasksData?.user.role,
      });

      setTasks(tasksData?.tasks || []);

    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  fetchAll();
}, []);



  
  const assigned = useMemo(() => tasks.filter((t) => t.assignedToId === user?.id),[tasks]);

  return (
    <div className="p-6 space-y-2">
      <h2 className="text-2xl font-semibold">
        Welcome, {user?.name ?? "User"}!
      </h2>


      <div className="mb-0">
        <h3 className="text-lg font-semibold">Assigned to You</h3>
      </div>

      <TaskCarousel tasks={assigned} />

      <TaskTable tasks={tasks} />
    </div>
  );
}

import type { Task } from "../../types/task";
import { Link } from "react-router-dom";
import TaskStatusBadge from "./TaskStatusBadge";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Link
      to={`/tasks/${task.id}`}
      className="block bg-white rounded-lg shadow p-4 border hover:shadow-md transition"
    >
      <div className="font-semibold">{task.title}</div>

      <div className="text-sm text-gray-500">
        Due: {task.dueDate?.split("T")[0] ?? "—"}
      </div>

      <div className="mt-2">
        <TaskStatusBadge status={task.status} />
      </div>
    </Link>
  );
}

import type { TaskStatus } from "../../types/task";

const statusColor: Record<TaskStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className={`px-4 py-2 rounded-lg border text-sm font-semibold ${statusColor[status]}`}>
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
}

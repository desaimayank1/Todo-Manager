import type { Task } from "../../types/task";
import TaskStatusBadge from "./TaskStatusBadge";

interface Props {
  title: string;
  color: string;
  tasks: Task[];
}

export default function TaskPrioritySection({ title, color, tasks }: Props) {
  return (
    <div className={`rounded-lg p-4 text-white ${color}`}>
      <div className="font-semibold mb-2">{title}</div>

      {tasks.map((task) => (
        <div key={task.id} className="bg-white text-black p-2 rounded mb-2">
          <div className="font-medium">{task.title}</div>
          <div className="text-sm text-gray-500">
            {task.dueDate?.split("T")[0]}
          </div>
          <TaskStatusBadge status={task.status} />
        </div>
      ))}
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import type { Task } from "../../types/task";
import { Calendar } from "lucide-react";

export default function TaskCarousel({ tasks }: { tasks: Task[] }) {
  const navigate=useNavigate()
  const getPriorityHeaderStyle = (p?: string) => {
    switch (p) {
      case "HIGH":
        return "bg-[#D8414E] text-white";
      case "CRITICAL":
        return "bg-red-700 text-white";
      case "MEDIUM":
        return "bg-[#EDB223] text-white";
      case "LOW":
        return "bg-[#66B57D] text-white";
    }
  };

 return (
  <div className="overflow-x-auto flex gap-4 py-2 custom-scrollbar">

    {tasks.length === 0 && (
      <div
        className="
          min-w-64 
          bg-white 
          rounded-2xl 
          border 
          border-dashed 
          border-gray-300 
          shadow-sm 
          flex 
          flex-col 
          items-center 
          justify-center 
          text-center 
          p-6
        "
      >
        {/* top ribbon muted */}
        <div className="w-full rounded-t-2xl px-4 py-2 font-semibold text-sm bg-gray-300 text-gray-700">
          No Tasks
        </div>

        <div className="p-6">
          <div className="font-semibold text-gray-800 mb-2">
            No assigned tasks yet
          </div>

          <p className="text-sm text-gray-500">
            Tasks assigned to you will appear here.
          </p>
        </div>
      </div>
    )}

    {tasks.length > 0 &&
      tasks.map((t) => (
        <div
          key={t.id}
          className="
            min-w-64 
            bg-white 
            rounded-2xl 
            border 
            border-gray-200/60 
            shadow-sm 
            hover:shadow-xl 
            transition-all 
            duration-200 
            overflow-hidden
          "
          onClick={() => navigate(`/tasks/${t.id}`)}
        >
          <div
            className={`
              w-full 
              rounded-t-2xl 
              px-4 
              py-2 
              font-semibold 
              text-sm 
              ${getPriorityHeaderStyle(t.priority)}
            `}
          >
            {t.priority ? `${t.priority} Priority` : "No Priority"}
          </div>

          <div className="p-5">
            <div className="font-semibold text-gray-900 text-lg leading-snug line-clamp-2 mb-2">
              {t.title}
            </div>

            <div className="mt-2 text-sm text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {t.dueDate ? t.dueDate.split("T")[0] : "No due date"}
            </div>
          </div>
        </div>
      ))}
  </div>
);

}

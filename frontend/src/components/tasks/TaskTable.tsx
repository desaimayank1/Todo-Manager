import { useState } from "react";
import { MoreVertical } from "lucide-react";
import type { Task } from "../../types/task";
import TaskStatusBadge from "./TaskStatusBadge";
import { useNavigate } from "react-router-dom";

export default function TaskTable({ tasks }: { tasks: Task[] }) {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">("all");
  const pageSize = 5;
  const navigate=useNavigate()
  const filteredTasks = tasks.filter(task => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return task.status === "PENDING";
    if (activeTab === "completed") return task.status === "COMPLETED";
    return true;
  });

  const paginated = filteredTasks.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredTasks.length / pageSize);

  const emptyRowsCount = pageSize - paginated.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4">

      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === "all"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          All Tasks
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === "pending"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === "completed"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Task
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">
                
              </th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((t) => (
              <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                onClick={()=>navigate(`/tasks/${t.id}`)}
               >
                <td className="px-6 py-4 text-sm text-gray-900">{t.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {t.dueDate ? new Date(t.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {t.priority || 'Medium'}
                </td>
                <td className="px-6 py-4">
                  <TaskStatusBadge status={t.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {/* Empty rows to maintain consistent height */}
            {Array.from({ length: emptyRowsCount }).map((_, index) => (
              <tr key={`empty-${index}`} className="border-b border-gray-100">
                <td className="px-6 py-4 text-sm">&nbsp;</td>
                <td className="px-6 py-4 text-sm">&nbsp;</td>
                <td className="px-6 py-4 text-sm">&nbsp;</td>
                <td className="px-6 py-4 text-sm">&nbsp;</td>
                <td className="px-6 py-4 text-sm">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 px-6 py-4 border-t border-gray-200">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`w-2 h-2 rounded-full transition-colors ${
                pageNum === page ? "bg-gray-800" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
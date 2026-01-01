import { useNavigate, useParams } from "react-router-dom";
import { useTaskStore } from "../../store/taskStore";
import { useState } from "react";
import EditTaskModal from "../tasks/EditTaskModal";
import DeleteConfirmModal from "../tasks/DeleteConfirmModal";
import TaskStatusBadge from "../tasks/TaskStatusBadge";
import { Calendar, Flag, Edit3, Trash2, ArrowLeft, RefreshCcw, SlidersHorizontal } from "lucide-react";
import type { PriorityLevel, TaskStatus } from "../../types/task";
const API = import.meta.env.VITE_API_URL;

export default function TaskDetailPage() {
    const navigate = useNavigate()
    const { id } = useParams();
    const { tasks, user, updateTask,userList } = useTaskStore();

    const task = tasks.find((t) => t.id === id);

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);
    const [priorityOpen, setPriorityOpen] = useState(false);

    const statusOptions: TaskStatus[] = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
    const priorityOptions: PriorityLevel[] = ["LOW", "MEDIUM", "HIGH"];

    const handleStatusSelect = async (s: TaskStatus) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${API}/tasks/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    status: s
                }),
            })

            if (!res.ok) {
                throw new Error("Unauthorized or server error");
            }
            const data = await res.json();
            updateTask(data);
            setStatusOpen(false);

        } catch (error) {
            console.log("error changing status", error);
        }
    };

    const handlePrioritySelect = async (p: PriorityLevel) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${API}/tasks/${id}/priority`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    priority: p
                }),
            })

            if (!res.ok) {
                throw new Error("Unauthorized or server error");
            }
            const data = await res.json();
            updateTask(data);
            setPriorityOpen(false);

        } catch (error) {
            console.log("error changing priority", error);
        }
    };

    const handleEditTask = () => {
        if (user?.role == "ADMIN" || user?.id == task?.createdById) {
            setEditOpen(true)
        } else {
            alert("You do not have permission to edit this task.");
        }
    }

    const handleDelete = () => {
        if (user?.role == "ADMIN" || user?.id == task?.createdById) {
            setDeleteOpen(true)
        } else {
            alert("You do not have permission to delete this task.");
        }
    }

    function formatDate(isoString: string): string {
        return new Date(isoString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }


    if (!task) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Task Not Found</h2>
                    <p className="text-gray-600 mb-6">The task you're looking for doesn't exist.</p>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={() => navigate("/dashboard")}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Tasks
                    </button>
                </div>
            </div>
        );
    }

    const getPriorityColor = (priority: string) => {
        switch (priority?.toLowerCase()) {
            case "high":
                return "text-red-700 bg-red-100 border-red-300";
            case "medium":
                return "text-amber-700 bg-amber-100 border-amber-300";
            case "low":
                return "text-blue-700 bg-blue-100 border-blue-300";
            default:
                return "text-gray-700 bg-gray-100 border-gray-300";
        }
    };

    return (
        <div className="min-h-[70%] bg-gray-50 rounded-lg">
            {/* Header Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-0 rounded-lg">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:cursor-pointer transition-colors"
                            onClick={() => navigate("/dashboard")}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Tasks</span>
                        </button>

                        <div className="flex gap-2 flex-wrap">

                            <button
                                onClick={handleEditTask}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                            >
                                <Edit3 className="w-4 h-4" />
                                Edit
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setStatusOpen(v => !v);
                                        setPriorityOpen(false);
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                                >
                                    <RefreshCcw className="w-4 h-4" />
                                    Change Status
                                </button>

                                {statusOpen && (
                                    <div className="absolute left-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                                        {statusOptions.map(s => (
                                            <div
                                                key={s}
                                                onClick={() => handleStatusSelect(s)}
                                                className="px-4 py-2 text-sm cursor-pointer rounded-lg hover:bg-gray-100"
                                            >
                                                {s.replace(/_/g, " ")}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => {
                                        if (user?.role == "ADMIN" || user?.id == task?.createdById) {
                                            setPriorityOpen(v => !v);
                                            setStatusOpen(false);
                                        } else {
                                            alert("You do not have permission to change priority of this task.");
                                        }
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Change Priority
                                </button>

                                {priorityOpen && (
                                    <div className="absolute left-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                                        {priorityOptions.map(p => (
                                            <div
                                                key={p}
                                                onClick={() => handlePrioritySelect(p)}
                                                className="px-4 py-2 text-sm cursor-pointer rounded-lg hover:bg-gray-100"
                                            >
                                                {p}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {task.title}
                    </h1>

                    <div className="flex items-center gap-4 flex-wrap">
                        <TaskStatusBadge status={task.status} />

                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border-2 font-semibold ${getPriorityColor(task.priority)}`}>
                            <Flag className="w-4 h-4" />
                            {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) + " PRIORITY" : "No PRIORITY"}
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-5 h-5" />
                            <span className="font-medium">Due: {task.dueDate?.split("T")[0] ?? "No due date"}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                        Description
                    </h2>
                    <div className="prose max-w-none">
                        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                            {task.description || "No description provided for this task."}
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="text-sm font-medium text-gray-600 mb-2">Created</div>
                        <div className="text-lg font-semibold text-gray-900">{formatDate(task.createdAt??"")}</div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="text-sm font-medium text-gray-600 mb-2">Last Modified</div>
                        <div className="text-lg font-semibold text-gray-900">{formatDate(task.updatedAt??"")}</div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="text-sm font-medium text-gray-600 mb-2">Assigned To</div>
                        <div className="text-lg font-semibold text-gray-900">{userList.find(u => u.id === task.assignedToId)?.name ?? "Unknown"}</div>
                    </div>
                </div>
            </div>

            {editOpen && (
                <EditTaskModal
                    task={task}
                    onClose={() => setEditOpen(false)}
                />
            )}

            {deleteOpen && (
                <DeleteConfirmModal
                    task={task}
                    onClose={() => setDeleteOpen(false)}
                />
            )}
        </div>
    );
}
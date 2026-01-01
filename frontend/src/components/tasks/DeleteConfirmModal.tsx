import type { Task } from "../../types/task";
const API = import.meta.env.VITE_API_URL;
import { useTaskStore } from "../../store/taskStore";
import { useNavigate } from "react-router-dom";

interface Props {
    task: Task;
    onClose: () => void;
}

export default function DeleteConfirmModal({ onClose, task }: Props) {
    const { deleteTask}=useTaskStore()
    const navigate=useNavigate();
    const handleDelete = async() => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await fetch(`${API}/tasks/${task.id}`, {
                method:"DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to delete task");
            deleteTask(task.id);
            navigate("/dashboard");
        } catch (error) {
            console.log("error deleting", error)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow p-5 w-95">
                <h3 className="text-lg font-semibold mb-3">Delete Task</h3>

                <p className=" mb-6">
                    Are you sure you want to delete this task? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-2 border rounded-xl!">
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="px-3 py-2 bg-red-600 text-white rounded-xl!"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

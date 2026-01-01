import { useState } from "react";
import type { Task } from "../../types/task";
import { useTaskStore } from "../../store/taskStore";
const API = import.meta.env.VITE_API_URL;

interface Props {
  task: Task;
  onClose: () => void;
}

export default function EditTaskModal({ task, onClose }: Props) {
  const { updateTask, userList } = useTaskStore();

  const [form, setForm] = useState<Task>({
    ...task,
    assignedToId: (task as any).assignedTo || ""  
  });

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Not authenticated");
        return;
      }

      const res = await fetch(`${API}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          dueDate: form.dueDate,
          assignedTo: (form as any).assignedTo,  
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to update task");
      }

      const updated = await res.json();
      updateTask(updated);
      onClose();

    } catch (error: any) {
      console.error("Task update error:", error);
      alert(error.message || "Something went wrong while updating");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-105 rounded-lg shadow p-5">
        <h3 className="text-lg font-semibold mb-3">Edit Task</h3>

        <input
          className="border p-2 w-full mb-2 rounded-md"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="border p-2 w-full mb-2 rounded-md"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="border p-2 w-full mb-2 rounded-md"
          value={(form as any).assignedTo || ""}
          onChange={(e) =>
            setForm({ ...form, assignedTo: e.target.value } as any)
          }
        >
          <option value="" disabled>
            Assign to
          </option>

          {userList.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name || u.email}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 w-full mb-2 rounded-md"
          onChange={(e) =>
            setForm({
              ...form,
              dueDate: new Date(e.target.value).toISOString(),
            })
          }
        />

        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onClose} className="px-3 py-2 border rounded-xl">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 py-2 bg-blue-600 text-white rounded-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

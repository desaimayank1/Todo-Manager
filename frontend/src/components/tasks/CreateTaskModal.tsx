import { useState } from "react";
import { useTaskStore } from "../../store/taskStore";
const API = import.meta.env.VITE_API_URL;

interface Props {
    onClose: () => void;
}



export default function CreateTaskModal({ onClose }: Props) {
    const { addTask,userList} = useTaskStore();
    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "",
        dueDate: "",
        assignedTo: "",
    });

    
    const handleSubmit = async () => {

        const { title, description, priority, dueDate,assignedTo } = form;

        if (!title.trim() || !description.trim() || !priority.trim() || !dueDate) {
            alert("All fields are required");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Not authenticated");
            return;
        }

        try {
            const res = await fetch(`${API}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    priority,
                    dueDate,
                    assignedTo,
                }),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || "Task creation failed");
            }
            
            const data=await res.json();
            console.log(data);
            addTask(data)
            onClose()

        } catch (err: any) {
            console.error("Error creating task:", err);
            alert(err.message || "Something went wrong");
        }
    };


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-5">
            <div className="bg-white w-full max-w-md rounded-lg shadow p-5">
                <h3 className="text-lg font-semibold mb-3">Create Task</h3>

                <input
                    type="text"
                    placeholder="Task title"
                    className="border p-2 w-full mb-2 rounded-md"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <textarea
                    placeholder="Description"
                    className="border p-2 w-full mb-2 rounded-md"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />

                <select
                    className="border p-2 w-full mb-2 rounded-md"
                    value={form.priority}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            priority: e.target.value as "LOW" | "MEDIUM" | "HIGH",
                        })
                    }
                >
                    <option value="" disabled>
                        Select priority
                    </option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>

                {/* NEW ASSIGN SELECT */}
                <select
                    className="border p-2 w-full mb-2 rounded-md"
                    value={form.assignedTo}
                    onChange={(e) =>
                        setForm({ ...form, assignedTo: e.target.value })
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
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                />

                <div className="flex justify-end gap-2 mt-3">
                    <button onClick={onClose} className="px-3 py-2 border rounded-xl">
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-3 py-2 bg-blue-600 text-white rounded-xl"
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </div>
    );
}
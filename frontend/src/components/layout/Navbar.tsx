import { Plus, UserCircle } from "lucide-react";
import type { FC } from "react";
import { useState } from "react";
import CreateTaskModal from "../tasks/CreateTaskModal";
import { useTaskStore } from "../../store/taskStore";



const Navbar: FC = () => {
  const {setUser,setTasks,setUserList}=useTaskStore()
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    console.log("logout clicked");
    localStorage.removeItem("token");
    setUser(null);
    setTasks([]);
    setUserList([]);
    setProfileOpen(false);
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="w-full bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-semibold">Task Manager</div>

        <div className="flex gap-4 items-center">

          <button
            onClick={() => setIsCreateOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <Plus className="w-7 h-7" />
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(v => !v)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <UserCircle className="w-8 h-8" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50">
                <div
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded-lg"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isCreateOpen && (
        <CreateTaskModal onClose={() => setIsCreateOpen(false)} />
      )}
    </>
  );
};

export default Navbar;

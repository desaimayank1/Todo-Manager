import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage"; 
import DashboardPage from "./components/pages/DashboardPage";
import TaskDetailPage from "./components/pages/TaskDetailsPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import { useTaskStore } from "./store/taskStore";
import SignupPage from "./components/pages/SignupPage";

export default function App() {
  const { user } = useTaskStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginPage />}/>
         <Route path="/login" element={<LoginPage />} />
         <Route path="/signup" element={<SignupPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

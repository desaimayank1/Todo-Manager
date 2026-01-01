import { useState } from "react";
import AuthCard from "../auth/AuthCard";
import { Lock, Mail, Shield, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
type Role = 'USER' | 'ADMIN';
const API = import.meta.env.VITE_API_URL;

const SignupPage: React.FC = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER' as Role
  });

  const handleSubmit = async () => {
  const { name, email, password, role } = formData;

  if (!name.trim() || !email.trim() || !password.trim() || !role) {
    console.error("All fields are required");
    alert("Fill all fields first.");
    return;
  }

  try {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Signup failed:", err);
      alert(err.message || "Registration failed");
      return;
    }

    navigate("/login")

  } catch (error) {
    console.error("Error registering:", error);
    alert("Network or server error");
  }
};


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  return (
    <AuthCard>
      <div className="px-8 py-5">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-500 text-sm">Sign up to get started with task management</p>
        </div>

        <div className="space-y-3" >
          <div className="group">
            <label htmlFor="name" className="block text-[16px]! font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-[50%] -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full pl-11! pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="group">
            <label htmlFor="email" className="block text-[16px]! font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-[50%] -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full pl-11! pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="group">
            <label htmlFor="password" className="block text-[16px]! font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-[50%] -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-11! pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="group">
            <label htmlFor="role" className="block text-[16px]! font-semibold text-gray-700 mb-1">
              Account Role
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-[50%] -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full pl-11! pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer transition-all"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              <div className="absolute right-3 top-[40%] -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </div>

        <div className="mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>
          <button
            onClick={()=>navigate("/login")}
            className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
          >
            Log in instead
          </button>
        </div>
      </div>
    </AuthCard>
  );
};

export default SignupPage;
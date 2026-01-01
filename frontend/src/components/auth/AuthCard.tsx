import React from "react";
import { Check } from 'lucide-react';

const AuthCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur rounded-lg p-2">
                <Check className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-2xl font-bold text-white">Task Manager</h1>
            </div>
          </div>

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;

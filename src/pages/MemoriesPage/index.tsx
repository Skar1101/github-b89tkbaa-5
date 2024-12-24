import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../utils/auth';
import DashboardHeader from '../DashboardPage/components/DashboardHeader';

export default function MemoriesPage() {
  const session = auth.getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />
      <main className="p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">Memories</h1>
          {/* Add Memories page content here */}
        </div>
      </main>
    </div>
  );
}
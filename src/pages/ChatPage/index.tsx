import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../utils/auth';
import DashboardHeader from '../DashboardPage/components/DashboardHeader';
import ChatOptions from './components/ChatOptions';

export default function ChatPage() {
  const session = auth.getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />
      <main className="p-6">
        <div className="max-w-5xl mx-auto">
          <ChatOptions />
        </div>
      </main>
    </div>
  );
}
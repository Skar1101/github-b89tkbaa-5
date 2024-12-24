import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import DashboardHeader from '../DashboardPage/components/DashboardHeader';
import ChatSummary from './components/ChatSummary';
import ChatInsights from './components/ChatInsights';
import MoodTopics from './components/MoodTopics';
import NextActions from './components/NextActions';

export default function ChatAnalysisPage() {
  const location = useLocation();
  const chatData = location.state?.chatData;

  if (!chatData) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />
      <main className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <ChatSummary summary={chatData.summary} highlights={chatData.highlights} />
          <ChatInsights insights={chatData.insights} />
          <MoodTopics mood={chatData.mood} topics={chatData.topics} />
          <NextActions actions={chatData.nextActions} />
        </div>
      </main>
    </div>
  );
}
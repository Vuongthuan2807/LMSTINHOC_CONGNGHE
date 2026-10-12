import React from 'react';
import { useAppStore } from './store/useAppStore';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/Home/HomePage';
import { LessonsPage } from './pages/Lessons/LessonsPage';
import { ExercisesPage } from './pages/Exercises/ExercisesPage';
import { ExamsPage } from './pages/Exams/ExamsPage';
import { GamesPage } from './pages/Games/GamesPage';
import { AIBookGameStudio } from './pages/AIGames/AIBookGameStudio';
import { AdminPage } from './pages/Admin/AdminPage';

export default function App() {
  const { activeTab } = useAppStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F9FD]">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'lessons' && <LessonsPage />}
        {activeTab === 'exercises' && <ExercisesPage />}
        {activeTab === 'exams' && <ExamsPage />}
        {activeTab === 'games' && <GamesPage />}
        {activeTab === 'ai-games' && <AIBookGameStudio />}
        {activeTab === 'admin' && <AdminPage />}
      </main>

      <Footer />
    </div>
  );
}

import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import CreateEditPostPage from "./pages/CreateEditPostPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <div className="min-h-screen bg-background bg-hero-radial text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-10 sm:px-6 lg:px-8">
        <Navbar />
        <main className="flex-1 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/posts/new" element={<CreateEditPostPage mode="create" />} />
            <Route path="/posts/:postId/edit" element={<CreateEditPostPage mode="edit" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import Dashboard from "./pages/dashboard/Dashboard";
import OrganizationDashboard from "./pages/dashboard/OrganizationDashboard";
import ResumeBuilder from "./pages/resume/ResumeBuilder";
import ResumeTemplateSelection from "./pages/resume/ResumeTemplateSelection";
import AptitudeTestPage from "./pages/practice/AptitudeTestPage";
import DSAPracticePage from "./pages/practice/DSAPracticePage";
import ProfilePage from "./pages/user/ProfilePage";
import NotFound from "./pages/NotFound";

// Create the mock interview page and study resources page
import MockInterviewPage from "./pages/practice/MockInterviewPage";
import StudyResourcesPage from "./pages/resources/StudyResourcesPage";
import AIAssistantPage from "./pages/assistant/AIAssistantPage";

// Organization related pages
import CandidatesPage from "./pages/organization/CandidatesPage";
import AnalyticsPage from "./pages/organization/AnalyticsPage";
import SettingsPage from "./pages/organization/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* User routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume-builder" element={<ResumeTemplateSelection />} />
            <Route path="/resume-builder/:templateId" element={<ResumeBuilder />} />
            <Route path="/practice/aptitude" element={<AptitudeTestPage />} />
            <Route path="/practice/dsa" element={<DSAPracticePage />} />
            <Route path="/practice/interview" element={<MockInterviewPage />} />
            <Route path="/resources" element={<StudyResourcesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/assistant" element={<AIAssistantPage />} />
            
            {/* Organization routes */}
            <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
            <Route path="/candidates" element={<CandidatesPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

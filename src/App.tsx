
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import JobDetail from "./pages/JobDetail";
import JobApplication from "./pages/JobApplication";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DigitalWorld from "./pages/DigitalWorld";
import TechInnovation from "./pages/category/TechInnovation";
import AIMachineLearning from "./pages/category/AIMachineLearning";
import WebDevelopment from "./pages/category/WebDevelopment";
import CompanyCulture from "./pages/category/CompanyCulture";
import IndustryTrends from "./pages/category/IndustryTrends";
import CaseStudies from "./pages/category/CaseStudies";
import TodayJobs from "./pages/jobs/TodayJobs";
import TechJobs from "./pages/jobs/TechJobs";
import NonTechJobs from "./pages/jobs/NonTechJobs";
import Internships from "./pages/jobs/Internships";
import UrgentRequirements from "./pages/jobs/UrgentRequirements";
import NotFound from "./pages/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchResults from "./components/SearchPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/digital-world" element={<DigitalWorld />} />
            <Route path="/article/:id" element={
              <ProtectedRoute>
                <ArticleDetail />
              </ProtectedRoute>
            } />
            <Route path="/job/:id" element={
              <ProtectedRoute>
                <JobDetail />
              </ProtectedRoute>
            } />
            <Route path="/job/:id/apply" element={
              <ProtectedRoute>
                <JobApplication />
              </ProtectedRoute>
            } />
            <Route path="/articles" element={
              <ProtectedRoute>
                <Articles />
              </ProtectedRoute>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category/tech-innovation" element={
              <ProtectedRoute>
                <TechInnovation />
              </ProtectedRoute>
            } />
            <Route path="/category/ai-machine-learning" element={
              <ProtectedRoute>
                <AIMachineLearning />
              </ProtectedRoute>
            } />
            <Route path="/category/web-development" element={
              <ProtectedRoute>
                <WebDevelopment />
              </ProtectedRoute>
            } />
            <Route path="/category/company-culture" element={
              <ProtectedRoute>
                <CompanyCulture />
              </ProtectedRoute>
            } />
            <Route path="/category/industry-trends" element={
              <ProtectedRoute>
                <IndustryTrends />
              </ProtectedRoute>
            } />
            <Route path="/category/case-studies" element={
              <ProtectedRoute>
                <CaseStudies />
              </ProtectedRoute>
            } />
            <Route path="/jobs/today" element={
              <ProtectedRoute>
                <TodayJobs />
              </ProtectedRoute>
            } />
            <Route path="/jobs/tech" element={
              <ProtectedRoute>
                <TechJobs />
              </ProtectedRoute>
            } />
            <Route path="/jobs/non-tech" element={
              <ProtectedRoute>
                <NonTechJobs />
              </ProtectedRoute>
            } />
            <Route path="/jobs/internships" element={
              <ProtectedRoute>
                <Internships />
              </ProtectedRoute>
            } />
            <Route path="/jobs/urgent" element={
              <ProtectedRoute>
                <UrgentRequirements />
              </ProtectedRoute>
            } />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import About from "./pages/About";
import Contact from "./pages/Contact";
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
import { LogIn } from "lucide-react";
import Register from "./components/Register";
import Login from "./components/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/category/tech-innovation" element={<TechInnovation />} />
          <Route path="/category/ai-machine-learning" element={<AIMachineLearning />} />
          <Route path="/category/web-development" element={<WebDevelopment />} />
          <Route path="/category/company-culture" element={<CompanyCulture />} />
          <Route path="/category/industry-trends" element={<IndustryTrends />} />
          <Route path="/category/case-studies" element={<CaseStudies />} />
          <Route path="/jobs/today" element={<TodayJobs />} />
          <Route path="/jobs/tech" element={<TechJobs />} />
          <Route path="/jobs/non-tech" element={<NonTechJobs />} />
          <Route path="/jobs/internships" element={<Internships />} />
          <Route path="/jobs/urgent" element={<UrgentRequirements />} />
          <Route path="/login" element={<Login />} /> {/* Default route for jobs */}
          <Route path="/register" element={<Register />} /> {/* Default route for jobs */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

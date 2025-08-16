import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Checklist from "./pages/Checklist";
import Clients from "./pages/Clients";
import Staff from "./pages/Staff";
import Departments from "./pages/Departments";
import Knowledge from "./pages/Knowledge";
import Settings from "./pages/Settings";
import SLA from "./pages/SLA";
import Reports from "./pages/Reports";
import Performance from "./pages/Performance";
import APIDocumentation from "./pages/APIDocumentation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/sla" element={<SLA />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/integrations/api" element={<APIDocumentation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

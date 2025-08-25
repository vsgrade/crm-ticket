import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
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
import AI from "./pages/AI";
import Macros from "./pages/Macros";
import Templates from "./pages/Templates";
import Escalation from "./pages/Escalation";
import Archive from "./pages/Archive";
import Calendar from "./pages/Calendar";
import Messengers from "./pages/integrations/Messengers";
import Email from "./pages/integrations/Email";
import SMS from "./pages/integrations/SMS";
import AddIntegration from "./pages/integrations/AddIntegration";
import Salary from "./pages/Salary";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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
              <Route path="/ai" element={<AI />} />
              <Route path="/macros" element={<Macros />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/escalation" element={<Escalation />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/integrations/messengers" element={<Messengers />} />
              <Route path="/integrations/email" element={<Email />} />
              <Route path="/integrations/sms" element={<SMS />} />
              <Route path="/integrations/add" element={<AddIntegration />} />
              <Route path="/salary" element={<Salary />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Designs from "./pages/Designs";
import AddDesign from "./pages/AddDesign";
import AddPost from "./pages/AddPost";
import AddClient from "./pages/AddClient";
import CalendarPage from "./pages/Calendar";
import Statistics from "./pages/Statistics";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import SocialIntegrations from "./pages/SocialIntegrations";
import NotFound from "./pages/NotFound";
import DesignDetails from "./pages/DesignDetails";
import { StrictMode } from "react";

// إنشاء مثيل جديد من QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/designs" element={<Designs />} />
              <Route path="/design-details/:id" element={<DesignDetails />} />
              <Route path="/add-design" element={<AddDesign />} />
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/add-client" element={<AddClient />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/clients/:clientId" element={<Clients />} />
              <Route path="/clients/:clientId/designs" element={<Clients />} />
              <Route path="/clients/:clientId/posts" element={<Clients />} />
              <Route path="/clients/:clientId/calendar" element={<Clients />} />
              <Route path="/clients/:clientId/statistics" element={<Clients />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/social-integrations" element={<SocialIntegrations />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;

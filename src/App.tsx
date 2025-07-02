
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
import Auth from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
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
        <AuthProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                <Route path="/designs" element={<ProtectedRoute><Designs /></ProtectedRoute>} />
                <Route path="/design-details/:id" element={<ProtectedRoute><DesignDetails /></ProtectedRoute>} />
                <Route path="/add-design" element={<ProtectedRoute><AddDesign /></ProtectedRoute>} />
                <Route path="/add-post" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
                <Route path="/add-client" element={<ProtectedRoute><AddClient /></ProtectedRoute>} />
                <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
                <Route path="/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
                <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
                <Route path="/clients/:clientId" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
                <Route path="/clients/:clientId/designs" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
                <Route path="/clients/:clientId/posts" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
                <Route path="/clients/:clientId/calendar" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
                <Route path="/clients/:clientId/statistics" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                <Route path="/social-integrations" element={<ProtectedRoute><SocialIntegrations /></ProtectedRoute>} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;

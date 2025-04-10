
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { ClientsHeader } from "@/components/clients/ClientsHeader";
import { ClientForm } from "@/components/clients/ClientForm";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddClient = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex w-full" dir="rtl">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        
        {/* Main content */}
        <main className="flex-1 bg-white">
          {/* Header */}
          <ClientsHeader />
          
          {/* Content */}
          <div className="p-6">
            <div className="mb-6 flex items-center">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 mb-2" 
                onClick={() => navigate("/clients")}
              >
                <ArrowRight className="h-4 w-4" />
                <span>العودة لقائمة العملاء</span>
              </Button>
              
              <div className="flex flex-col mr-4 border-r pr-4">
                <h1 className="text-xl font-bold">إضافة عميل جديد</h1>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <ClientForm />
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AddClient;

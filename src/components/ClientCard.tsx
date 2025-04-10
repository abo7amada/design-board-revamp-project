
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Mail, Phone, Building, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClientCardProps {
  client: {
    id: number;
    name: string;
    logo?: string;
    email: string;
    phone: string;
    contactPerson: string;
    status: string;
    sector: string;
    address?: string;
    projects?: number;
    designs?: number;
    posts?: number;
  };
  viewMode: "grid" | "list";
}

const ClientCard = ({ client, viewMode }: ClientCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط':
        return 'bg-green-100 text-green-800';
      case 'غير نشط':
        return 'bg-red-100 text-red-800';
      case 'قيد المراجعة':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewClient = () => {
    navigate(`/clients/${client.id}`);
  };

  if (viewMode === "grid") {
    return (
      <Card className="hover:shadow-md transition-all duration-300">
        <CardContent className="p-5">
          <div className="flex items-center gap-4 mb-4">
            {client.logo ? (
              <div className="shrink-0 h-14 w-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img src={client.logo} alt={client.name} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="shrink-0 h-14 w-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <Building className="h-6 w-6 text-gray-400" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg">{client.name}</h3>
              <p className="text-sm text-gray-500">{client.contactPerson}</p>
            </div>
          </div>
          
          <Badge className={`mb-4 ${getStatusColor(client.status)}`}>
            {client.status}
          </Badge>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-gray-700">{client.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-gray-700">{client.phone}</span>
            </div>
            {client.address && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{client.address}</span>
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleViewClient}
            className="w-full gap-2"
          >
            <Eye className="h-4 w-4" />
            <span>عرض التفاصيل</span>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            {client.logo ? (
              <div className="shrink-0 h-14 w-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img src={client.logo} alt={client.name} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="shrink-0 h-14 w-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <Building className="h-6 w-6 text-gray-400" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{client.name}</h3>
                <Badge className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">{client.sector}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-700">{client.email}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Phone className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-700">{client.phone}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {client.projects !== undefined && (
              <div className="text-center">
                <p className="text-sm text-gray-500">المشاريع</p>
                <p className="font-medium">{client.projects}</p>
              </div>
            )}
            {client.designs !== undefined && (
              <div className="text-center">
                <p className="text-sm text-gray-500">التصاميم</p>
                <p className="font-medium">{client.designs}</p>
              </div>
            )}
            {client.posts !== undefined && (
              <div className="text-center">
                <p className="text-sm text-gray-500">المنشورات</p>
                <p className="font-medium">{client.posts}</p>
              </div>
            )}
            <Button 
              onClick={handleViewClient}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              <span>عرض</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientCard;

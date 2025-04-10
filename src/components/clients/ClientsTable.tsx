
import { useState } from "react";
import { toast } from "sonner";
import { Edit, Mail, Phone, Trash2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clientsData } from "@/data/clients-data";

interface ClientsTableProps {
  filteredClients: typeof clientsData;
}

export const ClientsTable = ({ filteredClients }: ClientsTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "نشط":
        return <Badge className="bg-green-600 hover:bg-green-700">{status}</Badge>;
      case "غير نشط":
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">{status}</Badge>;
      case "متوقف":
        return <Badge className="bg-red-600 hover:bg-red-700">{status}</Badge>;
      default:
        return <Badge className="bg-gray-600 hover:bg-gray-700">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">العميل</TableHead>
              <TableHead className="text-right">معلومات الاتصال</TableHead>
              <TableHead className="text-right">القطاع</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">المشاريع</TableHead>
              <TableHead className="text-right">آخر نشاط</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow key={client.id} onClick={() => toast.info(`تم النقر على العميل: ${client.name}`)}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mr-3">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">منذ {client.joinDate}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 ml-2" />
                        {client.email}
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <Phone className="h-4 w-4 ml-2" />
                        {client.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{client.sector}</TableCell>
                  <TableCell>{getStatusBadge(client.status)}</TableCell>
                  <TableCell>{client.projectsCount}</TableCell>
                  <TableCell>{client.lastActivity}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                            <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.info(`عرض العميل: ${client.name}`)}>
                          عرض البيانات
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info(`تعديل العميل: ${client.name}`)}>
                          <Edit className="ml-2 h-4 w-4" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => toast.error(`حذف العميل: ${client.name}`)}>
                          <Trash2 className="ml-2 h-4 w-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  <p className="text-gray-500 text-lg">لا يوجد عملاء متطابقين مع معايير البحث</p>
                  <Button 
                    variant="link" 
                    className="mt-4 text-green-600"
                    onClick={() => {
                      // This will be handled in the parent component
                      toast.info("تم طلب عرض جميع العملاء");
                    }}
                  >
                    عرض جميع العملاء
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

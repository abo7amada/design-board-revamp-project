
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Search, Grid, LayoutGrid, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import DesignCard from "@/components/DesignCard";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const designs = [
  {
    id: 1,
    title: "Modern Website Homepage",
    category: "Web Design",
    image: "/placeholder.svg",
    date: "2025-04-01",
    author: "Sarah Johnson",
    likes: 42,
    comments: 8
  },
  {
    id: 2,
    title: "Mobile App Interface",
    category: "UI/UX",
    image: "/placeholder.svg",
    date: "2025-03-28",
    author: "Alex Chen",
    likes: 37,
    comments: 12
  },
  {
    id: 3,
    title: "E-commerce Product Page",
    category: "Web Design",
    image: "/placeholder.svg",
    date: "2025-03-25",
    author: "Miguel Rodriguez",
    likes: 28,
    comments: 6
  },
  {
    id: 4,
    title: "Dashboard Analytics",
    category: "Data Visualization",
    image: "/placeholder.svg",
    date: "2025-03-22",
    author: "Emily Wong",
    likes: 53,
    comments: 15
  },
  {
    id: 5,
    title: "Brand Identity System",
    category: "Branding",
    image: "/placeholder.svg",
    date: "2025-03-20",
    author: "David Pierce",
    likes: 64,
    comments: 9
  },
  {
    id: 6,
    title: "Social Media Campaign",
    category: "Marketing",
    image: "/placeholder.svg",
    date: "2025-03-15",
    author: "Lisa Chen",
    likes: 31,
    comments: 7
  }
];

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter designs based on search query
  const filteredDesigns = designs.filter(design => 
    design.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    design.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    design.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Design Board</h1>
            <p className="text-gray-600 mt-1">Organize and explore your creative design projects</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Design
          </Button>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-10 pr-4 py-2 w-full" 
              placeholder="Search designs, categories, or authors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Designs</DropdownMenuItem>
                <DropdownMenuItem>Web Design</DropdownMenuItem>
                <DropdownMenuItem>UI/UX</DropdownMenuItem>
                <DropdownMenuItem>Branding</DropdownMenuItem>
                <DropdownMenuItem>Marketing</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="outline" 
              className={viewMode === "grid" ? "bg-gray-100" : ""} 
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className={viewMode === "list" ? "bg-gray-100" : ""} 
              onClick={() => setViewMode("list")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Design Cards Grid */}
        <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {filteredDesigns.map((design) => (
            <DesignCard 
              key={design.id} 
              design={design} 
              viewMode={viewMode} 
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredDesigns.length === 0 && (
          <Card className="mt-8">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-blue-50 p-4 mb-4">
                <Search className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No designs found</h3>
              <p className="text-gray-500 text-center max-w-md">
                We couldn't find any designs that match your search criteria. Try adjusting your search or filters.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;

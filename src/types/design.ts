
export interface Design {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
  author: string;
  likes: number;
  comments: number;
  description?: string;
}

export interface DesignCardProps {
  design: Design;
  viewMode: "grid" | "list";
  onStatusChange?: (id: number, newStatus: string) => void;
}

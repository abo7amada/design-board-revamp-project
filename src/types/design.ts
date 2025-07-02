
export interface Design {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  author: string;
  likes: number;
  comments: number;
  description?: string;
  client_id?: string | null;
}

export interface DesignCardProps {
  design: Design;
  viewMode: "grid" | "list";
  onStatusChange?: (id: string, newStatus: string) => void;
}

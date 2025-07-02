import { useDesigns, Design as DBDesign } from "./useDesigns";
import { Design } from "@/types/design";

export const useDesignsData = () => {
  const { designs: dbDesigns, loading, addDesign, updateDesign, deleteDesign, uploadImage, refetch } = useDesigns();

  // Convert database design format to UI design format
  const designs: Design[] = dbDesigns.map((dbDesign: DBDesign) => ({
    id: dbDesign.id,
    title: dbDesign.title,
    category: dbDesign.status || 'مسودة',
    image: dbDesign.image_url || '/placeholder.svg',
    date: new Date(dbDesign.created_at).toLocaleDateString('ar-SA'),
    author: dbDesign.clients?.name || 'غير محدد',
    likes: 0, // These will be implemented later with social features
    comments: 0,
    description: dbDesign.description || '',
    client_id: dbDesign.client_id
  }));

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateDesign(id, { status: newStatus });
  };

  return {
    designs,
    loading,
    addDesign,
    updateDesign,
    deleteDesign,
    uploadImage,
    refetch,
    handleStatusChange
  };
};
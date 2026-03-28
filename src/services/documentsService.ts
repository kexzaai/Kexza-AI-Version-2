import { createClient } from '@/lib/supabase/client';

export interface Document {
  id: string;
  client_id: string;
  file_url: string;
  file_name: string;
  uploaded_by: string | null;
  created_at: string;
}

export const documentsService = {
  async getDocumentsByClient(clientId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('documents')
      .select(`
        *,
        uploader:profiles(full_name)
      `)
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as any[]; // Type later if needed
  },

  /**
   * Upload a file to Supabase Storage and then insert a record in the DB
   */
  async uploadDocument(clientId: string, file: File, uploaderId?: string) {
    const supabase = createClient();
    
    // 1. Upload to storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${clientId}/${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data: storageData } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public url (if bucket is public) or signed URL
    const { data: publicUrlData } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    // 2. Insert into documents table
    const { data: dbData, error: dbError } = await supabase
      .from('documents')
      .insert([{
        client_id: clientId,
        file_name: file.name,
        file_url: publicUrlData.publicUrl,
        uploaded_by: uploaderId || null,
      }])
      .select()
      .single();

    if (dbError) throw dbError;
    return dbData as Document;
  },

  async deleteDocument(id: string, fileUrl: string) {
    const supabase = createClient();
    
    // Extract path from URL (naive approach, can be improved depending on bucket URL)
    const urlObj = new URL(fileUrl);
    const pathSegments = urlObj.pathname.split('/');
    const documentPath = pathSegments.slice(pathSegments.indexOf('documents') + 1).join('/');

    if (documentPath) {
      // 1. Delete from storage
      await supabase.storage.from('documents').remove([documentPath]);
    }

    // 2. Delete from DB
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};

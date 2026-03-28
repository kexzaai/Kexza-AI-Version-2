import { createClient } from '@/lib/supabase/client';

export interface Firm {
  id: string;
  name: string;
  address: string;
  gstin?: string | null;
  owner_id: string;
  created_at: string;
}

export const firmsService = {
  async createFirm(firmData: { name: string; address: string; gstin?: string }) {
    const supabase = createClient();
    
    // Get current user for owner_id
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // 1. Create the firm
    const { data: firm, error: firmError } = await supabase
      .from('firms')
      .insert([{
        ...firmData,
        owner_id: user.id
      }])
      .select()
      .single();

    if (firmError) throw firmError;

    // 2. Link the user to the firm in their profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ firm_id: firm.id })
      .eq('id', user.id);

    if (profileError) {
      console.error('Error linking profile to firm:', profileError);
      // We don't throw here as the firm is already created, but it's an issue
    }

    return firm as Firm;
  },

  async getFirmById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('firms')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Firm;
  }
};

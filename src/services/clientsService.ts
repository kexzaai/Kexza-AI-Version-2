import { createClient } from '@/lib/supabase/client';

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company_type: string | null;
  firm_id: string;
  created_at: string;
}

export const clientsService = {
  async getClients(firmId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('firm_id', firmId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Client[];
  },

  async getClientById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Client;
  },

  async createClient(clientData: Partial<Client>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('clients')
      .insert([clientData])
      .select()
      .single();

    if (error) throw error;
    return data as Client;
  },

  async updateClient(id: string, clientData: Partial<Client>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('clients')
      .update(clientData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Client;
  },

  async deleteClient(id: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};

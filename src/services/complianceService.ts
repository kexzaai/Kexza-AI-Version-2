import { createClient } from '@/lib/supabase/client';

export interface Compliance {
  id: string;
  client_id: string;
  type: 'GST' | 'ITR' | 'TDS' | 'ROC' | 'OTHER';
  due_date: string | null;
  status: 'pending' | 'completed' | 'overdue';
  created_at: string;
}

export const complianceService = {
  async getCompliancesByClient(clientId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('compliance')
      .select('*')
      .eq('client_id', clientId)
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data as Compliance[];
  },

  async createCompliance(complianceData: Partial<Compliance>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('compliance')
      .insert([complianceData])
      .select()
      .single();

    if (error) throw error;
    return data as Compliance;
  },

  async updateCompliance(id: string, complianceData: Partial<Compliance>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('compliance')
      .update(complianceData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Compliance;
  },

  async deleteCompliance(id: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('compliance')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};

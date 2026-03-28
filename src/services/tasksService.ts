import { createClient } from '@/lib/supabase/client';

export interface BaseTask {
  id: string;
  title: string;
  description: string | null;
  client_id: string | null;
  assigned_to: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  created_at: string;
}

// Extends BaseTask with relations
export interface TaskWithRelations extends BaseTask {
  client?: { name: string } | null;
  assignee?: { full_name: string } | null;
}

export const tasksService = {
  async getTasks() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tasks')
      .select(`
        *,
        client:clients(name),
        assignee:profiles(full_name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as TaskWithRelations[];
  },

  async getTasksByClient(clientId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tasks')
      .select(`
        *,
        client:clients(name),
        assignee:profiles(full_name)
      `)
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as TaskWithRelations[];
  },

  async createTask(taskData: Partial<BaseTask>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tasks')
      .insert([taskData])
      .select(`
        *,
        client:clients(name),
        assignee:profiles(full_name)
      `)
      .single();

    if (error) throw error;
    return data as TaskWithRelations;
  },

  async updateTask(id: string, taskData: Partial<BaseTask>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tasks')
      .update(taskData)
      .eq('id', id)
      .select(`
        *,
        client:clients(name),
        assignee:profiles(full_name)
      `)
      .single();

    if (error) throw error;
    return data as TaskWithRelations;
  },

  async deleteTask(id: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};

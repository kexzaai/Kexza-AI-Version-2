import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const firmSchema = z.object({
  name: z.string().min(2, { message: "Firm name is required" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  gstin: z.string().optional().or(z.literal('')),
});

export type FirmFormData = z.infer<typeof firmSchema>;

export const clientSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal('')),
  phone: z.string().optional(),
  company_type: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

export const taskSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  description: z.string().optional(),
  client_id: z.string().optional(),
  assigned_to: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).default('pending'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  due_date: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const complianceSchema = z.object({
  client_id: z.string().min(1, { message: "Client is required" }),
  type: z.enum(['GST', 'ITR', 'TDS', 'ROC', 'OTHER']),
  due_date: z.string().optional(),
  status: z.enum(['pending', 'completed', 'overdue']).default('pending'),
});

export type ComplianceFormData = z.infer<typeof complianceSchema>;

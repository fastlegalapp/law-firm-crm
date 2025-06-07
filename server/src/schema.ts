
import { z } from 'zod';

// Client schemas
export const clientSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  company: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Client = z.infer<typeof clientSchema>;

export const createClientInputSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  company: z.string().nullable().optional()
});

export type CreateClientInput = z.infer<typeof createClientInputSchema>;

export const updateClientInputSchema = z.object({
  id: z.number(),
  first_name: z.string().min(1).optional(),
  last_name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  company: z.string().nullable().optional()
});

export type UpdateClientInput = z.infer<typeof updateClientInputSchema>;

// Lawyer schemas
export const lawyerSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  specialization: z.string().nullable(),
  bar_number: z.string(),
  hourly_rate: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Lawyer = z.infer<typeof lawyerSchema>;

export const createLawyerInputSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  specialization: z.string().nullable().optional(),
  bar_number: z.string().min(1),
  hourly_rate: z.number().positive()
});

export type CreateLawyerInput = z.infer<typeof createLawyerInputSchema>;

// Case schemas
export const caseStatusEnum = z.enum(['active', 'closed', 'pending', 'on_hold']);
export type CaseStatus = z.infer<typeof caseStatusEnum>;

export const caseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  status: caseStatusEnum,
  client_id: z.number(),
  primary_lawyer_id: z.number(),
  case_number: z.string(),
  opened_date: z.coerce.date(),
  closed_date: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Case = z.infer<typeof caseSchema>;

export const createCaseInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  status: caseStatusEnum.default('pending'),
  client_id: z.number(),
  primary_lawyer_id: z.number(),
  case_number: z.string().min(1),
  opened_date: z.coerce.date().optional()
});

export type CreateCaseInput = z.infer<typeof createCaseInputSchema>;

export const updateCaseInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  status: caseStatusEnum.optional(),
  primary_lawyer_id: z.number().optional(),
  closed_date: z.coerce.date().nullable().optional()
});

export type UpdateCaseInput = z.infer<typeof updateCaseInputSchema>;

// Task schemas
export const taskPriorityEnum = z.enum(['low', 'medium', 'high', 'urgent']);
export type TaskPriority = z.infer<typeof taskPriorityEnum>;

export const taskStatusEnum = z.enum(['pending', 'in_progress', 'completed', 'cancelled']);
export type TaskStatus = z.infer<typeof taskStatusEnum>;

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  priority: taskPriorityEnum,
  status: taskStatusEnum,
  case_id: z.number(),
  assigned_lawyer_id: z.number(),
  due_date: z.coerce.date().nullable(),
  completed_date: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Task = z.infer<typeof taskSchema>;

export const createTaskInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  priority: taskPriorityEnum.default('medium'),
  status: taskStatusEnum.default('pending'),
  case_id: z.number(),
  assigned_lawyer_id: z.number(),
  due_date: z.coerce.date().nullable().optional()
});

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;

export const updateTaskInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  priority: taskPriorityEnum.optional(),
  status: taskStatusEnum.optional(),
  assigned_lawyer_id: z.number().optional(),
  due_date: z.coerce.date().nullable().optional(),
  completed_date: z.coerce.date().nullable().optional()
});

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;

// Appointment schemas
export const appointmentStatusEnum = z.enum(['scheduled', 'completed', 'cancelled', 'no_show']);
export type AppointmentStatus = z.infer<typeof appointmentStatusEnum>;

export const appointmentSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  client_id: z.number(),
  lawyer_id: z.number(),
  case_id: z.number().nullable(),
  scheduled_date: z.coerce.date(),
  duration_minutes: z.number().int(),
  status: appointmentStatusEnum,
  location: z.string().nullable(),
  notes: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Appointment = z.infer<typeof appointmentSchema>;

export const createAppointmentInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  client_id: z.number(),
  lawyer_id: z.number(),
  case_id: z.number().nullable().optional(),
  scheduled_date: z.coerce.date(),
  duration_minutes: z.number().int().positive().default(60),
  status: appointmentStatusEnum.default('scheduled'),
  location: z.string().nullable().optional(),
  notes: z.string().nullable().optional()
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentInputSchema>;

export const updateAppointmentInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  scheduled_date: z.coerce.date().optional(),
  duration_minutes: z.number().int().positive().optional(),
  status: appointmentStatusEnum.optional(),
  location: z.string().nullable().optional(),
  notes: z.string().nullable().optional()
});

export type UpdateAppointmentInput = z.infer<typeof updateAppointmentInputSchema>;

// Document schemas
export const documentTypeEnum = z.enum(['contract', 'brief', 'evidence', 'correspondence', 'court_filing', 'other']);
export type DocumentType = z.infer<typeof documentTypeEnum>;

export const documentSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  file_path: z.string(),
  file_size: z.number().int(),
  mime_type: z.string(),
  document_type: documentTypeEnum,
  case_id: z.number(),
  uploaded_by_lawyer_id: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Document = z.infer<typeof documentSchema>;

export const createDocumentInputSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  file_path: z.string().min(1),
  file_size: z.number().int().positive(),
  mime_type: z.string().min(1),
  document_type: documentTypeEnum,
  case_id: z.number(),
  uploaded_by_lawyer_id: z.number()
});

export type CreateDocumentInput = z.infer<typeof createDocumentInputSchema>;

// Billing schemas
export const billingStatusEnum = z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']);
export type BillingStatus = z.infer<typeof billingStatusEnum>;

export const invoiceSchema = z.object({
  id: z.number(),
  invoice_number: z.string(),
  client_id: z.number(),
  case_id: z.number(),
  amount: z.number(),
  hours_billed: z.number(),
  hourly_rate: z.number(),
  description: z.string().nullable(),
  status: billingStatusEnum,
  issued_date: z.coerce.date(),
  due_date: z.coerce.date(),
  paid_date: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Invoice = z.infer<typeof invoiceSchema>;

export const createInvoiceInputSchema = z.object({
  invoice_number: z.string().min(1),
  client_id: z.number(),
  case_id: z.number(),
  hours_billed: z.number().positive(),
  hourly_rate: z.number().positive(),
  description: z.string().nullable().optional(),
  status: billingStatusEnum.default('draft'),
  issued_date: z.coerce.date().optional(),
  due_date: z.coerce.date()
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceInputSchema>;

export const updateInvoiceInputSchema = z.object({
  id: z.number(),
  status: billingStatusEnum.optional(),
  paid_date: z.coerce.date().nullable().optional()
});

export type UpdateInvoiceInput = z.infer<typeof updateInvoiceInputSchema>;

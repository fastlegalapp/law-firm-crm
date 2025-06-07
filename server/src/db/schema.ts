
import { serial, text, pgTable, timestamp, numeric, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const caseStatusEnum = pgEnum('case_status', ['active', 'closed', 'pending', 'on_hold']);
export const taskPriorityEnum = pgEnum('task_priority', ['low', 'medium', 'high', 'urgent']);
export const taskStatusEnum = pgEnum('task_status', ['pending', 'in_progress', 'completed', 'cancelled']);
export const appointmentStatusEnum = pgEnum('appointment_status', ['scheduled', 'completed', 'cancelled', 'no_show']);
export const documentTypeEnum = pgEnum('document_type', ['contract', 'brief', 'evidence', 'correspondence', 'court_filing', 'other']);
export const billingStatusEnum = pgEnum('billing_status', ['draft', 'sent', 'paid', 'overdue', 'cancelled']);

// Clients table
export const clientsTable = pgTable('clients', {
  id: serial('id').primaryKey(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  address: text('address'),
  company: text('company'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Lawyers table
export const lawyersTable = pgTable('lawyers', {
  id: serial('id').primaryKey(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  specialization: text('specialization'),
  bar_number: text('bar_number').notNull().unique(),
  hourly_rate: numeric('hourly_rate', { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Cases table
export const casesTable = pgTable('cases', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: caseStatusEnum('status').notNull().default('pending'),
  client_id: integer('client_id').notNull().references(() => clientsTable.id),
  primary_lawyer_id: integer('primary_lawyer_id').notNull().references(() => lawyersTable.id),
  case_number: text('case_number').notNull().unique(),
  opened_date: timestamp('opened_date').defaultNow().notNull(),
  closed_date: timestamp('closed_date'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Tasks table
export const tasksTable = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  priority: taskPriorityEnum('priority').notNull().default('medium'),
  status: taskStatusEnum('status').notNull().default('pending'),
  case_id: integer('case_id').notNull().references(() => casesTable.id),
  assigned_lawyer_id: integer('assigned_lawyer_id').notNull().references(() => lawyersTable.id),
  due_date: timestamp('due_date'),
  completed_date: timestamp('completed_date'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Appointments table
export const appointmentsTable = pgTable('appointments', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  client_id: integer('client_id').notNull().references(() => clientsTable.id),
  lawyer_id: integer('lawyer_id').notNull().references(() => lawyersTable.id),
  case_id: integer('case_id').references(() => casesTable.id),
  scheduled_date: timestamp('scheduled_date').notNull(),
  duration_minutes: integer('duration_minutes').notNull().default(60),
  status: appointmentStatusEnum('status').notNull().default('scheduled'),
  location: text('location'),
  notes: text('notes'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Documents table
export const documentsTable = pgTable('documents', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  file_path: text('file_path').notNull(),
  file_size: integer('file_size').notNull(),
  mime_type: text('mime_type').notNull(),
  document_type: documentTypeEnum('document_type').notNull(),
  case_id: integer('case_id').notNull().references(() => casesTable.id),
  uploaded_by_lawyer_id: integer('uploaded_by_lawyer_id').notNull().references(() => lawyersTable.id),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Invoices table
export const invoicesTable = pgTable('invoices', {
  id: serial('id').primaryKey(),
  invoice_number: text('invoice_number').notNull().unique(),
  client_id: integer('client_id').notNull().references(() => clientsTable.id),
  case_id: integer('case_id').notNull().references(() => casesTable.id),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  hours_billed: numeric('hours_billed', { precision: 8, scale: 2 }).notNull(),
  hourly_rate: numeric('hourly_rate', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  status: billingStatusEnum('status').notNull().default('draft'),
  issued_date: timestamp('issued_date').defaultNow().notNull(),
  due_date: timestamp('due_date').notNull(),
  paid_date: timestamp('paid_date'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Relations
export const clientsRelations = relations(clientsTable, ({ many }) => ({
  cases: many(casesTable),
  appointments: many(appointmentsTable),
  invoices: many(invoicesTable)
}));

export const lawyersRelations = relations(lawyersTable, ({ many }) => ({
  primaryCases: many(casesTable),
  tasks: many(tasksTable),
  appointments: many(appointmentsTable),
  uploadedDocuments: many(documentsTable)
}));

export const casesRelations = relations(casesTable, ({ one, many }) => ({
  client: one(clientsTable, {
    fields: [casesTable.client_id],
    references: [clientsTable.id]
  }),
  primaryLawyer: one(lawyersTable, {
    fields: [casesTable.primary_lawyer_id],
    references: [lawyersTable.id]
  }),
  tasks: many(tasksTable),
  appointments: many(appointmentsTable),
  documents: many(documentsTable),
  invoices: many(invoicesTable)
}));

export const tasksRelations = relations(tasksTable, ({ one }) => ({
  case: one(casesTable, {
    fields: [tasksTable.case_id],
    references: [casesTable.id]
  }),
  assignedLawyer: one(lawyersTable, {
    fields: [tasksTable.assigned_lawyer_id],
    references: [lawyersTable.id]
  })
}));

export const appointmentsRelations = relations(appointmentsTable, ({ one }) => ({
  client: one(clientsTable, {
    fields: [appointmentsTable.client_id],
    references: [clientsTable.id]
  }),
  lawyer: one(lawyersTable, {
    fields: [appointmentsTable.lawyer_id],
    references: [lawyersTable.id]
  }),
  case: one(casesTable, {
    fields: [appointmentsTable.case_id],
    references: [casesTable.id]
  })
}));

export const documentsRelations = relations(documentsTable, ({ one }) => ({
  case: one(casesTable, {
    fields: [documentsTable.case_id],
    references: [casesTable.id]
  }),
  uploadedByLawyer: one(lawyersTable, {
    fields: [documentsTable.uploaded_by_lawyer_id],
    references: [lawyersTable.id]
  })
}));

export const invoicesRelations = relations(invoicesTable, ({ one }) => ({
  client: one(clientsTable, {
    fields: [invoicesTable.client_id],
    references: [clientsTable.id]
  }),
  case: one(casesTable, {
    fields: [invoicesTable.case_id],
    references: [casesTable.id]
  })
}));

// Export all tables
export const tables = {
  clients: clientsTable,
  lawyers: lawyersTable,
  cases: casesTable,
  tasks: tasksTable,
  appointments: appointmentsTable,
  documents: documentsTable,
  invoices: invoicesTable
};

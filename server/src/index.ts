
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import {
  createClientInputSchema,
  updateClientInputSchema,
  createLawyerInputSchema,
  createCaseInputSchema,
  updateCaseInputSchema,
  createTaskInputSchema,
  updateTaskInputSchema,
  createAppointmentInputSchema,
  updateAppointmentInputSchema,
  createDocumentInputSchema,
  createInvoiceInputSchema,
  updateInvoiceInputSchema
} from './schema';

// Import handlers
import { createClient } from './handlers/create_client';
import { getClients } from './handlers/get_clients';
import { getClient } from './handlers/get_client';
import { updateClient } from './handlers/update_client';
import { createLawyer } from './handlers/create_lawyer';
import { getLawyers } from './handlers/get_lawyers';
import { getLawyer } from './handlers/get_lawyer';
import { createCase } from './handlers/create_case';
import { getCases } from './handlers/get_cases';
import { getCase } from './handlers/get_case';
import { updateCase } from './handlers/update_case';
import { getCasesByClient } from './handlers/get_cases_by_client';
import { getCasesByLawyer } from './handlers/get_cases_by_lawyer';
import { createTask } from './handlers/create_task';
import { getTasks } from './handlers/get_tasks';
import { getTask } from './handlers/get_task';
import { updateTask } from './handlers/update_task';
import { getTasksByCase } from './handlers/get_tasks_by_case';
import { getTasksByLawyer } from './handlers/get_tasks_by_lawyer';
import { createAppointment } from './handlers/create_appointment';
import { getAppointments } from './handlers/get_appointments';
import { getAppointment } from './handlers/get_appointment';
import { updateAppointment } from './handlers/update_appointment';
import { getAppointmentsByLawyer } from './handlers/get_appointments_by_lawyer';
import { getAppointmentsByClient } from './handlers/get_appointments_by_client';
import { createDocument } from './handlers/create_document';
import { getDocuments } from './handlers/get_documents';
import { getDocument } from './handlers/get_document';
import { getDocumentsByCase } from './handlers/get_documents_by_case';
import { createInvoice } from './handlers/create_invoice';
import { getInvoices } from './handlers/get_invoices';
import { getInvoice } from './handlers/get_invoice';
import { updateInvoice } from './handlers/update_invoice';
import { getInvoicesByClient } from './handlers/get_invoices_by_client';
import { getInvoicesByCase } from './handlers/get_invoices_by_case';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Client routes
  createClient: publicProcedure
    .input(createClientInputSchema)
    .mutation(({ input }) => createClient(input)),
  getClients: publicProcedure
    .query(() => getClients()),
  getClient: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getClient(input.id)),
  updateClient: publicProcedure
    .input(updateClientInputSchema)
    .mutation(({ input }) => updateClient(input)),

  // Lawyer routes
  createLawyer: publicProcedure
    .input(createLawyerInputSchema)
    .mutation(({ input }) => createLawyer(input)),
  getLawyers: publicProcedure
    .query(() => getLawyers()),
  getLawyer: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getLawyer(input.id)),

  // Case routes
  createCase: publicProcedure
    .input(createCaseInputSchema)
    .mutation(({ input }) => createCase(input)),
  getCases: publicProcedure
    .query(() => getCases()),
  getCase: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getCase(input.id)),
  updateCase: publicProcedure
    .input(updateCaseInputSchema)
    .mutation(({ input }) => updateCase(input)),
  getCasesByClient: publicProcedure
    .input(z.object({ clientId: z.number() }))
    .query(({ input }) => getCasesByClient(input.clientId)),
  getCasesByLawyer: publicProcedure
    .input(z.object({ lawyerId: z.number() }))
    .query(({ input }) => getCasesByLawyer(input.lawyerId)),

  // Task routes
  createTask: publicProcedure
    .input(createTaskInputSchema)
    .mutation(({ input }) => createTask(input)),
  getTasks: publicProcedure
    .query(() => getTasks()),
  getTask: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getTask(input.id)),
  updateTask: publicProcedure
    .input(updateTaskInputSchema)
    .mutation(({ input }) => updateTask(input)),
  getTasksByCase: publicProcedure
    .input(z.object({ caseId: z.number() }))
    .query(({ input }) => getTasksByCase(input.caseId)),
  getTasksByLawyer: publicProcedure
    .input(z.object({ lawyerId: z.number() }))
    .query(({ input }) => getTasksByLawyer(input.lawyerId)),

  // Appointment routes
  createAppointment: publicProcedure
    .input(createAppointmentInputSchema)
    .mutation(({ input }) => createAppointment(input)),
  getAppointments: publicProcedure
    .query(() => getAppointments()),
  getAppointment: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getAppointment(input.id)),
  updateAppointment: publicProcedure
    .input(updateAppointmentInputSchema)
    .mutation(({ input }) => updateAppointment(input)),
  getAppointmentsByLawyer: publicProcedure
    .input(z.object({ lawyerId: z.number() }))
    .query(({ input }) => getAppointmentsByLawyer(input.lawyerId)),
  getAppointmentsByClient: publicProcedure
    .input(z.object({ clientId: z.number() }))
    .query(({ input }) => getAppointmentsByClient(input.clientId)),

  // Document routes
  createDocument: publicProcedure
    .input(createDocumentInputSchema)
    .mutation(({ input }) => createDocument(input)),
  getDocuments: publicProcedure
    .query(() => getDocuments()),
  getDocument: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getDocument(input.id)),
  getDocumentsByCase: publicProcedure
    .input(z.object({ caseId: z.number() }))
    .query(({ input }) => getDocumentsByCase(input.caseId)),

  // Invoice routes
  createInvoice: publicProcedure
    .input(createInvoiceInputSchema)
    .mutation(({ input }) => createInvoice(input)),
  getInvoices: publicProcedure
    .query(() => getInvoices()),
  getInvoice: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getInvoice(input.id)),
  updateInvoice: publicProcedure
    .input(updateInvoiceInputSchema)
    .mutation(({ input }) => updateInvoice(input)),
  getInvoicesByClient: publicProcedure
    .input(z.object({ clientId: z.number() }))
    .query(({ input }) => getInvoicesByClient(input.clientId)),
  getInvoicesByCase: publicProcedure
    .input(z.object({ caseId: z.number() }))
    .query(({ input }) => getInvoicesByCase(input.caseId)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`Law Firm CRM TRPC server listening at port: ${port}`);
}

start();

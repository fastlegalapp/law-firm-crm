
import { type Appointment } from '../schema';

export declare function getAppointmentsByClient(clientId: number): Promise<Appointment[]>;

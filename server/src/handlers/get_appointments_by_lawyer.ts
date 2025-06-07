
import { type Appointment } from '../schema';

export declare function getAppointmentsByLawyer(lawyerId: number): Promise<Appointment[]>;

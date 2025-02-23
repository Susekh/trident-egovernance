import { z } from 'zod';
import { CreateStaffFormType } from '../types/HrTypes';

export const departments = ['CSE', 'CSE-AIML', 'ETC', 'EEE'] as const;
export const designations = [
  'Manager',
  'Senior Engineer',
  'Junior Engineer',
  'Intern',
] as const;
export const categories = ['Full-Time', 'Part-Time', 'Contract'] as const;
export const statuses = ['Active', 'Inactive', 'On Leave'] as const;
export const roles = ['Admin', 'User', 'SuperAdmin'] as const;
export const colleges = ['TAT', 'TACT'] as const;

export const securityquestions = [
  'What is your favourite sport?',
  'What is your fav pet?',
  'What is your pet name',
  'What is your first school name ?',
] as const;

export const CreateStaffFormSchema = z.object({
  staffName: z.string().min(1, 'Staff Name is required'),
  staffDept: z.string().min(1, 'Department is required'),
  staffDesignation: z.string().min(1, 'Designation is required'),
  staffCategory: z.string().min(1, 'Category is required'),
  status: z.string().min(1, 'Status is required'),
  role: z.string().min(1, 'Role is required'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
  email: z.string().email('Invalid email format'),
  securityQuestion: z.string().min(1, 'Security question is required'),
  securityAnswer: z.string().min(1, 'Security answer is required'),
  collegeName: z.string().min(1, 'College name is required'),
});

export const DynamicCreateStaffSchema = (data: any) => {
  return z.object({
    staffName: z.string().min(1, 'Staff Name is required'),
    staffDept: z.enum(data.staffDepartments as [string, ...string[]], {
      message: 'Invalid department',
    }),
    staffDesignation: z.enum(data.staffDesignations as [string, ...string[]], {
      message: 'Invalid designation',
    }),
    staffCategory: z.enum(data.staffCategories as [string, ...string[]], {
      message: 'Invalid category',
    }),
    status: z.enum(data.staffStatuses as [string, ...string[]], {
      message: 'Invalid status',
    }),
    role: z.enum(data.staffRoles as [string, ...string[]], {
      message: 'Invalid role',
    }),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
    address: z.string().min(1, 'Address is required'),
    email: z.string().email('Invalid email format'),
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    securityQuestion: z.enum(data.securityQuestion as [string, ...string[]], {
      message: 'Invalid security question',
    }),
    securityAnswer: z.string().min(1, 'Security answer is required'),
    collegeName: z.string().min(2, 'college name is required')
  });
};

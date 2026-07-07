// User & Auth
export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  role: "admin" | "student";
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

// Form action state (jo useActionState use karega)
export interface ActionState {
  error?: string;
  success?: boolean;
}

// Courses
export interface Subject {
  id: number;
  name: string;
  description: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  duration_months: number;
  subjects: Subject[];
}

export interface Batch {
  id: number;
  course: number;
  course_name: string;
  name: string;
  start_date: string;
  end_date: string | null;
  timing: string;
  capacity: number;
  is_active: boolean;
}

// Enrollment
export interface Enrollment {
  id: number;
  student: number;
  student_name: string;
  batch: number;
  batch_name: string;
  status: "pending" | "active" | "rejected" | "completed";
  is_paid: boolean;
  requested_at: string;
}

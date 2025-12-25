export interface Task {
    id: string;
    name: string;
    dueDate: string | null; // ISO date string
    status: 'pending' | 'in-progress' | 'completed';
    createdAt: string; // ISO date string
}

export type TaskStatus = Task['status'];

export interface TaskFormData {
    name: string;
    dueDate: Date | null;
    status?: TaskStatus;
}

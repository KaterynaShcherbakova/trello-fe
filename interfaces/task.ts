export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'In Progress',
    DONE = 'Done',
}

export enum TaskPriority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High'
}

export interface Task {
    id: number;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
}

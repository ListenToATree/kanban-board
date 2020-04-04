export interface Board {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
  uid?: string;
}

export interface Task {
  description?: string;
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

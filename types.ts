export type Priority = 'Alta' | 'Média' | 'Baixa';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
}

export interface UserProfile {
    displayName: string;
    email: string;
    photoURL?: string;
  }
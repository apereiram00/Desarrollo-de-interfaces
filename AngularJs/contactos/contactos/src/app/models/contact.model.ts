export interface Contact {
    id: string;
    name: string;
    photo?: string;
    email: string;
    phone: string;
    category: 'Amigos' | 'Familia' | 'Trabajo';
    notes?: string;
  }
  
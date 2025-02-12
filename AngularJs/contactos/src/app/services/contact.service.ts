import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [
    { id: '1', name: 'Justo', email: 'justo@gmail.com', phone: '123456789', category: 'Amigos', notes: 'Compañero de universidad' },
    { id: '2', name: 'Alvaro', email: 'alvaro@hotmail.com', phone: '987654321', category: 'Familia', notes: '' },
    { id: '3', name: 'Jorge', email: 'jorge@gmail.com', phone: '555555555', category: 'Trabajo', notes: 'CEO de mi empresa' },
  ];

  private contacts$ = new BehaviorSubject<Contact[]>(this.contacts);

  getContacts() {
    return this.contacts$.asObservable();
  }

  getContactById(id: string): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.contacts$.next(this.contacts);
  }

  deleteContact(contactId: string) {
    const index = this.contacts.findIndex(contact => contact.id === contactId);
    if (index !== -1) {
      this.contacts.splice(index, 1); 
      this.contacts$.next(this.contacts);  
    }
  }
}

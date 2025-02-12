import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage {
  newContact: Partial<Contact> = {
    name: '',
    email: '',
    phone: '',
    category: 'Amigos',
    notes: '',
  };

  constructor(private contactService: ContactService, private router: Router) {}

  generateUniqueId(): string {
    return Date.now().toString(); 
  }

  addContact() {
    if (this.newContact.name && this.newContact.email && this.newContact.phone) {
      this.contactService.addContact({
        ...this.newContact,
        id: this.generateUniqueId(), 
      } as Contact);
      this.router.navigate(['/home']);
    }
  }
}

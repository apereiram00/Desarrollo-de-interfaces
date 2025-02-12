import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';
  activeFilter: 'Amigos' | 'Familia' | 'Trabajo' | null = null;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = this.sortContacts(contacts);
      this.filteredContacts = [...this.contacts]; 
    });
  }
  sortContacts(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => a.name.localeCompare(b.name)); 
  }

  filterContacts() {
    this.filteredContacts = this.contacts.filter(contact => {
      const matchesSearch = this.searchTerm
        ? contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;
      const matchesFilter = this.activeFilter ? contact.category === this.activeFilter : true;
      return matchesSearch && matchesFilter;
    });

    this.filteredContacts = this.sortContacts(this.filteredContacts);
  }

  goToAddContact() {
    this.router.navigate(['/add-contact']);
  }

  goToDetails(contactId: string) {
    this.router.navigate([`/contact-detail/${contactId}`]);
  }

  callContact(phone: string) {
    window.location.href = `tel:${phone}`;
  }

  editContact(contactId: string) {
    this.router.navigate([`/edit-contact/${contactId}`]);
  }

  onSegmentChange(event: any) {
    const value = event.detail.value;
    const validFilters: ('Amigos' | 'Familia' | 'Trabajo' | null)[] = ['Amigos', 'Familia', 'Trabajo', null];
    const normalizedValue = validFilters.includes(value) ? value : null;
    this.applyFilter(normalizedValue as 'Amigos' | 'Familia' | 'Trabajo' | null);
  }

  applyFilter(filter: 'Amigos' | 'Familia' | 'Trabajo' | null) {
    this.activeFilter = filter;
    this.filterContacts();
  }

  getInitials(name: string): string {
    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
    return initials;
  }

  deleteContact(contactId: string) {
    this.contactService.deleteContact(contactId);  
    this.contacts = this.sortContacts(this.contacts); 
    this.filterContacts();
  }
}

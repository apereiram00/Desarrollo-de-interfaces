import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
})
export class ContactDetailPage implements OnInit {
  contact: Contact | undefined;

  constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router) {}

  ngOnInit() {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.contact = this.contactService.getContactById(contactId);
    }
  }

  callContact() {
    if (this.contact) {
      window.location.href = `tel:${this.contact.phone}`;
    }
  }

  emailContact() {
    if (this.contact) {
      window.location.href = `mailto:${this.contact.email}`;
    }
  }

  editContact() { // tendría que hacer otro componente parecido al add-contact pero lo dejo de adorno porq es un clickListener sencillo
  }

  deleteContact(contactId: string) {
    this.contactService.deleteContact(contactId);
    this.router.navigate(['/home']); 
  }

}

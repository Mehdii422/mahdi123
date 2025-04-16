import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  template: `
  <div class="contact-wrapper">
    
    <div class="contact-container">
        <h1>Contacter nous</h1>
        <p class="subtitle">Avez-vous quelques questions / remarques! Dites-nous : </p>

        <div class="contact-content">
            <div class="contact-info">
                <h2>Informations de contact</h2>
                <p class="info-subtitle">Dites queleque chose pour débuter le chat direct!</p>
                
                <div class="contact-details">
                    <p><i class="fas fa-phone"></i> +216 25301881</p>
                    <p><i class="fas fa-envelope"></i> Tadbirasstr&#64;gmail.com</p>
                    <p><i class="fas fa-map-marker-alt"></i> Tunisia, Kairouan, Ibn Jazzer</p>
                </div>
            </div>

            <form class="contact-form">
                <div class="name-fields">
                    <input type="text" placeholder="Prénom" required>
                    <input type="text" placeholder="Nom" required>
                </div>
                
                <div class="contact-fields">
                    <input type="email" placeholder="Email" required>
                    <input type="tel" placeholder="Num de téléphone" required>
                </div>

                <textarea placeholder="écrivez votre message.." required></textarea>
                
                <button type="submit">Envoyer Message</button>
            </form>
        </div>
    </div>
  </div>
  `,
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}

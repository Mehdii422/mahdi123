import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
  <div class="body">
    <!-- Main Content -->
    <div class="about-container">
        <!-- Header Section -->
        <header class="about-header">
            <h1>À propos de Tadbirras</h1>
            <p class="subtitle">Parce que chaque étudiant mérite un job sur-mesure</p>
        </header>

        <!-- Mission Section -->
        <section class="about-card">
            <h2><i class="fas fa-bullseye"></i> Notre mission</h2>
            <p>Offrir aux étudiants un accès facile à des emplois flexibles et aider les entreprises à recruter rapidement pour des missions ponctuelles. Nous croyons en un marché du travail plus accessible et adapté aux besoins des étudiants.</p>
        </section>

        <!-- Who We Are Section -->
        <section class="about-card">
            <h2><i class="fas fa-users"></i> Qui sommes-nous ?</h2>
            <p>Tadbirras est une initiative créée par des jeunes pour des jeunes. Notre équipe est composée d'étudiants ambitieux, de développeurs passionnés et d'experts en communication, tous unis par une même vision : révolutionner l'accès à l'emploi étudiant en Tunisie.</p>
            <p>Fondé en 2023, notre plateforme connecte déjà des milliers d'étudiants avec des employeurs de confiance à travers le pays.</p>
        </section>

        <!-- Values Section -->
        <section class="about-card">
            <h2><i class="fas fa-heart"></i> Nos valeurs</h2>
            <div class="values-grid">
                <div class="value-item">
                    <div class="value-icon"><i class="fas fa-calendar-alt"></i></div>
                    <h3 class="value-title">Flexibilité</h3>
                    <p>Des horaires adaptés à votre emploi du temps étudiant</p>
                </div>
                <div class="value-item">
                    <div class="value-icon"><i class="fas fa-universal-access"></i></div>
                    <h3 class="value-title">Accessibilité</h3>
                    <p>Des opportunités pour tous, sans discrimination</p>
                </div>
                <div class="value-item">
                    <div class="value-icon"><i class="fas fa-lightbulb"></i></div>
                    <h3 class="value-title">Innovation</h3>
                    <p>Des solutions technologiques modernes</p>
                </div>
                <div class="value-item">
                    <div class="value-icon"><i class="fas fa-handshake"></i></div>
                    <h3 class="value-title">Confiance</h3>
                    <p>Une communauté vérifiée et sécurisée</p>
                </div>
            </div>
        </section>
    </div>
  </div>
  `,
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}

import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="sidebar">
      <h3 class="sidebar-title">Filtrer les offres</h3>
      
      <form #filtersForm="ngForm" (ngSubmit)="applyFilters()">
        <!-- Location Filter -->
        <div class="filter-section">
          <h4 class="filter-title">
            <i class="fas fa-map-marker-alt"></i> Localisation
          </h4>
          <select class="form-control" name="location" [(ngModel)]="filters.location">
            <option value="" selected>Choisir une ville</option>
            <option value="Nabeul">Nabeul</option>
            <option value="le Kef">le Kef</option>
            <option value="tunis">tunis</option>
            <option value="ariana">ariana</option>
            <option value="ben arous">ben arous</option>
            <option value="mannouba">mannouba</option>
            <option value="beja">beja</option>
            <option value="ain drahem">ain drahem</option>
            <option value="benzart">benzart</option>
            <option value="seliana">seliana</option>
            <option value="zaghouen">zaghouen</option>
            <option value="kasserine">kasserine</option>
            <option value="kairouen">kairouen</option>
            <option value="sousse">sousse</option>
            <option value="mahdia">mahdia</option>
            <option value="monastir">monastir</option>
            <option value="sidi bouzid">sidi bouzid</option>
            <option value="gafsa">gafsa</option>
            <option value="tozeur">tozeur</option>
            <option value="kebili">kebili</option>
            <option value="sfax">sfax</option>
            <option value="tataouine">tataouine</option>
            <option value="jerjis">jerjis</option>
            <option value="jerba">jerba</option>
          </select>
        </div>

        <!-- Job Type Filter -->
        <div class="filter-section">
          <h4 class="filter-title">
            <i class="fas fa-clock"></i> Type de contrat
          </h4>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" name="flexible" [(ngModel)]="filters.flexible">
              <span class="checkmark"></span>
              Temps flexible
            </label>
            <label class="checkbox-label">
              <input type="checkbox" name="fullTime" [(ngModel)]="filters.fullTime">
              <span class="checkmark"></span>
              Temps complet
            </label>
          </div>
        </div>

        <button type="submit" class="apply-btn">
          <i class="fas fa-filter"></i> Appliquer les filtres
        </button>
        <button type="button" class="reset-btn" (click)="resetFilters()">
          <i class="fas fa-undo"></i> Réinitialiser
        </button>
      </form>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() filtersChanged = new EventEmitter<any>();

  filters = {
    location: '',
    flexible: false,
    fullTime: false
  };

  applyFilters() {
    this.filtersChanged.emit({...this.filters});
  }

  resetFilters() {
    this.filters = {
      location: '',
      flexible: false,
      fullTime: false
    };
    this.filtersChanged.emit({...this.filters});
  }
}

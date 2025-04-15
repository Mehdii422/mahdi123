import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService, BaseUser } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="login-container">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <h2>Register</h2>
        
        <!-- Common login fields -->
        <label for="lastname">Nom</label>
        <input id="username" type="text" formControlName="username" required>
        
        <label for="firstName">Prénom</label>
        <input id="firstName" type="text" formControlName="firstName" required>
        
        <label for="birthdate">Date de naissance</label>
        <input id="birthdate" type="date" formControlName="birthdate" required>
        
        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email" required>
        
        <label for="phone">Téléphone</label>
        <input id="phone" type="tel" formControlName="phone" required>
        
        <label for="address">Adresse</label>
        <input id="address" type="text" formControlName="address" required>
        
        
        <label for="password">Enter le mot de passe</label>
        <input id="password" type="password" formControlName="password" required>
        
        <label for="confirmPassword">Confirmer le mot de passe</label>
        <input id="confirmPassword" type="password" formControlName="confirmPassword" required>
        
        <!-- Les mots de passe ne correspondent pas -->
        <div *ngIf="loginForm.hasError('mismatch') && (loginForm.get('confirmPassword')?.touched && loginForm.get('password')?.touched)">
          <p class="error">Les mots de passe ne correspondent pas.</p>
        </div>
        
        <!-- Select the user type -->
        <label for="userType">Je suis un(e) : </label>
        <select id="userType" formControlName="userType">
          <option *ngFor="let type of userTypes" [value]="type.value">
            {{ type.label }}
          </option>
        </select>
        
        
        <!-- === Etudiant Fields === -->
        <div *ngIf="loginForm.get('userType')?.value === 'Etudiant'" class="Etudiant-section">
          <h3>Etudiant Details</h3>
          <label>Schedule Option</label>
          <div class="radio-group">
            <label>
              <input type="radio" formControlName="scheduleOption" value="fill">
              Fill schedule manually
            </label>
            <label>
              <input type="radio" formControlName="scheduleOption" value="import">
              Import schedule file
            </label>
          </div>
          
          <!-- If "fill" option is selected, show manual schedule fields -->
          <!-- Update the availability inputs to use getAvailabilityControl -->
          <div *ngIf="loginForm.get('scheduleOption')?.value === 'fill'" class="weekly-schedule">
            <h4>Temps de disponibilté</h4>
            <div *ngFor="let day of weekDays; let i = index" class="day-row">
            <br /><label>{{ day }} : </label>
              Début : <input type="time" [formControl]="getAvailabilityControl(i, 'start')" />
              Fin : <input type="time" [formControl]="getAvailabilityControl(i, 'end')" />
            </div>
          </div>          
          
          <!-- If "import" option is selected, show file input -->
          <div *ngIf="loginForm.get('scheduleOption')?.value === 'import'">
            <label for="scheduleFile">Upload your schedule</label>
            <input id="scheduleFile" type="file" formControlName="scheduleFile">
          </div>
          
          <!-- Study level selection -->
          <br /><label for="studyLevel">Niveau d'études</label>
          <select id="studyLevel" formControlName="studyLevel">
            <option value="">-- Choisir --</option>
            <option value="lycee">Lycée</option>
            <option value="higher">Bac +</option>
            <option value="formation">Formation</option>
          </select>
          
          <!-- If study level is lycée, ask for section -->
          <div *ngIf="loginForm.get('studyLevel')?.value === 'lycee'">
            <label for="section">Section</label>
            <select id="section" formControlName="section">
              <option value="">-- Choisir section --</option>
              <option value="math">Math</option>
              <option value="science">Sciences</option>
              <option value="lettres">lettres</option>
              <option value="economie & gestion">Economie & Gestion</option>
              <option value="informatique">Informatique</option>
              <option value="sport">Sport</option>
            </select>
          </div>
          
          <!-- If study level is higher education, ask for degree -->
          <div *ngIf="loginForm.get('studyLevel')?.value === 'higher'">
            <label for="degree">Diplôme</label>
            <select id="degree" formControlName="degree">
              <option value="" selected>-- Choisir le diplôme --</option>
              <option value="BTS">BTS</option>
              <option value="licence">License</option>
              <option value="master">Master</option>
              <option value="doctorat">Docatorat</option>
            </select>
            <label for="speciality">Spécialité</label>
            <input id="speciality" type="text" formControlName="speciality">
          </div>
          
          <!-- If study level is formation, ask for type -->
          <div *ngIf="loginForm.get('studyLevel')?.value === 'formation'">
            <label for="formationType">Type de formation</label>
            <select id="formationType" formControlName="formationType">
              <option value="">-- Choisir --</option>
              <option value="BTP">BTP</option>
              <option value="BTS">BTS</option>
              <option value="accelere">Formation accélérée</option>
            </select>
            <label for="formationSpeciality">Spécialité</label>
            <input id="formationSpeciality" type="text" formControlName="formationSpeciality">
          </div>
          
          

        </div>
        
        
        <!-- === Normal User / Job Seeker Fields === -->
        <div *ngIf="loginForm.get('userType')?.value === 'jobseeker'" class="jobseeker-section">
          <h3>Job Seeker Details</h3>
          
          <label for="formation">Etude(s) / Formation(s)</label>
          <input id="formation" type="text" formControlName="formation">
          
          <label for="experience">Expérience</label>
          <textarea id="experience" formControlName="experience"></textarea>
          
          <label for="cvUpload">Upload your CV</label>
          <input id="cvUpload" type="file" formControlName="cvUpload">
        </div>

        <!-- === Entrepreneur Fields === -->
        <div *ngIf="loginForm.get('userType')?.value === 'entrepreneur'" class="entrepreneur-section">
          <h3>Entrepreneur Details</h3>
          
          <label for="societyName">Nom de la société</label>
          <input id="societyName" type="text" formControlName="societyName">

          <label for="location">emplacement</label>
          <select>
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
          
          <label for="domain">Domaine</label>
          <input id="domain" type="text" formControlName="domain">
          
          <label for="numberOfWorkers">Nombre des employers</label>
          <input id="numberOfWorkers" type="number" formControlName="numberOfWorkers">
          
          <label for="additionalInfo">Informations Supplémentaires</label>
          <textarea id="additionalInfo" formControlName="additionalInfo"></textarea>
        </div>

        <!-- === Admin Fields === -->
        <div *ngIf="loginForm.get('userType')?.value === 'admin'" class="admin-section">
          <h3>Admin Details</h3>
          
          <label for="adminCode">Admin Code</label>
          <input id="adminCode" type="text" formControlName="adminCode">
        </div>
        
        <button type="submit" [disabled]="loginForm.invalid">Envoyer</button>

      </form>
    </div>

  `,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  loginForm!: FormGroup;
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  get availability(): FormArray {
    return this.loginForm.get('availability') as FormArray;
  }

  // Helper method to get the FormControl for a specific day and control
  getAvailabilityControl(dayIndex: number, controlName: string): FormControl {
    const dayGroup = this.availability.at(dayIndex) as FormGroup;
    return dayGroup.get(controlName) as FormControl;
  }


  // List of user types with labels
  userTypes = [
    { value: 'Etudiant', label: 'Etudiant' },
    { value: 'jobseeker', label: 'Utilisateur normal' },
    { value: 'entrepreneur', label: 'Entrepreneur' },
    { value: 'admin', label: 'Admin' }
  ];

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  

  constructor(private fb: FormBuilder,
     private authService: AuthService,
     private router: Router) {}

  ngOnInit(): void {
    // Base form controls and extra fields for each user type.
    this.loginForm = this.fb.group({
      userType: ['Etudiant', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      birthdate: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    
      // Etudiant-specific fields
      scheduleOption: ['fill'],
      scheduleFile: [null],
      studyLevel: [''],
      section: [''],
      degree: [''],
      availability: this.fb.array(
        this.weekDays.map(() => this.fb.group({
          start: [''],
          end: ['']
        }))
      ),
      speciality: [''],
      formationType: [''],
      formationSpeciality: [''],
    
      // Job Seeker
      formation: [''],
      experience: [''],
      cvUpload: [null],
    
      // Entrepreneur
      societyName: [''],
      domain: [''],
      numberOfWorkers: [''],
      additionalInfo: [''],
    
      // Admin
      adminCode: ['']
    }, { validators: this.passwordMatchValidator });
    
  }
  
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loginForm.patchValue({ scheduleFile: file });
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;

      // Generate a unique ID (e.g., UUID or timestamp-based)
      const newUser = {
        id: this.generateUniqueId(),
        ...formValues
      };

      const createdUser = this.authService.registerUser(newUser);
      console.log("Account created successfully:", createdUser);

      // Navigate to the login page
      this.router.navigate(['/login']);
    }
  }

  generateUniqueId(): string {
    // Example: timestamp + random string
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
  }
}
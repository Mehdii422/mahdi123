import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOffers } from './job-offers';

export interface FilterCriteria {
  nom?: string;
  domain?: string;
  partTime?: boolean;
  governorat?: string;
  employment?: string[]; // e.g., ['full-time', 'part-time']
  // Vous pouvez ajouter d'autres critères ici
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:3000/api/jobs';

  constructor(private http: HttpClient) {}

  getAllJobOffers(): Observable<JobOffers[]> {
    return this.http.get<JobOffers[]>(this.apiUrl);
  }

  getJobOffersByID(id: number): Observable<JobOffers> {
    return this.http.get<JobOffers>(`${this.apiUrl}/${id}`);
  }

  addJobOffer(newOffer: JobOffers): Observable<any> {
    return this.http.post(this.apiUrl, newOffer);
  }

  updateJobOffer(updatedOffer: JobOffers): Observable<any> {
    return this.http.put(`${this.apiUrl}/${updatedOffer.id}`, updatedOffer);
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Additional methods can be added here for filtering, applications, etc.
}
      
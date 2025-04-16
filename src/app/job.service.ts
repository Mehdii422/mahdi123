import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http.get<JobOffers>(this.apiUrl + '/' + id);
  }

  addJobOffer(newOffer: JobOffers): Observable<JobOffers> {
    return this.http.post<JobOffers>(this.apiUrl, newOffer);
  }

  updateJobOffer(updatedOffer: JobOffers): Observable<JobOffers> {
    return this.http.put<JobOffers>(this.apiUrl + '/' + updatedOffer.id, updatedOffer);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }

  filterJobOffers(criteria: FilterCriteria): Observable<JobOffers[]> {
    return this.getAllJobOffers().pipe(
      map(jobs => jobs.filter(job => {
        let matches = true;
        if (criteria.nom) {
          matches = matches && job.nom.toLowerCase().includes(criteria.nom.toLowerCase());
        }
        if (criteria.domain) {
          matches = matches && job.domain.toLowerCase() === criteria.domain.toLowerCase();
        }
        if (criteria.partTime !== undefined) {
          matches = matches && job.part_time === criteria.partTime;
        }
        if (criteria.governorat) {
          matches = matches && job.governorat.toLowerCase() === criteria.governorat.toLowerCase();
        }
        return matches;
      }))
    );
  }

  getJobOffersByEntrepreneur(userId: number): Observable<JobOffers[]> {
    return this.getAllJobOffers().pipe(
      map(jobs => jobs.filter(job => job.entrepreneur?.id === userId))
    );
  }

  generateChatId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }
}

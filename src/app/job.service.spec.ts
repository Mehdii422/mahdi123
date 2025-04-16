import { TestBed } from '@angular/core/testing';
import { JobService } from './job.service';
import { JobOffers } from './job-offers';

describe('JobService', () => {
  let service: JobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobService);
  });

  it('should return job offers for the specified entrepreneur', () => {
    const entrepreneurId = 0; // Chef K's ID
    service.getJobOffersByEntrepreneur(entrepreneurId).subscribe(offers => {
      expect(offers).toBeDefined();
      expect(offers.length).toBeGreaterThan(0);
      offers.forEach(offer => {
        expect((offer as any).entrepreneur.id).toBe(entrepreneurId);
      });
    });
  });

  it('should allow entrepreneurs to update their job offers', () => {
    const entrepreneurId = 0; // Chef K's ID
    service.getJobOffersByEntrepreneur(entrepreneurId).subscribe(offers => {
      const originalOffer = offers[0];
      const updatedOffer = { ...originalOffer, description: 'Updated description' };

      service.updateJobOffer(updatedOffer).subscribe((updatedJobOffer: JobOffers) => {
        expect(updatedJobOffer).toBeDefined();
        expect(updatedJobOffer.description).toBe('Updated description');
      });
    });
  });

  it('should prevent updating offers not owned by entrepreneur', () => {
    const entrepreneurId = 0; // Chef K's ID
    const otherEntrepreneurId = 1; // Another entrepreneur's ID
    service.getJobOffersByEntrepreneur(otherEntrepreneurId).subscribe(offers => {
      const notOwnedOffer = offers[0];

      service.updateJobOffer(notOwnedOffer).subscribe((updatedJobOffer: JobOffers) => {
        expect(updatedJobOffer).toBeUndefined(); // Assuming the service returns undefined for unauthorized updates
      }, (error: { success: boolean; message: string }) => {
        expect(error).toBeDefined();
        expect(error.success).toBeFalse();
        expect(error.message).toBe('Job offer not found or not owned by entrepreneur');
      });
    });
  });
});

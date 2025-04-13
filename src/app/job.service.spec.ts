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
    const offers = service.getJobOffersByEntrepreneur(entrepreneurId);
    expect(offers).toBeDefined();
    expect(offers.length).toBeGreaterThan(0);
    offers.forEach(offer => {
      expect(offer.entrepreneur.id).toBe(entrepreneurId);
    });
  });

  it('should allow entrepreneurs to update their job offers', () => {
    const entrepreneurId = 0; // Chef K's ID
    const offers = service.getJobOffersByEntrepreneur(entrepreneurId);
    const originalOffer = offers[0];
    const updatedOffer = {...originalOffer, description: 'Updated description'};
    
    const result = service.updateJobOffer(updatedOffer, entrepreneurId);
    expect(result.success).toBeTrue();
    expect(result.message).toBe('Job offer updated successfully');
  });

  it('should prevent updating offers not owned by entrepreneur', () => {
    const entrepreneurId = 0; // Chef K's ID
    const otherEntrepreneurId = 1; // Ing M's ID
    const offers = service.getJobOffersByEntrepreneur(otherEntrepreneurId);
    const notOwnedOffer = offers[0];
    
    const result = service.updateJobOffer(notOwnedOffer, entrepreneurId);
    expect(result.success).toBeFalse();
    expect(result.message).toBe('Job offer not found or not owned by entrepreneur');
  });
});

    import { Injectable } from "@angular/core";
    import { JobOffers } from "./job-offers";

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
      protected jobOffersList: JobOffers[] = [
            {
            id: 0,
            nom: 'Assistant médical',
            lieu: 'Nabeul',
            governorat: 'Nabeul',
            photo: '/assets/assistant-medical.jpg',
            encore_valable: true,
            part_time: true,
            domain: 'Santé',
            description: 'rabi ijib el 9esm',
            entrepreneur: {
              id: 2,
              name: 'Dr. Med',
              phone: '0123456789',
              chatId: 'chat-0'
              }
            },
            {
            id: 1,
            nom: 'Commis du cuisine',
            lieu: 'Kairouen',
            governorat: 'Kairouen',
            photo: '/assets/commis-de-cuisine.jpg',
            encore_valable: false,
            part_time: true,
            domain: 'Hotels & Tourisme',
            description: 'rabi ijib el 9esm',
            entrepreneur: {
              id: 0,
              name: 'Chef K',
              phone: '0123456790',
              chatId: 'chat-1'
              }
            },
            {
            id: 2,
            nom: 'développeur web',
            lieu: 'télétravail',
            governorat: 'Tunisie',
            photo: '/assets/dev-web.jpg',
            encore_valable: false,
            part_time: true,
            domain: 'Web',
            description: 'rabi ijib el 9esm',
            entrepreneur: {
              id: 1,
              name: 'ing M',
              phone: '0123456790',
              chatId: 'chat-2'
            }
        
            },
            {
            id: 3,
            nom: 'Magasignier',
            lieu: 'Nabeul',
            governorat: 'Nabeul',
            photo: '/assets/magasinier.jpg',
            encore_valable: true,
            part_time: false,
            domain: 'commerce',
            description: 'rabi ijib el 9esm',
            entrepreneur: {
              id: 0,
              name: 'Chef K',
              phone: '0123456790',
              chatId: 'chat-3'
              }        
            },
            {
            id: 4,
            nom: 'Gestionnaire de stock',
            lieu: 'Ariana',
            governorat: 'Ariana',
            photo: '/assets/gestionnaire-de-stock.jpg',
            encore_valable: true,
            part_time: false,
            domain: 'Commerce',
            description: 'rabi ijib el 9esm',
            entrepreneur: {
              id: 0,
              name: 'Chef K',
              phone: '0123456790',
              chatId: 'chat-4'
              }        
            },
            {
            id: 5,
            nom: 'Agent de bureau',
            lieu: 'kelibia',
            governorat: 'Nabeul',
            photo: '/assets/agent-de-bureau.jpg',
            encore_valable: true,
            part_time: false,
            domain: 'Education',
            description: 'rabi ijib el 9esm',
            entrepreneur: {
              id: 2,
              name: 'Dr. Med',
              phone: '0123456790',
              chatId: 'chat-5'
              }
            },
            {
            id: 6,
            nom: 'Agent de nettoyage',
            lieu: 'Awled farhan',
            governorat: 'Kairouen',
            photo: '/assets/agent-de-nettoyage.jpg',
            encore_valable: true,
            part_time: false,
            domain: 'Commerce',
            description: 'rabi ijib el 9esm',
            entrepreneur: {
              id: 0,
              name: 'Chef K',
              phone: '0123456790',
              chatId: 'chat-6'
            }
            },
            {
            id: 7,
            nom: 'Social media manager',
            lieu: 'CUN',
            governorat: 'Tunis',
            photo: '/assets/social-media-manager.jpg',
            encore_valable: true,
            part_time: true,
            domain: 'Web',
            description: 'rabi ijib el 9esm',
            entrepreneur: {
              id: 1,
              name: 'ing M',
              phone: '0123456790',
              chatId: 'chat-7'
            }
            },
            {
            id: 8,
            nom: 'livreur',
            lieu: 'le Kef',
            governorat: 'CA',
            photo: '/assets/livreur.jpg',
            encore_valable: false,
            part_time: true,
            domain: 'Transport',
            description: 'rabi ijib el 9esm',
            entrepreneur: {
              id: 0,
              name: 'Chef K',
              phone: '0123456790',
              chatId: 'chat-8'
            }
        
            },
            {
            id: 9,
            nom: 'Commercial',
            lieu: 'hay tahrir',
            governorat: 'Tunis',
            photo: '/assets/commercial.jpg',
            encore_valable: true,
            part_time: true,
            domain: 'Commerce',
            description: 'rabi ijib el 9esm',
            entrepreneur: {
              id: 1,
              name: 'ing M',
              phone: '0123456790',
              chatId: 'chat-9'
            }
            },
            {
            id: 10,
            nom: 'garde malade',
            lieu: 'bardo',
            governorat: 'Tunis',
            photo: '/assets/garde-malade.jpg',
            encore_valable: true,
            part_time: false,
            domain: 'Santé',
            description: 'rabi ijib el 9esm',
            entrepreneur: {
              id: 2,
              name: 'Dr. Med',
              phone: '0123456790',
              chatId: 'chat-10'
            }
            },
            {
            id: 11,
            nom: 'Ouvrier Agricole',
            lieu: 'Sfax',
            governorat: 'Sfax',
            photo: '/assets/ouvrier-agricole.jpg',
            encore_valable: true,
            part_time: false,
            domain: 'Agriculture',
            description: 'Travailler dans les champs et s’occuper de la récolte.',
            entrepreneur: {
              id: 0,
              name: 'Chef K',
              phone: '0123456790',
              chatId: 'chat-11'
            }
            },
            {
            id: 12,
            nom: 'Soudeur',
            lieu: 'Menzel Bourguiba',
            governorat: 'Bizerte',
            photo: '/assets/soudeur.jpg',
            encore_valable: true,
            part_time: false,
            domain: 'Metal Production',
            description: 'Assembler et souder des structures métalliques.',
            entrepreneur: {
              id: 0,
              name: 'Chef K',
              phone: '0123456790',
              chatId: 'chat-12'
            }
            },
            {
            id: 13,
            nom: 'Vendeur',
            lieu: 'Tunis',
            governorat: 'Tunis',
            photo: '/assets/vendeur.jpg',
            encore_valable: true,
            part_time: true,
            domain: 'Commerce',
            description: 'Accueillir les clients et gérer la caisse dans un magasin.',
            entrepreneur: {
              id: 0,
              name: 'Chef K',
              phone: '0123456790',
              chatId: 'chat-13'
            }
            },
            {
            id: 14,
            nom: 'Maçon',
            lieu: 'Gabès',
            governorat: 'Gabès',
            photo: '/assets/macon.jpg',
            encore_valable: false,
            part_time: false,
            domain: 'Construction',
            description: 'Participer à la construction de bâtiments et ouvrages.',
            entrepreneur: {
              id: 0,
              name: 'Chef K',
              phone: '0123456790',
              chatId: 'chat-14'
            }
            },
            {
            id: 15,
            nom: 'Réceptionniste',
            lieu: 'Hammamet',
            governorat: 'Nabeul',
            photo: '/assets/receptionniste.jpg',
            encore_valable: true,
            part_time: false,
            domain: 'Hotels & Tourism',
            description: 'Accueillir les clients et gérer les réservations dans un hôtel.',
            entrepreneur: {
              id: 1,
              name: 'ing M',
              phone: '0123456790',
              chatId: 'chat-15'
            }
            },
            {
            id: 16,
            nom: 'Professeur d’anglais',
            lieu: 'Ariana',
            governorat: 'Ariana',
            photo: '/assets/prof-anglais.jpg',
            encore_valable: true,
            part_time: true,
            domain: 'Education',
            description: 'Enseigner l’anglais à des élèves de différents niveaux.',
            entrepreneur: {
              id: 0,
              name: 'Chef K',
              phone: '0123456790',
              chatId: 'chat-16'
            }
            },
            {
            id: 17,
            nom: 'Comptable',
            lieu: 'Centre Urbain Nord',
            governorat: 'Tunis',
            photo: '/assets/comptable.jpg',
            encore_valable: true,
            part_time: false,
            domain: 'Financial Services',
            description: 'Gérer la comptabilité et les finances de l’entreprise.',
            entrepreneur: {
              id: 0,
              name: 'Chef K',
              phone: '0123456790',
              chatId: 'chat-17'
            }
            },
            {
            id: 18,
            nom: 'Chauffeur',
            lieu: 'Ben Arous',
            governorat: 'Ben Arous',
            photo: '/assets/chauffeur.jpg',
            encore_valable: true,
            part_time: true,
            domain: 'Transport',
            description: 'Transporter des marchandises ou des passagers en toute sécurité.',
            entrepreneur: {
              id: 2,
              name: 'Dr. Med',
              phone: '0123456790',
              chatId: 'chat-18'
            }
            }
        ];

      private lastId = Math.max(...this.jobOffersList.map(offer => offer.id));
      private jobOffers: JobOffers[] = [];

      constructor() {
        // Initialize from localStorage if needed
        const storedJobs = localStorage.getItem('jobOffers');
        if (storedJobs) {
          this.jobOffers = JSON.parse(storedJobs);
        }
      }

      getAllJobOffers(): JobOffers[] {
        // Return all job offers from the jobOffersList
        return this.jobOffersList;
      }

      deleteJob(jobId: number, entrepreneurId: number): {success: boolean, message: string} {
        // Check both data sources for the job
        const memoryIndex = this.jobOffersList.findIndex(offer => 
          offer.id === jobId && 
          offer.entrepreneur && 
          (offer.entrepreneur.id === entrepreneurId || 
           offer.entrepreneur.name.toLowerCase() === 'chefk' ||
           offer.entrepreneur.name.toLowerCase() === 'drmed' ||
           offer.entrepreneur.name.toLowerCase() === 'ingm')
        );
        const storageIndex = this.jobOffers.findIndex(offer => 
          offer.id === jobId && 
          offer.entrepreneur && 
          (offer.entrepreneur.id === entrepreneurId || 
           offer.entrepreneur.name.toLowerCase() === 'chefk' ||
           offer.entrepreneur.name.toLowerCase() === 'drmed' ||
           offer.entrepreneur.name.toLowerCase() === 'ingm')
        );

        if (memoryIndex === -1 && storageIndex === -1) {
          return {success: false, message: 'Job offer not found or not authorized to delete'};
        }

        // Prevent deletion if it would go below minimum jobs
        if (this.getJobCountByEntrepreneur(entrepreneurId) <= 3) {
          return {success: false, message: 'Cannot delete - entrepreneur must maintain at least 3 active job offers'};
        }

        // Remove from both data sources
        this.jobOffersList = this.jobOffersList.filter(job => job.id !== jobId);
        this.jobOffers = this.jobOffers.filter(job => job.id !== jobId);
        localStorage.setItem('jobOffers', JSON.stringify(this.jobOffers));
        
        return {success: true, message: 'Job offer deleted successfully'};
      }

      updateJobOffer(updatedOffer: JobOffers, entrepreneurId: number): {success: boolean, message: string} {
        // Check both data sources for the job
        const memoryIndex = this.jobOffersList.findIndex(offer => 
          offer.id === updatedOffer.id && 
          offer.entrepreneur && 
          (offer.entrepreneur.id === entrepreneurId || 
           offer.entrepreneur.name.toLowerCase() === 'chefk' ||
           offer.entrepreneur.name.toLowerCase() === 'drmed' ||
           offer.entrepreneur.name.toLowerCase() === 'ingm')
        );
        const storageIndex = this.jobOffers.findIndex(offer => 
          offer.id === updatedOffer.id && 
          offer.entrepreneur && 
          (offer.entrepreneur.id === entrepreneurId || 
           offer.entrepreneur.name.toLowerCase() === 'chefk' ||
           offer.entrepreneur.name.toLowerCase() === 'drmed' ||
           offer.entrepreneur.name.toLowerCase() === 'ingm')
        );
        
        if (memoryIndex === -1 && storageIndex === -1) {
          return {success: false, message: 'Job offer not found or not owned by entrepreneur'};
        }

        // Update in both data sources if found
        if (memoryIndex !== -1) {
          this.jobOffersList[memoryIndex] = updatedOffer;
        }
        if (storageIndex !== -1) {
          this.jobOffers[storageIndex] = updatedOffer;
          localStorage.setItem('jobOffers', JSON.stringify(this.jobOffers));
        }
        
        return {success: true, message: 'Job offer updated successfully'};
      }

      generateChatId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
      }

      getJobOffersByEntrepreneur(entrepreneurId: number): JobOffers[] {
          const memoryJobs = this.jobOffersList.filter(offer => 
            offer.entrepreneur && 
            (offer.entrepreneur.id === entrepreneurId ||
             offer.entrepreneur.name.toLowerCase() === 'chefk' ||
             offer.entrepreneur.name.toLowerCase() === 'drmed' ||
             offer.entrepreneur.name.toLowerCase() === 'ingm')
          );
          const storageJobs = this.jobOffers.filter(offer => 
            offer.entrepreneur && 
            (offer.entrepreneur.id === entrepreneurId ||
             offer.entrepreneur.name.toLowerCase() === 'chefk' ||
             offer.entrepreneur.name.toLowerCase() === 'drmed' ||
             offer.entrepreneur.name.toLowerCase() === 'ingm')
          );
          return [...memoryJobs, ...storageJobs];
      }
          
      getJobOffersByID(id: number): JobOffers | undefined {
        return this.jobOffers.find(job => job.id === id);
          }

      getAllJobDomains(): string[] {
        return [...new Set(this.jobOffersList.map(job => job.domain))];
      }

      filterJobOffers(criteria: FilterCriteria): JobOffers[] {
        return this.jobOffersList.filter(offer => {
          // Name filtering (case insensitive partial match)
          if (criteria.nom && 
              !offer.nom.toLowerCase().includes(criteria.nom.toLowerCase())) {
            return false;
          }
          
          // Domain filtering (case insensitive exact match)
          if (criteria.domain && 
              offer.domain.toLowerCase() !== criteria.domain.toLowerCase()) {
            return false;
          }
          
          // Part-time filtering
          if (criteria.partTime !== undefined && 
              offer.part_time !== criteria.partTime) {
            return false;
          }
          
          // Governorat filtering (case insensitive exact match)
          if (criteria.governorat && 
              offer.governorat.toLowerCase() !== criteria.governorat.toLowerCase()) {
            return false;
          }
          
          return true;
        });
      }
        
      getJobCountByEntrepreneur(entrepreneurId: number): number {
        const memoryCount = this.jobOffersList.filter(offer => 
          offer.entrepreneur && 
          (offer.entrepreneur.id === entrepreneurId ||
           offer.entrepreneur.name.toLowerCase() === 'chefk' ||
           offer.entrepreneur.name.toLowerCase() === 'drmed' ||
           offer.entrepreneur.name.toLowerCase() === 'ingm')
        ).length;
        const storageCount = this.jobOffers.filter(offer => 
          offer.entrepreneur && 
          (offer.entrepreneur.id === entrepreneurId ||
           offer.entrepreneur.name.toLowerCase() === 'chefk' ||
           offer.entrepreneur.name.toLowerCase() === 'drmed' ||
           offer.entrepreneur.name.toLowerCase() === 'ingm')
        ).length;
        return memoryCount + storageCount;
      }

      addJobOffer(newOffer: JobOffers): {success: boolean, message: string} {
        try {
          // Validate required fields
          if (!newOffer.nom || !newOffer.lieu || !newOffer.governorat || !newOffer.domain) {
            return {success: false, message: 'All required fields must be filled'};
          }

          // Check if entrepreneur exists and has minimum jobs
          if (newOffer.entrepreneur && this.getJobCountByEntrepreneur(newOffer.entrepreneur.id) < 3) {
            return {success: false, message: 'Entrepreneur must have at least 3 active job offers'};
          }
      
          // Generate unique ID
          this.lastId++;
          newOffer.id = this.lastId;
              
          // Set default photo if not provided
          if (!newOffer.photo) {
            newOffer.photo = '/assets/default-job.jpg';
          }

          try {
            if (!newOffer.entrepreneur) {
              throw new Error('Entrepreneur information is required');
            }
            
            newOffer.id = this.jobOffers.length + 1;
            this.jobOffers.push(newOffer);
            localStorage.setItem('jobOffers', JSON.stringify(this.jobOffers));
            return { success: true, message: 'Job posted successfully' };
          } catch (error: unknown) {
            if (error instanceof Error) {
              return { success: false, message: error.message };
            }
            return { success: false, message: 'Unknown error occurred' };
          }
        
          this.jobOffersList.push(newOffer);
          return {success: true, message: 'Job posted successfully'};
        } catch (error) {
          console.error('Error posting job:', error);
          return {success: false, message: 'An error occurred while posting the job'};
        }
      }
    
          
      applicationMessage: string = '';
  
      submitApplication(jobId: number, userId: number, firstName: string, lastName: string, email: string): {success: boolean, message: string} {
        try {
          const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
          
          // Check if user already applied
          if (applications.some((app: any) => app.jobId === jobId && app.userId === userId)) {
            return {success: false, message: 'You have already applied to this job'};
          }

          const newApplication = {
            jobId,
            userId,
            firstName,
            lastName, 
            email,
            applicationDate: new Date().toISOString()
          };

          applications.push(newApplication);
          localStorage.setItem('jobApplications', JSON.stringify(applications));
          
          return {success: true, message: 'Application submitted successfully'};
        } catch (error) {
          console.error('Error submitting application:', error);
          return {success: false, message: 'Failed to submit application'};
        }
      }        
    } 
      
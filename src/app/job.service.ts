    import { Injectable } from "@angular/core";
    import { JobOffers } from "./job-offers";
    
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
            description: 'rabi ijib el 9esm'
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
            description: 'rabi ijib el 9esm'
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
            description: 'rabi ijib el 9esm'
        
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
            description: 'rabi ijib el 9esm'
        
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
            description: 'rabi ijib el 9esm'
        
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
            description: 'rabi ijib el 9esm'
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
            description: 'rabi ijib el 9esm'
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
            description: 'rabi ijib el 9esm'
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
            description: 'rabi ijib el 9esm'
        
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
            description: 'rabi ijib el 9esm'
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
            description: 'rabi ijib el 9esm'
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
            description: 'Travailler dans les champs et s’occuper de la récolte.'
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
            description: 'Assembler et souder des structures métalliques.'
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
            description: 'Accueillir les clients et gérer la caisse dans un magasin.'
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
            description: 'Participer à la construction de bâtiments et ouvrages.'
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
            description: 'Accueillir les clients et gérer les réservations dans un hôtel.'
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
            description: 'Enseigner l’anglais à des élèves de différents niveaux.'
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
            description: 'Gérer la comptabilité et les finances de l’entreprise.'
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
            description: 'Transporter des marchandises ou des passagers en toute sécurité.'
            }
        ];

    getAllJobOffers(): JobOffers[] {
        return this.jobOffersList;
        }
        
    getJobOffersByID(id: number): JobOffers | undefined {
        return this.jobOffersList.find(offer => offer.id === id);
        }
    }
    
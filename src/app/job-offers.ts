export interface JobOffers {
    id: number;
    nom: string;
    lieu: string;
    governorat: string;
    photo: string;
    encore_valable: boolean;
    part_time: boolean;
    domain: string;
    description: string;
    entrepreneur: {
        id: number;
        name: string;
        phone: string;
        chatId: string;
      };
    }

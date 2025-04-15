const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware: enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// In-memory data store for job offers (using your jobOffersList as a starting point)
let jobOffersList = [
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

// Counter for new job offer IDs
let lastJobId = Math.max(...jobOffersList.map(offer => offer.id));

// A helper function to generate a new chat ID (same logic as before)
function generateChatId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Start the Express server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

// GET all job offers
app.get('/api/jobs', (req, res) => {
  res.json(jobOffersList);
});

// POST create a new job offer
app.post('/api/jobs', (req, res) => {
  const newJob = req.body;
  lastJobId++;
  newJob.id = lastJobId;
  if (!newJob.entrepreneur) {
    newJob.entrepreneur = {
      id: 0,
      name: 'Unknown',
      phone: '',
      chatId: generateChatId()
    };
  }
  jobOffersList.push(newJob);
  res.status(201).json(newJob);
});

// PUT update an existing job offer by id
app.put('/api/jobs/:id', (req, res) => {
  const jobId = parseInt(req.params.id);
  const updatedJob = req.body;
  const index = jobOffersList.findIndex(job => job.id === jobId);
  if (index === -1) {
    return res.status(404).json({ error: 'Job offer not found' });
  }
  updatedJob.id = jobId; // Ensure id is not changed
  jobOffersList[index] = updatedJob;
  res.json(updatedJob);
});

// DELETE a job offer by id
app.delete('/api/jobs/:id', (req, res) => {
  const jobId = parseInt(req.params.id);
  const index = jobOffersList.findIndex(job => job.id === jobId);
  if (index === -1) {
    return res.status(404).json({ error: 'Job offer not found' });
  }
  jobOffersList.splice(index, 1);
  res.status(204).send();
});

// In-memory data store for users
let users = [];
let lastUserId = 0;

// POST register a new user
app.post('/api/register', (req, res) => {
  const { firstName, lastName, email, password, type } = req.body;
  if (!firstName || !lastName || !email || !password || !type) {
    return res.status(400).json({ success: false, message: 'Tous les champs sont requis.' });
  }
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'Un utilisateur avec cet email existe déjà.' });
  }
  lastUserId++;
  const newUser = {
    id: lastUserId,
    firstName,
    lastName,
    email,
    password, // Note: In production, passwords should be hashed!
    type
  };
  users.push(newUser);
  res.status(201).json({ success: true, message: 'Inscription réussie.', user: { id: newUser.id, firstName, lastName, email, type } });
});

// POST login a user
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe sont requis.' });
  }
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
  }
  res.json({ success: true, message: 'Connexion réussie.', user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, type: user.type } });
});

import { TechDocument } from '../types';

/**
 * CONFIGURATION PROGRAMMEUR
 * Liste des documents techniques (GDO/GNR).
 * 
 * CORRECTIONS APPORTÉES :
 * 1. Chemins absolus (commencent par /) pour éviter les erreurs de chemin relatif.
 * 2. Répartition correcte entre /documents/ et /documents_2/.
 * 3. Suppression des accents dans les noms de fichiers (ex: Interieures).
 */
export const PRELOADED_DOCUMENTS: TechDocument[] = [
  // --- DOSSIER 1 : /documents/ (Incendie, SAP, NRBC) ---

  // --- INCENDIE ---
  {
    id: 'inc-01',
    name: 'GDO Incendies Structures',
    filename: 'GDO-Interventions-Incendies-Structures.pdf',
    category: 'INCENDIE',
    path: '/documents/GDO-Interventions-Incendies-Structures.pdf'
  },
  {
    id: 'inc-02',
    name: 'GDO Feux de Forêts',
    filename: 'GDO-Feux-Forets-Espaces-Naturels.pdf',
    category: 'INCENDIE',
    path: '/documents/GDO-Feux-Forets-Espaces-Naturels.pdf'
  },
  {
    id: 'inc-03',
    name: 'GDO Milieu Agricole',
    filename: 'GDO-Interventions-Milieu-Agricole.pdf',
    category: 'INCENDIE',
    path: '/documents/GDO-Interventions-Milieu-Agricole.pdf'
  },
  {
    id: 'inc-04',
    name: 'GDO Silos',
    filename: 'GDO-Interventions-Silos.pdf',
    category: 'INCENDIE',
    path: '/documents/GDO-Interventions-Silos.pdf'
  },

  // --- SAP (Secours à Personne) ---
  {
    id: 'sap-02',
    name: 'GDO Milieu Routier (SR)',
    filename: 'GDO_OPERATIONS_MILIEU_ROUTIER_2025_DGSCGC.pdf',
    category: 'SAP',
    path: '/documents/GDO_OPERATIONS_MILIEU_ROUTIER_2025_DGSCGC.pdf'
  },
  {
    id: 'sap-03',
    name: 'PSE 2024',
    filename: '2024 PSE.pdf',
    category: 'SAP',
    path: '/documents/2024 PSE.pdf'
  },
  {
    id: 'sap-04',
    name: 'Recueil PSE',
    filename: 'Recueil PSE.pdf',
    category: 'SAP',
    path: '/documents/Recueil PSE.pdf'
  },

  // --- NRBC / RISQUES TECH ---
  {
    id: 'risk-01',
    name: 'GDO Présence de Gaz',
    filename: 'GDO-Interventions-Presence-De-Gaz.pdf',
    category: 'NRBC',
    path: '/documents/GDO-Interventions-Presence-De-Gaz.pdf'
  },
  {
    id: 'risk-02',
    name: 'GDO Présence Électricité',
    filename: 'GDO-Operations-Presence-Electricite.pdf',
    category: 'NRBC',
    path: '/documents/GDO-Operations-Presence-Electricite.pdf'
  },
  {
    id: 'risk-03',
    name: 'GDO Toxicité des Fumées',
    filename: 'GDO-Prevention-Risques-Toxicite-Fumees.pdf',
    category: 'NRBC',
    path: '/documents/GDO-Prevention-Risques-Toxicite-Fumees.pdf'
  },
  {
    id: 'risk-04',
    name: 'GDO Éoliennes',
    filename: 'GDO_Interventions_dans_les_eoliennes_2019.pdf',
    category: 'NRBC',
    path: '/documents_2/GDO_Interventions_dans_les_eoliennes_2019.pdf'
  },
  {
    id: 'risk-05',
    name: 'GDO Photovoltaïque',
    filename: 'GDO-PPV_Interventions_elements_photovoltaiques_2017.pdf',
    category: 'NRBC',
    path: '/documents_2/GDO-PPV_Interventions_elements_photovoltaiques_2017.pdf'
  },

  // --- DOSSIER 2 : /documents_2/ (Opérationnel, Divers) ---

  // --- OPÉRATIONNEL / COMMANDEMENT ---
  {
    id: 'ops-01',
    name: 'GDO Commandement (GOC)',
    filename: 'GDO-Exercice-Commandement-Conduite-Operations-V2.pdf',
    category: 'OPÉRATIONNEL',
    path: '/documents_2/GDO-Exercice-Commandement-Conduite-Operations-V2.pdf'
  },
  {
    id: 'ops-02',
    name: 'GDO Drones (Télépilotes)',
    filename: 'GDO-Engagement-Appareils-Telepilotes-Lutte-Appui-Secours.pdf',
    category: 'OPÉRATIONNEL',
    path: '/documents_2/GDO-Engagement-Appareils-Telepilotes-Lutte-Appui-Secours.pdf'
  },
  {
    id: 'ops-03',
    name: 'GDO Équipes Cynotechniques',
    filename: 'GDO-Engagement-des-equipes-cynotechniques.pdf',
    category: 'OPÉRATIONNEL',
    path: '/documents_2/GDO-Engagement-des-equipes-cynotechniques.pdf'
  },

  // --- DIVERS / SPÉCIALITÉS ---
  {
    id: 'spec-01',
    name: 'GDO Milieu Périlleux (GRIMP)',
    filename: 'GDO-Interventions-Milieu-Perilleux-Montagne-V2.pdf',
    category: 'DIVERS',
    path: '/documents_2/GDO-Interventions-Milieu-Perilleux-Montagne-V2.pdf'
  },
  {
    id: 'spec-02',
    name: 'GDO Effondrement / Instable (SD)',
    filename: 'GDO-Interventions-Milieux-Effondres-Ou-Instables.pdf',
    category: 'DIVERS',
    path: '/documents_2/GDO-Interventions-Milieux-Effondres-Ou-Instables.pdf'
  },
  {
    id: 'spec-03',
    name: 'GDO Navires / Maritime',
    filename: 'GDO-Interventions-Navires-Bateaux-Milieu-Maritime.pdf',
    category: 'DIVERS',
    path: '/documents_2/GDO-Interventions-Navires-Bateaux-Milieu-Maritime.pdf'
  },
  {
    id: 'spec-04',
    name: 'GDO Eaux Intérieures',
    filename: 'GDO-Interventions-Bateaux-Eaux-Interieures.pdf',
    category: 'DIVERS',
    path: '/documents_2/GDO-Interventions-Bateaux-Eaux-Interieures.pdf'
  },
  {
    id: 'spec-05',
    name: 'GDO Présence ULM',
    filename: 'GDO-Interventions-en-presence-ULM.pdf',
    category: 'DIVERS',
    path: '/documents_2/GDO-Interventions-en-presence-ULM.pdf'
  },

  // --- DOSSIER GTO ---
  {
    id: 'gto-01',
    name: 'GTO Feux de Forêts',
    filename: 'GTO_FDF_1e-edition_2021_BDFE_DGSCGC.pdf',
    category: 'GTO',
    path: '/GTO/GTO_FDF_1e-edition_2021_BDFE_DGSCGC.pdf'
  },
  {
    id: 'gto-02',
    name: 'GTO Sauvetage et Mise en Sécurité',
    filename: 'GTO_Sauvetage-Et-Mise-En-Securite-V1.1_BDFE_DGSCGC.pdf',
    category: 'GTO',
    path: '/GTO/GTO_Sauvetage-Et-Mise-En-Securite-V1.1_BDFE_DGSCGC.pdf'
  },
  {
    id: 'gto-03',
    name: 'GTO Milieu Vicié (2019)',
    filename: 'GTO-Engagement-en-milieu-vicie_2019.pdf',
    category: 'GTO',
    path: '/GTO/GTO-Engagement-en-milieu-vicie_2019.pdf'
  },
  {
    id: 'gto-04',
    name: 'GTO Milieux Viciés V2',
    filename: 'GTO-Engagement-Milieux-Vicies-V2.pdf',
    category: 'GTO',
    path: '/GTO/GTO-Engagement-Milieux-Vicies-V2.pdf'
  },
  {
    id: 'gto-05',
    name: 'GTO Établissements Techniques Extinction',
    filename: 'GTO-etablissements-techniques-extinction-2018.pdf',
    category: 'GTO',
    path: '/GTO/GTO-etablissements-techniques-extinction-2018.pdf'
  },
  {
    id: 'gto-06',
    name: 'GTO Sauvegarde Opérationnelle',
    filename: 'GTO-Sauvegarde-Operationnelle.pdf',
    category: 'GTO',
    path: '/GTO/GTO-Sauvegarde-Operationnelle.pdf'
  },
  {
    id: 'gto-07',
    name: 'GTO Sauvetages V2',
    filename: 'GTO-Sauvetages-Mise-En-Securite-V2.pdf',
    category: 'GTO',
    path: '/GTO/GTO-Sauvetages-Mise-En-Securite-V2.pdf'
  },
  {
    id: 'gto-08',
    name: 'GTO SMPM',
    filename: 'GTO-SMPM-.pdf',
    category: 'GTO',
    path: '/GTO/GTO-SMPM-.pdf'
  },
  {
    id: 'gto-09',
    name: 'GTO USAR',
    filename: 'GTO-USARVF1.pdf',
    category: 'GTO',
    path: '/GTO/GTO-USARVF1.pdf'
  },
  {
    id: 'gto-10',
    name: 'GTO Ventilation Opérationnelle',
    filename: 'GTO-ventilation-operationnelle_VF_2019.pdf',
    category: 'GTO',
    path: '/GTO/GTO-ventilation-operationnelle_VF_2019.pdf'
  }
];

export const CATEGORIES = ['INCENDIE', 'SAP', 'NRBC', 'OPÉRATIONNEL', 'DIVERS', 'GTO'] as const;
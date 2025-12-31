
# 🚒 SecoursTech - Assistant Opérationnel Sapeurs-Pompiers
</div>

Un assistant intelligent basé sur l'IA pour aider les Sapeurs-Pompiers dans leurs missions quotidiennes en s'appuyant sur les référentiels officiels (GDO, GNR, SSUAP).

**Technologies :** React, Vite, TailwindCSS


<img width="1111" height="599" alt="Capture d’écran 2025-12-31 à 14 41 21" src="https://github.com/user-attachments/assets/8ee32643-36a1-4042-b13b-f6b2321ae9c7" />


---

## 🌟 Fonctionnalités

- **Chat Intelligent** : Posez des questions techniques sur les interventions.
- **Base de Connaissances** : Accès direct aux GDO (Guides de Doctrine Opérationnelle) et GNR (Guides de Référentiels Nationaux).
- **Filtrage par Spécialité** : L'IA priorise les documents en fonction du contexte (SUAP, Incendie, Risques Technologiques, etc.).
- **Visionneuse PDF Intégrée** : Consultez les documents sources directement dans l'application.
- **Optimisé pour le Terrain** : Interface claire, rapide et réactive.

---

## 📂 Structure du Projet

Le projet est organisé de manière claire et modulaire :

- `components/` : Composants React (Sidebar, Chat, Boutons).
- `services/` : Logique métier et intégration API (Gemini).
- `data/` : Base de connaissances et constantes.
- `types.ts` : Définitions TypeScript.
- `documents/` & `documents_2/` : Documents PDF officiels.

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (v18+)
- Une clé API Google Gemini (disponible sur [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/gabrielkpo/secours-tech-v.2.1.git
   cd secours-tech-v.2.1
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration**
   Créez un fichier `.env.local` à la racine et ajoutez votre clé API :
   ```env
   VITE_GEMINI_API_KEY=votre_cle_api_ici
   ```

4. **Lancer l'application**
   ```bash
   npm run dev
   ```
   L'application sera disponible sur `http://localhost:5173`.

---

## 🛠️ Technologies Utilisées

- **Frontend** : React 19, TypeScript, Tailwind CSS.
- **Outils** : Vite, FontAwesome.
- **IA** : Google Gemini SDK (`@google/genai`).

---

> [!IMPORTANT]
> **Note :** Cet outil est un assistant et ne remplace en aucun cas la formation officielle et les ordres du Commandement des Opérations de Secours (COS).


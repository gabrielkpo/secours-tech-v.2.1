/**
 * Fetches a file from the public folder and converts it to Base64
 * Used for the pre-loaded documents.
 */
export const urlToBase64 = async (url: string): Promise<string> => {
  try {
    // 1. Normalisation : Assurer que le chemin commence par un '/'
    const safePath = url.startsWith('/') ? url : `/${url}`;
    
    // 2. Utilisation directe du chemin relatif.
    // encodeURI est important pour gérer les espaces dans les noms de fichiers
    // On n'utilise PLUS window.location.origin pour éviter les problèmes de "Mixed Content" ou de ports en dev
    const requestPath = encodeURI(safePath);
    
    console.debug(`[FileUtils] Chargement relatif : ${requestPath}`);

    const response = await fetch(requestPath);
    
    // 3. Gestion fine des erreurs HTTP
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`[FileUtils] ❌ ERREUR 404 : Fichier introuvable sur le serveur.`);
        throw new Error(`Document introuvable (404). Vérifiez que le fichier existe bien dans le dossier public : ${safePath}`);
      }
      throw new Error(`Erreur HTTP ${response.status} lors du chargement de ${safePath}`);
    }

    const blob = await response.blob();
    
    // 4. Conversion Blob -> Base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
           // On retire l'en-tête "data:application/pdf;base64," pour ne garder que la data pure
           const base64 = reader.result.split(',')[1];
           resolve(base64);
        } else {
           reject(new Error('Échec de la conversion du fichier en Base64.'));
        }
      };
      reader.onerror = () => reject(new Error('Erreur de lecture du fichier (FileReader).'));
      reader.readAsDataURL(blob);
    });
  } catch (error: any) {
    // Si c'est une erreur réseau pure (Failed to fetch)
    if (error.message === 'Failed to fetch') {
        console.error("[FileUtils] ❌ ERREUR RÉSEAU : Impossible d'accéder au fichier.");
        console.error("Causes possibles : Chemin incorrect, bloqueur de publicité, ou restrictions navigateur.");
    }
    console.error("[FileUtils] Exception :", error);
    throw error;
  }
};
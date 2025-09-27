import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";

export interface ErrorInfo {
  error: unknown;
  context?: string;
  userMessage?: string;
}

export const useErrorHandler = () => {
  const { toast } = useToast();

  const handleError = useCallback(
    ({ error, context, userMessage }: ErrorInfo) => {
      // Log l'erreur pour le debugging (en développement seulement)
      if (process.env.NODE_ENV === 'development') {
        console.error(`[Error] ${context || 'Unknown context'}:`, error);
      }

      // Déterminer le message à afficher à l'utilisateur
      let displayMessage = userMessage || "Une erreur inattendue s'est produite";

      if (error instanceof Error) {
        // Messages d'erreur spécifiques pour certains cas
        if (error.message.includes('Network request failed')) {
          displayMessage = "Problème de connexion. Vérifiez votre réseau.";
        } else if (error.message.includes('JWT')) {
          displayMessage = "Session expirée. Veuillez vous reconnecter.";
        } else if (error.message.includes('Row Level Security')) {
          displayMessage = "Accès non autorisé à cette ressource.";
        } else if (error.message.includes('duplicate key')) {
          displayMessage = "Cette donnée existe déjà.";
        }
      }

      // Afficher le toast d'erreur
      toast({
        title: "Erreur",
        description: displayMessage,
        variant: "destructive",
      });

      return displayMessage;
    },
    [toast]
  );

  return { handleError };
};
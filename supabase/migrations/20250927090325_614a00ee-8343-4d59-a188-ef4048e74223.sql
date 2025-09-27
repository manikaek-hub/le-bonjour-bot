-- Ajouter une politique RLS pour permettre aux admins de supprimer les réservations
CREATE POLICY "Les admins peuvent supprimer toutes les réservations"
ON public.reservations
FOR DELETE
TO authenticated
USING (public.is_admin());
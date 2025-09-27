-- Ajouter une politique RLS pour permettre aux admins de voir toutes les réservations
CREATE POLICY "Les admins peuvent voir toutes les réservations"
ON public.reservations
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Ajouter une politique RLS pour permettre aux admins de modifier toutes les réservations
CREATE POLICY "Les admins peuvent modifier toutes les réservations"
ON public.reservations
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());
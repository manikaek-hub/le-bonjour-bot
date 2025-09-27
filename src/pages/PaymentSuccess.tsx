import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [verifying, setVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'verifying'>('verifying');

  const sessionId = searchParams.get('session_id');
  const reservationId = searchParams.get('reservation_id');

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!sessionId || !reservationId) {
      setPaymentStatus('failed');
      setVerifying(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        console.log('Verifying payment:', { sessionId, reservationId });
        
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: {
            sessionId,
            reservationId
          }
        });

        if (error) {
          throw new Error(error.message);
        }

        if (data?.success) {
          setPaymentStatus('success');
          toast({
            title: "Paiement confirmé !",
            description: "Votre réservation a été confirmée et payée avec succès.",
          });
        } else {
          setPaymentStatus('failed');
          toast({
            title: "Échec du paiement",
            description: data?.message || "Le paiement n'a pas pu être validé.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setPaymentStatus('failed');
        toast({
          title: "Erreur de vérification",
          description: "Impossible de vérifier le statut du paiement.",
          variant: "destructive",
        });
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, reservationId, user, authLoading, navigate]);

  if (authLoading || verifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">Vérification du paiement...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Veuillez patienter pendant que nous confirmons votre paiement
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {paymentStatus === 'success' ? (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-green-700">Paiement réussi !</CardTitle>
            </>
          ) : (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-red-700">Paiement échoué</CardTitle>
            </>
          )}
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {paymentStatus === 'success' ? (
            <div>
              <p className="text-lg mb-2">Votre réservation a été confirmée !</p>
              <p className="text-sm text-muted-foreground mb-6">
                Un email de confirmation vous a été envoyé avec tous les détails de votre réservation.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-lg mb-2">Le paiement n'a pas pu être traité</p>
              <p className="text-sm text-muted-foreground mb-6">
                Votre réservation est toujours en attente. Vous pouvez réessayer le paiement depuis vos réservations.
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/mes-reservations')} 
              className="w-full"
              variant={paymentStatus === 'success' ? 'default' : 'outline'}
            >
              Voir mes réservations
            </Button>
            
            {paymentStatus === 'failed' && (
              <Button 
                onClick={() => navigate('/reservation')} 
                className="w-full"
              >
                Faire une nouvelle réservation
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
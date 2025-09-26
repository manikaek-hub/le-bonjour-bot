import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReservationEmailRequest {
  userEmail: string;
  userName: string;
  reservationId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  accommodationType: string;
  totalPrice: number;
  specialRequests?: string;
}

const accommodationLabels: Record<string, string> = {
  "villa_luxe": "Villa de Luxe",
  "suite_familiale": "Suite Familiale", 
  "chambre_vue_mer": "Chambre Vue Mer",
  "chambre_standard": "Chambre Standard"
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const calculateNights = (checkIn: string, checkOut: string) => {
  const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
  return nights;
};

const createEmailTemplate = (data: ReservationEmailRequest) => {
  const nights = calculateNights(data.checkInDate, data.checkOutDate);
  const accommodationLabel = accommodationLabels[data.accommodationType] || data.accommodationType;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmation de réservation - FortJoret Resort</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0;
          background-color: #f8fafc;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header { 
          background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); 
          color: white; 
          padding: 40px 30px; 
          text-align: center; 
        }
        .header h1 { 
          margin: 0; 
          font-size: 28px; 
          font-weight: 300;
        }
        .header p { 
          margin: 8px 0 0 0; 
          opacity: 0.9;
          font-size: 16px;
        }
        .content { 
          padding: 40px 30px; 
        }
        .greeting { 
          font-size: 18px; 
          margin-bottom: 20px; 
          color: #1e293b;
        }
        .reservation-details { 
          background: #f1f5f9; 
          border-radius: 8px; 
          padding: 25px; 
          margin: 25px 0; 
        }
        .detail-row { 
          display: flex; 
          justify-content: space-between; 
          align-items: center;
          padding: 8px 0; 
          border-bottom: 1px solid #e2e8f0;
        }
        .detail-row:last-child { 
          border-bottom: none; 
          font-weight: bold;
          font-size: 18px;
          color: #0ea5e9;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 2px solid #0ea5e9;
        }
        .detail-label { 
          font-weight: 500; 
          color: #475569;
        }
        .detail-value { 
          color: #1e293b;
          font-weight: 500;
        }
        .highlight { 
          background: #dbeafe; 
          border-left: 4px solid #0ea5e9; 
          padding: 15px; 
          margin: 20px 0; 
          border-radius: 0 6px 6px 0;
        }
        .special-requests {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 15px;
          margin: 20px 0;
          border-radius: 0 6px 6px 0;
        }
        .footer { 
          background: #1e293b; 
          color: white; 
          padding: 30px; 
          text-align: center; 
        }
        .footer p { 
          margin: 5px 0; 
        }
        .contact-info {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
          border: 1px solid #e2e8f0;
        }
        .contact-info h3 {
          margin: 0 0 15px 0;
          color: #1e293b;
          font-size: 16px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏖️ FortJoret Resort</h1>
          <p>Fermanville, Normandie</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Bonjour ${data.userName},
          </div>
          
          <p>Nous avons le plaisir de confirmer votre réservation au FortJoret Resort. Nous vous remercions de votre confiance et nous réjouissons de vous accueillir prochainement.</p>
          
          <div class="highlight">
            <strong>Votre réservation est confirmée !</strong><br>
            Numéro de réservation : <strong>${data.reservationId}</strong>
          </div>
          
          <div class="reservation-details">
            <h3 style="margin-top: 0; color: #1e293b;">Détails de votre séjour</h3>
            
            <div class="detail-row">
              <span class="detail-label">📅 Arrivée</span>
              <span class="detail-value">${formatDate(data.checkInDate)}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">📅 Départ</span>
              <span class="detail-value">${formatDate(data.checkOutDate)}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">🌙 Durée</span>
              <span class="detail-value">${nights} nuit${nights > 1 ? 's' : ''}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">👥 Invités</span>
              <span class="detail-value">${data.guests} personne${data.guests > 1 ? 's' : ''}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">🏨 Hébergement</span>
              <span class="detail-value">${accommodationLabel}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">💰 Prix total</span>
              <span class="detail-value">${data.totalPrice}€</span>
            </div>
          </div>
          
          ${data.specialRequests ? `
            <div class="special-requests">
              <strong>📝 Vos demandes spéciales :</strong><br>
              ${data.specialRequests}
            </div>
          ` : ''}
          
          <div class="contact-info">
            <h3>📞 Informations de contact</h3>
            <p><strong>Adresse :</strong> FortJoret Resort, Fermanville, 50840 Normandie</p>
            <p><strong>Téléphone :</strong> +33 2 33 54 XX XX</p>
            <p><strong>Email :</strong> contact@fortjoret-resort.fr</p>
          </div>
          
          <p>Nous vous rappelons que :</p>
          <ul>
            <li>✅ L'annulation est gratuite jusqu'à 48h avant votre arrivée</li>
            <li>✅ L'enregistrement se fait à partir de 15h00</li>
            <li>✅ Le départ est avant 11h00</li>
            <li>✅ Un parking gratuit est disponible sur place</li>
          </ul>
          
          <p>Si vous avez des questions ou souhaitez modifier votre réservation, n'hésitez pas à nous contacter.</p>
          
          <p>Nous avons hâte de vous accueillir pour un séjour inoubliable !</p>
          
          <p style="margin-top: 30px;">
            Cordialement,<br>
            <strong>L'équipe du FortJoret Resort</strong>
          </p>
        </div>
        
        <div class="footer">
          <p><strong>FortJoret Resort</strong></p>
          <p>Votre refuge de luxe en Normandie</p>
          <p style="font-size: 12px; opacity: 0.8; margin-top: 15px;">
            Cet email a été envoyé automatiquement, merci de ne pas y répondre.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ReservationEmailRequest = await req.json();
    console.log("Sending reservation email to:", data.userEmail);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "FortJoret Resort <onboarding@resend.dev>",
        to: [data.userEmail],
        subject: `Confirmation de réservation - FortJoret Resort (${data.reservationId})`,
        html: createEmailTemplate(data),
      }),
    });

    const result = await emailResponse.json();
    
    if (!emailResponse.ok) {
      throw new Error(`Resend API error: ${result.message || 'Unknown error'}`);
    }

    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-reservation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
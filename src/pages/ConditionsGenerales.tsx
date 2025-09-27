import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ConditionsGenerales = () => {
  return (
    <>
      <Helmet>
        <title>Conditions Générales - FortJoret Resort</title>
        <meta name="description" content="Conditions générales d'utilisation et de réservation de FortJoret Resort, Fermanville, Normandie." />
      </Helmet>
      
      <div className="relative">
        <Header />
        <main className="min-h-screen bg-background pt-20">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground mb-8">Conditions Générales</h1>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Objet</h2>
                  <p>
                    Les présentes conditions générales régissent les relations contractuelles entre FortJoret Resort 
                    et ses clients dans le cadre de la réservation et de l'utilisation des hébergements situés à Fermanville.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Réservations</h2>
                  <p>
                    Les réservations peuvent être effectuées via notre site internet ou par téléphone au 07 61 97 60 41. 
                    Toute réservation est confirmée par email avec les détails du séjour.
                  </p>
                  <p>
                    Un acompte de 30% du montant total est exigé lors de la réservation. Le solde est à régler au plus tard 
                    7 jours avant l'arrivée.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. Arrivée et Départ</h2>
                  <p>
                    <strong>Arrivée :</strong> À partir de 16h00<br />
                    <strong>Départ :</strong> Avant 11h00
                  </p>
                  <p>
                    Les clés sont remises en main propre. Merci de nous contacter pour organiser votre arrivée.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Annulation</h2>
                  <p>
                    - Plus de 30 jours avant l'arrivée : remboursement intégral<br />
                    - Entre 30 et 15 jours : 50% du montant total<br />
                    - Moins de 15 jours : aucun remboursement
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Responsabilité</h2>
                  <p>
                    Le client est responsable de tout dommage causé au logement pendant son séjour. 
                    FortJoret Resort décline toute responsabilité en cas de vol ou dommage aux biens personnels.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact</h2>
                  <p>
                    Pour toute question : contact@fortjoret-resort.fr ou 07 61 97 60 41
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ConditionsGenerales;
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Annulation = () => {
  return (
    <>
      <Helmet>
        <title>Politique d'Annulation - FortJoret Resort</title>
        <meta name="description" content="Conditions d'annulation et de remboursement pour les réservations à FortJoret Resort." />
      </Helmet>
      
      <div className="relative">
        <Header />
        <main className="min-h-screen bg-background pt-20">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground mb-8">Politique d'Annulation</h1>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Conditions d'annulation</h2>
                  <p>
                    Nous comprenons que les plans peuvent changer. Voici notre politique d'annulation flexible :
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Délais et remboursements</h2>
                  <div className="bg-secondary/20 p-6 rounded-lg">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <strong className="text-foreground">Plus de 30 jours avant l'arrivée</strong><br />
                          Remboursement intégral (100%)
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                        <div>
                          <strong className="text-foreground">Entre 30 et 15 jours avant l'arrivée</strong><br />
                          Remboursement de 50% du montant total
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                        <div>
                          <strong className="text-foreground">Moins de 15 jours avant l'arrivée</strong><br />
                          Aucun remboursement possible
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Procédure d'annulation</h2>
                  <p>
                    Pour annuler votre réservation :
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Contactez-nous par email à contact@fortjoret-resort.fr</li>
                    <li>Indiquez votre numéro de réservation</li>
                    <li>Précisez le motif de l'annulation</li>
                    <li>Nous traiterons votre demande sous 48h</li>
                  </ol>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Cas exceptionnels</h2>
                  <p>
                    En cas de force majeure (conditions météorologiques extrêmes, problèmes de santé graves), 
                    nous étudierons votre situation individuellement pour trouver une solution équitable.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Modification de réservation</h2>
                  <p>
                    Les modifications de dates sont possibles sous réserve de disponibilité. 
                    Contactez-nous au plus tôt pour étudier les possibilités.
                  </p>
                </section>

                <section className="bg-primary/10 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Contact</h2>
                  <p className="mb-2">
                    Pour toute question concernant les annulations :
                  </p>
                  <p>
                    <strong>Email :</strong> contact@fortjoret-resort.fr<br />
                    <strong>Téléphone :</strong> 07 61 97 60 41<br />
                    <strong>Horaires :</strong> 9h-19h tous les jours
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

export default Annulation;
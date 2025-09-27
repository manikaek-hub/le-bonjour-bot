import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PolitiqueConfidentialite = () => {
  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité - FortJoret Resort</title>
        <meta name="description" content="Politique de confidentialité et protection des données personnelles de FortJoret Resort." />
      </Helmet>
      
      <div className="relative">
        <Header />
        <main className="min-h-screen bg-background pt-20">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground mb-8">Politique de Confidentialité</h1>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Collecte des données</h2>
                  <p>
                    Nous collectons uniquement les informations nécessaires à la gestion de votre réservation : 
                    nom, prénom, email, téléphone et adresse.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Utilisation des données</h2>
                  <p>
                    Vos données personnelles sont utilisées exclusivement pour :
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Traiter votre réservation</li>
                    <li>Vous contacter concernant votre séjour</li>
                    <li>Vous envoyer des informations pratiques</li>
                    <li>Améliorer nos services</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. Conservation des données</h2>
                  <p>
                    Vos données sont conservées pendant la durée nécessaire à la gestion de votre séjour 
                    et conformément aux obligations légales (3 ans maximum).
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Vos droits</h2>
                  <p>
                    Conformément au RGPD, vous disposez des droits d'accès, de rectification, 
                    de suppression et de portabilité de vos données. 
                    Contactez-nous à : contact@fortjoret-resort.fr
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Sécurité</h2>
                  <p>
                    Nous mettons en œuvre toutes les mesures techniques et organisationnelles 
                    appropriées pour protéger vos données personnelles.
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

export default PolitiqueConfidentialite;
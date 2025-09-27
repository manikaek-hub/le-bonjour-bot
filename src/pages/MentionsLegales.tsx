import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MentionsLegales = () => {
  return (
    <>
      <Helmet>
        <title>Mentions Légales - FortJoret Resort</title>
        <meta name="description" content="Mentions légales et informations juridiques de FortJoret Resort, Fermanville, Normandie." />
      </Helmet>
      
      <div className="relative">
        <Header />
        <main className="min-h-screen bg-background pt-20">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground mb-8">Mentions Légales</h1>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Identification</h2>
                  <p>
                    <strong>Dénomination :</strong> FortJoret Resort<br />
                    <strong>Adresse :</strong> 36 & 55 Fort Joret, 50840 Fermanville, France<br />
                    <strong>Téléphone :</strong> 07 61 97 60 41<br />
                    <strong>Email :</strong> contact@fortjoret-resort.fr
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Hébergement</h2>
                  <p>
                    Site hébergé par Lovable<br />
                    Serveurs situés dans l'Union Européenne
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. Propriété intellectuelle</h2>
                  <p>
                    L'ensemble du contenu de ce site (textes, images, vidéos) est protégé par le droit d'auteur. 
                    Toute reproduction non autorisée est interdite.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Responsabilité</h2>
                  <p>
                    Les informations présentes sur ce site sont données à titre indicatif. 
                    FortJoret Resort s'efforce de maintenir ces informations à jour mais ne peut garantir 
                    leur exactitude absolue.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Droit applicable</h2>
                  <p>
                    Le présent site est soumis au droit français. 
                    En cas de litige, les tribunaux français seront seuls compétents.
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

export default MentionsLegales;
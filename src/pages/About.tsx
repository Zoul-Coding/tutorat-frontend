import { Link } from "react-router-dom";
import AboutAnnuaire from "@/components/AboutAnnuaire";
import AboutEntrepreneur from "@/components/AboutEntrepreneur";
import AboutValue from "@/components/AboutValue";
import AboutFounder from "@/components/AboutFounder";
import AboutCoFounder from "@/components/AboutCoFounder";
import { getToken } from "@/lib/utils";

const About = () => {
  const user = getToken();

  return (
    <section>
      <div className="bg-background flex flex-col md:gap-6 gap-6 justify-center items-center md:px-0 px-5 md:pt-44 pt-32 pb-32">
        <div className="flex flex-col gap-1">
          <h1 className="text-marronFonce md:px-40 px-5 font-passionOne font-[400] text-center md:text-[93px] text-4xl md:leading-[93px] uppercase">
            Bienvenue sur l'Annuaire du Royaume
          </h1>
          <p className="font-poppins md:px-56 px-5 md:text-[20px] text-[18px] text-center font-normal leading-[33px]">
            L'espace unique conçu pour tisser des liens professionnels au sein
            de la communauté chrétienne. Notre mission est de donner à chaque
            artiste, auteur, association ou entreprise gérée par un.e
            chrétien.ne la visibilité qu'elle mérite, tout en renforçant son
            image de marque à travers la puissance de notre réseau de foi. Que
            vous soyez à la recherche d'un service ou d'une collaboration qui
            partage vos valeurs chrétiennes, ou que vous souhaitiez promouvoir
            vos compétences auprès de vos frères et sœurs en Christ, vous êtes
            au bon endroit.
          </p>
        </div>
        <div className="flex sm:flex-row flex-col gap-6 items-center">
          <Link
            to="/annuaire"
            className="bg-marronFonce font-poppins text-white font-[700] rounded md:text-base text-sm md:px-6 px-4 py-3 hover:opacity-85"
          >
            Trouvez une entreprise
          </Link>
          {user ? null :(<Link
            to="/inscription"
            className="bg-custom-gradient font-poppins text-white font-[700] rounded md:text-base text-sm md:px-6 px-4 py-3 hover:opacity-85"
          >
            S'inscrire
          </Link>)}
        </div>
      </div>
      <div className="flex flex-col gap-8 pt-16 pb-16">
        <AboutAnnuaire />
        <AboutEntrepreneur />
        <AboutValue />
        <AboutFounder />
        <AboutCoFounder />
      </div>
      <div className="bg-background flex flex-col md:gap-6 gap-6 justify-center items-center md:px-0 px-5 md:pt-16 pt-16 pb-20">
        <div className="flex flex-col gap-1">
          <h1 className="text-marronFonce md:px-40 px-5 font-passionOne font-[400] text-center md:text-[50px] text-3xl md:leading-[93px] uppercase">
            Rejoignez-Nous
          </h1>
          <p className="font-poppins md:px-48 px-5 md:text-[20px] text-[18px] text-center font-normal leading-[33px]">
            Que ce soit pour élargir votre réseau professionnel, trouver des
            services alignés sur vos valeurs, ou offrir vos compétences au
            sein de la communauté chrétienne, l'Annuaire du Royaume est votre
            allié.
          </p>
        </div>
        <div className="flex sm:flex-row flex-col gap-6 items-center">
          <Link
            to="/annuaire"
            className="bg-marronFonce font-poppins text-white font-[700] rounded md:text-base text-sm md:px-6 px-4 py-3 hover:opacity-85"
          >
            Trouvez une entreprise
          </Link>
          {user ? null : (
            <Link
              to="/inscription"
              className="bg-custom-gradient font-poppins text-white font-[700] rounded md:text-base text-sm md:px-6 px-4 py-3 hover:opacity-85"
            >
              S'inscrire
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;

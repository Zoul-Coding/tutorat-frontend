import { Link } from "react-router-dom";
import EntrepreurProfile from "./EntrepreurProfile";
import { getToken } from "@/lib/utils";

const HeroSection = () => {
  const user = getToken();

  return (
    <section>
      <div className="bg-background flex flex-col md:gap-6 gap-6 justify-center items-center md:px-0 px-5 md:pt-64 pt-32 pb-60">
        <div className="flex flex-col gap-1">
          <h1 className="text-marronFonce md:px-28 px-5 font-passionOne font-[400] text-center md:text-[93px] text-4xl md:leading-[93px] uppercase">
            {/* Le cercle des entreprises chrétiennes */}
            Tous les artistes, entreprises et associations francophones gérées par des chrétiens
          </h1>
          <p className="font-poppins md:px-56 px-5 md:text-[20px] text-[18px] text-center font-normal leading-[33px]">
            Trouvez facilement un professionnel pour tous vos besoins ou Donnez
            de la visibilité à votre entreprise
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
      <EntrepreurProfile />
    </section>
  );
};

export default HeroSection;

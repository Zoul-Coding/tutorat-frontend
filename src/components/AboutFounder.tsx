import { Link } from "react-router-dom";
import Img from "../assets/About/img-4.png";
import { getToken } from "@/lib/utils";

const AboutFounder = () => {
  const user = getToken();
  return (
    <section className="md:pt-0 pt-12 md:pb-12 pb-8">
      <div className="max-w-screen-xl mx-auto xl:px-0 px-5 pt-16">
        <div className="md:flex items-center justify-between gap-16">
          <img
            src={Img}
            alt=""
            className="lg:w-[550px] sm:w-[60vh] lg:h-[550px]  sm:h-[50vh] h-full md:pt-0 pt-4"
          />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="md:text-[50px] font-[400] sm:text-3xl text-2xl uppercase font-passionOne text-marronFonce text-start">
                La Fondatrice
              </h2>
              <p className="lg:text-lg font-poppins font-base">
                Je suis Sarah Ollon, disciple de Jésus, passionnée par le
                potentiel divin en chacun de nous, et fondatrice de T Comm’toi.
                Mon parcours entrepreneurial, enrichi par ma foi profonde, m'a
                poussée à créer Annuaire du Royaume pour répondre à un besoin
                crucial de connexion au sein de la communauté chrétienne. Grâce
                à l'enthousiasme et au soutien reçu dès les premiers jours, nous
                avons développé une plateforme robuste qui continue de
                s'enrichir pour mieux servir notre mission.
              </p>
            </div>
            {user ? null : (
              <Link
                to="/inscription"
                className="flex justify-center gap-3 items-center bg-custom-gradient w-48 h-11 rounded text-[18px] text-white font-poppins font-medium hover:opacity-85"
              >
                <div className="bg-white w-4 h-4 rounded-full"></div>
                Inscrivez-vous
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFounder;

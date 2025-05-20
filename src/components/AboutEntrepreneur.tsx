import { Link } from "react-router-dom";
import Img from "../assets/About/img-2.png";
import { getToken } from "@/lib/utils";

const AboutEntrepreneur = () => {
  const user = getToken();
  return (
    <section className="md:pt-0 pt-12 md:pb-12 pb-8">
      <div className="max-w-screen-xl mx-auto xl:px-0 px-5 pt-16">
        <div className="md:flex items-center justify-between gap-12">
          <div className="flex flex-col gap-6">
            <div className="">
              <p className="bg-rosePale text-start md:max-w-[400px] max-w-[300px] px-2 py-2 rounded md:text-1xl sm:text-1xl text-lg font-poppins font-bold">
                Pour les entrepreneurs chrétiens
              </p>
            </div>
            <p className="lg:text-lg font-poppins font-base leading-20">
              Que vous travailliez avec des chrétiens ou pas, si vous placez
              Dieu au cœur de votre projet et que vous cherchez à étendre votre
              visibilité au sein de la grande famille chrétienne, l'Annuaire du
              Royaume est fait pour vous. Nous offrons une plateforme pour
              mettre en avant votre dévouement, votre professionnalisme, et
              votre intégrité, vous connectant ainsi à des clients et
              partenaires qui valorisent et soutiennent vos efforts. Augmentez
              votre visibilité. Notre annuaire vous offre une plateforme pour
              être découvert et recommandé au sein de notre communauté
              dynamique.
            </p>
           {user?null:( <Link
              to="/inscription"
              className="flex justify-center gap-3 items-center bg-custom-gradient w-48 h-11 rounded text-[18px] text-white font-poppins font-medium hover:opacity-85"
            >
              <div className="bg-white w-4 h-4 rounded-full"></div>
              Inscrivez-vous
            </Link>)}
          </div>
          <img
            src={Img}
            alt=""
            className="lg:w-[550px] sm:w-[60vh] lg:h-[550px]  sm:h-[50vh] h-full md:pt-0 pt-4"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutEntrepreneur;

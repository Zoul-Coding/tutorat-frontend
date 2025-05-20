import { Link } from "react-router-dom";
import Img from "../assets/About/img-1.png";
import { getToken } from "@/lib/utils";

const AboutAnnuaire = () => {
  const user = getToken();
  return (
    <section className="md:pt-0 pt-12 md:pb-12 pb-8">
      <h2 className="md:text-[58px] font-[400] sm:text-3xl text-2xl uppercase font-passionOne text-marronFonce text-center">
        L'annuaire est pour qui ?
      </h2>
      <div className="max-w-screen-xl mx-auto xl:px-0 px-5 pt-16">
        <div className="md:flex items-start justify-between gap-12">
          <img
            src={Img}
            alt=""
            className="lg:w-[550px] sm:w-[60vh] lg:h-[550px]  sm:h-[50vh] h-full md:pt-0 pt-4"
          />
          <div className="flex flex-col gap-6">
            <div className="">
              <p className="bg-rosePale text-start md:max-w-[440px] max-w-[300px] px-2 py-2 rounded md:text-1xl sm:text-1xl text-lg font-poppins font-bold">
                Pour les chrétiens à la recherche de services
              </p>
            </div>
            <p className="lg:text-lg font-poppins font-base leading-20">
              Si vous cherchez à engager des professionnels qui partagent votre
              foi et vos valeurs, notre annuaire est votre ressource
              incontournable. Que ce soit pour des services personnels ou
              professionnels, vous avez accès à un catalogue d’entreprises et de
              prestataires fiables et compétents, enrichissant ainsi votre vie
              et celle de votre entourage avec des services empreints des
              valeurs chrétiennes. Fini le casse-tête pour trouver des
              professionnels partageant vos valeurs ou pour recommander des
              prestataires fiables. Notre annuaire résout ces défis en vous
              connectant directement avec des professionnels chrétiens. Faites
              votre choix en consultant leur fiche de présentation et les avis
              clients.
            </p>
          {user ? null : (<Link
            to="/inscription"
            className="flex justify-center gap-3 items-center bg-custom-gradient w-48 h-11 rounded text-[18px] text-white font-poppins font-medium hover:opacity-85"
          >
            <div className="bg-white w-4 h-4 rounded-full"></div>
            Inscrivez-vous
          </Link>)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAnnuaire;

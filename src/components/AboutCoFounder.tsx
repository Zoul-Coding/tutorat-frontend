import { Link } from "react-router-dom";
import Img from "../assets/About/img-3.png";
import { getToken } from "@/lib/utils";

const AboutCoFounder = () => {
  const user = getToken();
  return (
    <section className="md:pt-0 pt-12 md:pb-12 pb-8">
      <div className="max-w-screen-xl mx-auto xl:px-0 px-5 pt-16">
        <div className="md:flex items-center justify-between gap-16">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="md:text-[50px] font-[400] sm:text-3xl text-2xl uppercase font-passionOne text-marronFonce text-start">
                co-fondateur
              </h2>
              <p className="lg:text-lg font-poppins font-base">
                Je m’appelle Féridjimi SAGBOHAN et je suis consultant en web
                marketing. Il y a de cela quelques années, j’ai pris le chemin
                entrepreneurial pour atteindre ma liberté financière et pouvoir
                m’offrir ce que je voulais. Ce que je ne savais pas, c’est que
                j’allais rencontrer Jésus-Christ en cours de route. Bien que je
                sois issu d’une famille chrétienne, je ne comprenais vraiment
                rien à l’évangile jusqu’à ce que je rencontre Dieu. Cette
                rencontre a bouleversé le cours de mon parcours entrepreneurial,
                faisant de moi l’un des meilleurs dans le domaine du marketing
                numérique. Je suis fier de porter ce projet avec Sarah et nous
                travaillons d’arrache-pied pour vous fournir une plateforme
                assez intuitive et complète pour vous aider à connecter
                facilement avec des entrepreneurs chrétiens de tout horizon.
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

export default AboutCoFounder;

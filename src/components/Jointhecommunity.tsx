import { Link } from "react-router-dom";
import AnimeGif from "../assets/community.gif";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/users.atom";
import { getToken } from "@/lib/utils";

const Jointhecommunity = () => {
  const [user] = useAtom(userAtom);
  const token = getToken();  

  return (
    <section className="md:pt-0 pt-12 md:pb-12 pb-8">
      <div className="max-w-screen-xl mx-auto xl:px-0 px-5">
        <div className="md:flex items-center justify-between gap-12">
          <div className="flex flex-col gap-6">
            <div className="">
              <p className="bg-rosePale md:max-w-[400px] max-w-[300px] px-6 py-2 rounded-full md:text-2xl sm:text-1xl text-lg font-poppins font-bold">
                Rejoignez la communauté
              </p>
            </div>
            <h3 className="text-marronFonce uppercase lg:text-[36px] text-2xl font-passionOne font-bold">
            Vous êtes un professionnel, une association ou un artiste chrétien ?
            </h3>
            <p className="lg:text-xl text-lg font-poppins font-base leading-20">
            Vous mettez un point d'honneur à placer Dieu en premier pour votre entreprise.
             Vous ne travaillez pas qu'avec des chrétiens, mais vous souhaitez être connu dans le milieu ecclésial. 
             Vous êtes humble et aimez votre métier. Vous servez vos clients avec droiture et générosité. Vous êtes 
             juste dans vos tarifs et très professionnel. Vous aimeriez que vos compétences soient reconnues et que 
             vous soyez recommandé pour votre excellent travail.
            </p>
            {token ? null : (
              <Link
                to="/inscription"
                className="flex justify-center gap-3 items-center bg-custom-gradient w-52 h-11 rounded text-[20px] text-white font-poppins font-medium hover:opacity-85"
              >
                <div className="bg-white w-5 h-5 rounded-full"></div>
                Inscrivez-vous
              </Link>
            )}
          </div>
          <img src={AnimeGif} alt="" className="w-[550px] h-[550px]" />
        </div>
      </div>
    </section>
  );
};

export default Jointhecommunity;

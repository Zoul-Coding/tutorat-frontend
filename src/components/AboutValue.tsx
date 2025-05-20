import Img1 from "../assets/Icone/img-1.png";
import Img2 from "../assets/Icone/img-2.png";
import Img3 from "../assets/Icone/img-3.png";
import Img4 from "../assets/Icone/img-4.png";
import Img5 from "../assets/Icone/img-5.png";
import Img6 from "../assets/Icone/img-6.png";

const AboutValue = () => {
  const cardValue = [
    {
      id: 1,
      img: Img1,
      title: "Confiance et Spiritualité",
      description:
        "Rencontrez des professionnels avec qui vous partagez les mêmes valeurs du Royaume de Dieu",
    },
    {
      id: 2,
      img: Img2,
      title: "Relations Solides",
      description:
        "Partagez des valeurs et une éthique communes renforce la confiance et facilite les recommandations",
    },
    {
      id: 3,
      img: Img3,
      title: "Réseau Professionnel et Spirituel",
      description:
        "Accédez à un réseau qui valorise autant le professionnalisme que la foi chrétienne",
    },
    {
      id: 4,
      img: Img4,
      title: "Collaborations Enrichissantes",
      description:
        "Rencontrez et collaborez avec d'autres entrepreneurs ou porteurs de projets inspirés et inspirants",
    },
    {
      id: 5,
      img: Img5,
      title: "Visibilité infinie",
      description:
        "Soyez reconnu.e, non seulement pour vos compétences mais aussi pour votre intégrité",
    },
    {
      id: 6,
      img: Img6,
      title: "Accès à des Événements Spécifiques",
      description:
        "Profitez d'événements qui vous connectent avec la communauté chrétienne",
    },
  ];

  return (
    <section className="mt-6 mb-20 bg-gray-100">
      <div className="pt-12 pb-12 max-w-screen-xl mx-auto xl:px-0 px-5">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-16 pt-12 pb-12 font-poppins">
          {cardValue.map((item) => (
            <div className="flex flex-col gap-6 border-gradient bg-white rounded justify-center items-center px-6 py-6">
              <img
                src={item.img}
                alt={item.title}
                className="md:w-28 md:h-28 w-20 h-20 object-cover"
              />
              <div className="flex flex-col">
                <h3 className="md:text-[20px] text-2xl text-center font-bold px-8">
                  {item.title}
                </h3>
                <p className="md:text-[16px] text-1xl text-center pt-3 px-6">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValue;

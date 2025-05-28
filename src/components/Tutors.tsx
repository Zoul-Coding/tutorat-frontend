import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Profile from "../../public/assets/profile.jpg";
import { School, Heart, MoveRight } from "lucide-react";
import { HiBadgeCheck } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Tutors = () => {
  const tutors = [
    {
      image: Profile,
      school: "SCG Business School",
      name: "Augustine",
      localisation: "Cotonou",
      disponibilite: "En ligne, À domicile",
      price: "26,60",
      star: "4,72",
      description:
        "Diplômée de l’ESCP et ancienne élève de classe préparatoire donne cours d’anglais tous niveaux...",
    },
    {
      image: Profile,
      school: "SCG Business School",
      name: "Augustine",
      localisation: "Cotonou",
      disponibilite: "En ligne, À domicile",
      price: "26,60",
      star: "4,72",
      description:
        "Diplômée de l’ESCP et ancienne élève de classe préparatoire donne cours d’anglais tous niveaux...",
    },
    {
      image: Profile,
      school: "SCG Business School",
      name: "Augustine",
      localisation: "Cotonou",
      disponibilite: "En ligne, À domicile",
      price: "26,60",
      star: "4,72",
      description:
        "Diplômée de l’ESCP et ancienne élève de classe préparatoire donne cours d’anglais tous niveaux...",
    },
  ];

  return (
    <section className="max-w-screen-xl mx-auto pt-28 xl:px-0 px-4">
      <div className="flex flex-col items-center justify-center gap-6">
        <h2 className="text-center font-bold md:text-4xl text-3xl text-primary">
          Découvrez nos tuteurs qualifiés
        </h2>
        <p className="text-base text-gray-700 md:w-[35%] w-full text-center">
          Trouvez le <strong>tuteur</strong>idéal pour{" "}
          <strong>accompagner</strong> votre enfant dans sa{" "}
          <strong>réussite scolaire</strong>.
        </p>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 pt-16 xl:px-0 md:px-12 px-2">
        {tutors.map((tutor, index) => (
          <Link to="#" key={index} className="hover:bg-card rounded-xl">
            <Card
              className="border-none shadow-none bg-transparent"
            >
              <div className="relative">
                <img
                  className="w-full md:h-[300px] h-full rounded-xl"
                  src={tutor.image}
                  alt={tutor.name}
                />
                <div className="absolute top-0 flex justify-between w-full items-center px-4 py-4">
                  <div className="flex items-center w-60 gap-2 bg-black/80 rounded-full px-1 py-1">
                    <div className="bg-white rounded-full px-1 py-1">
                      <School className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-white">{tutor.school}</p>
                  </div>
                  <div className="bg-black/80 rounded-full px-2 py-2">
                    <Heart className="text-white w-5 h-5" />
                  </div>
                </div>
              </div>
              <CardContent className="px-4 py-4">
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-2xl font-bold">
                        {tutor.name}
                      </CardTitle>
                      <HiBadgeCheck className="w-6 h-6" />
                    </div>
                    <p className="text-gray-500 text-base font-medium">
                      {tutor.localisation}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500 w-5 h-5" />
                    <CardTitle className="text-lg">
                      {tutor.star}{" "}
                      <span className="text-gray-500">(4 avis)</span>
                    </CardTitle>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-3">
                  <CardDescription className="text-gray-700 text-base">
                    {tutor.description}
                  </CardDescription>
                  <p className="text-gray-500 text-base font-medium">
                    {tutor.disponibilite}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full pt-3">
                  <p className="text-base">
                    À partir de <strong>{tutor.price}</strong>{" "}
                    <strong>€/</strong>{" "}
                    <strong className="text-gray-500">h</strong>
                  </p>
                  <Link
                    to="#"
                    className="bg-primary px-4 py-2 text-white text-[14px] font-medium rounded hover:opacity-85"
                  >
                    Contacter
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-center pt-8">
        <Link
          to="#"
          className="bg-primary px-4 py-2 text-white text-[14px] font-medium rounded hover:opacity-85 flex items-center gap-4"
        >
          Trouver un tuteur
         <MoveRight className="text-white w-6 h-6" />
        </Link>
      </div>
    </section>
  );
};

export default Tutors;

import { HiBadgeCheck } from "react-icons/hi";
import { MdVideocam } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoFlashSharp } from "react-icons/io5";
import { RiSchoolLine } from "react-icons/ri";
import ShowMoreText from "./ShowMoreText";
import Profile from "../../public/assets/profile.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { School, Heart, ListFilter } from "lucide-react";
import { Link } from "react-router-dom";

const TutorsProfileDescription = () => {
  const textAbout =
    "Professeur titulaire de l'éducation nationale, je propose des cours particuliers et de l'accompagnement scolaire en mathématiques. Mon intervention auprès des élèves vise à leur faire progresser, se reconnecter et donner du sens aux mathématiques, ainsi je leur propose : 1- une méthode de travail adapté pour redonner la confiance en eux dans cette matière 2- une compréhension et un moyen d'application intelligente du cours dans les exercices 3- une réflexion cohérente et linéaire pour arriver à un raisonnement logique 4- un apprentissage de lecture de l'énoncé afin d'identifier les points d'attention qui servent de guide dans la démarche de résolution";

  const avis = [
    {
      id: 1,
      name: "Alice",
      level: "Lycée",
      comment:
        "Vincent est un excellent professeur, il m'a beaucoup aidé à comprendre les mathématiques.",
      rating: 4,
      date: "2023-10-01",
    },
    {
      id: 2,
      name: "Bob",
      level: "Prépa",
      comment:
        "Ses explications sont claires et précises, je recommande vivement !",
      rating: 2,
      date: "2023-10-01",
    },
    {
      id: 3,
      name: "Charlie",
      level: "Lycée",
      comment: "Très pédagogue, j'ai progressé rapidement grâce à ses cours.",
      rating: 4,
      date: "2023-10-01",
    },
  ];

  const tutors = {
    image: Profile,
    school: "SCG Business School",
    name: "Augustine",
    localisation: "Cotonou",
    price: "26,60",
    star: "4,72",
  };

  return (
    <section className="max-w-screen-xl mx-auto pt-32 pb-8">
      <div className="grid grid-cols-8 gap-12">
        <div className="flex flex-col gap-12 col-span-6">
          <div className="bg-gray-50 rounded px-8 py-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <h2 className="text-4xl font-bold">Vincent</h2>
                <HiBadgeCheck className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-md text-gray-600">
                Sainte-Foy-lès-Lyon · Maths
              </p>
              <p className="uppercase text-md pt-3">
                PROFESSEUR EXPÉRIMENTÉ DE MATHÉMATIQUES DONNE COURS EN
                PRESENTIEL DANS LE RHONE ET EN LIGNE
              </p>

              <div className="flex items-center gap-4">
                <div className="bg-gray-200 rounded flex items-center gap-2 px-2 py-1">
                  <MdVideocam className="w-4 h-4" />
                  <p className="text-sm font-medium text-gray-600">En ligne</p>
                </div>
                <div className="bg-gray-200 rounded flex items-center gap-2 px-2 py-1">
                  <HiLocationMarker className="w-4 h-4" />
                  <p className="text-sm font-medium text-gray-600">
                    A domicile
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-8">
            <div className="border border-gray-200 w-full rounded-xl px-6 py-6">
              <div className="flex flex-col gap-2">
                <HiBadgeCheck className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold">Vincent est Certifié</h2>
                <p className="text-md">
                  Ce Sherpa a été formé et vérifié par notre équipe pédagogique
                  afin de vous garantir des cours de qualité en toute sécurité !
                </p>
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm">Identité vérifiée</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm">Dernier diplôme vérifié</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm">Certification réussie</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 w-full gap-6">
              <div className="border border-gray-200 rounded-xl px-8 py-8">
                <div className="flex flex-col gap-2">
                  <FaUsers className="w-7 h-7" />
                  <h2 className="text-2xl font-bold">3</h2>
                  <p className="text-sm text-gray-500 font-bold">
                    Élève(s) accompagné(s)
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl px-8 py-8">
                <div className="flex flex-col gap-2">
                  <FaStar className="text-yellow-500 w-7 h-7" />
                  <h2 className="text-2xl font-bold">
                    3<span className="text-gray-500">/5</span>
                  </h2>
                  <p className="text-sm text-gray-500 font-bold">
                    Élève(s) accompagné(s)
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl px-8 py-8">
                <div className="flex flex-col gap-2">
                  <MdAccessTimeFilled className="w-7 h-7" />
                  <h2 className="text-2xl font-bold">
                    11<span className="text-gray-500">h</span>
                  </h2>
                  <p className="text-sm text-gray-500 font-bold">
                    De cours donnée(s)
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl px-8 py-8">
                <div className="flex flex-col gap-2">
                  <IoFlashSharp className="text-yellow-500 w-7 h-7" />
                  <h2 className="text-2xl font-bold">
                    1<span className="text-gray-500">h</span>
                  </h2>
                  <p className="text-sm text-gray-500 font-bold">
                    Temps de réponse
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl px-8 py-8">
            <h2 className="text-3xl font-bold">À propos</h2>
            <ShowMoreText
              className="pt-4 text-md"
              text={textAbout}
              maxChars={420}
            />
          </div>
          <div className="border border-gray-200 rounded-xl px-8 py-8">
            <h2 className="text-3xl font-bold">Méthodologie</h2>
            <ShowMoreText
              className="pt-4 text-md"
              text={textAbout}
              maxChars={420}
            />
            <div className="flex flex-col gap-3 pt-8">
              <p className="text-sm font-medium text-gray-500">
                Niveau(x) enseigné(s)
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 rounded flex items-center gap-1 px-2 py-1">
                  <RiSchoolLine className="text-gray-500 w-4 h-4" />
                  <p className="text-sm font-medium text-gray-500">Lycée</p>
                </div>
                <div className="bg-gray-200 rounded flex items-center gap-1 px-2 py-1">
                  <RiSchoolLine className="text-gray-500 w-4 h-4" />
                  <p className="text-sm font-medium text-gray-500">Prépa</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl px-8 py-8">
            <h2 className="text-3xl font-bold">Diplômes</h2>
            <div className="flex flex-col gap-1 pt-5">
              <p className="text-sm font-medium">Université Paris Saclay</p>
              <p className="text-sm font-medium text-gray-500">
                Master Neurosciences computationelles
              </p>
              <p className="text-sm font-medium text-gray-500">
                Septembre 2021 - Septembre 2022 · 1 an(s) 1 mois
              </p>
              <p className="text-sm font-medium uppercase pt-6">
                Master en IA et Neurosciences computationelles.
              </p>
              <div className="bg-gray-100 w-20 rounded flex items-center justify-center gap-1 px-2 py-1 mt-4">
                <HiBadgeCheck className="text-green-500 w-4 h-4" />
                <p className="text-sm font-medium text-gray-700">Vérifié</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl px-8 py-8">
            <h2 className="text-3xl font-bold">Expériences professionnelles</h2>
            <div className="flex flex-col gap-1 pt-5 border-b border-gray-200 pb-5">
              <p className="text-sm font-medium">Ingénieur IA</p>
              <p className="text-sm font-medium text-gray-500">GE - CDI</p>
              <p className="text-sm font-medium text-gray-500">
                Février 2023 - aujourd'hui · 2 an(s) 4 mois
              </p>
            </div>
            <div className="flex flex-col gap-1 pt-5 border-b border-gray-200 pb-5">
              <p className="text-sm font-medium">Ingénieur IA</p>
              <p className="text-sm font-medium text-gray-500">GE - CDI</p>
              <p className="text-sm font-medium text-gray-500">
                Février 2023 - aujourd'hui · 2 an(s) 4 mois
              </p>
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl px-8 py-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">4 avis sur Vincent⭐️</h2>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500 w-6 h-6" />
                <h2 className="text-3xl font-bold">3/5</h2>
              </div>
            </div>
            <p className="text-md pt-4">
              Toutes nos évaluations sont collectées par nos services et sont
              fiables à 100%. Elles correspondent à une vraie expérience vécue
              par les élèves du professeur.
            </p>

            <div className="flex flex-col gap-6 pt-8">
              {avis.map((review, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl px-6 py-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Avatar"
                        className="w-10 h-10 rounded-full bg-gray-300"
                      />
                      <div className="flex flex-col">
                        <p className="text-md font-medium">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.level}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaStar
                        className={`text-yellow-500 w-5 h-5 ${
                          review.rating >= 4
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      />
                      <p className="text-sm">{review.rating}/5</p>
                    </div>
                  </div>
                  <p className="text-md pt-2">{review.comment}</p>
                  <p className="text-sm text-gray-500 pt-2">
                    Publié le {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <Link
            to={`/tuteurs/${tutors.name}`}
            className="hover:bg-card rounded-xl"
          >
            <Card className="border-none shadow-none bg-transparent">
              <div className="relative">
                <img
                  className="w-full md:h-[250px] h-full rounded-xl"
                  src={tutors.image}
                  alt={tutors.name}
                />
                <div className="absolute top-0 flex justify-between w-full items-center px-4 py-4">
                  <div className="flex items-center w-44 gap-2 bg-black/80 rounded-full px-1 py-1">
                    <div className="bg-white rounded-full px-1 py-1">
                      <School className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-white">{tutors.school}</p>
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
                      <CardTitle className="text-xl font-bold">
                        {tutors.name}
                      </CardTitle>
                      <HiBadgeCheck className="w-5 h-5" />
                    </div>
                    <p className="text-gray-500 text-sm font-medium">
                      {tutors.localisation}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500 w-5 h-5" />
                    <CardTitle className="text-md">
                      {tutors.star}{" "}
                      <span className="text-gray-500">(4 avis)</span>
                    </CardTitle>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-3">
                  <div className="flex justify-between items-center">
                    <p>Cours d'essai</p>
                    <p className="text-sm">Offert</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>En ligne</p>
                    <p className="text-sm">
                      <strong>{tutors.price}</strong> <strong>€/</strong>{" "}
                      <strong className="text-gray-500">h</strong>
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>À domicile</p>
                    <p className="text-sm">
                      <strong>{tutors.price}</strong> <strong>€/</strong>{" "}
                      <strong className="text-gray-500">h</strong>
                    </p>
                  </div>
                </div>
                <div className="pt-6">
                  <Link
                    to="#"
                    className="bg-primary w-full px-4 py-2 text-white text-[14px] font-medium rounded hover:opacity-85"
                  >
                    Demander un cours d'essai
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TutorsProfileDescription;

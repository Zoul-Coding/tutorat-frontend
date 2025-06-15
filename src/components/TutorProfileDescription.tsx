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
import { Link, useParams } from "react-router-dom";
import useFetchShowAnnonce from "@/requests/useFetchShowAnnonce";
import { Loader } from "lucide-react";

const TutorsProfileDescription = () => {
  const { slug } = useParams();
  console.log(slug);

  const { data: showAnnonce, isLoading: loading } = useFetchShowAnnonce(
    String(slug)
  );

  return (
    <section className="max-w-screen-xl mx-auto pt-32 pb-8">
      {loading && showAnnonce?.length !== 0 ? (
        <div className="flex justify-center items-center gap-2 pt-28">
          <Loader className="texte white h-6 w-6 animate-spin" />
          <p className="text-md">Chargement...</p>
        </div>
      ) : (
        <div className="grid grid-cols-8 gap-12">
          <div className="flex flex-col gap-12 col-span-6">
            <div className="bg-blue-100 rounded px-8 py-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-4xl font-bold">
                    {showAnnonce?.user?.nom} {showAnnonce?.user?.prenom}
                  </h2>
                  {/*  <HiBadgeCheck className="w-8 h-8 text-blue-600" /> */}
                </div>
                <p className="text-md text-gray-600">
                  Cotonou · {showAnnonce?.annonce?.matiere}
                </p>
                <p className="uppercase text-md pt-3">
                  {showAnnonce?.annonce?.titre}
                </p>

                <div className="flex items-center gap-4">
                  {showAnnonce?.annonce?.lieu === "À domicile" ? (
                    <div className="bg-white rounded flex items-center gap-2 px-2 py-1">
                      <HiLocationMarker className="w-4 h-4" />
                      <p className="text-sm font-medium text-gray-600">
                        A domicile
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white rounded flex items-center gap-2 px-2 py-1">
                      <MdVideocam className="w-4 h-4" />
                      <p className="text-sm font-medium text-gray-600">
                        En ligne
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/*   <div className="flex justify-between gap-8">
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
          </div> */}
            <div className="border border-gray-200 bg-gray-50 rounded-xl px-8 py-8">
              <h2 className="text-3xl font-bold">À propos</h2>
              <ShowMoreText
                className="pt-4 text-md"
                text={showAnnonce?.annonce?.introduction}
                maxChars={420}
              />
            </div>
            <div className="border border-gray-200 bg-gray-50 rounded-xl px-8 py-8">
              <h2 className="text-3xl font-bold">Méthodologie</h2>
              <ShowMoreText
                className="pt-4 text-md"
                text={showAnnonce?.annonce?.methodologie}
                maxChars={420}
              />
              <div className="flex flex-col gap-3 pt-8">
                <p className="text-sm font-medium text-gray-500">
                  Niveau(x) enseigné(s)
                </p>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 rounded flex items-center gap-1 px-2 py-1">
                    <RiSchoolLine className="text-gray-500 w-4 h-4" />
                    <p className="text-sm font-medium text-gray-500">
                      {showAnnonce?.annonce?.niveau}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 bg-gray-50 rounded-xl px-8 py-8">
              <h2 className="text-3xl font-bold">Diplômes</h2>
              {showAnnonce?.certificates?.map(
                (certificate: any, index: any) => (
                  <div key={index} className="flex flex-col gap-1 pt-5">
                    <p className="text-sm font-medium">
                      {certificate?.schoolName}
                    </p>
                    <p className="text-sm font-medium text-gray-500 uppercase">
                      {certificate?.diplome}
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                      {certificate?.startMonth} {certificate?.startYear} -{" "}
                      {certificate?.endMonth} {certificate?.endYear}
                    </p>
                    {/* <p className="text-sm font-medium uppercase pt-6">
                Master en IA et Neurosciences computationelles.
              </p>
              <div className="bg-gray-100 w-20 rounded flex items-center justify-center gap-1 px-2 py-1 mt-4">
                <HiBadgeCheck className="text-green-500 w-4 h-4" />
                <p className="text-sm font-medium text-gray-700">Vérifié</p>
              </div> */}
                  </div>
                )
              )}
            </div>
            <div className="border border-gray-200 bg-gray-50 rounded-xl px-8 py-8">
              <h2 className="text-3xl font-bold">
                Expériences professionnelles
              </h2>
              {showAnnonce?.experiences?.map((experience: any, index: any) => (
                <div className="flex flex-col gap-1 pt-5 border-b border-gray-200 pb-5">
                  <p className="text-sm font-medium uppercase">
                    {experience?.title}
                  </p>
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    {experience?.type}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    {experience?.startMonth} {experience?.startYear} -{" "}
                    {experience?.endMonth} {experience?.endYear}
                  </p>
                </div>
              ))}
            </div>
            {/*  <div className="border border-gray-200 rounded-xl px-8 py-8">
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
          </div> */}
          </div>
          <div className="col-span-2">
            <Card className="border-none shadow-none bg-transparent">
              <div className="relative">
                <img
                  className="w-full md:h-[250px] h-full rounded-xl"
                  src={showAnnonce?.user?.photo}
                  alt={showAnnonce?.user?.prenom}
                />
                <div className="absolute top-0 flex justify-between w-full items-center px-4 py-4">
                  {/*  <div className="flex items-center w-44 gap-2 bg-black/80 rounded-full px-1 py-1">
                    <div className="bg-white rounded-full px-1 py-1">
                      <School className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-white">{showAnnonce?user.schoolName}</p>
                  </div> */}
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
                        {showAnnonce?.user?.prenom}
                      </CardTitle>
                     {/*  <HiBadgeCheck className="w-5 h-5" /> */}
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Cotonou</p>
                  </div>
                  {/*  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500 w-5 h-5" />
                    <CardTitle className="text-md">
                      {tutors.star}{" "}
                      <span className="text-gray-500">(4 avis)</span>
                    </CardTitle>
                  </div> */}
                </div>
                <div className="flex flex-col gap-2 pt-3">
                  <div className="flex justify-between items-center">
                    <p>Cours d'essai</p>
                    <p className="text-sm">Offert</p>
                  </div>
                  {showAnnonce?.annonce?.lieu === "À domicile" ? (
                    <div className="flex justify-between items-center">
                      <p>À domicile</p>
                      <p className="text-sm">
                        <strong>{showAnnonce?.annonce?.tarif}</strong>{" "}
                        <strong>€/</strong>{" "}
                        <strong className="text-gray-500">h</strong>
                      </p>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <p>En ligne</p>
                      <p className="text-sm">
                        <strong>{showAnnonce?.annonce?.tarif}</strong>{" "}
                        <strong>€/</strong>{" "}
                        <strong className="text-gray-500">h</strong>
                      </p>
                    </div>
                  )}
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
          </div>
        </div>
      )}
    </section>
  );
};

export default TutorsProfileDescription;

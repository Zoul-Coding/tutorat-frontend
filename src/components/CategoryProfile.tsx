import { useState } from "react";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IoPersonAddOutline } from "react-icons/io5";
import { CiLink } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import { CiLinkedin } from "react-icons/ci";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { RiFacebookBoxLine } from "react-icons/ri";
import Verified from "../assets/verifier.png";
import { FaStar } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DefaultImg from "../assets/default-featured.jpg";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/users.atom";
import parse from "html-react-parser";
import "swiper/css";
import { shortenText } from "@/lib/utils";

interface Media {
  original_url: string;
}

interface ProfileDetails {
  title: string;
  biography: string;
  social_links: string;
  slug: string;
}

interface Profile {
  id: number;
  title: string;
  media: Media[];
  profile: ProfileDetails;
  name: string;
  address: string;
  first_name: string;
  last_name: string;
  website: string;
  href: string;
  received_reviews_avg_rating: number;
  received_reviews_count: number;
  work_on_line:string
}

type DataSearchType = {
  professionals?: any[];
  [key: string]: any;
};

type CategoryProfile = {
  dataRelatUser: DataSearchType | null;
};

const CategoryProfile: React.FC<CategoryProfile> = ({ dataRelatUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState<Profile | null>(null);
  const [user] = useAtom(userAtom);

  const listProfile = Array.isArray(dataRelatUser?.related_user)
    ? dataRelatUser?.related_user
    : [];

  const openDialog = (profile: any) => {
    setSelectedDialog(profile);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setSelectedDialog(null);
    setIsOpen(false);
  };

  /*   const offres = [
     {
       id: 1,
       title: "Sac de riz",
     },
     {
       id: 2,
       title: "Sac de riz",
     },
     {
       id: 3,
       title: "Sac de riz",
     },
     {
       id: 4,
       title: "Sac de riz",
     },
     {
       id: 5,
       title: "Sac de riz",
     },
     {
       id: 6,
       title: "Sac de riz",
     },
   ]; */

  /*  const renderSocialLinks = (links: string[] | undefined) => {
     if (!links) return null;
 
     // Parser chaque chaîne JSON en objet
     const parsedLinks = links.map((link) => JSON.parse(link));
 
     // Dictionnaire des icônes pour chaque réseau
     const icons: { [key: string]: JSX.Element } = {
       linkedin: <CiLinkedin className="text-white w-4 h-4" />,
       instagram: <IoLogoInstagram className="text-white w-4 h-4" />,
       facebook: <RiFacebookBoxLine className="text-white w-4 h-4" />,
       whatsapp: <FaWhatsapp className="text-white w-4 h-4" />,
     };
 
     // Afficher tous les liens disponibles
     return parsedLinks.flatMap((parsedLink) =>
       Object.entries(parsedLink).map(([key, url]) => {
         // Vérification que url est bien une chaîne
         if (typeof url !== "string") return null;
 
         return (
           <a
             key={key + url}
             className="bg-marronFonce rounded-xl px-3 py-1 flex items-center gap-2"
             href={url}
             target="_blank"
             rel="noopener noreferrer"
           >
             {icons[key] || <CiLink className="text-white w-4 h-4" />}
             <p className="text-base font-medium text-white capitalize">{key}</p>
           </a>
         );
       })
     );
   }; */

   const renderSocialLinks = (socialLinks: string | undefined) => {
    if (!socialLinks) return null; // Pas de données à afficher

    let parsedLinks: Record<string, string>;

    // Si socialLinks est déjà un objet, on le prend tel quel
    if (typeof socialLinks === "object") {
      parsedLinks = socialLinks;
    } else {
      try {
        // Parser la chaîne JSON en un objet
        parsedLinks = JSON.parse(socialLinks);
      } catch (error) {
        console.error("Erreur de parsing JSON:", error);
        return null;
      }
    }

    // Dictionnaire des icônes pour chaque réseau
    const icons: { [key: string]: JSX.Element } = {
      linkedin: <CiLinkedin className="w-5 h-5" />,
      pinterest: <FaPinterest className="w-5 h-5" />,
      tiktok: <FaTiktok className="w-5 h-5" />,
      twitter: <FaXTwitter className="w-5 h-5" />,
      youtube: <FaYoutube className="w-5 h-5" />,
      instagram: <IoLogoInstagram className="w-5 h-5" />,
      facebook: <RiFacebookBoxLine className="w-5 h-5" />,
    };

    // Afficher tous les liens disponibles
    return Object.entries(parsedLinks).map(([key, url]) => {
      if (!url || typeof url !== "string" || url.trim() === '') return null;

      return (
        <a
          key={key + url}
          className="bg-marronFonce rounded-xl px-3 py-1 flex items-center gap-2"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {icons[key] || <CiLink className="text-white w-4 h-4" />}
          <p className="text-base font-medium text-white capitalize">{key}</p>
        </a>
      );
    });
  };

  return (
    <div className="">
      {listProfile?.length === 0 ? null : (
        <div className="xl:px-0 px-5 pt-12 pb-12">
          <h2 className="md:text-[46px] sm:text-3xl text-3xl font-passionOne text-rougeBrique text-center font-[400]">
            De la même catégorie...
          </h2>
          <Swiper
            modules={[Autoplay, A11y]}
            spaceBetween={55}
            slidesPerView={4.4}
            autoplay={{
              delay: 2000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              120: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              440: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4.4,
                spaceBetween: 55,
              },
            }}
          >
            {listProfile.map((profile: any) => (
              <SwiperSlide key={profile.id}>
                <div
                  onClick={() => openDialog(profile)}
                  className="relative font-poppins flex flex-col items-center pt-6 cursor-pointer"
                >
                  {profile?.media[0]?.original_url ? (
                    <img
                      src={profile?.media[0]?.original_url}
                      alt={profile.name}
                      className="w-full h-[350px] object-cover rounded-3xl shadow-md"
                    />
                  ) : (
                    <img
                      src={DefaultImg}
                      alt={profile.name}
                      className="w-full h-[350px] object-cover rounded-3xl shadow-md"
                    />
                  )}
                  {/* Overlay pour l'ombre */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-75 rounded-b-3xl h-32"></div>

                  <div className="absolute bottom-6 left-4 text-white">
                    <h3 className="text-lg font-bold">
                      {profile?.first_name} {profile?.last_name}
                    </h3>
                    <p className="text-sm">{profile.autor}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {profile?.tags?.map((tag: any, index: any) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs border border-gray-200 rounded-full text-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* modal */}
          <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent className="bg-custom-gradient max-w-lg max-h-[600px] rounded-xl overflow-y-auto px-0 py-0">
              <div className="cursor-pointer absolute right-4 top-4 bg-white flex justify-center items-center w-9 h-9 rounded-full">
                <IoCloseOutline onClick={closeDialog} className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-4 pt-10 font-poppins text-white">
                <div className="flex gap-6 items-start pt-6 px-6">
                  <div className="">
                    <Link
                      onClick={closeDialog}
                      to={`/profile/information/${selectedDialog?.profile?.slug}`}
                    >
                      {selectedDialog?.media[0]?.original_url ? (
                        <img
                          src={selectedDialog?.media[0]?.original_url}
                          alt={selectedDialog?.name}
                          className="w-[80px] h-[80px] rounded-full"
                        />
                      ) : (
                        <img
                          src={DefaultImg}
                          alt={selectedDialog?.name}
                          className="w-[80px] h-[80px] rounded-full"
                        />
                      )}
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-3 items-center">
                      <Link
                        onClick={closeDialog}
                        to={`/profile/information/${selectedDialog?.profile?.slug}`}
                      >
                        <h3 className="text-[26px] font-bold hover:underline">
                          {selectedDialog?.first_name}{" "}
                          {selectedDialog?.last_name}
                        </h3>
                      </Link>
                      {user?.is_certified === 0 ? null : (
                        <img src={Verified} className="w-8 h-8" alt="" />
                      )}
                    </div>
                    <p className="text-[18px]">
                      {selectedDialog?.profile?.title}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-[18px]">{selectedDialog?.work_on_line == '1'? selectedDialog?.address:"Travaille en ligne"}</p>
                    </div>
                    <div className="bg-background1 w-36 mt-2 flex items-center gap-2 px-2 py-1 rounded-[8px]">
                      <FaStar className="w-4 h-4 text-white" />
                      <p className="text-white text-sm">
                        {selectedDialog?.received_reviews_avg_rating || 0}/5 sur{" "}
                        {selectedDialog?.received_reviews_count} avis
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 bg-background1 rounded-xl pt-6 pb-6">
                  {selectedDialog?.profile?.biography && (
                    <div className="flex flex-col gap-3 px-6">
                      <div className="flex items-center gap-2">
                        <CgProfile className="w-7 h-7" />
                        <p className="text-[20px] font-bold">Biographie</p>
                      </div>
                      <p className="text-sm leading-1">
                        {parse(shortenText(selectedDialog?.profile?.biography,300))} 
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col gap-3 px-6">
                    <div className="flex items-center gap-2">
                      <IoPersonAddOutline className="w-7 h-7" />
                      <p className="text-[20px] font-bold">Nous suivre</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedDialog?.website && (
                        <a
                          className="bg-marronFonce rounded-xl px-3 py-1 flex items-center gap-2"
                          href={selectedDialog?.website}
                          target="_blank"
                        >
                          <CiLink className="text-white w-4 h-4" />
                          <p className="text-sm font-medium text-white">
                            Site web
                          </p>
                        </a>
                      )}
                      {renderSocialLinks(selectedDialog?.profile?.social_links)}
                    </div>
                  </div>
                  {/* <div className="flex flex-col gap-3 px-5">
                   <div className="flex items-center gap-2">
                     <BiSolidOffer className="w-7 h-7" />
                     <p className="text-[18px] font-bold">Nos offres</p>
                   </div>
                   <div className="grid grid-cols-3 gap-3">
                     {offres.map((offre, index) => (
                       <Link
                         key={index}
                         className="bg-rougeBrique rounded px-3 py-2 flex items-center gap-2"
                         to="#"
                       >
                         <IoIosArrowDropright className="w-5 h-5 text-white" />
                         <p className="text-white text-sm font-medium">
                           {offre.title}
                         </p>
                       </Link>
                     ))}
                   </div>
                 </div> */}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default CategoryProfile;

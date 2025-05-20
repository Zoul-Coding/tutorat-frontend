import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { IoCloseOutline } from "react-icons/io5";
import DefaultImg from "../assets/default-featured.jpg";
import { Loader } from "lucide-react";
import Verified from "../assets/verifier.png";
import { FaStar } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoPersonAddOutline } from "react-icons/io5";
import { CiLink } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import { CiLinkedin } from "react-icons/ci";
import { ImPinterest2 } from "react-icons/im";
import { RiFacebookBoxLine } from "react-icons/ri";
import { IoIosArrowDropright } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/users.atom";
import parse from "html-react-parser";
import { PaginationComponent } from "./PaginationComponent";
import professionnelService from "@/services/professionnel.service";
import { getToken } from "@/lib/utils";
import useFetchInfoUser from "@/requests/useFetchInfoUser";

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
}

type DataSearchType = {
  professionals?: any[];
  [key: string]: any;
};

type LastProfileProps = {
  dataFilter: DataSearchType | null;
  isLoading: boolean;
};

const LastProfileCategory: React.FC<LastProfileProps> = ({
  dataFilter,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [selectedView, setSelectedView] = useState<Profile | null>(null);
  const [selectedDialog, setSelectedDialog] = useState<Profile | null>(null);
  const viewSectionRef = useRef<HTMLDivElement | null>(null);
  const { data: infoUser } = useFetchInfoUser();
  const [user] = useAtom(userAtom);
  const token = getToken();  

  const professionals = Array.isArray(dataFilter?.profile)
    ? dataFilter?.profile
    : [];

  const scrollToElement = (element: HTMLElement | null, offset: number = 0) => {
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition + offset,
        behavior: "smooth",
      });
    }
  };

  const openDialog = (profile: any) => {
    setSelectedDialog(profile);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setSelectedDialog(null);
    setIsOpen(false);
  };

  const openView = (profile: any) => {
    setSelectedView(profile);
    setIsView(true);
    scrollToElement(viewSectionRef.current, -100);
  };

  const closeView = () => {
    setSelectedView(null);
    setIsView(false);
  };

  const offres = [
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
  ];

  const renderSocialLinks = (socialLinks: string | undefined) => {
    if (!socialLinks) return null; // Pas de données à afficher

    let parsedLinks: Record<string, string>;

    try {
      // Parser la chaîne JSON en un objet
      parsedLinks = JSON.parse(socialLinks);
    } catch (error) {
      console.error("Erreur lors du parsing des social_links :", error);
      return null;
    }

    // Dictionnaire des icônes pour chaque réseau
    const icons: { [key: string]: JSX.Element } = {
      linkedin: <CiLinkedin className="w-5 h-5" />,
      instagram: <IoLogoInstagram className="w-5 h-5" />,
      facebook: <RiFacebookBoxLine className="w-5 h-5" />,
      whatsapp: <FaWhatsapp className="w-5 h-5" />,
    };

    // Afficher tous les liens disponibles
    return Object.entries(parsedLinks).map(([key, url]) => {
      // Vérification que l'URL est bien une chaîne
      if (typeof url !== "string") return null;

      return (
        <a
          key={key + url}
          className="bg-marronFonce rounded-xl px-3 py-1 flex items-center gap-2"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {icons[key] || <CiLink className="w-5 h-5" />}
          <p className="text-base font-medium text-white capitalize">{key}</p>
        </a>
      );
    });
  };

  return (
    <section ref={viewSectionRef} className="pt-12 mb-0">
      <div className="lg:block hidden">
        <div className="flex items-start gap-8 px-5">
          {isView && selectedView && (
            <div className="bg-custom-gradient relative xl:w-[60%] w-[100%] rounded-xl border border-black overflow-y-auto">
              <div className="cursor-pointer absolute right-4 top-4 bg-white flex justify-center items-center w-9 h-9 rounded-full">
                <IoCloseOutline onClick={closeView} className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-4 pt-10 font-poppins text-white">
                <div className="flex gap-6 items-start pt-6 px-6">
                  <div className="">
                    <Link
                      to={`/profile/information/${selectedView?.profile?.slug}`}
                    >
                      {selectedView?.media[0]?.original_url ? (
                        <img
                          src={selectedView?.media[0]?.original_url}
                          alt={selectedView?.name}
                          className="w-[80px] h-[80px] rounded-full"
                        />
                      ) : (
                        <img
                          src={DefaultImg}
                          alt={selectedView.name}
                          className="w-[80px] h-[80px] rounded-full"
                        />
                      )}
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-3 items-center">
                      <Link
                        to={`/profile/information/${selectedView?.profile?.slug}`}
                      >
                        <h3 className="text-[26px] font-bold hover:underline">
                          {selectedView?.first_name} {selectedView?.last_name}
                        </h3>
                      </Link>
                      {infoUser?.is_certified === 0 ? null : (
                        <img src={Verified} className="w-8 h-8" alt="" />
                      )}
                    </div>
                    <p className="text-[18px]">
                      {selectedView?.profile?.title}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-[18px]">{selectedView?.address}</p>
                    </div>
                    <div className="bg-background1 w-40 mt-2 flex items-center gap-2 px-2 py-1 rounded-[8px]">
                      <FaStar className="w-4 h-4 text-white" />
                      <p className="text-white text-sm">
                        {selectedView?.received_reviews_avg_rating || 0}/5 sur{" "}
                        {selectedView?.received_reviews_count || 0} avis
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 bg-background1 rounded-xl pt-6 pb-6">
                  {selectedView?.profile?.biography && (
                    <div className="flex flex-col gap-3 px-6">
                      <div className="flex items-center gap-2">
                        <CgProfile className="w-7 h-7" />
                        <p className="text-[20px] font-bold">Biographie</p>
                      </div>
                      <p className="text-sm leading-1">
                        {parse(selectedView?.profile?.biography)}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col gap-3 px-6">
                    <div className="flex items-center gap-2">
                      <IoPersonAddOutline className="w-7 h-7" />
                      <p className="text-[20px] font-bold">Nous suivre</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedView?.website && (
                        <a
                          className="bg-marronFonce rounded-xl px-3 py-1 flex items-center gap-2"
                          href={selectedView?.website}
                          target="_blank"
                        >
                          <CiLink className="text-white w-4 h-4" />
                          <p className="text-sm font-medium text-white">
                            Site web
                          </p>
                        </a>
                      )}
                      {renderSocialLinks(selectedView?.profile?.social_links)}
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
            </div>
          )}
          <div className="w-full">
            {professionals.length === 0 ? (
              <p className="text-center">Aucun professionnel trouvé</p>
            ) : (
              <div>
                <div
                  className={`grid ${
                    isView
                      ? "xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2"
                      : "xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
                  } grid-cols-1 gap-8 h-auto transition-all duration-300`}
                >
                  {professionals?.map((profile: any) => (
                    <div
                      onClick={() => openView(profile)}
                      key={profile.id}
                      className={`relative group flex flex-col items-center hover:opacity-90 cursor-pointer ${
                        isView ? "" : "w-full h-[350px]"
                      }`}
                    >
                      {profile?.media[0]?.original_url ? (
                        <img
                          src={profile?.media[0]?.original_url}
                          alt={profile.name}
                          className={`object-cover transition-transform duration-500 ease-in-out rounded-3xl shadow-md ${
                            isView ? "w-[350px] h-[350px]" : "w-full h-[350px]"
                          }`}
                        />
                      ) : (
                        <img
                          src={DefaultImg}
                          alt={profile?.name}
                          className={`object-cover transition-transform duration-500 ease-in-out rounded-3xl shadow-md ${
                            isView ? "w-[350px] h-[350px]" : "w-full h-[350px]"
                          }`}
                        />
                      )}
                      {/* Overlay pour l'ombre */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-75 rounded-b-3xl h-36"></div>

                      <div className="absolute bottom-6 left-4 text-white">
                        <h3 className="text-lg font-bold">
                          {profile?.first_name} {profile?.last_name}
                        </h3>
                        <p className="text-sm">{profile?.profile?.title}</p>
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
                  ))}
                </div>
                <div className="flex justify-center items-center mt-0">
                  {/*  <PaginationComponent
             currentPage={currentPage}
             totalPages={lastPage}
             onPageChange={handlePageChange}
             /> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="md:hidden block">
        <div className="flex items-center gap-8 px-5">
          {professionals.length === 0 ? (
            <p className="text-center mx-auto">Aucun professionnel trouvé</p>
          ) : (
            <div className="w-full">
              <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 h-auto transition-all duration-300">
                {professionals?.map((profile: any) => (
                  <div
                    onClick={() => openDialog(profile)}
                    key={profile.id}
                    className="relative group flex flex-col items-center hover:opacity-90 cursor-pointer w-full h-[350px]"
                  >
                    {profile?.media[0]?.original_url ? (
                      <img
                        src={profile?.media[0]?.original_url}
                        alt={profile.name}
                        className={`object-cover transition-transform duration-500 ease-in-out rounded-3xl shadow-md ${
                          isView ? "w-[350px] h-[350px]" : "w-full h-[350px]"
                        }`}
                      />
                    ) : (
                      <img
                        src={DefaultImg}
                        alt={profile.name}
                        className={`object-cover transition-transform duration-500 ease-in-out rounded-3xl shadow-md ${
                          isView ? "w-[350px] h-[350px]" : "w-full h-[350px]"
                        }`}
                      />
                    )}
                    {/* Overlay pour l'ombre */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-75 rounded-b-3xl h-36"></div>

                    <div className="absolute bottom-6 left-4 text-white">
                      <h3 className="text-lg font-bold">
                        {profile?.first_name} {profile?.last_name}
                      </h3>
                      <p className="text-sm">{profile?.profile?.title}</p>
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
                ))}
              </div>
              <div className="flex justify-center items-center mt-0">
                {/*  <PaginationComponent
             currentPage={currentPage}
             totalPages={lastPage}
             onPageChange={handlePageChange}
             /> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogOverlay overlayClassName="bg-black/40 md:bg-transparent" />
        <div className="">
          <DialogContent className="bg-custom-gradient max-w-lg max-h-[600px] rounded-xl overflow-y-auto px-0 py-0 lg:hidden block">
            <div className="cursor-pointer absolute right-4 top-4 bg-white flex justify-center items-center md:w-9 w-8 md:h-9 h-8 rounded-full">
              <IoCloseOutline onClick={closeDialog} className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-4 pt-10 font-poppins text-white">
              <div className="flex gap-6 items-start pt-6 px-6">
                <div className="">
                  <Link
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
                      to={`/profile/information/${selectedDialog?.profile?.slug}`}
                    >
                      <h3 className="text-[26px] font-bold hover:underline">
                        {selectedDialog?.first_name} {selectedDialog?.last_name}
                      </h3>
                    </Link>
                    {infoUser?.is_certified === 0 ? null : (
                      <img src={Verified} className="w-8 h-8" alt="" />
                    )}
                  </div>
                  <p className="text-[18px]">
                    {selectedDialog?.profile?.title}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-[18px]">{selectedDialog?.address}</p>
                  </div>
                  <div className="bg-background1 w-40 mt-2 flex items-center gap-2 px-2 py-1 rounded-[8px]">
                    <FaStar className="w-4 h-4 text-white" />
                    <p className="text-white text-sm">
                      {selectedDialog?.received_reviews_avg_rating}/5 sur{" "}
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
                      {parse(selectedDialog?.profile?.biography)}
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
        </div>
      </Dialog>
    </section>
  );
};

export default LastProfileCategory;

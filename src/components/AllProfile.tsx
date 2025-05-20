import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { IoCloseOutline } from "react-icons/io5";
import DefaultImg from "../assets/default-featured.jpg";
import Verified from "../assets/verifier.png";
import { FaStar } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoPersonAddOutline } from "react-icons/io5";
import { CiLink } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import { CiLinkedin } from "react-icons/ci";
import { ImPinterest2 } from "react-icons/im";
import { RiFacebookBoxLine } from "react-icons/ri";
import { SlSocialYoutube } from "react-icons/sl";
import { RiTiktokFill } from "react-icons/ri";
import { FaSnapchat } from "react-icons/fa6";
import { BsJournalCheck } from "react-icons/bs";
import { IoIosArrowDropright } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/users.atom";
import { Loader } from "lucide-react";
import parse from "html-react-parser";
import { PaginationComponent } from "./PaginationComponent";
import professionnelService from "@/services/professionnel.service";
import useFetchInfoUser from "@/requests/useFetchInfoUser";
import useFetchProfessionnelProfile from "@/requests/useFetchProfessionnelProfile";
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
  work_on_line: string;
}

type DataSearchType = {
  profile?: any[];
  [key: string]: any;
};

type AllProfileProps = {
  dataSearch: DataSearchType | null;
};

const AllProfile: React.FC<AllProfileProps> = ({ dataSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [selectedView, setSelectedView] = useState<Profile | null>(null);
  const [selectedDialog, setSelectedDialog] = useState<Profile | null>(null);
  const [dataPayload, setDataPayload] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [user] = useAtom(userAtom);
  const { data: infoUser } = useFetchInfoUser();
  const viewSectionRef = useRef<HTMLDivElement | null>(null);

  async function getSessionsPaginated() {
    const professionnelData =
      await professionnelService.fetchProfessionnelleProfile(currentPage);
    setLastPage(professionnelData?.last_page);
    return professionnelData;
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const payload = await getSessionsPaginated();
      setDataPayload(payload);
      setIsLoading(false);
    })();
  }, [currentPage]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

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

  const renderSocialLinks = (socialLinks: string | undefined) => {
    if (!socialLinks) return null;

    let parsedLinks: Record<string, string>;

    if (typeof socialLinks === "object") {
      parsedLinks = socialLinks;
    } else {
      try {
        parsedLinks = JSON.parse(socialLinks);
      } catch (error) {
        console.error("Erreur de parsing JSON:", error);
        return null;
      }
    }

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

  const profiles =
    Array.isArray(dataSearch?.profile) && dataSearch?.profile.length > 0
      ? dataSearch?.profile
      : dataPayload?.data;

  return (
    <section ref={viewSectionRef} className="pt-8 mb-8">
      <div className="lg:block hidden">
        <div className="flex items-start gap-8 px-5">
          {isView && selectedView && isLoading ? (
            <div className="flex w-[60%] justify-center">
              <Loader className="text-marronFonce w-7 h-7 animate-spin" />
            </div>
          ) : (
            isView &&
            selectedView && (
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
                        {selectedView.media[0]?.original_url ? (
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
                        <p className="text-[18px]">{selectedView?.work_on_line == '1' ?selectedView?.address:"Travaille en ligne"}</p>
                      </div>
                      <div className="bg-background1 w-36 mt-2 flex items-center gap-2 px-2 py-1 rounded-[8px]">
                        <FaStar className="w-4 h-4 text-white" />
                        <p className="text-white text-sm">
                          {selectedView?.received_reviews_avg_rating}/5 sur{" "}
                          {selectedView?.received_reviews_count} avis
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
                          {parse(shortenText(selectedView?.profile?.biography,300))}
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
            )
          )}
          <div className="w-full">
            {dataSearch &&
            Array.isArray(dataSearch.profile) &&
            dataSearch?.profile.length === 0 ? (
              <p className="text-center">Aucun professionnel trouvé</p>
            ) : isLoading ? (
              <div className="flex justify-center">
                <Loader className="text-marronFonce w-7 h-7 animate-spin" />
              </div>
            ) : (
              <div>
                <div
                  className={`grid ${
                    isView
                      ? "xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1"
                      : "xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
                  } grid-cols-1 gap-8 h-auto transition-all duration-300`}
                >
                  {profiles?.map((profile: any) => (
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
                {/*  <div className="flex justify-center items-center mt-0">
                <PaginationComponent />
              </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="lg:hidden block">
        <div className="flex items-center gap-8 px-5">
          {dataSearch &&
          Array.isArray(dataSearch.profile) &&
          dataSearch?.profile.length === 0 ? (
            <p className="text-center">Aucun professionnel trouvé</p>
          ) : isLoading ? (
            <div className="mx-auto">
              <Loader className="text-marronFonce w-7 h-7 animate-spin" />
            </div>
          ) : (
            <div className="w-full">
              <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 h-auto transition-all duration-300">
                {profiles?.map((profile: any) => (
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
              {/*  <div className="flex justify-center items-center mt-0">
                <PaginationComponent />
              </div> */}
            </div>
          )}
          ;
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
                        {selectedDialog?.first_name} {selectedView?.last_name}
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
                  <div className="bg-background1 w-36 mt-2 flex items-center gap-2 px-2 py-1 rounded-[8px]">
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
      {lastPage ? (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={lastPage}
          onPageChange={handlePageChange}
        />
      ) : null}
    </section>
  );
};

export default AllProfile;

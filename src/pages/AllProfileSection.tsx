import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IoCloseOutline } from "react-icons/io5";
import Profile from "../assets/profile.jpg";
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
import { Link } from "react-router-dom";
/* import { PaginationComponent } from "@/components/PaginationComponent"; */

const AllProfileSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const cardProfile = [
    {
      id: 1,
      img: Profile,
      name: "Aurelien Salomon",
      autor: "Designer Produit",
      tags: ["Mobile", "Produit", "UX"],
    },
    {
      id: 2,
      img: Profile,
      name: "Julie Dupont",
      autor: "Designer Produit",
      tags: ["Mobile", "Produit", "UX"],
    },
    {
      id: 3,
      img: Profile,
      name: "Marc Durand",
      autor: "Designer Produit",
      tags: ["Mobile", "Produit", "UX"],
    },
    {
      id: 4,
      img: Profile,
      name: "Sophie Bernard",
      autor: "Consultante UX",
      tags: ["Mobile", "Produit", "UX"],
    },
    {
      id: 5,
      img: Profile,
      name: "Paul Lefevre",
      autor: "Designer Produit",
      tags: ["Mobile", "Produit", "UX"],
    },
    {
      id: 6,
      img: Profile,
      name: "Lucie Martin",
      autor: "Designer Produit",
      tags: ["Mobile", "Produit", "UX"],
    },
    {
      id: 7,
      img: Profile,
      name: "Alex Thomas",
      autor: "Designer Produit",
      tags: ["Mobile", "Produit", "UX"],
    },
    {
      id: 8,
      img: Profile,
      name: "Charlotte Richard",
      autor: "Designer Produit",
      tags: ["Mobile", "Produit", "UX"],
    },
    {
      id: 9,
      img: Profile,
      name: "Charlotte Richard",
      autor: "Designer Produit",
      tags: ["Mobile", "Produit", "UX"],
    },
    {
      id: 10,
      img: Profile,
      name: "Charlotte Richard",
      autor: "Designer Produit",
      tags: ["Mobile", "Produit", "UX"],
    },
  ];

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

  return (
    <section className="pt-40 pb-16">
      <div className="flex items-start gap-8 px-5">
        {isOpen && (
          <div className="bg-custom-gradient relative max-w-md rounded-xl border border-black overflow-y-auto">
            <div className="cursor-pointer absolute right-4 top-4 bg-white flex justify-center items-center w-9 h-9 rounded-full">
              <IoCloseOutline onClick={closeDialog} className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-4 pt-10 font-poppins text-white">
              <div className="flex gap-6 items-center pt-6 px-6">
                <Link to="#">
                  <img
                    src={Profile}
                    className="w-36 h-36 rounded-full"
                    alt=""
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-3 items-center">
                    <Link to="#">
                      <h3 className="text-[26px] font-bold hover:underline">
                        John Doe
                      </h3>
                    </Link>
                    <img src={Verified} className="w-8 h-8" alt="" />
                  </div>
                  <p className="text-[18px]">Coach de vie/Nutritionnel</p>
                  <div className="flex gap-3">
                    <p className="text-[18px]">France/ Lille</p>
                  </div>
                  <div className="bg-background1 w-36 mt-2 flex items-center gap-2 px-2 py-1 rounded-[8px]">
                    <FaStar className="w-4 h-4 text-white" />
                    <p className="text-white text-sm">5/5 sur 18 avis</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 bg-background1 rounded-xl pt-6 pb-6">
                <div className="flex flex-col gap-3 px-6">
                  <div className="flex items-center gap-2">
                    <CgProfile className="w-7 h-7" />
                    <p className="text-[20px] font-bold">Biographie</p>
                  </div>
                  <p className="text-sm leading-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusantium ab deleniti iusto nulla explicabo repellat, quas
                    suscipit laboriosam aliquid harum optio. Atque quibusdam
                    veritatis minima doloribus aperiam labore quasi provident!
                  </p>
                </div>
                <div className="flex flex-col gap-3 px-6">
                  <div className="flex items-center gap-2">
                    <IoPersonAddOutline className="w-7 h-7" />
                    <p className="text-[20px] font-bold">Nous suivre</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <a
                      className="bg-marronFonce rounded-xl px-3 py-1 flex items-center gap-2"
                      href="#"
                    >
                      <CiLink className="text-white w-4 h-4" />
                      <p className="text-sm font-medium text-white">Site web</p>
                    </a>
                    <a
                      className="bg-marronFonce rounded-xl px-3 py-1 flex items-center gap-2"
                      href="#"
                    >
                      <IoLogoInstagram className="text-white w-4 h-4" />
                      <p className="text-base font-medium text-white">
                        instagram
                      </p>
                    </a>
                    <a
                      className="bg-marronFonce rounded-xl px-3 py-1 flex items-center gap-2"
                      href="#"
                    >
                      <CiLinkedin className="text-white w-4 h-4" />
                      <p className="text-base font-medium text-white">
                        Linkedin
                      </p>
                    </a>
                    <a
                      className="bg-marronFonce rounded-xl px-3 py-1 flex items-center gap-2"
                      href="#"
                    >
                      <ImPinterest2 className="text-white w-4 h-4" />
                      <p className="text-base font-medium text-white">
                        Pinterest
                      </p>
                    </a>
                    <a
                      className="bg-marronFonce rounded-xl px-3 py-1 flex items-center gap-2"
                      href="#"
                    >
                      <RiFacebookBoxLine className="text-white w-4 h-4" />
                      <p className="text-base font-medium text-white">
                        Facebook
                      </p>
                    </a>
                    <a
                      className="bg-marronFonce rounded-xl px-3 py-1 flex items-center gap-2"
                      href="#"
                    >
                      <SlSocialYoutube className="text-white w-4 h-4" />
                      <p className="text-base font-medium text-white">
                        YouTube
                      </p>
                    </a>
                    <a
                      className="bg-marronFonce rounded-xl px-3 py-1 flex items-center gap-2"
                      href="#"
                    >
                      <RiTiktokFill className="text-white w-4 h-4" />
                      <p className="text-base font-medium text-white">Tiktok</p>
                    </a>
                    <a
                      className="bg-marronFonce rounded-xl px-3 py-1 flex items-center gap-2"
                      href="#"
                    >
                      <FaSnapchat className="text-white w-4 h-4" />
                      <p className="text-base font-medium text-white">Snap</p>
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-3 px-5">
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
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="">
        <div
          className={`grid ${
            isOpen
              ? "xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2"
              : "xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
          } grid-cols-1 gap-8 h-auto transition-all duration-300`}
        >
          {cardProfile.map((profile) => (
            <div
              onClick={openDialog}
              key={profile.id}
              className={`relative group flex flex-col items-center hover:opacity-90 cursor-pointer ${
                isOpen ? "" : "w-full h-[350px]"
              }`}
            >
              <img
                src={profile.img}
                alt={profile.name}
                className={`object-cover transition-transform duration-500 ease-in-out rounded-3xl shadow-md ${
                  isOpen ? "w-[200px] h-[270px]" : "w-full h-[350px]"
                }`}
              />
              {/* Overlay pour l'ombre */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-75 rounded-b-3xl h-36"></div>

              <div className="absolute bottom-6 left-4 text-white">
                <h3 className="text-lg font-bold">{profile.name}</h3>
                <p className="text-sm">{profile.autor}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.tags.map((tag, index) => (
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
            {/* <PaginationComponent /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProfileSection;

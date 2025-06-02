import { useState } from "react";
import { Link } from "react-router-dom";
import { AlignJustify, X } from "lucide-react";
import Logo from "/assets/logo.png";
import AuthButton from "./AuthButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
   /*  { name: "Donner des cours", path: "/" }, */
    { name: "Tableau de bord", path: "/tableau-de-bord" },
   /*  { name: "Messages", path: "/" }, */
    { name: "Annonces", path: "/annonces" },
  ];

  return (
    <section className="fixed bg-white w-full z-50 transition-all duration-300 shadow-md">
      <div className="max-w-screen-xl mx-auto xl:px-0 xl:pt-0 px-2">
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            <Link onClick={closeMenu} to="/" className="">
              <img
                src={Logo}
                alt="logo tutorat"
                className="lg:w-40 w-28 h-auto"
              />
            </Link>
            <nav className="flex items-center gap-6">
              {navLinks.map((link, index) => (
                <Link
                  onClick={closeMenu}
                  key={index}
                  className="text-marronFonce text-[14px] font-medium hover:opacity-60"
                  to={link.path}
                >
                  {link.name}
                </Link>
              ))}
              <AuthButton />
            </nav>
          </div>
        </div>
        <div className="flex justify-between items-center md:hidden">
          <Link onClick={closeMenu} to="/" className="">
            <img
              src={Logo}
              alt="logo annuaire"
              className="md:w-40 sm:w-32 w-28 h-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
            {isMenuOpen ? (
              <div className="w-[24px]" onClick={closeMenu}>
                <X className="cursor-pointer text-marronFonce w-[25px] h-auto" />
              </div>
            ) : (
              <div className="w-[24px]" onClick={openMenu}>
                <AlignJustify className="cursor-pointer text-marronFonce w-[25px] h-auto" />
              </div>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed w-[100%] top-[50px] z-50 bg-white px-5 py-8">
          <div className="flex flex-col gap-3">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link, index) => (
                <Link
                  onClick={closeMenu}
                  key={index}
                  className="text-marronFonce text-base font-medium hover:opacity-60"
                  to={link.path}
                >
                  {link.name}
                </Link>
              ))}
               <AuthButton />
            </nav>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;

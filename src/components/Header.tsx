import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BiSearchAlt2 } from "react-icons/bi";
import { AlignJustify, X } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import Logo from "../assets/annuaire.png";
import AvatarAuthProfile from "./AvatarAuthProfile";
import CookieConsentDialog from "@/components/CookieConsentDialog";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  /* const [isScrolled, setIsScrolled] = useState(false); */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Annuaire", path: "/annuaire" },
    /* { name: "Quoi de neuf ?", path: "/" }, */
    { name: "À propos", path: "/a-propos" },
    { name: "Blog", path: "https://blog.annuaireduroyaume.com" },
  ];

 /*  // Fonction pour surveiller le scroll
  useEffect(() => {
    const handleScroll = () => {
      // Si l'utilisateur a scrollé plus de 50px
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Ajoute un event listener pour le scroll
    window.addEventListener("scroll", handleScroll);

    // Nettoyage de l'event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); */

  const formSchema = z.object({
    search: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(values: any) {
    try {
      const redirectURL = "/recherche";
      navigate(`${redirectURL}?search=${values.search}`);
      form.reset();
    } catch (err) {
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      form.handleSubmit(onSubmit);
    }
  };

  return (
    <section
      className='fixed bg-white w-full z-50 transition-all duration-300'>
        <CookieConsentDialog />
      <div className="max-w-screen-xl mx-auto xl:px-0 px-5 pt-4">
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
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
            </nav>
            <Link onClick={closeMenu} to="/" className="">
              <img
                src={Logo}
                alt="logo annuaire"
                className="lg:w-40 w-28 h-auto"
              />
            </Link>
            <div className="flex items-center gap-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full h-10 bg-white border-bordureInput border-2 rounded"
                >
                  <div className="flex items-center w-full">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                onKeyDown={handleKeyDown}
                                className="w-full h-8 px-3 focus:outline-none focus:shadow-none bg-transparent border-none text-[13px] leading-[20.16px] font-medium rounded"
                                placeholder="Rechercher..."
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button className="px-3 py-2">
                      <BiSearchAlt2 size={25} className="text-marronFonce" />
                    </Button>
                    {/*  <Link to="/resultat" className="px-2 py-2">
                    <BiSearchAlt2 className="text-marronFonce w-6 h-6" />
                  </Link> */}
                  </div>
                </form>
              </Form>
              <AvatarAuthProfile />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center md:hidden pb-3">
          <Link onClick={closeMenu} to="/" className="">
            <img
              src={Logo}
              alt="logo annuaire"
              className="md:w-40 sm:w-28 w-20 h-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
          <AvatarAuthProfile />
            <div onClick={openDialog}>
              <CiSearch className="cursor-pointer text-marronFonce w-[25px] h-auto" />
            </div>
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
        <div className="md:hidden fixed w-[100%] top-[73px] z-50 backdrop-blur-md bg-white px-5 py-8">
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
            </nav>
          </div>
        </div>
      )}

      {/* modal */}
      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent className="bg-white max-w-[400px] rounded-xl border-none overflow-y-auto top-40">
          <IoCloseOutline
            onClick={closeDialog}
            className="cursor-pointer absolute right-4 top-4"
            size={24}
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full h-10 bg-white border-bordureInput border-2 rounded mt-8"
            >
              <div className="flex items-center w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            onKeyDown={handleKeyDown}
                            className="w-full h-8 px-3 focus:outline-none focus:shadow-none bg-transparent border-none text-[13px] leading-[20.16px] font-medium rounded"
                            placeholder="Rechercher..."
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="px-3 py-2">
                  <BiSearchAlt2 size={25} className="text-marronFonce" />
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Header;

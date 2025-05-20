import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/annuaire-ferme.png";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Partager from "../assets/partager.png";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Footer = () => {
  const Links = [
    { name: "Annuaire", path: "/annuaire" },
    { name: "Blog", path: "https://blog.annuaireduroyaume.com" },
    { name: "À propos", path: "/a-propos" },
   /*  { name: "Mise à jour", path: "/" }, */
    { name: "Evenements", path: "/evenements" },
   /*  { name: "Politique de confidentialité", path: "/politique-de-confidentialité" }, */
  ];

  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const summary =
    "Voici une page intéressante sur laquelle vous pourriez en apprendre davantage.";
  const message = "Découvrez cette page incroyable !";
  const hashtag = "#ReactShare";

  return (
    <section className="bg-rosePale">
      <div className="max-w-screen-xl mx-auto xl:px-0 px-5 py-6">
        <div className="flex md:flex-row md:gap-0 gap-6 flex-col justify-between items-center w-full">
          <Link to="/">
            <img src={Logo} alt="logo annuaire ferme" className="xl:w-32 w-20 xl:h-28 h-18" />
          </Link>
          <div className="flex md:flex-row flex-col items-center gap-8 font-poppins">
            {Links.map((link, index) => (
              <Link
                key={index}
                className="text-black xl:text-[20px] lg:text-[18px] text-base font-medium hover:opacity-60"
                to={link.path}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img src={Partager} alt="patarger" className="xl:w-6 w-5 xl:h-6 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white px-3 py-2 rounded w-[500px]">
                <CopyToClipboard text={shareUrl} onCopy={() => setCopied(true)}>
                  <div className="relative w-full flex items-center">
                    <Input
                      className="w-full border-none bg-gray-200 px-3 py-3 rounded text-gray-900 font-medium text-md"
                      disabled
                      value={shareUrl}
                      type="text"
                    />
                    <Button className="bg-marronFonce text-white">
                      {copied ? "Lien copié !" : "Copier le lien"}
                    </Button>
                  </div>
                </CopyToClipboard>
              </DropdownMenuContent>
            </DropdownMenu>
            <LinkedinShareButton
              url={shareUrl}
              title={message}
              summary={summary}
            >
              <LinkedinIcon className="xl:w-7 w-6 xl:h-7 h-6 rounded-full" />
            </LinkedinShareButton>
            <FacebookShareButton url={shareUrl} hashtag={hashtag}>
              <FacebookIcon className="xl:w-7 w-6 xl:h-7 h-6 rounded-full" />
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl} title={message} separator=" - ">
              <WhatsappIcon className="xl:w-7 w-6 xl:h-7 h-6 rounded-full" />
            </WhatsappShareButton>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-center items-center gap-6 md:pt-0 pt-6 font-poppins">
          <p className="text-marronFonce xl:text-[18px] text-base font-medium">
            © {new Date().getFullYear()} Annuaire du Royaume
          </p>
          <div className="md:block hidden bg-marronFonce w-0.5 h-5"></div>
          <Link
            className="text-marronFonce xl:text-[18px] text-base font-medium hover:opacity-60"
            to="#"
          >
            Termes
          </Link>
          <Link
            className="text-marronFonce xl:text-[18px] text-base font-medium hover:opacity-60"
            to="/politique-de-confidentialité"
          >
            Politique de confidentialité
          </Link>
          <Link
            className="text-marronFonce xl:text-[18px] text-base font-medium hover:opacity-60"
            to="#"
          >
            Cookies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;

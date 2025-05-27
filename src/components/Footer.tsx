import { Link } from "react-router-dom";
import Logo from "/assets/logo.png";
import { FaXTwitter } from "react-icons/fa6";
import { Mail, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <section className="bg-card mt-28">
      <div className="flex  flex-col justify-center items-center gap-8 py-12">
        <Link to="/" className="">
          <img src={Logo} alt="logo tutorat" className="lg:w-40 w-28 h-auto" />
        </Link>
        <div className="flex items-center gap-16">
          <p className="text-primary text-base font-medium">
            © {new Date().getFullYear()} Tutorat
          </p>
          <div className="flex items-center gap-4">
            <a href="#">
             <Mail className="w-5 h-5 text-primary" />
            </a>
            <a href="#">
             <FaXTwitter className="w-5 h-5 text-primary" />
            </a>
            <a href="#">
             <Linkedin className="w-5 h-5 text-primary" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

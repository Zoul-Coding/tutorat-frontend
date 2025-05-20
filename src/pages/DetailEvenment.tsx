import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FaRegCalendarAlt } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { Link, useParams } from "react-router-dom";
import DefaultImg from "../assets/default-featured.jpg";
import { FiUser } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { CopyToClipboard } from "react-copy-to-clipboard";
import Partager from "../assets/partager.png";
/* import SimilarArticle from "@/components/SimilarArticle"; */
import useFetchEventDetails from "@/requests/useFetchEventDetails";
import { formatDate, getToken } from "@/lib/utils";
import { toast } from "sonner";
import { api } from "@/services/http";
import { Loader } from "lucide-react";
import { mutate } from "swr";
import { userAtom } from "@/atoms/users.atom";
import { useAtom } from "jotai";
import parse from "html-react-parser";

const DetailEvenment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { slug } = useParams();
  const { data: detailsEvent, isLoading: loading } = useFetchEventDetails(
    String(slug)
  );
  const [isSubmittingLitige, setIsSubmittingLitige] = useState(false);
  const [user] = useAtom(userAtom);
  const token = getToken();

  const idEvent = detailsEvent?.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getFirstLetter = (str: any) => (str ? str.charAt(0).toUpperCase() : "");
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  async function registerEvent() {
    try {
      setIsSubmitting(true);

      await api.post(`/events/${idEvent}/register`);
      toast.success("Inscription à l'événement réussie.");

      mutate("fetch_event_details");
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err?.message || err;
      ("Une erreur inattendue s'est produite.");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  const calculateTimeRemaining = () => {
    if (!detailsEvent?.start_date || !detailsEvent?.end_date) {
      setTimeRemaining("Dates non définies");
      return;
    }

    const now = new Date();
    const start = new Date(detailsEvent.start_date);
    const end = new Date(detailsEvent.end_date);

    // Vérifiez si les dates sont valides
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setTimeRemaining("Dates invalides");
      return;
    }

    // Convertissez les dates en timestamps avant les calculs
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeRemaining("Événement terminé");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeRemaining(`${days}j:${hours}h:${minutes}min:${seconds}s`);
  };

  useEffect(() => {
    calculateTimeRemaining(); // Appeler une première fois la fonction

    const interval = setInterval(() => {
      calculateTimeRemaining();
    }, 1000); // Mettre à jour chaque seconde

    return () => clearInterval(interval); // Nettoyer l'intervalle quand le composant est démonté
  }, [detailsEvent?.end_date]);

  const formSchema = z.object({
    comment: z.string().min(1, {
      message: "Ajouter un commentaire",
    }),
    rating: z.string().min(1, {
      message: "Sélectionnez une note",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      rating: "",
    },
  });

  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const summary =
    "Voici une page intéressante sur laquelle vous pourriez en apprendre davantage.";
  const message = "Découvrez cette page incroyable !";
  const hashtag = "#ReactShare";

  const formSchemaLitige = z.object({
    reason: z.string().min(1, {
      message: "Décrivez la raison de votre litige",
    }),
    proof: z.custom<File>((file) => file instanceof File && file.size > 0, {
      message: "Veuillez sélectionner une image valide",
    }),
  });

  const formLitige = useForm<z.infer<typeof formSchemaLitige>>({
    resolver: zodResolver(formSchemaLitige),
    defaultValues: {
      reason: "",
      proof: undefined,
    },
  });

  async function onSubmitLitige(values: z.infer<typeof formSchemaLitige>) {
    try {
      setIsSubmittingLitige(true);
      const formData = new FormData();
      formData.append("reason", values.reason);
      formData.append("proof", values.proof);

      await api.post(`/event/${idEvent}/report`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Litige envoyé avec succès");
      formLitige.reset();
      closeDialog();
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || err;
      ("Une erreur inattendue s'est produite.");
      toast.error(errorMessage);
    } finally {
      setIsSubmittingLitige(false);
    }
  }

  return (
    <section className="md:pt-32 pt-20 mb-20">
      <div className="">
        <div className="bg-background pt-6 pb-6">
          <div className="flex flex-col gap-6 max-w-screen-lg mx-auto xl:px-0 px-5">
            <Breadcrumb className="">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="text-marronFonce font-bold"
                    href="#"
                  >
                    Annuaire
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="text-marronFonce font-bold"
                    href="#"
                  >
                    Evènements
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-marronFonce font-bold">
                    Business
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            {detailsEvent?.media[0]?.original_url ? (
              <img
                src={detailsEvent?.media[0]?.original_url}
                alt={detailsEvent?.title}
                className="w-100 h-100 object-fill rounded-2xl"
              />
            ) : (
              <img
                src={DefaultImg}
                className="w-100 h-100 object-fill rounded-2xl"
              />
            )}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between md:gap-0 gap-3">
                  <div className="flex flex-wrap items-center md:gap-6 gap-3">
                    <div className="flex items-center gap-2">
                      <FaRegCalendarAlt className="md:w-8 w-6 md:h-8 h-6 text-rougeBrique" />
                      <p className="text-xl text-rougeBrique font-normal">
                        {formatDate(detailsEvent?.start_date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <SiGooglemaps className="w-8 h-8 text-rougeBrique" />
                      <p className="text-xl text-rougeBrique font-normal">
                        {detailsEvent?.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <img
                          src={Partager}
                          alt="patarger"
                          className="w-6 h-6"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white px-3 py-2 rounded w-[500px] mt-2">
                        <CopyToClipboard
                          text={shareUrl}
                          onCopy={() => setCopied(true)}
                        >
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
                      <LinkedinIcon className="w-7 h-7 rounded-full" />
                    </LinkedinShareButton>
                    <FacebookShareButton url={shareUrl} hashtag={hashtag}>
                      <FacebookIcon className="w-7 h-7 rounded-full" />
                    </FacebookShareButton>
                    <WhatsappShareButton
                      url={shareUrl}
                      title={message}
                      separator=" - "
                    >
                      <WhatsappIcon className="w-7 h-7 rounded-full" />
                    </WhatsappShareButton>
                  </div>
                </div>
                <h3 className="md:text-4xl text-3xl text-rougeBrique font-passionOne font-bold">
                  {detailsEvent?.title}
                </h3>
                {token ? (
                  <div className="flex justify-center pt-2 pb-2">
                    <Button
                      onClick={openDialog}
                      className="bg-marronFonce hover:opacity-85 px-8 py-2 rounded text-sm text-white"
                    >
                      Déclarer un litige
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-lg mx-auto xl:px-0 px-5 flex flex-col gap-6 mt-6">
          <div className="bg-marronFonce max-w-screen-md rounded px-6 py-5 flex md:flex-row flex-col justify-between md:items-center items-start">
            <div className="flex items-center gap-4">
              <Link
                to={`/profile/information/${detailsEvent?.user?.profile?.slug}`}
              >
                {detailsEvent?.user?.media[0]?.original_url ? (
                  <img
                    src={detailsEvent?.user?.media[0]?.original_url}
                    alt={detailsEvent?.title}
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <img src={DefaultImg} className="w-16 h-16 rounded-full" />
                )}
              </Link>
              <div className="flex flex-col gap-0">
                <div className="flex gap-3 items-center">
                  <Link
                    to={`/profile/information/${detailsEvent?.user?.profile?.slug}`}
                  >
                    <h3 className="text-1xl text-white font-bold hover:underline">
                      {detailsEvent?.user?.first_name}
                      {getFirstLetter(detailsEvent?.user?.last_name)}
                    </h3>
                  </Link>
                </div>
                <p className="text-sm text-white">
                  {detailsEvent?.user?.profile?.title}
                </p>
                <div className="flex gap-3 pb-2">
                  <p className="text-sm text-white">
                    {detailsEvent?.user?.profile?.country}{" "}
                    {detailsEvent?.user?.profile?.city ? "/" : ""}{" "}
                    {detailsEvent?.user?.profile?.city}
                  </p>
                </div>
              </div>
            </div>
            <Link
              to={`/profile/information/${detailsEvent?.user?.profile?.slug}`}
              className="flex justify-center gap-2 items-center bg-custom-gradient w-32 h-8
                    md:mt-0 mt-3    rounded text-sm text-white font-medium"
            >
              <div className="bg-white w-5 h-5 rounded-full"></div>
              Voir le profil
            </Link>
          </div>
          <p className="text-xl text-rougeBrique leading-[30px]">
            {detailsEvent?.description ? parse(detailsEvent?.description) : ""}
          </p>
          <div className="flex items-center gap-3 bg-background3 w-56 px-2 py-2 rounded">
            <FiUser className="text-white w-5 h-5" />
            <p className="text-sm  text-white font-medium">
              {detailsEvent?.registrations_count} personnes inscrite(s)
            </p>
          </div>
          <p className="text-xl text-rougeBrique items-start">
            Expire dans : <span className="font-bold">{timeRemaining}</span>
          </p>
          {token ? (
            <Button
              disabled={isSubmitting}
              onClick={registerEvent}
              className="bg-custom-gradient text-white sm:w-[300px] w-[200px] sm:text-[18px] text-sm font-bold flex gap-3 rounded hover:opacity-80"
            >
              {isSubmitting ? (
                <>
                  <Loader className="text-white mr-2 h-5 w-5 animate-spin" />
                </>
              ) : (
                <div className="flex gap-3 items-center">
                  <div className="bg-white sm:w-6 w-3 sm:h-6 h-3 rounded-full"></div>
                  Participer à l'évènement
                </div>
              )}
            </Button>
          ) : (
            <Link
              to="/connexion"
              className="bg-custom-gradient justify-center text-white sm:w-[300px] w-[200px] h-[40px] sm:text-[18px] text-sm font-bold flex gap-3 rounded hover:opacity-80"
            >
              <div className="flex gap-3 items-center">
                <div className="bg-white sm:w-6 w-3 sm:h-6 h-3 rounded-full"></div>
                Participer à l'évènement
              </div>
            </Link>
          )}
        </div>
      </div>

      <div>
        <Dialog open={isOpen} onOpenChange={closeDialog}>
          <DialogContent className="bg-white max-w-lg rounded-xl border-none max-h-[650px] overflow-y-auto">
            <IoCloseOutline
              onClick={closeDialog}
              className="cursor-pointer absolute right-4 top-4"
              size={24}
            />
            <Form {...formLitige}>
              <form
                onSubmit={formLitige.handleSubmit(onSubmitLitige)}
                className="space-y-6 pt-8 pb-0"
              >
                <FormField
                  control={formLitige.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez la raison de votre litige ici..."
                          className="rounded resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 text-sm font-medium" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formLitige.control}
                  name="proof"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Joindre une preuve (photo)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 text-sm font-medium" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    disabled={isSubmittingLitige}
                    className="bg-custom-gradient w-[150px] rounded text-base text-white"
                  >
                    {isSubmittingLitige ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin text-white" />
                      </>
                    ) : (
                      "Envoyer"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/*  <SimilarArticle /> */}
    </section>
  );
};

export default DetailEvenment;

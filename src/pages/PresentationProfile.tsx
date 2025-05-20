import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DefaultImg from "../assets/default-featured.jpg";
import Verified from "../assets/verifier.png";
import { FaStar } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io5";
import { RiFacebookBoxLine } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { CiLink } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IoCloseOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Blog1 from "../assets/blog-1.jpg";
import CategoryProfile from "@/components/CategoryProfile";
import useFetchProfessionnelDetails from "@/requests/useFetchProfessionnelDetails";
import { shortenText } from "@/lib/utils";
import { Loader } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { api } from "@/services/http";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/users.atom";
import { mutate } from "swr";
import parse from "html-react-parser";
import useFetchInfoUser from "@/requests/useFetchInfoUser";

const ratings = [
  {
    id: 1,
    rating: "1",
  },
  {
    id: 2,
    rating: "2",
  },
  {
    id: 3,
    rating: "3",
  },
  {
    id: 4,
    rating: "4",
  },
  {
    id: 5,
    rating: "5",
  },
];

function PresentationProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const { slug } = useParams();
  const { data: detailsProfile, isLoading: loading } =
    useFetchProfessionnelDetails(String(slug));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user] = useAtom(userAtom);
  const idPro = detailsProfile?.user?.id;
  const { data: infoUser } = useFetchInfoUser();

  const handleStartTimeChange = (e: any) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: any) => {
    setEndTime(e.target.value);
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("comment", values.comment);
      formData.append("rating", values.rating);
      formData.append("professional_id", idPro);

      await api.post("/admin/reviews", formData);
      toast.success("Avis ajouté avec succès");
      form.reset();

      mutate("fetch_professionnel_details");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Une erreur inattendue s'est produite.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

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

    return Object.entries(parsedLinks).map(([key, url]) => {
      if (!url || typeof url !== "string" || url.trim() === "") return null;

      return (
        <a
          key={key + url}
          className="bg-gray-200 w-full px-6 py-2 flex items-center justify-center gap-3 rounded"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-md">Me rejoindre sur</p>
          {icons[key] || <CiLink className="w-5 h-5" />}
        </a>
      );
    });
  };

  return (
    <div className="">
      <div className="bg-background md:pt-40 pt-28 pb-28">
        <section className="max-w-screen-xl mx-auto xl:px-0 px-5">
          <div className="">
            <div
              className={`grid ${
                detailsProfile?.user?.profile?.opening_hours?.length === 0
                  ? "md:grid-cols-6 grid-cols-1"
                  : "grid-cols-1"
              } gap-6`}
            >
              <div className="md:col-span-4 flex items-center bg-white shadow-sm rounded px-6 py-8">
                {loading ? (
                  <div className="flex justify-center">
                    <Loader className="text-marronFonce w-7 h-7 animate-spin" />
                  </div>
                ) : (
                  <div className="flex sm:flex-row flex-col gap-6 items-center">
                    {detailsProfile?.user?.media[0]?.original_url ? (
                      <img
                        src={detailsProfile?.user?.media[0]?.original_url}
                        alt={detailsProfile?.user?.name}
                        className="w-40 h-40 rounded-full"
                      />
                    ) : (
                      <img
                        src={DefaultImg}
                        alt={detailsProfile?.user?.name}
                        className="w-40 h-40 rounded-full"
                      />
                    )}
                    <div className="flex flex-col sm:items-start items-center gap-1">
                      <div className="flex sm:gap-3 items-center">
                        <h3 className="sm:text-4xl text-3xl font-bold sm:text-start text-center">
                          {detailsProfile?.user?.first_name}{" "}
                          {detailsProfile?.user?.last_name}
                        </h3>
                        {infoUser?.is_certified === 0 ? null : (
                          <img src={Verified} className="w-8 h-8" alt="" />
                        )}
                      </div>
                      <p className="text-xl sm:text-start text-center">
                        {detailsProfile?.user?.profile?.title}
                      </p>
                      {}
                      <div className="flex gap-3">
                        <p className="text-lg sm:text-start text-center">
                          {detailsProfile?.user?.work_on_line == "1"
                            ? detailsProfile?.user?.address
                            : "Travaille en ligne"}
                        </p>
                      </div>
                      <div className="bg-custom-gradient w-40 mt-2 flex items-center gap-3 px-2 py-1 rounded-[8px]">
                        <FaStar className="w-4 h-4 text-white" />
                        <p className="text-white text-sm">
                          {detailsProfile?.received_reviews_avg_rating || 0}/5
                          sur {detailsProfile?.received_reviews_count || 0} avis
                        </p>
                      </div>
                      {detailsProfile?.user?.profile?.website && (
                        <div className="pt-2">
                          <a
                            className="rounded-xl flex items-center gap-2 underline"
                            href={detailsProfile?.user?.profile?.website}
                            target="_blank"
                          >
                            <FaLink className="w-5 h-5" />
                            <p className="text-md font-medium">Site web</p>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-6 grid-cols-1 items-start gap-6 pt-6">
              <div className="bg-white shadow-sm md:col-span-2 sm:px-6 px-2 sm:py-6 py-2 rounded">
                <h3 className="text-2xl font-bold">Contact</h3>
                {detailsProfile?.user?.profile?.social_links?.length === 0 ? (
                  <p className="text-sm pt-3">Aucune donnée</p>
                ) : (
                  <div className="flex flex-col gap-3 pt-6">
                    {/* <Button
                    onClick={openDialog}
                    className="bg-marronFonce w-full flex gap-3 rounded hover:opacity-80"
                  >
                    <p className="text-md text-white">Envoyer un message</p>
                  </Button> */}
                    {/*  <Link 
                    className="bg-marronFonce text-white w-full px-6 py-2 flex items-center justify-center gap-3 rounded text-md hover:opacity-80" 
                    target="_blank"
                    to='/chat'
                    >
                      Envoyer un message
                    </Link> */}
                    {renderSocialLinks(
                      detailsProfile?.user?.profile?.social_links
                    )}
                  </div>
                )}
                {detailsProfile?.user?.profile?.opening_hours?.length > 0 ? (
                  <div className="bg-white shadow-sm md:col-span-2 sm:px-0 sm:py-0 rounded mt-8">
                    <h3 className="text-2xl font-bold">Heure d'ouverture</h3>
                    <div className="">
                      <Table className="w-full flex justify-center items-start mt-3 border border-linear py-2 px-2">
                        <TableHeader className="[&_tr]:border-b-0 bg-custom-gradient text-white h-[100%] w-full">
                          <TableRow className="flex flex-col gap-2">
                            {detailsProfile?.user?.profile?.opening_hours?.map(
                              (item: any, index: any) => (
                                <TableHead
                                  key={index}
                                  className="font-medium text-base px-4 py-2"
                                >
                                  {item.day}
                                </TableHead>
                              )
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody className="w-full">
                          <TableRow className="flex items-start justify-start flex-col px-4 gap-6 mt-1">
                            {detailsProfile?.user?.profile?.opening_hours?.map(
                              (item: any, index: any) => (
                                <TableCell
                                  key={index}
                                  className="sm:text-base text-[14px] font-medium"
                                >
                                  {!item.isClosed
                                    ? "Fermé"
                                    : item.hours.map((hour: any, i: any) => (
                                        <span key={i}>
                                          {hour.open} - {hour.close}
                                          <br />
                                        </span>
                                      ))}
                                </TableCell>
                              )
                            )}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="md:col-span-4 bg-white shadow-sm rounded px-6 py-6">
                {loading ? (
                  <div className="flex justify-center">
                    <Loader className="text-marronFonce w-7 h-7 animate-spin" />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold">A propos</h3>
                    {detailsProfile?.user?.profile?.biography ? (
                      <p className="text-md pt-4 leading-7">
                        {parse(detailsProfile?.user?.profile?.biography)}
                      </p>
                    ) : (
                      <p className="text-sm pt-3">Aucune donnée</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            {detailsProfile?.user?.offers?.length === 0 ? null : (
              <div className="max-w-screen-lg mx-auto xl:px-0 px-5 pt-12">
                <h2 className="md:text-[46px] sm:text-3xl text-2xl font-passionOne text-rougeBrique text-center font-[400]">
                  Nos offres
                </h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8 pt-8 pb-0">
                  {detailsProfile?.user?.offers?.map((offre: any) => (
                    <div
                      key={offre.id}
                      className="rounded-t-xl rounded-b-xl overflow-hidden"
                    >
                      <div className="relative group">
                        {/* offre?.media[0]?.original_url */}
                        <Link to={
                              offre.type === "product"
                                ? `/detail/produit/${offre.slug}`
                                : offre.type === "service"
                                ? `/detail/service/${offre.slug}`
                                : offre.type === "annonce"
                                ? offre.link
                                : "/"
                            }>
                          <img
                            src={offre?.media[0]?.original_url??DefaultImg}
                            alt={offre?.title}
                            className="w-full h-[200px] object-cover rounded-t-xl rounded-b-none"
                          />
                        </Link>
                      </div>
                      <div className="bg-white w-full h-full">
                        <div className="flex flex-col items-center gap-2 px-3 py-6">
                          <h3 className="text-black md:text-[19px] text-lg text-center font-bold hover:underline">
                            {shortenText(offre?.title, 35)}
                          </h3>
                          <p className="text-black md:text-xl text-sm font-base">
                            {offre?.price} {offre?.devise == 'EUR' ? '€' : '＄'}
                          </p>
                          <Link
                            to={
                              offre.type === "product"
                                ? `/detail/produit/${offre.slug}`
                                : offre.type === "service"
                                ? `/detail/service/${offre.slug}`
                                : offre.type === "annonce"
                                ? offre.link
                                : "/"
                            }
                            className="flex justify-center gap-3 items-center bg-custom-gradient w-52 h-11 rounded text-[20px] text-white font-poppins font-medium"
                          >
                            <div className="bg-white w-5 h-5 rounded-full"></div>
                            En savoir plus
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* modal */}
        {/*     <Dialog open={isOpen} onOpenChange={closeDialog}>
          <DialogContent className="bg-white max-w-lg rounded-xl border-none max-h-[650px] overflow-y-auto">
            <IoCloseOutline
              onClick={closeDialog}
              className="cursor-pointer absolute right-4 top-4"
              size={24}
            />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 pt-6 pb-0"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="w-full rounded">
                        <Input
                          className="bg-gray-50 border-gray-300 text-base placeholder:text-base"
                          placeholder="Entrer votre nom et prénom"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="w-full rounded">
                        <Input
                          className="bg-gray-50 border-gray-300 text-base placeholder:text-base"
                          placeholder="Entrer votre mail"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="w-full rounded">
                        <Input
                          className="bg-gray-50 border-gray-300 text-base placeholder:text-base"
                          placeholder="Entrer le motif du rendez-vous"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="bg-gray-50 border-gray-300 text-base rounded">
                        <Textarea
                          placeholder="Ajouter une description..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="bg-custom-gradient w-full rounded text-base text-white"
                  type="submit"
                >
                  Envoyer
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog> */}
      </div>
      <div className="max-w-screen-lg mx-auto xl:px-0 px-5 pt-12 pb-12">
        <h2 className="md:text-[46px] sm:text-3xl text-2xl font-passionOne text-rougeBrique text-center font-[400]">
          Commentaires
        </h2>
        <div className="pt-8">
          {detailsProfile?.user?.received_reviews?.length === 0 ? (
            <p className="text-center text-lg pt-6">
              Aucun commentaire pour le moment !
            </p>
          ) : (
            <div className="flex flex-col gap-12">
              {detailsProfile?.user?.received_reviews?.map(
                (item: any, index: any) => (
                  <div key={index} className="flex gap-3">
                    {item?.user?.media[0]?.original_url ? (
                      <img
                        src={item?.user?.media[0]?.original_url}
                        alt={item.title}
                        className="w-20 h-20 rounded-full"
                      />
                    ) : (
                      <img
                        src={DefaultImg}
                        className="w-20 h-20 rounded-full"
                      />
                    )}
                    <div className="flex flex-col gap-8 max-w-xl">
                      <div className="">
                        <h3 className="text-xl font-bold">
                          {item?.user?.first_name} {item?.user?.last_name}
                        </h3>
                        <div className="md:hidden block">
                          <div className="flex gap-2">
                            {[...Array(5)].map((_, index) => (
                              <FaStar
                                key={index}
                                className={`w-4 h-4 ${
                                  index < item?.rating
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-6 md:pt-0 pt-3">
                          <p className="text-xl text-gray-600">
                            {item?.comment}
                          </p>
                          <div className="md:block hidden">
                            <div className="flex gap-2">
                              {[...Array(5)].map((_, index) => (
                                <FaStar
                                  key={index}
                                  className={`w-4 h-4 ${
                                    index < item?.rating
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm pt-2">
                          {formatDate(item.created_at)}
                        </p>
                      </div>
                      {/*  <div className="flex items-center gap-3">
                        <img
                          className="w-12 h-12 rounded-full"
                          src={DefaultImg}
                          alt="Profile"
                        />
                        <div className="flex flex-col gap-1 max-w-xl">
                          <h3 className="text-xl font-bold">{item?.name}</h3>
                          <p className="text-lg text-gray-600">
                            Merci
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
          {user ? (
            <div className="flex flex-col justify-center items-center pt-12 w-full">
              <h3 className="text-2xl font-bold pb-3">
                Laissez un commentaire
              </h3>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="md:w-[50%] w-full space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem className="">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 border border-gray-300 text-base rounded">
                              <SelectValue placeholder="Noté ce professionnel" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            {ratings.map((item: any) => (
                              <SelectItem value={item.rating} key={item.id}>
                                {item.rating}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-600 text-sm font-medium" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="bg-gray-50 border-gray-300 text-base rounded">
                          <Textarea
                            placeholder="Votre commentaire..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 text-sm font-medium" />
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={isSubmitting}
                    className="bg-custom-gradient px-8 rounded text-base text-white"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="text-white mr-2 h-5 w-5 animate-spin" />
                        Commenter...
                      </>
                    ) : (
                      "Commenter"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          ) : null}
        </div>
      </div>
      <CategoryProfile dataRelatUser={detailsProfile} />
    </div> 
  );
}

export default PresentationProfile;

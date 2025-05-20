import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoCloseOutline } from "react-icons/io5";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FaStar } from "react-icons/fa6";
import DefaultImg from "../assets/default-featured.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "react-router-dom";
import Partager from "../assets/partager.png";
import { FaLocationDot } from "react-icons/fa6";
import SimilarOffersService from "@/components/SimilarOffersService";
import useFetchProductDetails from "@/requests/useFetchProductDetails";
import { CopyToClipboard } from "react-copy-to-clipboard";
import parse from "html-react-parser";
import { formatDate, getToken } from "@/lib/utils";
import { api } from "@/services/http";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/users.atom";
import { Loader } from "lucide-react";
import { mutate } from "swr";

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

function DetailService() {
  const { slug } = useParams();
  const { data: detailsProduct, isLoading: loading } = useFetchProductDetails(
    String(slug)
  );
  const offerId = detailsProduct?.offer?.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingLitige, setIsSubmittingLitige] = useState(false);
  const getFirstLetter = (str: any) => (str ? str.charAt(0).toUpperCase() : "");
  const [user] = useAtom(userAtom);
  const token = getToken();
  const [isOpen, setIsOpen] = useState(false);

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

      await api.post(`/offers/${slug}/add-review`, formData);
      toast.success("Avis ajouté avec succès");
      form.reset();

      mutate(`fetch_product_details_${slug}`);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || err;
      ("Une erreur inattendue s'est produite.");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

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

      await api.post(`/offers/${offerId}/report`, formData, {
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
    <section className="md:pt-36 pt-20">
      {loading ? (
        <div className="flex justify-center pt-6">
          <Loader className="text-marronFonce h-7 w-7 animate-spin" />
        </div>
      ) : (
        <div className="max-w-screen-lg mx-auto xl:px-0 px-5">
          <div className="">
            <div className="">
              <div className="">
                <div className="flex flex-col gap-6">
                  <h3 className="md:text-4xl text-rougeBrique text-3xl font-passionOne font-bold leading-[50px]">
                    {detailsProduct?.offer?.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-12">
                    <div className="bg-background3 w-40 flex items-center gap-2 px-2 py-1 font-poppins rounded">
                      <FaStar className="w-4 h-4 text-white" />
                      <p className="text-white text-sm">
                        {detailsProduct?.offer?.reviews_avg_rating || 0}/5 sur{" "}
                        {detailsProduct?.offer?.reviews_count} avis
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
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
                    <p className="text-rougeBrique font-extrabold text-xl">
                      {detailsProduct?.offer?.price} €
                    </p>
                    {/* <div className="flex items-center gap-1 sm:pb-0 pb-2">
                      <FaLocationDot className="text-marronFonce w-6 h-6" />
                      <p className="text-rougeBrique text-sm">France, Lille</p>
                    </div> */}
                  </div>
                  {detailsProduct?.offer?.media[0]?.original_url ? (
                    <img
                      src={detailsProduct?.offer?.media[0]?.original_url}
                      alt={detailsProduct.title}
                      className="w-100 h-100 object-fill rounded-xl"
                    />
                  ) : (
                    <img
                      src={DefaultImg}
                      className="w-100 h-100 object-fill rounded-xl"
                    />
                  )}
                </div>
              </div>
            </div>
            <Tabs
              defaultValue="infos"
              className="bg-white py-8 rounded w-full sm:mt-0 shadow-none mt-16"
            >
              <TabsList className="flex flex-wrap-reverse justify-center items-center gap-3 font-passionOne">
                <TabsTrigger
                  className="sm:text-[25px] text-[18px] text-marronFonce font-bold py-0"
                  value="infos"
                >
                  Détails de l'offre
                </TabsTrigger>
                <span className="text-marronFonce">-</span>
                <TabsTrigger
                  className="text-marronFonce sm:text-[25px] text-[18px] font-bold"
                  value="avis"
                >
                  Avis clients
                </TabsTrigger>
                {token ? (
                  <div className="flex justify-center pt-4 pb-4 ml-3">
                    <Button
                      onClick={openDialog}
                      className="bg-marronFonce hover:opacity-85 px-6 py-2 rounded text-sm text-white"
                    >
                      Déclarer un litige
                    </Button>
                  </div>
                ) : null}
              </TabsList>
              <TabsContent
                className="w-full flex flex-col gap-3 pt-2"
                value="infos"
              >
                <p className="md:text-xl text-1xl leading-[30px] text-justify">
                  {detailsProduct?.offer?.description
                    ? parse(detailsProduct?.offer?.description)
                    : ""}
                </p>
                <div className="bg-marronFonce max-w-screen-md rounded mt-2 px-6 py-5 flex md:flex-row flex-col justify-between md:items-center items-start">
                  <div className="grid grid-cols-6 items-center w-full">
                    <Link
                      to={`/profile/information/${detailsProduct?.offer?.user?.profile?.slug}`}
                      className="col-span-1"
                    >
                      {detailsProduct?.offer?.user?.media[0]?.original_url ? (
                        <img
                          src={
                            detailsProduct?.offer?.user?.media[0]?.original_url
                          }
                          alt={detailsProduct?.title}
                          className="w-16 h-16 rounded-full"
                        />
                      ) : (
                        <img
                          src={DefaultImg}
                          className="w-16 h-16 rounded-full"
                        />
                      )}
                    </Link>
                    <div className="flex flex-col gap-0 col-span-5 px-3">
                      <div className="flex gap-3 items-center">
                        <Link
                          to={`/profile/information/${detailsProduct?.offer?.user?.profile?.slug}`}
                        >
                          <h3 className="text-xl text-white font-bold hover:underline">
                            {detailsProduct?.offer?.user?.first_name}{" "}
                            {getFirstLetter(
                              detailsProduct?.offer?.user?.last_name
                            )}
                          </h3>
                        </Link>
                      </div>
                      <p className="text-md text-white">
                        {detailsProduct?.offer?.user?.profile?.title}
                      </p>
                      <div className="flex gap-3 pt-2">
                        <p className="text-md text-white">
                          {detailsProduct?.offer?.user?.country}{" "}
                          {detailsProduct?.offer?.user?.city ? "/" : ""}{" "}
                          {detailsProduct?.offer?.user?.city}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center sm:gap-3 gap-2 sm:pt-0 pt-2">
                    <Link
                      to={`/profile/information/${detailsProduct?.offer?.user?.profile?.slug}`}
                      className="flex justify-center gap-2 items-center bg-custom-gradient md:w-32 w-full h-8
                        rounded text-sm text-white font-medium"
                    >
                      <div className="bg-white w-5 h-5 rounded-full"></div>
                      Voir le profil
                    </Link>
                    <Link
                      to={detailsProduct?.offer?.link}
                      className="flex justify-center gap-2 items-center bg-white md:w-36 w-full h-8
                        rounded text-sm text-black font-medium"
                      target="blank"
                    >
                      <div className="bg-black w-5 h-5 rounded-full"></div>
                      {detailsProduct?.offer?.button_text ?? "En savoir plus"}
                    </Link>
                  </div>
                </div>
              </TabsContent>
              <TabsContent className="pt-2" value="avis">
                {detailsProduct?.offer?.reviews?.length === 0 ? (
                  <p className="text-center text-lg pt-6">
                    Aucun avis pour le moment!
                  </p>
                ) : (
                  <div>
                    <div className="flex flex-col gap-16">
                      {detailsProduct?.offer?.reviews.map(
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
                                  {item?.user?.first_name}{" "}
                                  {item?.user?.last_name}
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
                                    {item.comment}
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
                                  {formatDate(item?.created_at)}
                                </p>
                              </div>
                              {/* <div className="flex items-center gap-3">
                                <img
                                  className="w-12 h-12 rounded-full"
                                  src={DefaultImg}
                                  alt="Profile"
                                />
                                <div className="flex flex-col gap-1 max-w-xl">
                                  <h3 className="text-xl font-bold">
                                    {item?.name}
                                  </h3>
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
                  </div>
                )}
                {token ? (
                  <div className="pt-12">
                    <h3 className="text-2xl font-bold pb-3">Laissez un avis</h3>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="max-w-lg space-y-6"
                      >
                        <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                          {/* <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl className="w-full rounded">
                                  <Input
                                    className="bg-gray-50 border-gray-300 text-base placeholder:text-base"
                                    placeholder="Votre nom et prénom"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          /> */}
                          {/* <FormField
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
                          /> */}
                        </div>
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
                                    <SelectValue placeholder="Noté ce service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                  {ratings?.map((item: any) => (
                                    <SelectItem
                                      value={item.rating}
                                      key={item.id}
                                    >
                                      {item?.rating}
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
                                  placeholder="Votre avis..."
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
                              Envoyer...
                            </>
                          ) : (
                            "Envoyer"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </div>
                ) : null}
              </TabsContent>
            </Tabs>
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
        </div>
      )}
      <SimilarOffersService dataSimilarOffers={detailsProduct} />
    </section>
  );
}

export default DetailService;

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DefaultImg from "../assets//default-featured.jpg";
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
import { IoCloseOutline } from "react-icons/io5";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Partager from "../assets/partager.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useFetchArticleDetails from "@/requests/useFetchArticleDetails";
import useFetchResponseComment from "@/requests/useFetchResponseComment";
import { useParams } from "react-router-dom";
import { formatDate, getToken } from "@/lib/utils";
import { api } from "@/services/http";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/users.atom";
import { mutate } from "swr";

function DetailBlog() {
  const { slug } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [idCommentRes, setIdCommentRes] = useState<Number | null>(null);
  const { data: detailsArticle, isLoading: loading } = useFetchArticleDetails(
    String(slug)
  );
  const idArticle = detailsArticle?.id;
  const [user] = useAtom(userAtom);
  const token = getToken();
  /*  const { data: responseComment } = useFetchArticleDetails(Number(idArticle)); */
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openDialog = (item: number) => {
    setIdCommentRes(item);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const formSchemaComment = z.object({
    content: z.string().min(1, {
      message: "Ajouter un commentaire",
    }),
    name: token
      ? z.string().optional()
      : z
          .string()
          .min(1, {
            message: "Le nom est requis",
          })
          .default(""),
    email: token
      ? z.string().optional()
      : z
          .string()
          .email("Adresse email invalide.")
          .min(1, "L'email est requis."),
  });

  const formComment = useForm<z.infer<typeof formSchemaComment>>({
    resolver: zodResolver(formSchemaComment),
    defaultValues: {
      content: "",
      name: "",
      email: "",
    },
  });

  const formSchemaResponse = z.object({
    content: z
      .string()
      .min(1, {
        message: "Ajouter un commentaire",
      })
      .default(""),
  });

  const formResponse = useForm<z.infer<typeof formSchemaResponse>>({
    resolver: zodResolver(formSchemaResponse),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaComment>) {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("content", values.content);
      if (values.name) {
        formData.append("name", values.name);
      }
      if (values.email) {
        formData.append("email", values.email);
      }

      await api.post(`/admin/${idArticle}/comments`, formData);
      toast.success("Avis ajouté avec succès");
      formComment.reset();

      mutate("fetch_article_details");
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

  async function onResponseComment(values: z.infer<typeof formSchemaResponse>) {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("content", values.content);

      await api.post(
        `/admin/blog/article/${idArticle}/comment/${idCommentRes}/reply`,
        formData
      );
      toast.success("Réponse ajouté");
      closeDialog();
      formResponse.reset();

      mutate("fetch_article_details");
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

  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const summary =
    "Voici une page intéressante sur laquelle vous pourriez en apprendre davantage.";
  const message = "Découvrez cette page incroyable !";
  const hashtag = "#ReactShare";

  return (
    <section>
      {loading ? (
        <div className="flex justify-center pt-60 pb-48">
          <Loader className="text-marronFonce animate-spin w-7 h-7" />
        </div>
      ) : (
        <div className="max-w-screen-lg mx-auto xl:px-0 px-5 md:pt-40 pt-32 pb-32">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 md:px-52">
              {/*  <div className="w-[150px] mx-auto">
              <p className="bg-gray-200 text-sm text-center font-medium text-gray-600 px-2 py-1 rounded">
                Conférence
              </p>
            </div> */}
              <h3 className="text-4xl font-medium text-center">
                {detailsArticle?.title}
              </h3>
              <p className="text-sm text-center font-medium text-gray-400">
                {formatDate(detailsArticle?.created_at)}
              </p>
              <div className="flex justify-center items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <img src={Partager} alt="patarger" className="w-6 h-6" />
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
            {detailsArticle?.media[0]?.original_url ? (
              <img
                src={detailsArticle?.media[0]?.original_url}
                alt={detailsArticle?.title}
                className="w-full md:h-[700px] h-100 rounded-2xl"
              />
            ) : (
              <img
                src={DefaultImg}
                alt={detailsArticle?.title}
                className="w-full md:h-[700px] h-100 rounded-2xl"
              />
            )}
            <div className="flex flex-col gap-3">
              <p className="text-base leading-[30px] text-justify">
                {detailsArticle?.content}
              </p>
            </div>
            <div>
              {detailsArticle?.comments?.length === 0 ? (
                <p className="text-center text-lg pt-6">
                  Aucun commentaire pour le moment!
                </p>
              ) : (
                <div className="flex flex-col gap-12 pt-12">
                  <h2 className="md:text-[46px] sm:text-3xl text-2xl font-passionOne text-rougeBrique text-center font-[400]">
                    Commentaires
                  </h2>
                  {detailsArticle?.comments?.map((item: any, index: any) => (
                    <div key={index} className="flex gap-3">
                      {/*  {item?.user?.media[0]?.original_url ? (
                        <img
                          src={item?.user?.media[0]?.original_url}
                          alt={item.title}
                          className="w-20 h-20 rounded-full"
                        />
                      ) : ( */}
                      <img
                        src={DefaultImg}
                        className="w-20 h-20 rounded-full"
                      />
                      {/*   )} */}
                      <div className="flex flex-col gap-8 max-w-xl">
                        <div className="">
                          <h3 className="text-xl font-bold">{item?.name}</h3>
                          {/* <div className="md:hidden block">
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
                          </div> */}
                          <div className="flex gap-6 md:pt-0 pt-3">
                            <p className="text-xl text-gray-600">
                              {item?.content}
                            </p>
                            {/* <div className="md:block hidden">
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
                            </div> */}
                          </div>
                          <div className="flex items-center gap-8 pt-2">
                            <p className="text-gray-600 text-sm">
                              {formatDate(item?.created_at)}
                            </p>
                            <Button
                              onClick={() => openDialog(item?.id)}
                              className="px-0 py-0 text-marronFonce font-medium underline"
                            >
                              Répondre
                            </Button>
                          </div>
                        </div>
                        {item?.replies?.length === 0
                          ? null
                          : item?.replies?.map((item: any) => (
                              <div
                                key={item?.id}
                                className="flex items-center gap-3"
                              >
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
                                    {item?.content}
                                  </p>
                                  <p className="text-gray-600 text-sm">
                                    {formatDate(item?.created_at)}
                                  </p>
                                </div>
                              </div>
                            ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {token && (
                <div className="flex flex-col justify-center items-center pt-12 w-full">
                <h3 className="text-2xl font-bold pb-3">
                  Laissez un commentaire
                </h3>
                <Form {...formComment}>
                  <form
                    onSubmit={formComment.handleSubmit(onSubmit)}
                    className="md:w-[50%] w-full space-y-6"
                  >
                    {!token && (
                      <div className="space-y-6">
                        <FormField
                          control={formComment.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl className="w-full rounded">
                                <Input
                                  className="bg-gray-50 border-gray-300 text-base rounded"
                                  placeholder="Entrer votre nom"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-600 font-medium" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={formComment.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl className="w-full rounded">
                                <Input
                                  className="bg-gray-50 border-gray-300 text-base rounded"
                                  placeholder="Entrer votre mail"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-600 text-sm font-medium" />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    <FormField
                      control={formComment.control}
                      name="content"
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
              )}
            </div>
          </div>

          <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent className="bg-white max-w-lg rounded-xl border-none max-h-[650px] overflow-y-auto">
              <IoCloseOutline
                onClick={closeDialog}
                className="cursor-pointer absolute right-4 top-4"
                size={24}
              />
              <Form {...formResponse}>
                <form
                  onSubmit={formResponse.handleSubmit(onResponseComment)}
                  className="space-y-6 pt-6 pb-0"
                >
                  <FormField
                    control={formResponse.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="bg-gray-50 border-gray-300 text-base rounded">
                          <Textarea
                            placeholder="Commenté..."
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
                    className="bg-custom-gradient w-full rounded text-base text-white"
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
            </DialogContent>
          </Dialog>
        </div>
      )}
    </section>
  );
}

export default DetailBlog;

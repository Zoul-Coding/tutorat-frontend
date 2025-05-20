import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { number, z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Logo from "../assets/annuaire-ferme.png";
import { Divide, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useFetchInfoUser from "@/requests/useFetchInfoUser";
import userService from "@/services/user.service";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/users.atom";
import { removeFromLocalStorage } from "@/lib/utils";
import Cookies from "js-cookie";

const genre = ["Homme", "Femme"];

function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { data: infoUser, isLoading: loading } = useFetchInfoUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const navigate: any = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const formSchema = z.object({
    /*  phone_number: z
      .string()
      .refine((value) => isValidPhoneNumber(value), {
        message: "Le numéro de téléphone n'est pas valide.",
      })
      .default(""), */
    phone_number: z.string().min(1, {
      message: "Le numéro de téléphone est requis",
    }),
    country: z
      .string()
      .min(1, {
        message: "Le pays est requis",
      })
      .default(""),
    city: z
      .string()
      .min(1, {
        message: "La ville est requis",
      })
      .default(""),
    adress: z
      .string()
      .min(1, {
        message: "L'adressse est requis",
      })
      .default(""),
    postal_code: z
      .string()
      .min(1, {
        message: "Le code postale est requis",
      })
      .default(""),
    gender: z
      .string()
      .min(1, {
        message: "Le genre est requis",
      })
      .default(""),
    email: z
      .string()
      .email("Adresse email invalide.")
      .min(1, "L'email est requis."),
    name: z
      .string()
      .min(1, {
        message: "Le nom d'utilisateur est requis",
      })
      .default(""),
    last_name: z
      .string()
      .min(1, {
        message: "Le nom est requis",
      })
      .default(""),
    first_name: z
      .string()
      .min(1, {
        message: "Le prénom est requis",
      })
      .default(""),
    profile_image: z
      .instanceof(File)
      .nullable()
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
        message: "Le fichier ne doit pas dépasser 5 Mo.",
      })
      .refine(
        (file) => !file || ["image/jpeg", "image/png"].includes(file.type),
        {
          message: "Seuls les fichiers JPEG et PNG sont autorisés.",
        }
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number: "",
      country: "",
      city: "",
      adress: "",
      postal_code: "",
      gender: "",
      email: "",
      name: "",
      last_name: "",
      first_name: "",
      profile_image: null,
    },
  });

  useEffect(() => {
    if (infoUser?.name) {
      form.reset({
        phone_number: infoUser?.phone_number || "",
        country: infoUser?.country || "",
        city: infoUser?.city || "",
        adress: infoUser?.address || "",
        postal_code: infoUser?.postal_code || "",
        gender: infoUser?.gender || "",
        email: infoUser?.email || "",
        name: infoUser?.name || "",
        last_name: infoUser?.last_name || "",
        first_name: infoUser?.first_name || "",
        profile_image: null,
      });
    }
  }, [infoUser]);
  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("phone_number", values.phone_number);
      formData.append("country", values.country);
      formData.append("adress", values.adress);
      formData.append("city", values.city);
      formData.append("postal_code", values.postal_code);
      formData.append("gender", values.gender);
      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("last_name", values.last_name);
      formData.append("first_name", values.first_name);

      if (values.profile_image) {
        const file = values.profile_image as File;

        if (file instanceof File) {

          formData.append("profile_image", file);
        }
      } /* else {
        toast.error("Aucune image de profil n'a été sélectionnée");
      } */

      await userService.updateProfile(formData);
      toast.success("Profile mise à jour avec succès");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || err;
      ("Une erreur inattendue s'est produite.");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  const formSchemaMp = z.object({
    current_password: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
    password: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
    password_confirmation: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
  });

  const formMp = useForm<z.infer<typeof formSchemaMp>>({
    resolver: zodResolver(formSchemaMp),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  async function changPassword(values: z.infer<typeof formSchemaMp>) {
    try {
      setIsSub(true);
      const formData = new FormData();

      if (values.password !== values.password_confirmation) {
        toast.error("Les mots de passe ne correspondent pas !");
        return false;
      }

      formData.append("password", values.password);
      formData.append("current_password", values.current_password);
      formData.append("password_confirmation", values.password_confirmation);

      await userService.changePassword(formData);
      toast.success("Mot de passe changé avec succès");

      setUser(null);
      Cookies.remove("access_token");
      removeFromLocalStorage("user");
      setTimeout(() => {
        navigate("/connexion");
      }, 1000);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || err;
      ("Une erreur inattendue s'est produite.");
      toast.error(errorMessage);
    } finally {
      setIsSub(false);
    }
  }

  return (
    <section className="max-w-screen-xl mx-auto xl:px-0 px-5">
      <div className="grid lg:grid-cols-6 grid-cols-1 items-start gap-6 xl:pt-36 pt-28 pb-20">
        <div className="bg-white rounded shadow border border-gray-200 lg:col-span-4 px-8 py-8">
          <div className="border-b border-gray-300 pb-3">
            <h3 className="text-marronFonce text-2xl font-medium">
              Mes informations
            </h3>
          </div>
          <Form {...form}>
            <form
             /*  onSubmit={form.handleSubmit(onSubmit)} */
              className="pt-8 space-y-6"
            >
              <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-4 md:space-y-0 space-y-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl className="w-full rounded">
                        <Input
                          className="bg-transparent border-gray-300 text-base placeholder:text-base"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 text-sm font-medium" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl className="w-full rounded">
                        <Input
                          className="bg-transparent border-gray-300 text-base placeholder:text-base"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 text-sm font-medium" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-4 md:space-y-0 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom d'utilisateur</FormLabel>
                      <FormControl className="w-full rounded">
                        <Input
                          className="bg-transparent border-gray-300 text-base placeholder:text-base"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 text-sm font-medium" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl className="w-full rounded">
                        <Input
                          className="bg-transparent border-gray-300 text-base placeholder:text-base"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 text-sm font-medium" />
                    </FormItem>
                  )}
                />
                {/*  <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <PhoneInput
                          {...field}
                          value={field.value || ""}
                          onChange={field.onChange}
                          defaultCountry="FR"
                          placeholder=""
                          className={`input-phone-number-1 ${
                            form.formState.errors.phone_number
                              ? "border-red-600"
                              : "border-border"
                          } bg-transparent border-gray-300 text-base placeholder:text-base`}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                    </FormItem>
                  )}
                /> */}
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-4 md:space-y-0 space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl className="w-full rounded">
                        <Input
                          className="bg-transparent border-gray-300 text-base placeholder:text-base"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 text-sm font-medium" />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl className="w-full rounded">
                        <Input
                          className="bg-transparent border-gray-300 text-base placeholder:text-base"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                    </FormItem>
                  )}
                /> */}
                <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl className="w-full rounded">
                        <SelectTrigger className="bg-transparent border border-gray-300 text-base placeholder:text-base">
                          <SelectValue placeholder="Sélectionner votre genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {genre.map((item) => (
                          <SelectItem value={item} key={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-600 text-sm font-medium" />
                  </FormItem>
                )}
              />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-4 md:space-y-0 space-y-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pays</FormLabel>
                      <FormControl className="w-full rounded">
                        <Input
                          className="bg-transparent border-gray-300 text-base placeholder:text-base"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ville</FormLabel>
                      <FormControl className="w-full rounded">
                        <Input
                          className="bg-transparent border-gray-300 text-base placeholder:text-base"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="profile_image"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Photo de profile</FormLabel>
                    <FormControl className="w-full rounded">
                      <Input
                        type="file"
                        onChange={(event) => {
                          const file = event.target.files
                            ? event.target.files[0]
                            : null;
                          if (file) {
                            onChange(file);
                          } else {
                            toast.error(
                              "Aucune image de profil n'a été sélectionnée"
                            );
                          }
                        }}
                        className="bg-transparent border-gray-300 text-base placeholder:text-base"
                        placeholder="Choisir une image"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm font-medium" />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-4 md:space-y-0 space-y-6">
                <FormField
                  control={form.control}
                  name="adress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse</FormLabel>
                      <FormControl className="w-full rounded">
                        <Input
                          className="bg-transparent border-gray-300 text-base placeholder:text-base"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code postal</FormLabel>
                      <FormControl className="w-full rounded">
                        <Input
                          className="bg-transparent border-gray-300 text-base placeholder:text-base"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  disabled={isSubmitting}
                  onClick={form.handleSubmit(onSubmit)}
                  className="bg-custom-gradient uppercase w-[180px] rounded text-base text-white"
                  type="button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                       Enregistrer...
                    </>
                  ) : (
                    "Enregistrer"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="bg-white rounded shadow border border-gray-200 lg:col-span-2  px-8 py-8">
          <div className="border-b border-gray-300 pb-3">
            <h3 className="text-marronFonce text-2xl font-medium">
              Modifier mon mot de passe
            </h3>
          </div>

          <Form {...formMp}>
            <form
             /*  onSubmit={formMp.handleSubmit(changPassword)} */
              className="pt-8 space-y-6"
            >
              <FormField
                control={formMp.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe actuel</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPasswordCurrent ? "text" : "password"}
                          className="bg-transparent border-gray-300 text-base placeholder:text-base w-full pr-10"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswordCurrent(!showPasswordCurrent)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPasswordCurrent ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage className="text-red-600 text-sm font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={formMp.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouveau mot de passe</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="bg-transparent border-gray-300 text-base placeholder:text-base w-full pr-10"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage className="text-red-600 text-sm font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={formMp.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPasswordConfirm ? "text" : "password"}
                          className="bg-transparent border-gray-300 text-base placeholder:text-base w-full pr-10"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswordConfirm(!showPasswordConfirm)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPasswordConfirm ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage className="text-red-600 text-sm font-medium" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  disabled={isSub}
                  onClick={formMp.handleSubmit(changPassword)}
                  className="bg-custom-gradient uppercase w-[150px] rounded text-base text-white"
                  type="button"
                >
                  {isSub ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      Modifier...
                    </>
                  ) : (
                    "Modifier"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Settings;

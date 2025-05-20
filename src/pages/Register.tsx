import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhoneInput, {
  isValidPhoneNumber /* CountryCode */,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Logo from "../assets/annuaire-ferme.png";
import { Divide, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useFetchCategory from "@/requests/useFetchCategory";
import { Textarea } from "@/components/ui/textarea";
//import CountryList from "../lib/countries.json";
import authService from "@/services/auth.service";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { log } from "console";

const isProfessional = [
  {
    boolean: "1",
    name: "Professionnel",
    value: "professionnel",
  },
  {
    boolean: "0",
    name: "Particulier",
    value: "particulier",
  },
  {
    boolean: "0",
    name: "Artiste",
    value: "artiste",
  },
  {
    boolean: "0",
    name: "Artisan ",
    value: "artisan ",
  },
];

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const { data: listCategory, isLoading: loading } = useFetchCategory();
  const [isOpen, setIsOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate: any = useNavigate();

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const formSchema = z
    .object({
      phone_number: z
        .string()
        .refine((value) => isValidPhoneNumber(value), {
          message: "Le numéro de téléphone n'est pas valide.",
        })
        .optional()
        .default(""),
      email: z
        .string()
        .email("Adresse email invalide.")
        .min(1, "L'email est requis."),
      last_name: z
        .string()
        .min(3, {
          message: "Le nom est requis (minimum 3 caractères)",
        })
        .default(""),
      first_name: z
        .string()
        .min(3, {
          message: "Le prénom est requis (minimum 3 caractères)",
        })
        .default(""),
      company_name: z.string().optional().default(""),
      category_id: z.string().optional().default(""),
      /*  description: z.string().optional().default(""),
      biography: z.string().optional().default(""), */
      title: z.string().optional().default(""),
      type_profile: z.string().min(1, "Vous devez faire un choix").default(""),
      password: z.string().min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      }),
      password_confirmation: z.string().min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      }),
      consentement: z
        .boolean()
        .refine((value) => value, {
          message: "Vous devez accepter les conditions générales d'utilisation",
        })
        .default(false),
    })
    .superRefine((data: any, ctx: any) => {
      if (data.type_profile === "1") {
        if (!data.company_name || data.company_name.trim().length < 2) {
          ctx.addIssue({
            code: "custom",
            path: ["company_name"],
            message: "Le nom de l'entreprise est requise.",
          });
        }
        if (!data.category_id) {
          ctx.addIssue({
            code: "custom",
            path: ["category_id"],
            message: "Vous devez choisir au moins une catégorie.",
          });
        }
        if (!data.title) {
          ctx.addIssue({
            code: "custom",
            path: ["title"],
            message: "La profession est requise",
          });
        }
        /*  if (!data.description || data.description.trim().length < 10) {
          ctx.addIssue({
            code: "custom",
            path: ["description"],
            message: "La description doit contenir au moins 10 caractères.",
          });
        }
        if (!data.biography) {
          ctx.addIssue({
            code: "custom",
            path: ["biography"],
            message: "La biographie est requise",
          });
        } */
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consentement: undefined,
      type_profile: "",
      phone_number: "",
      email: "",
      last_name: "",
      first_name: "",
      company_name: "",
      /* description: "",
      biography: "", */
      title: "",
      category_id: "",
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const consentementValue = values.consentement ? 1 : 0;
      const formData = new FormData();
      formData.append("type_profile", values.type_profile);
      formData.append("phone_number", values.phone_number);
      formData.append("email", values.email);
      formData.append("last_name", values.last_name);
      formData.append("first_name", values.first_name);

      /*  if (values.description) {
        formData.append("description", values.description);
      } */

      if (values.title) {
        formData.append("title", values.title);
      }

      if (values.title) {
        formData.append("company_name", values.company_name);
      }
      /* 
      if (values.biography) {
        formData.append("biography", values.biography);
      } */

      if (values.category_id) {
        formData.append("category_id", String(values.category_id));
      }

      if (values.password !== values.password_confirmation) {
        toast.error("Les mots de passe ne correspondent pas !");
        return false;
      }

      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      formData.append("consentement", consentementValue.toString());

      localStorage.setItem("email", values.email);

      await authService.register(formData);
      /* toast.success("Inscription réussi"); */
      navigate("/redirect");
    } catch (err: any) {
      toast.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto py-6 xl:px-0 px-2">
        <div className="bg-white rounded shadow-2xl px-6 py-6 flex flex-col">
          <div className="flex justify-center">
            <img src={Logo} alt="logo annuaire ferme" className="w-12 h-12" />
          </div>
          <h3 className="text-[30px] font-passionOne font-bold text-center pt-2 pb-4">
            Inscrivez-vous maintenant
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="type_profile"
                render={({ field }) => (
                  <FormItem className="">
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setIsPro(value != "particulier");
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 border border-gray-300 text-base placeholder:text-base">
                          <SelectValue placeholder="Sélectionnez votre profile" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {isProfessional.map((item) => (
                          <SelectItem value={item.value} key={item.name}>
                            {item.name}
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
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="w-full rounded">
                      <Input
                        className="bg-gray-50 border-gray-300 text-base placeholder:text-base"
                        placeholder="Nom"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="w-full rounded">
                      <Input
                        className="bg-gray-50 border-gray-300 text-base placeholder:text-base"
                        placeholder="Prénom"
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
                  <FormItem className="">
                    <FormControl>
                      <PhoneInput
                        {...field}
                        value={field.value || ""}
                        onChange={field.onChange}
                        /*  countries={allCountries} */
                        international={false}
                        defaultCountry="FR"
                        placeholder="Numéro de téléphone"
                        className={`input-phone-number ${
                          form.formState.errors.phone_number
                            ? "border-red-600"
                            : "border-border"
                        } bg-gray-50 border-gray-100 text-base placeholder:text-base`}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="w-full rounded">
                      <Input
                        className="bg-gray-50 border-gray-300 text-base placeholder:text-base"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm font-medium" />
                  </FormItem>
                )}
              />
              {isPro && (
                <div className="is-professional space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="w-full rounded">
                          <Input
                            className="bg-gray-50 border-gray-300 text-base placeholder:text-base"
                            placeholder="Votre profession"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="w-full rounded">
                          <Input
                            className="bg-gray-50 border-gray-300 text-base placeholder:text-base"
                            placeholder="Nom de l'entreprise"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                      </FormItem>
                    )}
                  />
                  {/*  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Décrivez de votre entreprise...."
                            className="bg-gray-50 border border-gray-300 text-base placeholder:text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                      </FormItem>
                    )}
                  />
                <FormField
                control={form.control}
                name="biography"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Votre biographie..."
                        className="bg-gray-50 border border-gray-300 text-base placeholder:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                  </FormItem>
                )}
              /> */}
                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <FormItem className="">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 border border-gray-300 text-base placeholder:text-base">
                              <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            {listCategory?.map((item: any) => (
                              <SelectItem value={item.id} key={item.name}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-600 text-sm font-medium" />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="bg-gray-50 border-gray-300 text-base placeholder:text-base w-full pr-10"
                          placeholder="Entrer votre mot de passe"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage className="text-red-600 text-sm font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPasswordConfirm ? "text" : "password"}
                          className="bg-gray-50 border-gray-300 text-base placeholder:text-base w-full pr-10"
                          placeholder="Confirmer le mot de passe"
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
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage className="text-red-600 text-sm font-medium" />
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={form.control}
                  name="consentement"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl className="border-gray-500 rounded">
                          <Checkbox
                            /*  checked={field.value}
                            onCheckedChange={field.onChange}
                            onClick={openDialog} */
                            checked={form.watch("consentement")}
                            onCheckedChange={() => {}}
                            onClick={(e) => {
                              e.preventDefault();
                              if (form.watch("consentement")) {
                                form.setValue("consentement", false);
                              } else {
                                openDialog();
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-[13px]">
                        En vous inscrivant à l'annuaire du Royaume, vous acceptez nos {" "}
                        <span
                            className="text-marronFonce font-medium"
                            /*  to="#" */
                          >
                            conditions générales d'utilisation
                          </span>{" "} ainsi que notre <span
                            className="text-marronFonce font-medium"
                            /* to="#" */
                          >
                             politique de gestion des données.
                          </span>
                        </FormLabel>
                      </div>
                      <FormMessage className="text-red-600 text-sm font-medium" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                disabled={isSubmitting}
                className="bg-custom-gradient uppercase w-full rounded text-base text-white"
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                    Inscription...
                  </>
                ) : (
                  "Inscription"
                )}
              </Button>
            </form>
          </Form>
          <p className="text-sm font-medium pt-2 text-center">
            Vous avez déja un compte ?{" "}
            <Link
              className="text-marronFonce font-medium underline"
              to="/connexion"
            >
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent className="bg-white max-w-xl rounded-xl border-none">
          <div className="max-h-[450px] overflow-y-auto py-3">
            <div>
              <h3 className="font-passionOne sm:text-[30px] text-[25px]">
                LES CONDITIONS POUR INTÉGRER L'ANNUAIRE
              </h3>
              <p className="sm:text-base text-sm leading-[25px] pt-4">
                ⚠️ Nous respectons tout le monde, quelques soient ses croyances,
                convictions et pratiques. Néanmoins, afin de garantir un espace
                où chacun partage des valeurs communes, il est nécessaire de
                prendre connaissance de ces points. Nous te demandons de
                renoncer à ton inscription si tu ne partages pas tous les
                points.
              </p>
            </div>
            <div className="flex flex-col pt-6 gap-4">
              <p className="sm:text-base text-sm leading-[25px]">
                🔥 Croire en un seul Dieu, existant de toute éternité en trois
                personnes, le Père, le Fils et le Saint-Esprit.
              </p>
              <p className="sm:text-base text-sm leading-[25px]">
                🔥 Croire en Jésus, mort et ressucité afin que nous ayons le
                salut. L'accepter comme Sauveur et Seigneur.
              </p>
              <p className="sm:text-base text-sm leading-[25px]">
                🔥 Croire qu'aucun autre vivant ni mort ne peut être prié ou
                invoqué.
              </p>
              <p className="sm:text-base text-sm leading-[25px]">
                🔥 Croire que la Bible est la Parole de Dieu, infaillible et
                seule norme pour la vie et la foi des chrétiens.
              </p>
              <p className="sm:text-base text-sm leading-[25px]">
                🔥 Croire que le salut s'obtient par la foi.
              </p>
              <p className="sm:text-base text-sm leading-[25px]">
                🔥 S'engager à fournir un service honnête et respectable à nos
                clients, afin d’honorer Dieu et de Le servir avec intégrité.{" "}
              </p>
            </div>
           {/*  <div>
              <h3 className="font-passionOne sm:text-[30px] text-[25px] pt-6">
                Formulaire
              </h3>
              <p className="sm:text-base text-sm leading-[25px]">
                Ce site Web utilise des cookies qui aident le site Web à
                fonctionner et à suivre comment vous interagissez avec lui afin
                que nous puissions vous offrir une expérience utilisateur
                améliorée et personnalisée. Nous n'utiliserons les cookies que
                si vous y consentez en cliquant sur Accepter.{" "}
              </p>
            </div> */}
          </div>

          <div className="flex justify-end gap-6 pt-3">
            <Button
              className="bg-gray-200 hover:opacity-80 w-[100px] rounded text-sm text-black"
              onClick={closeDialog}
            >
              Refuser
            </Button>
            <Button
              className="bg-custom-gradient hover:opacity-80 w-[100px] rounded text-sm text-white"
              onClick={() => {
                form.setValue("consentement", true);
                setIsOpen(false);
              }}
            >
              Accepter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default Register;

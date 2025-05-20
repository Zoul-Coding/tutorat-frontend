import { useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
 // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Logo from "../assets/annuaire-ferme.png";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authService from "@/services/auth.service";
import { userAtom } from "@/atoms/users.atom";
//import { LocalStorage } from "@/lib/utils";
import { useAtom } from "jotai";
import { Loader } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { mutate } from "swr";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const navigate: any = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const formSchema = z.object({
    remember: z.boolean().default(false),
    email: z
      .string()
      .email("Adresse email invalide.")
      .min(1, "L'email est requis."),
    password: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      remember: undefined,
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const rememberValue = values.remember ? 1 : 0;
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("remember", rememberValue.toString());

      const res = await authService.login(formData);
      setUser(res?.data);

      const token = res?.access_token;
     /*  Cookies.set("access_token", token); */

     Cookies.set("access_token", token  , {
        domain: ".annuaireduroyaume.com",
        path: "/", 
        secure: true,
        sameSite: "None"
    });
    const roles = res.data.roles.map((role:any) => role.name);
    Cookies.set('annuaire_id', JSON.stringify(roles) , {
      domain: ".annuaireduroyaume.com",
      path: "/", 
      secure: true,
      sameSite: "None"
  });

      navigate(from, { replace: true });

      if(res?.data?.is_professional) {
        window.location.href = 'https://app.annuaireduroyaume.com';
      }

      mutate("fetch_info_user");
    } catch (err: any) {
      const errorMessage = err?.message || err;
      ("Une erreur inattendue s'est produite.");
      if (err?.status === "not activated") {
        navigate("/redirect");
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="xl:px-0 px-2">
        <div className="bg-white rounded shadow-2xl px-6 py-6 flex flex-col">
          <div className="flex justify-center">
            <img src={Logo} alt="logo annuaire ferme" className="w-12 h-12" />
          </div>
          <h3 className="text-[30px] uppercase font-passionOne font-bold text-center pt-2 pb-4">
            Content de vous revoir
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Email
                    </FormLabel>
                    <FormControl className="w-full rounded">
                      <Input
                        className="bg-gray-50 border-gray-300 text-base placeholder:text-base"
                        placeholder="Entrer votre mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Mot de passe
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="bg-gray-50 border-gray-300 text-base rounded placeholder:text-base w-full pr-10"
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

              <div className="flex items-center gap-6">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 -space-y-1">
                      <FormControl className="border-gray-500 rounded">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm">
                        Se souvenir de moi
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Link
                  className="text-marronFonce text-sm font-medium underline"
                  to="/verifier-email"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                disabled={isSubmitting}
                className="bg-custom-gradient w-full rounded text-base text-white"
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>
          </Form>
          <p className="text-sm font-medium pt-2 text-center">
            Vous n'avez pas de compte ?{" "}
            <Link
              className="text-marronFonce font-medium underline"
              to="/inscription"
            >
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;

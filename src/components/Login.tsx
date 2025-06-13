import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import authService from "@/services/auth.service";
import { useSetAtom } from "jotai";
import { userAtom } from "@/atoms/userStore";
import { userWithStorageAtom } from "@/atoms/userStore";
import { useNavigate, useLocation } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setUser = useSetAtom(userWithStorageAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    try {
      setIsSubmitting(true);
      const response = await authService.login(values);
      const token = response?.token;
      const data = response?.data;

      setUser(data);
      Cookies.set("token", token, { expires: 7 });

      toast.success("Connexion réussie !");
      form.reset();
      /*  window.location.reload(); */
      /* navigate(from, { replace: true }); */
      navigate("/tableau-de-bord");
      /*  window.location.reload(); */
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Erreur de connexion");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-32">
      <div className="bg-white max-w-sm mx-auto rounded-xl py-6 px-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded border border-gray-300"
                      placeholder="exemple@mail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        className="pr-10 rounded border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="text-right text-sm text-gray-600 mb-4">
              <a href="#" className="font-medium hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white hover:opacity-85 rounded"
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

            <div className="text-center text-md text-gray-600 mt-4">
              Pas encore de compte ?{" "}
              <a
                href="/inscription"
                className="text-blue-700 font-medium hover:underline"
              >
                Inscrivez-vous
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Logo from "../assets/annuaire-ferme.png";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/services/http";
import { Loader } from "lucide-react";
import { useAtom } from "jotai";
import { tokenReset } from "@/atoms/users.atom";
import { getFromLocalStorage, removeFromLocalStorage } from "@/lib/utils";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = getFromLocalStorage('tokenReset');
  const navigate: any = useNavigate();

  const formSchema = z.object({
    password: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
    password_confirmation: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      if (values.password !== values.password_confirmation) {
        toast.error("Les mots de passe ne correspondent pas !");
        return false;
      }

      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);

      await api.post(`/admin/reset-password/${token}`, formData);
      removeFromLocalStorage('tokenReset');
      
      toast.success("Mot de passe changé avec succès. Connectez-vous maintenant !");
      setTimeout(() => {
        navigate("/connexion");
      }, 1000);
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

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="xl:px-0 px-2">
        <div className="bg-white rounded shadow-2xl px-6 py-6 flex flex-col">
          <div className="flex justify-center">
            <img src={Logo} alt="logo annuaire ferme" className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold text-center pt-2 pb-4">
          Récupérez votre mot de passe          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entrer le nouveau mot de passe</FormLabel>
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
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
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
              <Button
                disabled={isSubmitting}
                className="bg-custom-gradient w-full rounded text-base text-white"
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                    Réinitialisation...
                  </>
                ) : (
                  "Réinitialisation"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;

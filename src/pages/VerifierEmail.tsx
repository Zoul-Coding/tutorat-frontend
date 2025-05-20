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
import Cookies from "js-cookie";
import { Loader } from "lucide-react";

function VerifierEmail() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  /*  const token = Cookies.get("access_token"); */
  const navigate: any = useNavigate();

  const formSchema = z.object({
    email: z
      .string()
      .email("Adresse email invalide.")
      .min(1, "L'email est requis."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("email", values.email);

      await api.post("/auth/generate-otp", formData);
      
      localStorage.setItem('email', values.email);
      toast.success("Email vérifier avec succès");
      setTimeout(() => {
        navigate("/verifier-code");
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
            Vérifier votre email
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entrer votre email</FormLabel>
                    <FormControl className="w-full rounded">
                      <Input
                        className="bg-gray-50 border-gray-300 text-base rounded w-full"
                        placeholder="Votre email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 font-medium" />
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
                    Envoyer...
                  </>
                ) : (
                  "Envoyer"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default VerifierEmail;

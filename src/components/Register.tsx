import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import authService from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const formSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  prenom: z.string().min(2, "Prénom requis"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(4, "Numéro invalide"),
  password: z.string().min(6, "6 caractères minimum"),
});

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      password: "",
      phone: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      localStorage.setItem("email-verified", values.email);

      const response = await authService.register(values);

      toast.success("Inscription réussie");
      navigate("/verifier-email");
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Erreur lors de l’inscription";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-hero-gradient flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mt-4">Rejoins-nous !</h1>
          <p className="text-gray-600 mt-2">
            Nous le gardons bien entendu pour nous.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded border border-gray-400"
                        placeholder="Tape ton nom ici"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prenom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded border border-gray-400"
                        placeholder="Tape ton prénom ici"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse mail</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded border border-gray-400"
                      placeholder="Tape ton adresse mail ici"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                  <p className="text-sm text-blue-600">
                    Un email vous sera envoyé pour valider cette adresse.
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <PhoneInput
                      country="FR"
                      value={field.value}
                      onChange={field.onChange}
                      className="input w-full rounded border border-gray-400"
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
                    <Input
                      type="password"
                      className="rounded border border-gray-400"
                      placeholder="Ton mot de passe ici"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                disabled={isSubmitting}
                className="bg-primary text-white rounded hover:opacity-85"
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
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

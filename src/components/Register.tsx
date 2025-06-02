import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const step1Schema = z.object({
  firstname: z.string().min(2, "Prénom requis"),
  lastname: z.string().min(2, "Nom requis"),
  email: z.string().email("Adresse email invalide"),
  accepted: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les conditions" }),
  }),
});

const step2Schema = z
  .object({
    phone: z.string().min(4, "Numéro invalide"),
    password: z
      .string()
      .min(8, "8 caractères minimum")
      .regex(/[A-Z]/, "1 majuscule")
      .regex(/[a-z]/, "1 minuscule")
      .regex(/[0-9]/, "1 chiffre")
      .regex(/[^a-zA-Z0-9]/, "1 caractère spécial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const formStep1 = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: { firstname: "", lastname: "", email: "", accepted: false },
  });

  const formStep2 = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: { phone: "", password: "", confirmPassword: "" },
  });

  const handleStep1 = (values: any) => {
    setFormData(values);
    setStep(2);
  };

  const handleStep2 = (values: any) => {
    const fullData = { ...formData, ...values };
    console.log("Final Submitted Data", fullData);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mt-4">
            {step === 1
              ? "Faisons connaissance ! 👋"
              : `${formData.firstname}, la sécurité avant tout 🔐`}
          </h1>
          <p className="text-gray-600 mt-2">
            {step === 1
              ? "Rejoins-nous ! Nous allons t’aider dans chacune des étapes"
              : "Nous le gardons bien entendu pour nous."}
          </p>
        </div>

        {step === 1 && (
          <Form {...formStep1}>
            <form
              onSubmit={formStep1.handleSubmit(handleStep1)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={formStep1.control}
                  name="firstname"
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
                <FormField
                  control={formStep1.control}
                  name="lastname"
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
              </div>
              <FormField
                control={formStep1.control}
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
                control={formStep1.control}
                name="accepted"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        className="text-white"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none text-sm">
                      <FormLabel>
                        J'ai lu et j'accepte les{" "}
                        <a href="#" className="text-blue-600 underline">
                          Conditions Générales d'Utilisation
                        </a>
                      </FormLabel>
                      <FormMessage className="text-red-500" />
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  className="text-white rounded hover:opacity-85"
                  type="submit"
                >
                  Suivant
                </Button>
              </div>
            </form>
          </Form>
        )}

        {step === 2 && (
          <Form {...formStep2}>
            <form
              onSubmit={formStep2.handleSubmit(handleStep2)}
              className="space-y-4"
            >
              <FormField
                control={formStep2.control}
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
                control={formStep2.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded border border-gray-400"
                        placeholder="Ton mot de passe ici"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                      <span className="bg-gray-100 font-medium border rounded px-2 py-1">
                        8 caractères minimum
                      </span>
                      <span className="bg-gray-100 font-medium border rounded px-2 py-1">
                        1 majuscule
                      </span>
                      <span className="bg-gray-100 font-medium border rounded px-2 py-1">
                        1 minuscule
                      </span>
                      <span className="bg-gray-100 font-medium border rounded px-2 py-1">
                        1 chiffre
                      </span>
                      <span className="bg-gray-100 font-medium border rounded px-2 py-1">
                        caractère spécial
                      </span>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={formStep2.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme ton mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded border border-gray-400"
                        placeholder="Ton mot de passe ici"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  className="text-white rounded hover:opacity-85"
                  type="submit"
                >
                  Enregistrer et continuer
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}

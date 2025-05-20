import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Link, useNavigate } from "react-router-dom";
import authService from "@/services/auth.service";
import { Loader } from "lucide-react";
import { api } from "@/services/http";

function RedirectRegister() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const navigate: any = useNavigate();

  const formSchema = z.object({
    otp: z.string().min(6, {
      message: "Votre code à usage unique doit comporter 6 caractères..",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("otp", values.otp);

      await authService.verifyEmail(formData);
      localStorage.removeItem("email");

      toast.success("Votre compte a été créé avec succès. Connectez-vous maintenant !");
      setTimeout(() => {
        navigate("/connexion");
      }, 1000);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || err;
      ("Une erreur inattendue s'est produite.");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onResetCode() {
    try {
      setIsSub(true);
      const formData = new FormData();
      const mail = localStorage.getItem("email") || "";
      formData.append("email", mail);

      await api.post("/auth/generate-otp", formData);
      toast.success("Code renvoyé avec succès");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Une erreur inattendue s'est produite.";
      toast.error(errorMessage);
    } finally {
      setIsSub(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-screen-md xl:px-0 px-5 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <img src="" alt="" />
          <h3 className="md:text-4xl text-3xl font-bold uppercase text-center">
            Merci pour votre inscription !
          </h3>
          <p className="text-base text-center">
            Nous venons d'envoyer un e-mail avec un code. Consultez votre boîte
            de réception ou spam et saisissez le code pour valider votre inscription à
            notre plateforme.
          </p>
        </div>
        <div className="flex flex-col items-center mx-auto gap-3 pt-6">
  <Form {...form}>
    <form className="w-full max-w-md flex flex-col items-center sm:space-y-8 space-y-4">
      <FormField
        control={form.control}
        name="otp"
        render={({ field }) => (
          <FormItem className="flex flex-col items-center w-full">
            <FormLabel className="text-md font-medium text-center w-full">
              Saisir le code
            </FormLabel>
            <FormControl className="flex justify-center w-full">
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup className="flex justify-center gap-2">
                  <InputOTPSlot className="w-12 h-12  border-2 border-gray" index={0} />
                  <InputOTPSlot className="w-12 h-12  border-2 border-gray" index={1} />
                  <InputOTPSlot className="w-12 h-12 border-2 border-gray" index={2} />
                  <InputOTPSlot className="w-12 h-12 border-2 border-gray" index={3} />
                  <InputOTPSlot className="w-12 h-12 border-2 border-gray" index={4} />
                  <InputOTPSlot className="w-12 h-12 border-2 border-gray" index={5} />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
            <FormMessage className="text-red-600 font-medium text-center w-full" />
          </FormItem>
        )}
      />

      <div className="flex justify-center gap-3">
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-custom-gradient text-white font-medium rounded px-6 py-0 h-12 text-md"
          type="submit"
        >
          {isSubmitting ? (
            <>
              <Loader className="text-white mr-2 h-4 w-4 animate-spin" />
              <p className="text-white text-md font-medium">
                Vérification...
              </p>
            </>
          ) : (
            "Vérifier"
          )}
        </Button>
        <Button
          onClick={onResetCode}
          disabled={isSub}
          className="bg-gray-200 text-black font-medium rounded px-6 py-0 h-12 text-md"
          type="submit"
        >
          {isSub ? (
            <>
              <Loader className="text-black mr-2 h-4 w-4 animate-spin" />
              <p className="text-black text-md font-medium">
                En cours...
              </p>
            </>
          ) : (
            "Renvoyer le code"
          )}
        </Button>
      </div>
    </form>
  </Form>
  <div className="w-full max-w-md px-4">
    <a
      href="https://www.tcommtoi.fr/packjuridique"
      target="_blank"
      className="flex justify-center items-center bg-custom-gradient uppercase rounded md:text-base text-sm text-white font-medium w-full px-6 py-3"
    >
      Télécharge ton pack de document légaux
    </a>
  </div>
</div>
      </div>
    </div>
  );
}

export default RedirectRegister;

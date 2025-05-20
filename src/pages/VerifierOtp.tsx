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
import { setToLocalStorage } from "@/lib/utils";

function VerifierOtp() {
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

      const response = await authService.verifyOtp(formData);
      setToLocalStorage("tokenReset", response?.data.token);

      toast.success("Le code a été validé avec succès. Veuillez maintenant choisir un nouveau mot de passe.");
      localStorage.removeItem("email");
      setTimeout(() => {
        navigate("/requiperer-mot-de-passe");
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
        <div className="flex flex-col mx-auto gap-3 pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium">
                    Veuillez saisir le code que nous vous avons envoyé par email.
                    </FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="w-12 h-12  border-2 border-gray"/>
                          <InputOTPSlot index={1} className="w-12 h-12  border-2 border-gray"/>
                          <InputOTPSlot index={2} className="w-12 h-12  border-2 border-gray"/>
                          <InputOTPSlot index={3} className="w-12 h-12  border-2 border-gray"/>
                          <InputOTPSlot index={4} className="w-12 h-12  border-2 border-gray"/>
                          <InputOTPSlot index={5} className="w-12 h-12  border-2 border-gray"/>
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage className="text-red-600 font-medium" />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-6">
                <Button
                  disabled={isSubmitting}
                  className="bg-custom-gradient text-white font-medium rounded px-6 py-3 text-md"
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
                  className="bg-gray-200 text-black font-medium rounded px-6 py-3 text-md"
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
        </div>
      </div>
    </div>
  );
}

export default VerifierOtp;

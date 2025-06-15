import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import authService from "@/services/auth.service";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Le code doit contenir 6 chiffres.",
  }),
});

export function OtpVerification() {
  const emailVerified = localStorage.getItem("email-verified") || "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);

      const payload = {
        otp: data.otp,
        email: emailVerified,
      };

      const response = await authService.verifyEmail(payload);

      toast.success("Code vérifié avec succès !");
      localStorage.removeItem("email-verified");
      navigate("/connexion");
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Erreur de vérification.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <div className="bg-hero-gradient flex items-center justify-center h-screen">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white space-y-6 px-6 py-6 rounded-xl w-[440px]"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code de vérification</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Entre le code reçu par email pour confirmer ton adresse.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="text-white w-full rounded hover:opacity-85 bg-primary"
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Vérification...
              </>
            ) : (
              "Confirmer"
            )}
          </Button>
        </form>
      </div>
    </Form>
  );
}

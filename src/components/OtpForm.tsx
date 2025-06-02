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

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Le code doit contenir 6 chiffres.",
  }),
});

export function OtpVerification() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success("Code vérifié avec succès !", {
      description: `Code : ${data.otp}`,
    });
  }

  return (
    <Form {...form}>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white space-y-6 px-6 py-6 rounded-xl"
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
            className="text-white w-full rounded hover:opacity-85"
            type="submit"
          >
            Confirmer
          </Button>
        </form>
      </div>
    </Form>
  );
}

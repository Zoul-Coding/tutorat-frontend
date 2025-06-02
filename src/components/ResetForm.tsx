import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

// --- Validation Schema ---
const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

// --- Types ---
type LoginSchema = z.infer<typeof loginSchema>;

type LoginProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

// --- Fake API ---
const fakeLogin = async (data: LoginSchema): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Connexion réussie :", data);
      resolve({ success: true });
    }, 1000);
  });
};

const ResetForm = ({ open, setOpen }: LoginProps) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    const response = await fakeLogin(values);
    if (response.success) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle>Réinitialiser votre mot de passe</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email associé à votre compte</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded border border-gray-300"
                      placeholder="Tape ton mail ici"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-3 pt-6">
              <Button
                type="submit"
                className="w-full text-white hover:opacity-85 rounded"
              >
                Réinitialiser le mot de passe
              </Button>
              <Button
                onClick={() => setOpen(false)}
                type="submit"
                className="bg-transparent w-full border border-gray-400 text-black hover:bg-gray-400 rounded"
              >
                Annuler
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ResetForm;

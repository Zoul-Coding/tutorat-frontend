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

const Login = ({ open, setOpen }: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
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
          <DialogTitle>Connexion</DialogTitle>
          <DialogDescription>Connectez-vous à votre compte</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              className="w-full text-white hover:opacity-85 rounded"
            >
              Se connecter
            </Button>

            <div className="text-center text-md text-gray-600 mt-4">
              Pas encore de compte ?{" "}
              <a href="/inscription" className="text-blue-700 font-medium hover:underline">
                Inscrivez-vous
              </a>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;

import { useState, useEffect } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import annonceService from "@/services/annonce.service";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { mutate } from "swr";
import useFetchAnnonceById from "@/requests/useFetchAnnonceById";

const niveaux = ["Prépa", "Lycée", "Collège", "Primaire"];
const lieux = ["En ligne", "À domicile"];

const AnnonceSchema = z.object({
  matiere: z.string().min(2, "La matière est requise"),
  niveau: z.string().min(2, "Le niveau est requis"),
  titre: z.string().min(5, "Le titre doit contenir au moins 5 mots"),
  introduction: z.string().min(10, "L'introduction est requise"),
  lieu: z.string().min(2, "Ce champ est requis"),
  tarif: z.string().min(2, "Le tarif est requis"),
  methodologie: z.string().min(10, "La méthodologie est requise"),
});

type FormAUpdatennonceProps = {
  openSheet: boolean;
  setOpenSheet: (open: boolean) => void;
  annonceId: string | null;
};

export default function FormUpdateAnnonce({
  openSheet,
  setOpenSheet,
  annonceId,
}: FormAUpdatennonceProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
    console.log("id de l'annonce sur la page form", annonceId);
  const { data: userAnnonces } = useFetchAnnonceById(annonceId);
  console.log(userAnnonces);
  

  const form = useForm({
    resolver: zodResolver(AnnonceSchema),
    defaultValues: {
      matiere: "",
      niveau: "",
      titre: "",
      introduction: "",
      lieu: "",
      tarif: "",
      methodologie: "",
    },
  });

  useEffect(() => {
    if (userAnnonces?.titre) {
      form.reset({
        matiere: userAnnonces?.matiere || "",
        niveau: userAnnonces?.niveau || "",
        titre: userAnnonces?.titre || "",
        introduction: userAnnonces?.introduction || "",
        lieu: userAnnonces?.lieu || "",
        tarif: userAnnonces?.tarif || "",
        methodologie: userAnnonces?.methodologie || "",
      });
    }
  }, [userAnnonces]);

  type AnnonceFormData = z.infer<typeof AnnonceSchema>;

  const onSubmit = async (data: AnnonceFormData) => {
    setIsSubmitting(true);

    try {
      const response = await annonceService.updateAnnonce(annonceId!, data);
      toast.success(response?.message);
      form.reset();
      mutate("fetch_user_annonce");
      setOpenSheet(false);
    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.message || error;
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent style={{ maxWidth: "40vw" }} className="bg-white py-0">
        <SheetHeader className="fixed w-full py-4 bg-white z-10">
          <SheetTitle className="font-bold">Modifier l'annonce</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="overflow-auto max-h-full space-y-6 pt-16 pb-6"
          >
            <FormField
              control={form.control}
              name="matiere"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matière</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded border border-gray-400"
                      placeholder="ex: Mathématiques"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="niveau"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="rounded border border-gray-400">
                        <SelectValue placeholder="Sélectionne un niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        {niveaux.map((niveau) => (
                          <SelectItem
                            className="bg-white"
                            key={niveau}
                            value={niveau}
                          >
                            {niveau}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="titre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre de l'annonce</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded border border-gray-400"
                      placeholder="Un titre accrocheur..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Introduction</FormLabel>
                  <FormControl>
                    <Textarea
                      className="rounded border border-gray-400"
                      placeholder="Présente-toi et ton offre..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lieu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Où enseigner ?</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="rounded border border-gray-400">
                        <SelectValue placeholder="Sélectionne un lieu" />
                      </SelectTrigger>
                      <SelectContent>
                        {lieux.map((lieu) => (
                          <SelectItem
                            className="bg-white"
                            key={lieu}
                            value={lieu}
                          >
                            {lieu}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tarif"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tarif (€ / heure)</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded border border-gray-400"
                      type="number"
                      placeholder="ex: 25"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="methodologie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Méthodologie</FormLabel>
                  <FormControl>
                    <Textarea
                      className="rounded border border-gray-400"
                      placeholder="Décris ta manière d'enseigner..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />

            <Button
              disabled={isSubmitting}
              type="submit"
              className="flex items-center justify-center rounded hover:opacity-85 w-32 bg-primary text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader className="texte white h-5 w-5 animate-spin" />
                </>
              ) : (
                "Enregistrer"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

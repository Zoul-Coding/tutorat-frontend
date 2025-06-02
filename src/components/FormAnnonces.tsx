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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const niveaux = ["Prépa", "Lycée", "Collège", "Primaire"];
const lieux = ["En ligne", "À domicile"];

const AnnonceSchema = z.object({
  matiere: z.string().min(1, "La matière est requise"),
  niveau: z.string().min(1, "Le niveau est requis"),
  titre: z.string().min(14, "Le titre doit contenir au moins 14 mots"),
  introduction: z.string().min(10, "L'introduction est requise"),
  lieu: z.string().min(1, "Ce champ est requis"),
  tarif: z.string().min(1, "Le tarif est requis"),
  methodologie: z.string().min(10, "La méthodologie est requise"),
});

type FormAnnoncesProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function FormAnnonces({ open, setOpen } : FormAnnoncesProps) {
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

  const onSubmit = (data:any) => {
    console.log("Annonce soumise:", data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white rounded-xl max-w-xl overflow-auto max-h-[600px]">
        <DialogHeader>
          <DialogTitle>Créer une annonce</DialogTitle>
          <DialogDescription>Remplis les champs ci-dessous pour publier ton annonce.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="matiere"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matière</FormLabel>
                  <FormControl>
                    <Input  className="rounded border border-gray-400" placeholder="ex: Mathématiques" {...field} />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger                         className="rounded border border-gray-400"
>
                        <SelectValue placeholder="Sélectionne un niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        {niveaux.map((niveau) => (
                          <SelectItem key={niveau} value={niveau}>{niveau}</SelectItem>
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
                    <Input                         className="rounded border border-gray-400"
 placeholder="Un titre accrocheur..." {...field} />
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
                    <Textarea                         className="rounded border border-gray-400"
 placeholder="Présente-toi et ton offre..." {...field} />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger                         className="rounded border border-gray-400"
>
                        <SelectValue placeholder="Sélectionne un lieu" />
                      </SelectTrigger>
                      <SelectContent>
                        {lieux.map((lieu) => (
                          <SelectItem key={lieu} value={lieu}>{lieu}</SelectItem>
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
                    <Input                         className="rounded border border-gray-400"
 type="number" placeholder="ex: 25" {...field} />
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
                    <Textarea                         className="rounded border border-gray-400"
 placeholder="Décris ta manière d'enseigner..." {...field} />
                  </FormControl>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />

            <Button type="submit" className="rounded hover:opacity-85 w-full bg-primary text-white">Publier l'annonce</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 

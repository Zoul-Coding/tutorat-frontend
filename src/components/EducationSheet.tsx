import { useState } from "react";
import { any, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetchInfoUser from "@/requests/useFetchUserInfos";
import certificatService from "@/services/certificat.service";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { mutate } from "swr";

const months = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];
const years = Array.from({ length: 2035 - 1960 + 1 }, (_, i) =>
  (2035 - i).toString()
);

const FormSchema = z.object({
  schoolName: z.string().min(2, "Champ requis"),
  diplome: z.string().min(2, "Champ requis"),
  domaine: z.string().min(2, "Champ requis"),
  startMonth: z.string(),
  startYear: z.string(),
  endMonth: z.string(),
  endYear: z.string(),
  description: z.string().optional(),
});

export function EducationSheet() {
  const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: userInfos } = useFetchInfoUser();
    const userId = userInfos?._id;  
  
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      schoolName: "",
      diplome: "",
      domaine: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      description: "",
    },
  });



  type CertificatFormData = z.infer<typeof FormSchema>;
 
   const onSubmit = async (data: CertificatFormData) => {
     setIsSubmitting(true);
 
     try {
 
       const payload = {
       ...data,
       userId: userId,
     };
 
       const response = await certificatService.createCertificat(payload);
       toast.success(response?.message);
       form.reset();
       /*  mutate("fetch_user_annonce"); */
       setOpen(false);
     } catch (error: any) {
       console.error(error);
       const errorMessage = error?.message || error;
       toast.error(errorMessage);
     } finally {
       setIsSubmitting(false);
     }
   };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-transparent border border-gray-400 rounded text-black px-4 py-2 hover:bg-gray-400">
          Ajouter
        </Button>
      </SheetTrigger>
      <SheetContent
        style={{ maxWidth: "40vw" }}
        className="bg-white py-0"
      >
        <SheetHeader className="fixed w-full py-4 bg-white z-10">
          <SheetTitle>
            Certificat de scolarité / carte étudiante / diplôme 🎓
          </SheetTitle>
          <SheetDescription>
            Ajoute les infos sur ta formation.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="overflow-auto max-h-full space-y-6 pt-28 pb-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="schoolName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l’établissement 🏫</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded border border-gray-400"
                        placeholder="ex: HEC, Sorbonne..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diplome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diplôme obtenu</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded border border-gray-400"
                        placeholder="ex: Master, Licence..."
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
              name="domaine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domaine d’études</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded border border-gray-400"
                      placeholder="ex: Informatique, Finance..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div>
              <p className="text-sm font-medium pb-2">Date de début</p>
              <div className="grid grid-cols-2 gap-4 items-center">
                <FormField
                  control={form.control}
                  name="startMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="rounded border border-gray-400">
                            <SelectValue placeholder="Mois" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {months.map((m) => (
                              <SelectItem key={m} value={m}>
                                {m}
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
                  name="startYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="rounded border border-gray-400">
                            <SelectValue placeholder="Année" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {years.map((y) => (
                              <SelectItem key={y} value={y}>
                                {y}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium pb-2">
                Date de fin (ou prévue)
              </p>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="endMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="rounded border border-gray-400">
                            <SelectValue placeholder="Mois" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {months.map((m) => (
                              <SelectItem key={m} value={m}>
                                {m}
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
                  name="endYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="rounded border border-gray-400">
                            <SelectValue placeholder="Année" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {years.map((y) => (
                              <SelectItem key={y} value={y}>
                                {y}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descriptif de ta formation 📝</FormLabel>
                  <FormControl>
                    <Textarea
                      className="rounded border border-gray-400"
                      placeholder="Ajoute une description ici..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

           <Button
              disabled={isSubmitting}
              className="text-white rounded hover:opacity-85"
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <Loader className="texte white h-5 w-5 animate-spin" />
                </>
              ) : (
                " Créer"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

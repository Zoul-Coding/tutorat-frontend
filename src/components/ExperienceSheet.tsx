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

const typeDemploi = [
  "CDI",
  "CDD",
  "Stage",
  "Alternance",
  "Freelance",
  "Bénévolat",
  "Autre",
];

const years = Array.from({ length: 2035 - 1960 + 1 }, (_, i) =>
  (2035 - i).toString()
);

const FormSchema = z.object({
  schoolName: z.string().min(2, "Champ requis"),
  degree: z.string().min(2, "Champ requis"),
  field: z.string().min(2, "Champ requis"),
  startMonth: z.string(),
  startYear: z.string(),
  endMonth: z.string(),
  endYear: z.string(),
  description: z.string().optional(),
});

export function ExperienceSheet() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      schoolName: "",
      degree: "",
      field: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      description: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Soumis:", data);
    setOpen(false);
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
        className=" bg-white py-0"
      >
        <SheetHeader className="fixed w-full py-4 bg-white z-10">
          <SheetTitle>Expériences professionnelles 🏢</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="overflow-auto space-y-6 pt-10"
          >
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Intitulé du poste</p>
              <FormField
                control={form.control}
                name="schoolName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intitulé du poste</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded border border-gray-400"
                        placeholder="ex: Intutilé du poste"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d'emploi</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="rounded border border-gray-400">
                          <SelectValue placeholder="Type d'emploi" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {typeDemploi.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
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

            <div>
              <p className="text-sm font-bold pb-4">
                Dates d'occupation du poste
              </p>
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
                          <SelectContent>
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
              <p className="text-sm font-bold pb-2">
                Description de l'expérience
              </p>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
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
            </div>

            <Button
              className="text-white rounded hover:opacity-85"
              type="submit"
            >
              Créer
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

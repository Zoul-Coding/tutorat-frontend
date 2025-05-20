import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import "react-phone-number-input/style.css";
import { Input } from "@/components/ui/input";
import Logo from "../assets/annuaire-ferme.png";
import { Link, useNavigate } from "react-router-dom";
import useFetchCategory from "@/requests/useFetchCategory";
import professionnelService from "@/services/professionnel.service";
import { Loader } from "lucide-react";
import { toast } from "sonner";

function ProfessionnelForm() {
  const { data: listCategory, isLoading: loading } = useFetchCategory();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    company_name: z
      .string()
      .min(1, "La compagnie est requis")
      .default(""),
    description: z
      .string()
      .min(8, "La description est requise, minimum 8 caractères")
      .default(""),
    category_id: z.string().min(1, "Le catégorie est requis").default(""),
    title: z.string().min(1, "Le titre est requis").default(""),
    biography: z.string().min(1, "La biographie est requis").default(""),
    facebook: z.string().optional().default(""),
    whatsapp: z.string().optional().default(""),
    instagram: z.string().optional().default(""),
    linkedin: z.string().optional().default(""),
    website: z.string().url("Veuillez entrer une URL valide").optional(),
    social_links: z.array(z.string().optional()).optional().default([]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      description: "",
      title: "",
      biography: "",
      category_id: "",
      website: "",
      facebook: "",
      whatsapp: "",
      instagram: "",
      linkedin: "",
      social_links: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("biography", values.biography);
      formData.append("company_name", values.company_name);

      if (values.description) {
        formData.append("description", values.description);
      }

      if (values.category_id) {
        formData.append("category_id", String(values.category_id));
      }

      if (values.website) {
        formData.append("website", values.website);
      }

      const socialLinks = [
        { name: "linkedin", link: values.linkedin || "" },
        { name: "facebook", link: values.facebook || "" },
        { name: "whatsapp", link: values.whatsapp || "" },
        { name: "instagram", link: values.instagram || "" },
      ];

      /* socialLinks.forEach((link) => { */
        formData.append("social_link", JSON.stringify(JSON.stringify(socialLinks)));
    /*   }); */

      await professionnelService.becomeProfessional(formData);
      form.reset();
      toast.success("Demande envoyé avec succès");
    } catch (err: any) {
      toast.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="max-w-screen-sm mx-auto pt-36 pb-20 xl:px-0 px-5">
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white px-6 py-6 rounded shadow space-y-6">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="w-full rounded">
                      <Input
                        className="bg-gray-50 border-gray-200 py-6 text-base placeholder:text-base"
                        placeholder="Titre"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="w-full rounded">
                      <Input
                        className="bg-gray-50 border-gray-200 py-6 text-base placeholder:text-base"
                        placeholder="Nom de l'entreprise"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem className="">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 border border-gray-200 py-6 rounded text-base placeholder:text-base">
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {listCategory?.map((item: any) => (
                          <SelectItem value={item.id} key={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-600 text-sm font-normal" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="w-full rounded">
                      <Input
                        className="bg-gray-50 border-gray-200 py-6 text-base placeholder:text-base"
                        placeholder="Lien de votre site web"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm font-normal" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="w-full rounded">
                      <Input
                        className="bg-gray-50 border-gray-200 py-6 text-base placeholder:text-base"
                        placeholder="Entrer un lien facebook"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm font-normal" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="w-full rounded">
                      <Input
                        className="bg-gray-50 border-gray-200 py-6 text-base placeholder:text-base"
                        placeholder="Entrer un lien linkedin"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm font-normal" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="w-full rounded">
                      <Input
                        className="bg-gray-50 border-gray-200 py-6 text-base placeholder:text-base"
                        placeholder="Entrer un lien whatsapp"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm font-normal" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="w-full rounded">
                      <Input
                        className="bg-gray-50 border-gray-200 py-6 text-base placeholder:text-base"
                        placeholder="Entrer un lien instagram"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm font-normal" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="biography"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Biographie"
                        className="bg-gray-50 border border-gray-200 text-base placeholder:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        className="bg-gray-50 border border-gray-200 text-base placeholder:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 font-normal text-sm pt-1 py-1" />
                  </FormItem>
                )}
              />

              <Button
                disabled={isSubmitting}
                className="bg-custom-gradient uppercase w-full rounded text-base text-white"
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                    Envoyer...
                  </>
                ) : (
                  "Envoyer"
                )}
              </Button>
            </form>
          </Form>
        </div>
    </section>
  );
}

export default ProfessionnelForm;

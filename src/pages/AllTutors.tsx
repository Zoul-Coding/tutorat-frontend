import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Profile from "../../public/assets/profile.jpg";
import { School, Heart, MoveRight } from "lucide-react";
import { HiBadgeCheck } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const tutors = [
    {
      image: Profile,
      school: "SCG Business School",
      name: "Augustine",
      localisation: "Cotonou",
      disponibilite: "En ligne, À domicile",
      price: "26,60",
      star: "4,72",
      description:
        "Diplômée de l’ESCP et ancienne élève de classe préparatoire donne cours d’anglais tous niveaux...",
    },
    {
      image: Profile,
      school: "SCG Business School",
      name: "Augustine",
      localisation: "Cotonou",
      disponibilite: "En ligne, À domicile",
      price: "26,60",
      star: "4,72",
      description:
        "Diplômée de l’ESCP et ancienne élève de classe préparatoire donne cours d’anglais tous niveaux...",
    },
    {
      image: Profile,
      school: "SCG Business School",
      name: "Augustine",
      localisation: "Cotonou",
      disponibilite: "En ligne, À domicile",
      price: "26,60",
      star: "4,72",
      description:
        "Diplômée de l’ESCP et ancienne élève de classe préparatoire donne cours d’anglais tous niveaux...",
    },
    {
      image: Profile,
      school: "SCG Business School",
      name: "Augustine",
      localisation: "Cotonou",
      disponibilite: "En ligne, À domicile",
      price: "26,60",
      star: "4,72",
      description:
        "Diplômée de l’ESCP et ancienne élève de classe préparatoire donne cours d’anglais tous niveaux...",
    },
  ];

const AllTutors = () => {
  const formSchema = z.object({
    search: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(values: any) {
    try {
      const redirectURL = "/recherche";
      form.reset();
    } catch (err) {}
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      form.handleSubmit(onSubmit);
    }
  };

  return (
    <section className="pt-20 md:pt-16">
      <div className="bg-hero-gradient-2 xl:px-0 px-2 py-12">
        <div className="max-w-screen-xl mx-auto xl:px-0 px-4">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold text-primary">
              Tous les Tuteurs
            </h1>
            <p className="text-gray-600">
              Découvrez nos tuteurs disponibles pour vous aider dans vos études.
            </p>
          </div>
          <div className="pt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex md:flex-row flex-col items-center gap-4 bg-white shadow-md rounded-xl px-4 py-4"
              >
                <div className="flex md:flex-row flex-col items-center gap-4 w-full">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="search"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              /* onKeyDown={handleKeyDown} */
                              className="w-full h-12 border border-gray-300 font-bold text-base focus:outline-none focus:shadow-none leading-[20.16px] rounded-xl"
                              placeholder="Chercher une matière : anglais, maths, et plus ..."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="search"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              /* onKeyDown={handleKeyDown} */
                              className="w-full h-12 border border-gray-300 font-bold text-base focus:outline-none focus:shadow-none leading-[20.16px] rounded-xl"
                              placeholder="Adresse, ville..."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button className="md:w-44 w-full text-white rounded-xl h-12 hover:opacity-85">
                  Rechercher
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto grid grid-cols-8 w-full gap-6 pt-12 pb-12">
        <div className="col-span-2 w-full">
          <h2 className="font-bold text-2xl">Filtres</h2>
          <div className="flex flex-col gap-3 pt-6">
            <h2 className="font-medium text-1xl">Lieux du cours</h2>
            <RadioGroup defaultValue="indiferent" className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="indiferent" className="" />
                <Label className="text-base font-normal" htmlFor="r1">
                  Indiferent
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="En ligne" />
                <Label className="text-base font-normal" htmlFor="r2">
                  En ligne
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="a-domicile" />
                <Label className="text-base font-normal" htmlFor="r3">
                  À domicile
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <h2 className="font-medium text-1xl">Niveau</h2>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox className="h-6 w-6 text-white" />
                <label
                  htmlFor="terms"
                  className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Primaire
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox className="h-6 w-6 text-white" />
                <label
                  htmlFor="terms"
                  className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Collège
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox className="h-6 w-6 text-white" />
                <label
                  htmlFor="terms"
                  className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Lycée
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox className="h-6 w-6 text-white" />
                <label
                  htmlFor="terms"
                  className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Prépa
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox className="h-6 w-6 text-white" />
                <label
                  htmlFor="terms"
                  className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Supérieur
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <h2 className="font-medium text-1xl">Disponibilités</h2>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox className="h-6 w-6 text-white" />
                <label
                  htmlFor="terms"
                  className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Matin
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox className="h-6 w-6 text-white" />
                <label
                  htmlFor="terms"
                  className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Entre 12h et 17h
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox className="h-6 w-6 text-white" />
                <label
                  htmlFor="terms"
                  className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Soir après 17h
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <h2 className="font-medium text-1xl">Genre</h2>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox className="h-6 w-6 text-white" />
                <label
                  htmlFor="terms"
                  className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >   
                    Indifférent
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox className="h-6 w-6 text-white" />
                <label
                  htmlFor="terms"
                  className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Homme
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox className="h-6 w-6 text-white" />
                <label
                  htmlFor="terms"
                  className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Femme
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 col-span-6 sm:grid-cols-2 grid-cols-1 gap-8 xl:px-0 px-2">
        {tutors.map((tutor, index) => (
          <Link to="#" key={index} className="hover:bg-card rounded-xl h-100">
            <Card
              className="border-none shadow-none bg-transparent"
            >
              <div className="relative">
                <img
                  className="w-full md:h-[250px] h-full rounded-xl"
                  src={tutor.image}
                  alt={tutor.name}
                />
                <div className="absolute top-0 flex justify-between w-full items-center px-4 py-4">
                  <div className="flex items-center w-44 gap-2 bg-black/80 rounded-full px-1 py-1">
                    <div className="bg-white rounded-full px-1 py-1">
                      <School className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-white">{tutor.school}</p>
                  </div>
                  <div className="bg-black/80 rounded-full px-2 py-2">
                    <Heart className="text-white w-5 h-5" />
                  </div>
                </div>
              </div>
              <CardContent className="px-4 py-4">
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl font-bold">
                        {tutor.name}
                      </CardTitle>
                      <HiBadgeCheck className="w-5 h-5" />
                    </div>
                    <p className="text-gray-500 text-sm font-medium">
                      {tutor.localisation}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500 w-5 h-5" />
                    <CardTitle className="text-md">
                      {tutor.star}{" "}
                      <span className="text-gray-500">(4 avis)</span>
                    </CardTitle>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-3">
                  <CardDescription className="text-gray-700 text-sm">
                    {tutor.description}
                  </CardDescription>
                  <p className="text-gray-500 text-sm font-medium">
                    {tutor.disponibilite}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full pt-3">
                  <p className="text-sm">
                    À partir de <strong>{tutor.price}</strong>{" "}
                    <strong>€/</strong>{" "}
                    <strong className="text-gray-500">h</strong>
                  </p>
                  <Link
                    to="#"
                    className="bg-primary px-4 py-2 text-white text-[14px] font-medium rounded hover:opacity-85"
                  >
                    Contacter
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
};

export default AllTutors;

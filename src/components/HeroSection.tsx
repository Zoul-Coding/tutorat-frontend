import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  const navigate = useNavigate();

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
      navigate(`${redirectURL}?search=${values.search}`);
      form.reset();
    } catch (err) {}
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      form.handleSubmit(onSubmit);
    }
  };

  return (
    <section className="md:pt-28 pt-20 xl:px-0 px-2">
      <div className="max-w-screen-xl mx-auto bg-hero-gradient rounded-3xl bg-cover w-full xl:px-0 px-6 md:py-16 py-10">
        <div className="flex flex-col justify-center items-center gap-6 text-center">
          <h1 className="text-white font-bold md:text-5xl text-3xl md:w-[50%]">
            Trouve le bon tuteur pour réussir !︎
          </h1>
          <p className="text-gray-400 md:text-base text-sm md:w-[40%]">
            Rejoins une communauté d’élèves et de parents à la recherche de
            tuteurs qualifiés. Trouve un accompagnement personnalisé selon la
            matière, la localisation et la disponibilité des tuteurs.
          </p>
        </div>
        <div className="pt-12">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-screen-sm mx-auto flex md:flex-row flex-col items-center gap-4 bg-white rounded-xl px-4 py-4"
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
                            className="w-full h-12 border-gray-400 border-2 text-base focus:outline-none focus:shadow-none leading-[20.16px] rounded-xl"
                            placeholder="Matière"
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
                            className="w-full h-12 border-gray-400 border-2 text-base focus:outline-none focus:shadow-none leading-[20.16px] rounded-xl"
                            placeholder="Adresse ou ville"
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
    </section>
  );
};

export default HeroSection;

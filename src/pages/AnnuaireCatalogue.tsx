import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BiSearchAlt2 } from "react-icons/bi";
import LastProfile from "../components/LastProfile";
import LastProduct from "../components/LastProduct";
import LastEvenment from "../components/LastEvenment";
import LastService from "@/components/LastService";
import AnnonceCarrousel from "@/components/AnnonceCarrousel";
import { Link, useNavigate } from "react-router-dom";

const AnnuaireCatalogue = () => {
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

  const words = ["professionnel", "produit", "service"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section>
      <div className="max-w-screen-xl mx-auto xl:px-0 px-5 flex flex-col gap-12 justify-center items-center md:pt-44 pt-24">
        <div className="flex flex-col md:gap-2 gap-3">
          {/*  <h1 className="text-marronFonce text-center md:px-40 md:text-[60px] text-3xl font-passionOne font-[600] md:leading-[93px] leading-[50px] uppercase">
            Trouvez facilement un{" "}
            <span className="rotating-words px-1 py-1 rounded-xl">
              <span className="bg-background-gradient">professionnel</span>
              <span className="bg-background-gradient">produit</span>
              <span className="bg-background-gradient">service</span>
            </span>{" "}
            pour vos besoins
          </h1> */}
          <h1 className="text-marronFonce text-center md:px-[180px] md:text-[60px] text-3xl font-passionOne font-[600] leading-[50px] uppercase">
            Trouvez facilement un{" "}
            <span
              className="rotating-words bg-background-gradient px-2 py-1 rounded-xl"
              style={{
                backgroundPositionY: `-${currentIndex * 100}%`,
              }}
            >
              {words[currentIndex]}
            </span>{" "}
            pour vos besoins
          </h1>
          <p className="md:text-[24px] text-[20px] text-center md:px-32 font-poppins font-normal leading-[33px]">
            L'annuaire du Royaume est la plateforme chrétienne qui regroupe les
            professionnels, les associations et les artistes chrétiens au même
            endroit.
          </p>
          <div className="flex flex-col justify-center items-center pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="md:w-[50%] w-full"
              >
                <div className="flex items-center w-full">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="search"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative w-full">
                            <FormControl>
                              <Input
                                onKeyDown={handleKeyDown}
                                className="w-full h-12 bg-background border-bordureInput border-2 focus:outline-none focus:shadow-none text-[20px] leading-[20.16px] font-medium rounded-xl"
                                placeholder="Rechercher..."
                                {...field}
                              />
                            </FormControl>
                            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 py-2">
                              <BiSearchAlt2
                                size={25}
                                className="text-marronFonce"
                              />
                            </Button>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <Button className="px-3 py-2">
                    <BiSearchAlt2 className="text-marronFonce w-10 h-10" />
                  </Button> */}
                </div>
                {/* <div className="flex items-center gap-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="bg-gray-300 border-none rounded-xl text-1xl mx-2 my-1">
                            <SelectTrigger>
                              <SelectValue className="" placeholder="Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              m@google.com
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              m@support.com
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div> */}
              </form>
            </Form>
          </div>
        </div>
      </div>
      <LastProfile />
      <AnnonceCarrousel />
      <LastProduct />
      {/*   <LastService /> */}
      <LastEvenment />
    </section>
  );
};

export default AnnuaireCatalogue;

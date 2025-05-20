import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import AllProfile from "@/components/AllProfile";
import AllProduct from "@/components/AllProduct";
import AllEvenment from "@/components/AllEvenment";
import AllService from "@/components/AllService";
import useFetchCategory from "@/requests/useFetchCategory";
import useFetchVerse from "@/requests/useFetchVerse";
import { api } from "@/services/http";
import { useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

const classement = ["Populaires", "Anciens", "Nouveaux"];
const localisation = ["Lille", "Lion", "Bruxelles"];

function AllFiltre() {
  const [activeTab, setActiveTab] = useState("profile");
  const [searchResults, setSearchResults] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: listCategory, isLoading: loading } = useFetchCategory();
  const location = useLocation();
  const searchParamsUrl = new URLSearchParams(location.search);
  const search = searchParamsUrl.get("search");

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: listVerse, isLoading: load } = useFetchVerse();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledList, setShuffledList] = useState<any[]>([]);

  const tabs = [
    { id: "profile", label: "Entreprise" },
    { id: "product", label: "Produits" },
    { id: "service", label: "Services" },
    { id: "event", label: "Evènements" },
  ];

  async function gloabalSearch(query = "", category = "") {
    setIsSubmitting(true);
    
    const params = {
      keyword: query,
      categorie: category,
    };

    try {
      const response = await api.get("/search", { params });
      setSearchResults(response.data.data);
    } catch (error) {
    console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    gloabalSearch(searchQuery);
  };

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
    gloabalSearch(searchQuery, category);
  };

  useEffect(() => {
    const gloabalSearch = async () => {
      const params = {
        keyword: search,
      };
      try {
        const response = await api.get("/search", { params });
        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }
    };
    if (search) {
      gloabalSearch();
    }
  }, [search]);

  useEffect(() => {
    if (search) {
      setSearchQuery(search);
    }
  }, [search]);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  useEffect(() => {
    if (!Array.isArray(listVerse) || listVerse.length === 0) return;

    const shuffled = [...listVerse].sort(() => Math.random() - 0.5);
    setShuffledList(shuffled);

    let interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffled.length);
    }, 300000);

    return () => clearInterval(interval);
  }, [listVerse]);

  return (
    <section className="pt-32">
      <div className="bg-marronFonce w-full xl:px-32 px-5 md:py-10 py-12">
        <form className="md:w-[50%] w-full">
          <div className="flex items-center w-full">
            <div className="w-full">
              <div className="relative w-full">
                <Input
                  className="w-full h-10 bg-background border-bordureInput border-2 focus:outline-none focus:shadow-none text-[18px] leading-[20.16px] font-medium rounded"
                  placeholder="Rechercher..."
                  onKeyDown={handleKeyDown}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  disabled={isSubmitting}
                  onClick={handleSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 py-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="text-marronFonce animate-spin text-sm" />
                    </>
                  ) : (
                    <BiSearchAlt2 className="text-marronFonce w-6 h-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-[50%]">
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
                            className="w-full h-10 bg-background border-bordureInput border-2 focus:outline-none focus:shadow-none text-[18px] leading-[20.16px] font-medium rounded"
                            placeholder="Rechercher..."
                            {...field}
                          />
                        </FormControl>
                        <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 py-2">
                          <BiSearchAlt2 className="text-marronFonce w-6 h-6" />
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form> */}

        <div className="flex flex-wrap gap-4 w-full pt-4 font-poppins">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-1 px-2 text-center text-[20px] font-[400] ${
                activeTab === tab.id
                  ? "bg-background-gradient text-white"
                  : "text-white"
              } rounded transition-all`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {shuffledList.length === 0 ? null : (
        <div className="max-w-screen-xl mx-auto items-center overflow-hidden pt-6 xl:px-0 px-5">
          {shuffledList.length > 0 && (
            <p
              key={shuffledList[currentIndex]?.id}
              className="font-medium text-xl text-marronFonce transition-opacity duration-700 opacity-100"
            >
              “{shuffledList[currentIndex]?.reference} :{" "}
              {shuffledList[currentIndex]?.content}”
            </p>
          )}
        </div>
      )}
      <div className="">
        <div className="max-w-screen-xl mx-auto font-poppins mt-6 mb-6">
          <button
            onClick={toggleDropdown}
            className="bg-background flex items-center gap-2 text-[20px] font-[500] px-4 py-2"
          >
            Filtres
            <MdKeyboardArrowDown
              className={`w-8 h-8 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="flex md:flex-row flex-col items-center gap-4 bg-background max-w-screen-md rounded px-4 py-6">
              <div className="w-full">
                <Select>
                  <SelectTrigger className="bg-white w-full py-6 text-[20px] font-[500] rounded">
                    <SelectValue placeholder="Classement" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {classement?.map((item) => (
                      <SelectItem
                        className="text-[18px]"
                        value={item}
                        key={item}
                      >
                        <span className="flex items-center">{item}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className="bg-white w-full py-6 text-[20px] font-[500] rounded">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {listCategory?.map((item: any) => (
                      <SelectItem
                        className="text-[18px]"
                        value={item.name}
                        key={item.id}
                      >
                        <span className="flex items-center">{item.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/*  <div className="w-full">
                <Select>
                  <SelectTrigger className="bg-white w-full py-6 text-[20px] font-[500] rounded">
                    <SelectValue placeholder="Localisation" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {localisation?.map((item) => (
                      <SelectItem
                        className="text-[18px]"
                        value={item}
                        key={item}
                      >
                        <span className="flex items-center">{item}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
            </div>
          )}
        </div>
        <div className="w-full pt-2">
          {activeTab === "profile" && (
            <div>
              <AllProfile dataSearch={searchResults} />
            </div>
          )}
          {activeTab === "product" && (
            <div>
              <AllProduct dataSearch={searchResults} />
            </div>
          )}
          {activeTab === "service" && (
            <div>
              <AllService dataSearch={searchResults} />
            </div>
          )}
          {activeTab === "event" && (
            <div>
              <AllEvenment dataSearch={searchResults} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllFiltre;

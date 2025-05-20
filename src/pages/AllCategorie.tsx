import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdKeyboardArrowDown } from "react-icons/md";
import LastProfileCategory from "@/components/LastProfileCategory";
import LastOffersCategory from "@/components/LastOffersCategory";
import LastEvenmentCategory from "@/components/LastEvenmentCategory";
import useFetchAllFilter from "@/requests/useFetchAllFilter";
import useFetchCategory from "@/requests/useFetchCategory";
import useFetchVerse from "@/requests/useFetchVerse";
import { useAtom } from "jotai";
import { nameAtom } from "@/atoms/get.element.atom";
import { api } from "@/services/http";

const classement = [
  {
    order: "Populaires",
  },
  {
    order: "Anciens",
  },
  {
    order: "Nouveaux",
  },
];
const localisation = ["Lille", "Lion", "Bruxelles"];

function AllCategorie() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: listCategory } = useFetchCategory();
  const { slug } = useParams();
  const [name] = useAtom(nameAtom);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedClassement, setSelectedClassement] = useState("");
  const { data: allFilter, isLoading: loading } = useFetchAllFilter(
    String(slug)
  );
  const { data: listVerse, isLoading: load } = useFetchVerse();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledList, setShuffledList] = useState<any[]>([]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  async function gloabalSearch(category = "", classem = "") {
    const params = {
      categorie: category || selectedCategory,
      order_by: classem || selectedClassement,
    };

    try {
      const response = await api.get("/search", { params });
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  }

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
    gloabalSearch(category, "");
  };

  const handleClassementChange = (classem: any) => {
    setSelectedClassement(classem);
    gloabalSearch("", classem);
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
      <div className="bg-marronFonce w-full xl:px-32 px-5 md:py-12 py-12">
        <h2 className="text-center md:text-5xl text-3xl font-passionOne text-white font-[600]">
          Catégorie : {name}
        </h2>
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
                <Select onValueChange={handleClassementChange}>
                  <SelectTrigger className="bg-white w-full py-6 text-[20px] font-[500] rounded">
                    <SelectValue placeholder="Classement" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {classement?.map((item) => (
                      <SelectItem
                        className="text-[18px]"
                        value={item.order}
                        key={item.order}
                      >
                        <span className="flex items-center">{item.order}</span>
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
              {/* <div className="w-full">
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
          <LastProfileCategory dataFilter={allFilter} isLoading={loading} />
          <LastOffersCategory dataFilter={allFilter} isLoading={loading} />
          <LastEvenmentCategory dataFilter={allFilter} isLoading={loading} />
        </div>
      </div>
    </section>
  );
}

export default AllCategorie;

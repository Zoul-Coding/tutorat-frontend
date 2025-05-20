import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BiSearchAlt2 } from "react-icons/bi";
import DefaultImg from "../assets/default-featured.jpg";
import { Link } from "react-router-dom";
import { PaginationComponent } from "@/components/PaginationComponent";
import blogService from "@/services/blog.service";
import useFetchCategoryArticle from "@/requests/useFetchCategoryArticle";
import { MdKeyboardArrowDown } from "react-icons/md";
import { formatDate, shortenText } from "@/lib/utils";
import { Loader } from "lucide-react";
import { api } from "@/services/http";

function Blog() {
  const [searchResults, setSearchResults] = useState<any | null>(null);
  const { data: listCategory, isLoading: loadCategory } =
    useFetchCategoryArticle();
  const [dataPayload, setDataPayload] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    handleCategoryFilter(categoryId);
  };

  // Fetch paginated data
  async function getSessionsPaginated() {
    const articleData = await blogService.fetchArticle(currentPage);
    setLastPage(articleData?.last_page);
    return articleData;
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const payload = await getSessionsPaginated();
      setDataPayload(payload);
      setIsLoading(false);
    })();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Search functionality
  async function onSearch(e: any) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setIsLoading(true);
      const params = {
        query: searchQuery || "",
      };
      const response = await api.get("/article/search", { params });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  }

  async function handleCategoryFilter(value: string) {
    try {
      setIsLoading(true);
      setCategoryId(value);
      setDataPayload(null);
      const response = await api.get("/article/search", {
        params: { categoryId: value },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const articlesToDisplay =
    searchResults && searchResults.length > 0
      ? searchResults
      : dataPayload?.data;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(e);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <section>
      <div className="md:pt-32 pt-28">
        <div className="bg-marronFonce py-16 gap-6">
          <h1 className="text-white text-center md:text-4xl text-3xl font-extrabold uppercase">
            Découvrez notre blog
          </h1>
          <div className="flex flex-col justify-center items-center pt-6">
            <form className="md:w-[50%] w-full xl:px-0 px-5">
              <div className="flex items-center w-full">
                <div className="w-full">
                  <div className="relative w-full">
                    <Input
                      onKeyDown={handleKeyDown}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-10 bg-background border-bordureInput border-2 focus:outline-none focus:shadow-none text-[18px] leading-[20.16px] font-medium rounded sm:col-span-4"
                      placeholder="Rechercher..."
                    />
                    <Button
                      disabled={isSubmitting}
                      onClick={onSearch}
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
          </div>
          {loadCategory ? (
            <div className="flex justify-center">
              <Loader className="text-white h-5 w-5 animate-spin mt-6" />
            </div>
          ) : (
            <div className="md:block hidden">
              <Swiper
                className="mt-6 lg:max-w-screen-md mx-auto xl:px-0 px-5"
                modules={[Autoplay, A11y, Navigation]}
                spaceBetween={30}
                slidesPerView={5}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                pagination={{ clickable: true }}
              >
                {listCategory?.map((item: any) => (
                  <SwiperSlide className="mx-auto" key={item.id}>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => handleCategoryClick(item.id)}
                        className={`bg-background3 hover:opacity-85
                        ${listCategory.length >= 4 ? "w-100" : "w-full"} 
                        rounded-full text-white text-[13px] px-3 py-0 h-8 ${
                          activeCategory === item.id ? "bg-custom-gradient" : ""
                        }`}
                      >
                        {item.name}
                      </Button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="md:block hidden">
                <button
                  ref={prevRef}
                  className="swiper-button-prev lg:absolute lg:top-[363px] top-[410px] xl:left-[250px] lg:left-[100px] left-[320px] -translate-y-1/2 text-black z-10"
                ></button>
                <button
                  ref={nextRef}
                  className="swiper-button-next lg:absolute lg:top-[363px] top-[410px] xl:right-[250px] lg:right-[100px] right-[320px] -translate-y-1/2 text-black z-10"
                ></button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden block">
        <div className="max-w-screen-xl mx-auto font-poppins mt-6 mb-0">
          {/* <button
          onClick={toggleDropdown}
          className="bg-background flex items-center gap-2 text-[20px] font-[500] px-4 py-2"
        >
          Filtre
          <MdKeyboardArrowDown
            className={`w-8 h-8 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && ( */}
          <div className="flex md:flex-row flex-col items-center gap-4 bg-background max-w-sm rounded px-4 py-6 xl:mx-0 mx-5">
            <div className="w-full">
              <Select onValueChange={(value) => handleCategoryFilter(value)}>
                <SelectTrigger className="w-full text-start px-3 h-10 bg-white focus:outline-none focus:shadow-none text-base leading-[20.16px] font-medium rounded sm:col-span-2">
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {listCategory?.map((item: any) => (
                    <SelectItem
                      className="text-base"
                      value={item.id}
                      key={item.id}
                    >
                      <span className="flex items-center">{item.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/*   )} */}
        </div>
      </div>
      {articlesToDisplay?.length === 0 ? (
        <p className="text-center pt-16 pb-16">Aucun article trouvé</p>
      ) : (
        <div className="max-w-screen-xl mx-auto xl:px-0 px-5 pt-8 pb-16">
          {isLoading ? (
            <div className="flex justify-center">
              <Loader className="text-marronFonce h-5 w-5 animate-spin" />
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
              {articlesToDisplay?.map((item: any) => (
                <div key={item.id} className="bg-white rounded">
                  <div className="overflow-hidden">
                    <div className="relative group">
                      <Link to={`/blog/${item.slug}`}>
                        {item?.media[0]?.original_url ? (
                          <img
                            src={item?.media[0]?.original_url}
                            alt={item.title}
                            className="w-full h-[200px] object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                          />
                        ) : (
                          <img
                            src={DefaultImg}
                            alt={item.title}
                            className="w-full h-[200px] object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                          />
                        )}
                      </Link>
                    </div>
                    <div className="w-full h-full">
                      <div className="flex flex-col gap-2 pt-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm">
                            {formatDate(item.created_at)}
                          </p>
                          <p className="text-sm">{item.categorie}</p>
                        </div>
                        <Link to={`/blog/${item.slug}`}>
                          <h3 className="font-bold text-xl hover:underline">
                            {shortenText(item.title, 30)}
                          </h3>
                        </Link>
                        <p className="text-sm font-base">
                          {shortenText(item.content, 70)}
                        </p>
                        <Link
                          className="underline w-[70px] h-full rounded text-base text-marronFonce font-bold"
                          to={`/blog/${item.slug}`}
                        >
                          Lire plus
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!searchResults ? (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={lastPage}
              onPageChange={handlePageChange}
            />
          ) : null}
        </div>
      )}
    </section>
  );
}

export default Blog;

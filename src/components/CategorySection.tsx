import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchCategory from "@/requests/useFetchCategory";
import { nameAtom } from "@/atoms/get.element.atom";
import { useAtom } from "jotai";
import useFetchCategoryHome from "@/requests/useFetchCategoryHome";

const CategorySection = () => {
  const { data: listCategory, isLoading: loading } = useFetchCategoryHome();
  const [name, setName] = useAtom(nameAtom);

  const handleCategoryClick = (name: string) => {
    setName(name);
  };

  return (
    <section>
      {listCategory?.length === 0 ? null : (
        <div className="max-w-screen-xl mx-auto xl:px-0 px-5 pt-20 pb-20">
          <h2 className="md:text-[48px] sm:text-3xl text-2xl uppercase text-marronFonce font-passionOne font-[400] text-center">
            Parcourez l'annuaire par catégorie
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 pt-8">
            {loading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-[200px] h-[60px] bg-gray-200 flex gap-6 rounded items-center justify-center p-3"
                  >
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                ))
              : listCategory?.length > 0
              ? listCategory?.map((category: any) => (
                  <Link
                    to={`/categorie/${category?.slug}`}
                    onClick={() => handleCategoryClick(category?.name)}
                    key={category.id}
                    className="bg-roseAncien font-poppins hover:bg-white rounded flex gap-6 
        justify-center items-center md:px-6 px-3 md:py-3 py-2 group transition-all duration-300 ease-in-out"
                  >
                    <p className="text-black group-hover:text-rougeBrique md:text-2xl text-1xl font-medium">
                      {category.name}
                    </p>
                    <div className="bg-black group-hover:bg-rougeBrique rounded-full md:px-2 px-1 md:py-2 py-1">
                      <FaArrowRight
                        className="text-white group-hover:text-white"
                        size={16}
                      />
                    </div>
                  </Link>
                ))
              : ""}
          </div>
          <div className="flex justify-center">
            <Link
              className="md:text-2xl text-1xl flex justify-center items-center text-roseAncien pt-6 font-bold border-b-2 border-roseAncien hover:border-b-roseAncien md:w-[380px] w-full text-center"
              to="/annuaire"
            >
              Parcourez tout le catalogue
              <MdKeyboardArrowRight className="w-9 h-9 pt-2" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategorySection;

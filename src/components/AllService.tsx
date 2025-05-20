import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import DefaultImg from "../assets/default-featured.jpg";
import { IoIosArrowDropright } from "react-icons/io";
import { PaginationComponent } from "@/components/PaginationComponent";
import productService from "@/services/product.service";
import { Skeleton } from "@/components/ui/skeleton";
import { shortenText } from "@/lib/utils";

type DataSearchType = {
  service?: any[];
  [key: string]: any;
};

type AllServiceProps = {
  dataSearch: DataSearchType | null;
};

const AllService: React.FC<AllServiceProps> = ({ dataSearch }) => {
  /*  const [numPages, setNumPages] = useState(1); */
  const [dataPayload, setDataPayload] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const getFirstLetter = (str: any) => (str ? str.charAt(0).toUpperCase() : "");
  const name = "service";

  async function getSessionsPaginated() {
    const articleData = await productService.fetchProduct(name, currentPage);
    setLastPage(articleData?.last_page);
    /* setNumPages(articleData?.total) */
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

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const services =
    Array.isArray(dataSearch?.service) && dataSearch?.service.length > 0
      ? dataSearch?.service
      : dataPayload?.data;

  return (
    <section className="mb-8">
      <div className="px-5">
        {dataSearch &&
        Array.isArray(dataSearch.service) &&
        dataSearch.service.length === 0 ? (
          <p className="text-center">Aucun service trouvé</p>
        ) : (
          <div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 pt-6 pb-0">
              {isLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center w-full h-[350px]"
                    >
                      <Skeleton className="bg-gray-200 w-full h-full rounded-3xl" />
                      <div className="absolute bottom-3 w-full">
                        <Skeleton className="bg-gray-300 w-36 h-8 mx-auto rounded-full" />
                        <h3 className="text-[21px] font-bold pt-3 px-3">
                          <Skeleton className="bg-gray-300 h-6 w-full" />
                        </h3>
                        <div className="flex justify-between px-6 gap-10 items-center w-full pt-1">
                          <Skeleton className="bg-gray-300 w-10 h-10 rounded-full" />
                          <Skeleton className="bg-gray-300 w-24 h-6" />
                        </div>
                      </div>
                    </div>
                  ))
                : services?.map((service: any) => (
                    <div
                      className="relative flex flex-col items-center group w-full h-[350px]"
                      key={service?.id}
                    >
                      {service?.media[0]?.original_url ? (
                        <img
                          src={service?.media[0]?.original_url}
                          alt={service?.title}
                          className="w-full h-full object-center rounded-3xl shadow-md"
                        />
                      ) : (
                        <img
                          src={DefaultImg}
                          alt={service?.title}
                          className="w-full h-full object-center rounded-3xl shadow-md"
                        />
                      )}
                      {/* Ombre permanente en bas de l'image */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-95 rounded-b-3xl h-36 transition-opacity duration-300 group-hover:opacity-0"></div>

                      {/* Overlay sombre */}
                      <div className="absolute inset-0 z-30 backdrop-blur-md bg-black bg-opacity-20 opacity-0 rounded-3xl flex justify-center items-center transition-opacity duration-300 group-hover:opacity-100">
                        <div className="text-center text-white">
                          <h3 className="text-2xl font-bold mb-4">
                            {service.title}
                          </h3>
                          <Link
                            to={
                              service?.type === "product"
                                ? `/detail/produit/${service?.slug}`
                                : service?.type === "service"
                                ? `/detail/service/${service?.slug}`
                                : "/"
                            }
                            className="px-4 py-2 text-2xl text-marronFonce underline rounded-full font-semibold hover:opacity-70 transition-colors duration-300"
                          >
                            Consulter
                          </Link>
                        </div>
                      </div>

                      {/* Infos régulières */}
                      <div className="absolute bottom-3 text-white w-full">
                        <div className="flex gap-2 justify-center items-center px-1 py-1 bg-marronFonce w-36 rounded-full mx-auto">
                          <FaStar size={18} className="text-white" />
                          <p className="text-white font-medium text-sm">
                          {service?.reviews_avg_rating || 0}/5 sur{" "}
                          {service?.reviews_count} avis
                          </p>
                        </div>
                        <h3 className="text-[21px] font-bold pt-1 px-3">
                          {shortenText(service.title, 20)}
                        </h3>
                        <div className="flex justify-between px-6 gap-10 items-center w-full pt-1">
                          <div className="flex gap-3 justify-center items-center">
                          {service?.user?.media[0]?.original_url ? (
                          <img
                            src={service?.user?.media[0]?.original_url}
                            alt={service?.title}
                            className="w-6 h-6 object-cover rounded-full"
                          />
                        ) : (
                          <img
                            src={DefaultImg}
                            alt={service?.title}
                            className="w-6 h-6 object-cover rounded-full"
                          />
                        )}
                            <p className="text-sm font-bold">
                              {service?.user?.first_name}{" "}
                              {getFirstLetter(service?.user?.last_name)}.
                            </p>
                          </div>
                          {service?.price ? (
                          <p className="text-sm font-bold">{service?.price} {service?.devise == 'EUR' ? '€' : '＄'}</p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={lastPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default AllService;

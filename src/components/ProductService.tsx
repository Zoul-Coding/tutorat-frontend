import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import DefaultImg from "../assets/default-featured.jpg";
import useFetchAllOffers from "@/requests/useFetchAllOffers";
import { Skeleton } from "@/components/ui/skeleton";
import { shortenText } from "@/lib/utils";

const ProductService = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: listProduct, isLoading: loading } =
    useFetchAllOffers(currentPage);
  const getFirstLetter = (str: any) => (str ? str.charAt(0).toUpperCase() : "");

  return (
    <section>
      {listProduct?.data.length === 0 ? null : (
        <div className="mt-8 mb-8 bg-background">
          <div className="pt-12 pb-12 max-w-screen-xl mx-auto xl:px-0 px-5">
            <div className="flex justify-center items-center">
              <h2 className="md:text-[48px] font-[400] sm:text-3xl text-2xl uppercase font-passionOne text-marronFonce text-center">
                Consultez les différents produits & services disponibles
              </h2>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 pt-12 pb-12 font-poppins">
              {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center w-full h-[400px]"
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
                : listProduct?.data.length === 0
                ? ""
                : listProduct?.data.map((product: any) => (
                    <div
                      className="relative flex flex-col items-center group w-full h-[350px]"
                      key={product.id}
                    >
                      {product?.media[0]?.original_url ? (
                        <img
                          src={product?.media[0]?.original_url}
                          alt={product?.title}
                          className="w-full h-full object-center rounded-3xl shadow-md"
                        />
                      ) : (
                        <img
                          src={DefaultImg}
                          alt={product?.title}
                          className="w-full h-full object-cover rounded-3xl shadow-md"
                        />
                      )}
                      {/* Ombre permanente en bas de l'image */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-95 rounded-b-3xl h-36 transition-opacity duration-300 group-hover:opacity-0"></div>

                      {/* Overlay sombre */}
                      <div className="absolute inset-0 z-30 backdrop-blur-md bg-black bg-opacity-20 opacity-0 rounded-3xl flex justify-center items-center transition-opacity duration-300 group-hover:opacity-100">
                        <div className="text-center text-white">
                          <h3 className="text-2xl font-bold mb-4">
                            {product?.title}
                          </h3>
                          <Link
                            target={`${product.type === "annonce" ? "_blank" : ""}`}
                            to={
                              product.type === "product"
                                ? `/detail/produit/${product.slug}`
                                : product.type === "service"
                                ? `/detail/service/${product.slug}`
                                : product.type === "annonce"
                                ? product.link
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
                        {product?.type === "annonce" ? (
                          <div className="flex gap-2 justify-center items-center px-1 py-1 bg-marronFonce w-32 rounded-full mx-auto">
                            <p className="text-white font-medium text-sm">
                              Annonce
                            </p>
                          </div>
                        ) : (
                          <div className="flex gap-2 justify-center items-center px-1 py-1 bg-marronFonce w-36 rounded-full mx-auto">
                            <FaStar size={18} className="text-white" />
                            <p className="text-white font-medium text-sm">
                              {product?.reviews_avg_rating || 0}/5 sur{" "}
                              {product?.reviews_count} avis
                            </p>
                          </div>
                        )}
                        <h3 className="text-[21px] font-bold pt-1 px-3">
                          {shortenText(product.title, 20)}
                        </h3>
                        <div className="flex justify-between px-6 gap-10 items-start w-full pt-1">
                          {product?.type === "annonce" ? null : (
                            <div className="flex gap-3 justify-center items-center">
                              {product?.user?.media[0]?.original_url ? (
                                <img
                                  src={product?.user?.media[0]?.original_url}
                                  alt={product.title}
                                  className="w-6 h-6 object-cover rounded-full"
                                />
                              ) : (
                                <img
                                  src={DefaultImg}
                                  alt={product.title}
                                  className="w-6 h-6 object-cover rounded-full"
                                />
                              )}
                              <p className="text-sm font-bold">
                                {product?.user?.first_name}{" "}
                                {getFirstLetter(product?.user?.last_name)}.
                              </p>
                            </div>
                          )}
                          {product?.type === "annonce" ? null : (
                            product?.price ? (
                              <p className="text-sm font-bold">
                              {product?.price} {product?.devise == 'EUR' ? '€' : '＄'}
                            </p>
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductService;

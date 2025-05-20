import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DefaultImg from "../assets/default-featured.jpg";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useFetchProductType from "@/requests/useFetchProductType";
import { shortenText } from "@/lib/utils";
import parse from "html-react-parser";

const AnnonceCarrousel = () => {
  const { data: listAnnonce, isLoading: loading } =
    useFetchProductType("annonce");

  return (
    <section>
      {listAnnonce?.length === 0 ? null : (
        <div className="bg-background pt-20 pb-20 mt-16 mb-16">
          <div className=" max-w-screen-lg mx-auto">
            <h2 className="md:text-[46px] sm:text-3xl text-2xl font-passionOne uppercase text-marronFonce text-start font-[400]">
              Ceci pourrait vous intéresser...
            </h2>
          </div>
          <div className="bg-background-gradient max-w-screen-xl mx-auto rounded-xl h-[350px] py-10 relative mt-48">
            <div className="max-w-screen-lg mx-auto -mt-52 font-poppins">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1}
              >
                {listAnnonce?.map((annonce: any) => (
                  <SwiperSlide key={annonce.id}>
                    <div className="flex items-start bg-white w-full rounded-xl shadow-lg overflow-hidden">
                      {/* Image */}
                      <div className="w-1/2 h-[450px]">
                        {annonce?.media[0]?.original_url ? (
                          <img
                            src={annonce?.media[0]?.original_url}
                            alt={annonce?.title}
                            className="w-full h-full object-cover rounded-l-xl rounded-r-none"
                          />
                        ) : (
                          <img
                            src={DefaultImg}
                            alt={annonce?.title}
                            className="w-full h-full object-cover rounded-l-xl rounded-r-none"
                          />
                        )}
                      </div>

                      {/* Texte */}
                      <div className="w-1/2 p-6">
                        <h2 className="text-[38px] text-rougeBrique font-[600] text-gray-800 mb-4">
                          {shortenText(annonce?.title, 100)}
                        </h2>
                        <p className="text-[18px] text-rougeBrique font-[300] mb-6">
                          {annonce?.description
                            ? parse(shortenText(annonce?.description, 300))
                            : ""}
                        </p>
                        <Link
                          target="_blank"
                          to={annonce?.link}
                          className="flex justify-center gap-3 items-center bg-background4 w-52 h-11
                        rounded-xl text-[20px] text-white font-poppins font-medium"
                        >
                          <div className="bg-white w-5 h-5 rounded-full"></div>
                          En savoir plus
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Flèches de navigation */}
              <button className="swiper-button-prev absolute top-1/2 left-4 -translate-y-1/2 text-black z-10"></button>
              <button className="swiper-button-next absolute top-1/2 right-4 -translate-y-1/2 text-black z-10"></button>
            </div>

            {/* Pagination */}
            <div className="swiper-pagination"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AnnonceCarrousel;

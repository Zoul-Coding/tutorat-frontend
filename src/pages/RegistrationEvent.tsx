import DefaultImg from "../assets/default-featured.jpg";
import { Link } from "react-router-dom";
import useFetchRegistrationEvent from "@/requests/useFetchRegistrationEvent";
import { formatDate } from "@/lib/utils";
import { Loader } from "lucide-react";

const RegistrationEvent = () => {
  const { data: ListEvent, isLoading: loading } = useFetchRegistrationEvent();

  return (
    <section className="lg:pt-32 md:pt-28 pt-20 lg:mb-20 mb-8">
      {loading ? (
        <div className="flex justify-center pt-20 pb-20">
          <Loader className="text-md animate-spin text-marronFonce text-center" />
        </div>
      ) : (
        <div>
          {ListEvent?.length === 0 ? (
            <p className="text-center pt-28 pb-28">Aucun événement</p>
          ) : (
            <div className="">
              <div className="bg-marronFonce w-full xl:px-32 px-5 md:py-12 py-12">
                <h2 className="text-center md:text-5xl text-3xl font-passionOne text-white font-[600]">
                  Mes événements
                </h2>
              </div>
              <div className="max-w-screen-xl mx-auto xl:px-0 px-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 pt-12 pb-0">
                {ListEvent?.map((event: any) => (
                  <div
                    key={event.id}
                    className="rounded-t-3xl rounded-b-3xl overflow-hidden"
                  >
                    <div className="relative group">
                      {event?.media[0]?.original_url ? (
                        <Link to={`/detail/evenement/${event.slug}`}>
                          <img
                            src={event?.media[0]?.original_url}
                            alt={event.title}
                            className="w-full h-[200px] object-cover rounded-t-3xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                          />
                        </Link>
                      ) : (
                        <Link to={`/detail/evenement/${event.slug}`}>
                          <img
                            src={DefaultImg}
                            className="w-full h-[200px] object-cover rounded-t-3xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                          />
                        </Link>
                      )}
                    </div>
                    <div className="bg-marronFonce w-full h-full">
                      <div className="flex flex-col items-center gap-2 px-3 py-4">
                        <p className="text-white md:text-1xl text-sm font-base">
                          {formatDate(event.start_date)}
                        </p>
                        <Link to={`/detail/evenement/${event.slug}`}>
                          <h3 className="text-white md:text-[19px] text-lg text-center font-bold hover:underline">
                            {event?.title}
                          </h3>
                        </Link>
                        <p className="text-white text-1xl font-base">
                          {event?.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default RegistrationEvent;

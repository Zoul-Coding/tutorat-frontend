import { useState, useEffect } from "react";
import DefaultImg from "../assets/default-featured.jpg";
import { IoIosArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import { PaginationComponent } from "./PaginationComponent";
import useFetchEvent from "@/requests/useFetchEvent";
import eventService from "@/services/event.service";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const LastEvenment = () => {
  const [dataPayload, setDataPayload] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  async function getSessionsPaginated() {
    const eventData = await eventService.fetchEventPaginate(currentPage);
    setLastPage(eventData?.last_page);
    return eventData;
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

  return (
    <section>
      {dataPayload?.data?.length === 0 ? null : (
        <div className="mt-20 mb-20">
          <div className="px-5">
            <h2 className="md:text-[46px] sm:text-3xl text-2xl font-passionOne uppercase text-marronFonce font-[400]">
              Evènements à venir
            </h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 pt-8 pb-0">
              {isLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-t-3xl rounded-b-3xl overflow-hidden"
                    >
                      <Skeleton className="bg-gray-200 w-full h-[200px] rounded-t-3xl" />
                      <div className="bg-gray-200 w-full h-full">
                        <div className="flex flex-col items-center gap-2 px-3 py-4">
                          <Skeleton className="bg-gray-300 w-1/3 h-4 mb-2" />
                          <Skeleton className="bg-gray-300 w-2/3 h-6 mb-2" />
                          <Skeleton className="bg-gray-300 w-1/2 h-4" />
                        </div>
                      </div>
                    </div>
                  ))
                : dataPayload?.data?.map((event: any) => (
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
            <PaginationComponent
              currentPage={currentPage}
              totalPages={lastPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default LastEvenment;

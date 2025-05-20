import { FaStar } from "react-icons/fa6";
import DefaultImg from "../assets/default-featured.jpg";
import Marquee from "@/components/ui/marquee";
import useFetchReview from "@/requests/useFetchReview";
import { cn } from "@/lib/utils";

const ReviewCard = ({
  img,
  name,
  comment,
  rating,
}: {
  img: string | null;
  name: string;
  comment: string;
  rating: number;
}) => {
  return (
    <figure
      className={cn(
        "relative bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] w-[450px] overflow-hidden font-poppins p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <blockquote className="mt-2 h-28 text-xl font-[400]">
        {comment}
      </blockquote>
      <div className="flex justify-between items-center px-5">
        <div className="flex flex-row items-center gap-2">
          <img
            className="w-10 h-10 rounded-full"
            alt={name}
            src={img || DefaultImg}
          />
          <div className="flex flex-col">
            <figcaption className="text-[16px] font-bold dark:text-white">
              {name}
            </figcaption>
          </div>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`w-6 h-6 ${
                index < rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </figure>
  );
};

const ReviewTestimonial = () => {
  const { data: listReview = [], isLoading, error } = useFetchReview();
  const getFirstLetter = (str: any) => (str ? str.charAt(0).toUpperCase() : "");

  const firstRow = listReview.slice(0, Math.ceil(listReview.length / 2));
  const secondRow = listReview.slice(Math.ceil(listReview.length / 2));

  return (
    <section>
      {listReview?.length === 0 ? null : (
        <div className="bg-transparent pt-8 pb-0 relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg">
          <h2 className="md:text-[48px] sm:text-3xl text-2xl font-passionOne uppercase text-marronFonce w-[80%] text-center font-bold pb-6">
            Et ils sont satisfaits
          </h2>
          <Marquee pauseOnHover className="[--duration:20s] bg-transparent">
            {firstRow.map((review: any) => (
              <ReviewCard
                key={review.id}
                img={
                  review?.reviewer?.media?.length > 0
                    ? review?.reviewer?.media[0]?.original_url
                    : null
                }
                name={`${review?.reviewer?.first_name} ${getFirstLetter(
                  review?.reviewer?.last_name
                )}.`}
                comment={review?.comment}
                rating={review?.rating}
              />
            ))}
          </Marquee>
          <Marquee
            reverse
            pauseOnHover
            className="[--duration:20s] bg-transparent"
          >
            {secondRow.map((review: any) => (
              <ReviewCard
                key={review.id}
                img={
                  review?.reviewer?.media?.length > 0
                    ? review?.reviewer?.media[0]?.original_url
                    : null
                }
                name={`${review?.reviewer?.first_name} ${getFirstLetter(
                  review?.reviewer?.last_name
                )}.`}
                comment={review?.comment}
                rating={review?.rating}
              />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
      )}
    </section>
  );
};

export default ReviewTestimonial;

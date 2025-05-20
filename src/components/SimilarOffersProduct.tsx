import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Profile from "../assets/Sac.jpg";
import DefaultImg from "../assets/default-featured.jpg";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { shortenText } from "@/lib/utils";

const ReviewCard = ({
  img,
  path,
  title,
  location,
  reviews_count,
  reviews_rating,
}: {
  img: string | null;
  path: string;
  title: string | "";
  location: string;
  reviews_count?: string|null;
  reviews_rating?: string|null;
}) => {
  return (
    <figure
      className={cn(
        "relative bg-transparent w-full overflow-hidden rounded-xl",
        // light styles
        "border-gray-950/[.1]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex gap-8">
        <div className="rounded-t-3xl rounded-b-3xl overflow-hidden max-w-[300px] min-h-[350px]">
          <div className="relative group">
            <Link to={path}>
              <img
                src={img || DefaultImg}
                alt={title}
                className="w-full h-[180px] object-cover rounded-t-3xl transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </Link>
          </div>
          <div className="bg-marronFonce w-full h-full">
            <div className="flex flex-col items-center gap-2 px-3 py-4">
              <div className="flex gap-2 justify-center items-center">
                <FaStar size={18} className="text-white" />
                <p className="text-white font-medium text-sm">
                {reviews_rating??0} sur {reviews_count} avis
                </p>
              </div>
              <Link to={path}>
                <h3 className="text-white md:text-[19px] text-lg text-center font-bold hover:underline">
                  {title}
                </h3>
              </Link>
              {location && (
                <div className="flex items-center gap-2">
                  <FaLocationDot className="text-white w-4 h-4" />
                  <p className="text-white text-1xl font-base">{location}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
};

type DataOfferType = {
  listServiceSimilar?: any[];
  [key: string]: any;
};

type OfferProductProps = {
  dataSimilarOffers: DataOfferType | null;
};

export const SimilarOffersProduct: React.FC<OfferProductProps> = ({
  dataSimilarOffers,
}) => {
  const listProductSimilar = dataSimilarOffers?.related_offers;

  const firstRow = listProductSimilar?.slice(
    0,
    Math.ceil(listProductSimilar?.length / 2)
  );
  const secondRow = listProductSimilar?.slice(
    Math.ceil(listProductSimilar?.length / 2)
  );

  return (
    <section>
      {listProductSimilar?.length === 0 ? (
        ""
      ) : (
        <div className="bg-roseClair mt-10 pt-10 pb-10 relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg">
          <h2 className="sm:text-4xl text-2xl uppercase font-passionOne text-marronFonce text-center font-bold pb-0">
            Ceci pourrait vous intéresser...
          </h2>

          <div>
            <Marquee pauseOnHover className="[--duration:10s]">
              {firstRow?.map((review: any) => (
                <ReviewCard
                  key={review.id}
                  path={`/detail/produit/${review.slug}`}
                  img={
                    review.media.length > 0
                      ? review.media[0].original_url
                      : null
                  }
                  title={shortenText(review.title, 50)}
                  location={review.location}
                />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:10s]">
              {secondRow?.map((review: any) => (
                <ReviewCard
                  key={review.id}
                  path={`/detail/produit/${review.slug}`}
                  img={
                    review.media.length > 0
                      ? review.media[0].original_url
                      : null
                  }
                  title={shortenText(review.title, 50)}
                  location={review.location}
                  reviews_count={review?.reviews_count}
                  reviews_rating={review?.reviews_avg_rating}
                />
              ))}
            </Marquee>
          </div>
          {/*  <div className="pointer-articles-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
 <div className="pointer-articles-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div> */}
        </div>
      )}
    </section>
  );
};

export default SimilarOffersProduct;

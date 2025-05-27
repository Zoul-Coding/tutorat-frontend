import { FaStar } from "react-icons/fa6";
import Profile from "../../public/assets/profile.jpg";
import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

// Composant de carte d'avis
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
        "relative bg-white w-[450px] overflow-hidden p-4",
        "border border-gray-200 rounded-xl"
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
            src={img || Profile}
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

// Données fictives
const fakeReviews = [
  {
    id: 1,
    reviewer: {
      first_name: "Alice",
      last_name: "Dupont",
      media: [{ original_url: "https://i.pravatar.cc/150?img=1" }],
    },
    comment: "Super plateforme, j'ai beaucoup appris !",
    rating: 5,
  },
  {
    id: 2,
    reviewer: {
      first_name: "Mohamed",
      last_name: "Traore",
      media: [],
    },
    comment: "Les cours sont clairs et accessibles.",
    rating: 4,
  },
  {
    id: 3,
    reviewer: {
      first_name: "Fatou",
      last_name: "Kone",
      media: [{ original_url: "https://i.pravatar.cc/150?img=3" }],
    },
    comment: "Très bon accompagnement des enseignants.",
    rating: 5,
  },
  {
    id: 4,
    reviewer: {
      first_name: "Jean",
      last_name: "Ngoma",
      media: [],
    },
    comment: "J’ai pu améliorer mes notes grâce à vous.",
    rating: 4,
  },
];

const CustomerReview = () => {
  const listReview = fakeReviews;
  const getFirstLetter = (str: string) =>
    str ? str.charAt(0).toUpperCase() : "";

  const firstRow = listReview.slice(0, Math.ceil(listReview.length / 2));
  const secondRow = listReview.slice(Math.ceil(listReview.length / 2));

  return (
    <section>
      {listReview.length === 0 ? null : (
        <div className="bg-transparent pt-28 relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg">
          <h2 className="text-center font-bold md:text-4xl md:w-[50%] w-full sm:text-3xl text-2xl text-primary pb-12">
            Des milliers de parents et d’élèves sont satisfaits de leur
            accompagnement
          </h2>

          <Marquee pauseOnHover className="[--duration:20s] bg-transparent">
            {firstRow.map((review) => (
              <ReviewCard
                key={review.id}
                img={
                  review?.reviewer?.media?.length > 0
                    ? review.reviewer.media[0].original_url
                    : null
                }
                name={`${review.reviewer.first_name} ${getFirstLetter(
                  review.reviewer.last_name
                )}.`}
                comment={review.comment}
                rating={review.rating}
              />
            ))}
          </Marquee>

          <Marquee
            reverse
            pauseOnHover
            className="[--duration:20s] bg-transparent"
          >
            {secondRow.map((review) => (
              <ReviewCard
                key={review.id}
                img={
                  review?.reviewer?.media?.length > 0
                    ? review.reviewer.media[0].original_url
                    : null
                }
                name={`${review.reviewer.first_name} ${getFirstLetter(
                  review.reviewer.last_name
                )}.`}
                comment={review.comment}
                rating={review.rating}
              />
            ))}
          </Marquee>

          {/* Dégradé gauche et droite */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
      )}
    </section>
  );
};

export default CustomerReview;

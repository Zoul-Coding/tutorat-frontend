import Profile from "../assets/profile.jpg";
import { Link } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";

const LastService = () => {
  const services = [
    {
      id: 1,
      img: Profile,
      title: "Séminaire entrepreunarial",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      localisation: "France, Paris",
      price: "300",
    },
    {
      id: 2,
      img: Profile,
      title: "Séminaire entrepreunarial",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      localisation: "France, Paris",
      price: "300",
    },
    {
      id: 3,
      img: Profile,
      title: "Séminaire entrepreunarial",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      localisation: "France, Paris",
      price: "300",
    },
    {
      id: 4,
      img: Profile,
      title: "Séminaire entrepreunarial",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      localisation: "France, Paris",
      price: "300",
    },
  ];

  return (
    <section className="mt-20 mb-20">
      <div className="max-w-screen-xl mx-auto xl:px-0 px-5">
        <div className="flex justify-between items-center">
          <h2 className="md:text-3xl text-2xl uppercase text-marronFonce text-center font-bold">
            Services
          </h2>
          <Link
            className="hover:bg-rougeBrique border border-rougeBrique bg-transparent group rounded md:px-5 px-3 py-2 flex items-center gap-2"
            to="/service"
          >
            <p className="group-hover:text-white md:text-xl text-1xl font-medium text-rougeBrique">
              Tout voir
            </p>
            <IoIosArrowDropright className="md:w-8 md:h-8 w-5 h-5 group-hover:text-white text-rougeBrique" />
          </Link>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 pt-12 pb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-t-3xl rounded-b-3xl overflow-hidden"
            >
              <div className="relative group">
                <Link to="/detail/service">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-[200px] object-cover rounded-t-3xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </Link>
              </div>
              <div className="bg-marronFonce w-full h-full">
                <div className="flex flex-col gap-2 px-3 py-4">
                  <Link to="/detail/service">
                    <h3 className="text-white font-bold text-xl hover:underline">
                      {service.title}
                    </h3>
                  </Link>
                  <p className="text-white text-md font-base">
                    {service.description}
                  </p>
                  <p className="text-white text-sm font-base">
                    {service.localisation}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-white text-md font-base">
                        {service.price} $
                    </p>
                    <Link className="flex justify-center items-center bg-custom-gradient h-full rounded text-sm text-white font-medium px-3 py-2" to="/detail/service">
                    Voir l'offre
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LastService;

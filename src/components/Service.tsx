import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import Img7 from '../assets/Icone/img-7.png';
import Img8 from '../assets/Icone/img-8.png';
import Img9 from '../assets/Icone/img-9.png';
import Img10 from '../assets/Icone/img-10.png';
import Img11 from '../assets/Icone/img-11.png';
import Img12 from '../assets/Icone/img-12.png';

const Service = () => {

    const cardService = [
        {
            id: 1,
            img: Img7,
            title: 'Augmentez la confiance de vos prospects',
            description: 'Soyez reconnu non seulement pour votre compétence professionnelle mais aussi pour votre ancrage spirituel en Jésus. Cela compte plus que tout.',
        },
        {
            id: 2,
            img: Img8,
            title: 'Saisissez des opportunités de collaboration',
            description: 'Rencontrez des entrepreneurs de différents domaines qui partagent vos valeurs et ouvrez la porte à des partenariats enrichissants.',
        },
        {
            id: 3,
            img: Img9,
            title: 'Bénéficiez d\'une visibilité constante',
            description: 'Profitez des réseaux étendus au sein de la communauté pour être vu et reconnu pour vos compétences et votre savoir-faire.',
        },
        {
            id: 4,
            img: Img10,
            title: 'Étendez votre réseau professionnel et spirituel',
            description: 'Participez à des événements professionnels dans la communauté chrétienne et offrez-vous des connexions précieuses.',
        },
        {
            id: 5,
            img: Img11,
            title: 'Renforcez votre image de marque',
            description: 'Être répertorié dans un annuaire de référence du milieu chrétien élève votre statut de chef d\'entreprise au-delà d\'une « petite activité ».',
        },
        {
            id: 6,
            img: Img12,
            title: 'Favorisez des relations solides',
            description: 'Vos valeurs partagées avec vos clients renforceront vos relations. Un client satisfait dans la communauté chrétienne n\'hésitera pas à vous recommander.',
        },
    ];

    return (
        <section className="mt-6 mb-20 bg-gray-100">
            <div className="pt-12 pb-12 max-w-screen-xl mx-auto xl:px-0 px-5">
                <div className="flex justify-center items-center">
                    <h2 className="md:text-[35px] sm:text-3xl text-2xl font-passionOne uppercase text-marronFonce md:w-[70%] text-center font-bold">
                    L’espace symbolique pour mettre en avant vos produits et services et vous faire recommander
                    </h2>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-10 pt-12 pb-12 font-poppins">
                    {cardService.map((service) => (
                        <div key={service.id} className="flex flex-col justify-center items-center">
                            <img
                                src={service.img}
                                alt={service.title}
                                className="md:w-28 md:h-28 w-20 h-20 object-cover"
                            />
                            <div className="flex flex-col gap-3">
                                <h3 className="md:text-[26px] text-2xl text-center font-bold">{service.title}</h3>
                                <p className="md:text-[19px] text-1xl text-center">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Service
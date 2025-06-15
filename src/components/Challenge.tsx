import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const Challenge = () => {
  const challenges = [
    {
      image: "📌",
      title: "Manque de flexibilité",
      description:
        "Les solutions traditionnelles imposent des horaires rigides et des formats peu adaptés aux besoins individuels des élèves.",
    },
    {
      image: "💰",
      title: "Coût élevé des cours particuliers",
      description:
        "Les cours de soutien sont souvent trop chers, limitant l’accès à un accompagnement de qualité pour tous les élèves. traditionnelles imposent des horaires rigides et des formats peu adaptés aux besoins individuels des élèves.",
    },
    {
      image: "🔍",
      title: "Manque de Difficulté à trouver le bon tuteur",
      description:
        "Les parents peinent à identifier un tuteur qualifié, fiable et adapté aux besoins spécifiques de leur enfant. traditionnelles imposent des horaires rigides et des formats peu adaptés aux besoins individuels des élèves.",
    },
  ];

  return (
    <section className="max-w-screen-xl mx-auto pt-28 xl:px-0 px-4">
      <div className="flex flex-col items-center justify-center gap-6">
        <h2 className="text-center font-bold md:text-4xl text-3xl text-primary">
          Les défis que nous combattons
        </h2>
        <p className="text-base text-gray-700 md:w-[35%] w-full text-center">
          Les agences de soutien scolaire classiques sont{" "}
          <strong>rigides</strong>, <strong>coûteuses</strong> et
          <strong>inadaptées</strong> aux besoins des élèves et des parents.
        </p>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 pt-16 xl:px-0 md:px-12 px-2">
        {challenges.map((challenge, index) => (
          <Card className="border-none shadow-none bg-blue-100 rounded-xl px-8 py-8" key={index}>
            <div className="text-3xl">{challenge.image}</div>
            <div className="flex flex-col gap-6 pt-6">
              <CardTitle className="md:text-3xl text-2xl font-bold">{challenge.title}</CardTitle>
              <CardDescription>{challenge.description}</CardDescription>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Challenge;

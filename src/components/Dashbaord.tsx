import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserName } from "@/lib/utils";

const Dashbaord = () => {
  const userName = getUserName();

  return (
    <section className="max-w-screen-xl mx-auto pt-28">
      <p className="text-md">Bonjour {userName} 👋</p>
      <h2 className="text-3xl font-bold pt-1">Tableau de bord</h2>

      <Tabs defaultValue="resume" className="w-full pt-8">
        <TabsList className="">
          <TabsTrigger value="resume">Résumé</TabsTrigger>
          <TabsTrigger value="eleve">Elèves</TabsTrigger>
        </TabsList>
        <div className="pt-8">
          <TabsContent
            className="bg-blue-100 rounded-xl px-6"
            value="resume"
          >
              <p className="text-center py-28">Aucun cours pour le moment</p>
          </TabsContent>
          <TabsContent
            className="px-6"
            value="eleve"
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-gray-400 bg-blue-100 px-6 py-12 rounded-xl">
                <p className="text-lg">Élèves suivis</p>
                <h2 className="font-bold text-5xl pt-4">0</h2>
              </div>
              <div className="border border-gray-400 bg-blue-100 px-6 py-12 rounded-xl">
                <p className="text-lg">Cours d'essai</p>
                <h2 className="font-bold text-5xl pt-4">0</h2>
              </div>
              <div className="border border-gray-400 bg-blue-100 px-6 py-12 rounded-xl">
                <p className="text-lg">Avis</p>
                <h2 className="font-bold text-5xl pt-4">0</h2>
              </div>
            </div>
            <div className="bg-gray-100 px-6 py-4 rounded-xl mt-12">
              <p className="text-center py-28">Vous n'avez pas encore d'élève abonné à votre annonce</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
};

export default Dashbaord;

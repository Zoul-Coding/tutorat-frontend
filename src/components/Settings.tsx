import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EducationSheet } from "./EducationSheet";
import { ExperienceSheet } from "./ExperienceSheet";
import ResetForm from "./ResetForm";
import { useState } from "react";
import { UploadProfilePhoto } from "./UploadProfilePhoto";

const Settings = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="pt-24">
      <div className="max-w-screen-xl mx-auto xl:px-0 px-2">
        <h2 className="text-3xl font-bold pt-10">Paramètre</h2>
        <Tabs
          defaultValue="profil"
          className="w-full grid grid-cols-6 items-start gap-12 pt-8"
        >
          <TabsList className="flex flex-col col-span-1">
            <TabsTrigger value="profil">Profil</TabsTrigger>
            <TabsTrigger value="compte">Compte</TabsTrigger>
            <TabsTrigger value="factures">Factures</TabsTrigger>
          </TabsList>
          <div className="col-span-5">
            <TabsContent className="" value="profil">
              <div className="">
                <UploadProfilePhoto />
              </div>
              <div className="bg-gray-100 rounded-xl px-6 py-6">
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl">
                  <h3 className="text-xl font-bold">
                    Certificat de scolarité / carte étudiante / diplôme 🎓
                  </h3>
                  <EducationSheet />
                </div>
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl mt-4">
                  <h3 className="text-xl font-bold">
                    Expériences professionnelles 🏢
                  </h3>
                  <ExperienceSheet />
                </div>
              </div>
            </TabsContent>
            <TabsContent
              className="bg-gray-100 rounded-xl px-6 py-6"
              value="compte"
            >
              <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl">
                <h3 className="text-xl font-bold">
                  Modifier mon mot de passe 🔐
                </h3>
                <Button
                  className="rounded text-white px-4 py-2 hover:opcity-85 bg-primary"
                  onClick={() => setOpen(true)}
                >
                  Rénitialiser mon mot de passe
                </Button>
                <ResetForm open={open} setOpen={setOpen} />
              </div>
              <div className="flex flex-col gap-6 bg-white px-6 py-4 rounded-xl mt-4">
                <h3 className="text-xl font-bold">Supprimer mon compte 😢</h3>
                <div>
                  <p className="bg-yellow-100 text-red-800 font-medium text-sm px-4 py-3">
                    Toutes vos informations seront supprimées (mises en
                    relation, annonces…). Cette action est définitive et
                    irréversible. Le compte sera immédiatement déconnecté.
                  </p>
                </div>
                <Button className="bg-red-700 text-white w-44 px-4 py-2 rounded hover:opacity-85">
                  Supprimer mon compte
                </Button>
              </div>
            </TabsContent>
            <TabsContent
              className="bg-gray-100 rounded-xl px-6 py-6"
              value="factures"
            >
              Aucune factures pour le moment.
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;

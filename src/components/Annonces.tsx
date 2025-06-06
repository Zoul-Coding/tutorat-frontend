import React, { useState } from "react";
import { Book, PlusCircle, Edit3, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import FormAnnonces from "./FormAnnonces";

export default function Annonces() {
  const [open, setOpen] = useState(false);
  const [annonces, setAnnonces] = useState([
    {
      id: 1,
      title:
        "Étudiant en école de Commerce donne cours d'Anglais en Prépa, HE...",
      price: "35,00 €",
      subjects: ["Allemand", "Prépa"],
      status: "Inactive",
      location: "Brouillon",
      isActive: false,
    },
    {
      id: 2,
      title: "Brouillon",
      price: "",
      subjects: [],
      status: "Inactive",
      location: "Brouillon",
      isActive: false,
    },
  ]);

  const toggleActive = (id: any) => {
    setAnnonces((prev) =>
      prev.map((annonce) =>
        annonce.id === id
          ? { ...annonce, isActive: !annonce.isActive }
          : annonce
      )
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto pt-32 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Book className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Annonces</h1>
          </div>
          <Button onClick={() => setOpen(true)} className="bg-primary hover:opacity-85 text-white font-medium px-6 py-2 rounded flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Créer une annonce
          </Button>
            <FormAnnonces open={open} setOpen={setOpen} />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <User className="h-7 w-7 text-orange-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Cours</h2>
        </div>
      </div>

      {/* Annonces List */}
      <div className="space-y-4">
        {annonces.map((annonce) => (
          <Card
            key={annonce.id}
            className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {annonce.title}
                      </h3>

                      <div className="flex items-center gap-3 mb-4">
                        {annonce.subjects.map((subject, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-600 border-red-200"
                        >
                          {annonce.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200"
                        >
                          {annonce.location}
                        </Badge>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-6">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-gray-600 rounded hover:text-gray-800 border-gray-300 hover:border-gray-400"
                            >
                              <Edit3 className="h-4 w-4 mr-2" />
                              Modifier l'annonce
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 rounded hover:text-red-700 border-red-300 hover:border-red-400"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </Button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">
                              Inactive
                            </span>
                            <Switch
                              checked={annonce.isActive}
                              onCheckedChange={() => toggleActive(annonce.id)}
                              className="data-[state=checked]:bg-primary bg-gray-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {annonce.price && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {annonce.price}
                        </div>
                        <div className="text-sm text-gray-500">/heure</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {annonces.length === 0 && (
        <div className="text-center py-12">
          <Book className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune annonce créée
          </h3>
          <p className="text-gray-500 mb-6">
            Commencez par créer votre première annonce pour proposer vos cours.
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <PlusCircle className="h-5 w-5 mr-2" />
            Créer ma première annonce
          </Button>
        </div>
      )}
    </div>
  );
}

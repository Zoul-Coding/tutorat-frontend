import React from 'react';
import { Cog } from 'lucide-react';
import Logo from "../assets/annuaire.png";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col items-center justify-center p-4">
      {/* Container principal */}
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo placeholder - Remplacez par votre logo */}
       

        <div className="mb-8 flex justify-center items-center w-full">
          <div className="relative w-32 h-32 flex items-center justify-center">
          <img
            src={Logo}
            alt="Logo du site"
            className="lg:w-40 w-28 h-auto"
          />
          </div>
        </div>

        {/* Icône animée */}
        <div className="mb-8">
          <Cog 
            className="w-16 h-16 text-marronFonce mx-auto animate-spin" 
            style={{ animationDuration: '3s' }} 
          />
        </div>

        {/* Titre avec animation de fade-in */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
          Site en maintenance
        </h1>

        {/* Message avec animation de slide-up */}
        <p className="text-xl text-gray-600 mb-8 animate-slide-up">
          Nous effectuons actuellement des améliorations pour vous offrir une meilleure expérience.
          Merci de votre patience !
        </p>

        {/* Barre de progression animée */}
        <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-marronFonce rounded-full animate-progress" />
        </div>

        {/* Message de retour */}
        <p className="mt-8 text-gray-500">
          Nous serons bientôt de retour !
        </p>
      </div>

      {/* Style pour les animations personnalisées */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes progress {
          0% { width: 0; }
          50% { width: 70%; }
          100% { width: 100%; }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MaintenancePage;
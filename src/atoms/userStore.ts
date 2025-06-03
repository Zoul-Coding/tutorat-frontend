import { atom } from "jotai";



// Clé de stockage dans localStorage
const STORAGE_KEY = "user";

// Fonction pour lire les données depuis localStorage
const getInitialUser = (): User | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

type User = {
  id: string;
  name: string;
  nom: string;
  prenom: string;
  email: string;
};


// Atom avec valeur initiale depuis localStorage
export const userAtom = atom<User | null>(getInitialUser());

// Atom qui met à jour localStorage à chaque set
export const userWithStorageAtom = atom(
  (get) => get(userAtom),
  (get, set, newUser: User | null) => {
    set(userAtom, newUser);

    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
);

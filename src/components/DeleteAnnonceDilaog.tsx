import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import annonceService from "@/services/annonce.service";
import { mutate } from "swr";

type Props = {
  annonceId: string | null;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function DeleteAnnonceDialog({ open, setOpen, annonceId }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await annonceService.deleteAnnonce(annonceId!);
      toast.success(response?.message);
      mutate("fetch_user_annonce");
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Voulez-vous vraiment supprimer cette annonce ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button className="bg-transparent border border-gray-400 rounded" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button
           className="bg-red-500 hover:bg-red-400 text-white rounded"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Suppression..." : "Oui, supprimer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

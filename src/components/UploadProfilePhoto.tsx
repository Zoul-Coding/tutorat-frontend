import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import userProfile from "@/services/user.service";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const profileSchema = z.object({
  imageUrl: z
    .any()
    .refine((file: FileList) => file?.[0], {
      message: "Veuillez sélectionner un fichier.",
    })
    .refine((file: FileList) => file?.[0]?.size <= 5 * 1024 * 1024, {
      message: "Le fichier doit faire moins de 5 Mo.",
    })
    .refine(
      (file: FileList) => ["image/jpeg", "image/png"].includes(file?.[0]?.type),
      {
        message: "Formats autorisés: JPEG ou PNG.",
      }
    ),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const UploadProfilePhoto = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      imageUrl: null,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("imageUrl", data.imageUrl[0]);

    try {
      const response = await userProfile.uploadProfilePhoto(formData);
      toast.success(response?.message);
    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.message || error;
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-6 border-2 border-dashed rounded-xl text-center mb-4"
    >
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto w-32 h-32 object-cover rounded-full"
            />
          ) : (
            <div className="w-32 h-32 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
              <span className="text-gray-400 text-3xl">📷</span>
            </div>
          )}
        </div>

        <label className="block mb-2 font-semibold">
          Mettez votre photo ici
        </label>

        <input
          type="file"
          {...register("imageUrl")}
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="block w-full border-2 border-dashed text-md text-gray-500 py-2 px-3"
        />

        {errors.imageUrl && typeof errors.imageUrl.message === "string" && (
          <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
        )}

        <button
          disabled={isSubmitting}
          type="submit"
          className="mt-4 w-full py-2 bg-primary text-white rounded hover:opacity-85"
        >
          {isSubmitting ? (
            <>
              <Loader className="text-white mr-2 h-5 w-5 animate-spin" />
              Ajout...
            </>
          ) : (
            "Ajouter"
          )}
        </button>

        <p className="text-xs text-gray-500 mt-2">
          Format: JPEG ou PNG
          <br />
          Dimensions: 500x500px minimum
          <br />
          Poids: 5Mo maximum
        </p>
      </div>
    </form>
  );
};

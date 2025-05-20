import { useEffect, useState } from "react";
import DefaultImg from "../assets/default-featured.jpg";
import { Link } from "react-router-dom";
import { Check, Mail, Phone, MapPinned, X } from "lucide-react";
import { BiSolidCity } from "react-icons/bi";
import { MdLocationCity } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { PiGenderIntersex } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { BsSignpost2 } from "react-icons/bs";
import useFetchInfoUser from "@/requests/useFetchInfoUser";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { mutate } from "swr";
import { api } from "@/services/http";
import { Loader } from "lucide-react";
import { toast } from "sonner";

function Profile() {
  const { data: infoUser, isLoading: loading } = useFetchInfoUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    mutate("fetch_info_user");
  }, []);

  /*  async function demandeCertif() {
    try {
      setIsSubmitting(true);

      await api.get('/certification-request');
      toast.success("Votre demande de certification de compte a été envoyée avec succès.");

      mutate('fetch_info_user');
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || err;
      ("Une erreur inattendue s'est produite.");
      toast.error(errorMessage);      
    } finally {
      setIsSubmitting(false);
    }
  } */

  return (
    <section className="max-w-screen-xl mx-auto xl:px-0 px-5 md:pt-40 pt-28 md:pb-32 pb-20">
      <div className="bg-white rounded border border-gray-200 shadow">
        <div className="flex flex-col gap-12 px-12 py-12">
          <div className="flex lg:flex-row flex-col justify-between lg:items-center items-start gap-6 w-full">
            <div className="flex items-center gap-6 w-full">
              <img
                src={
                  infoUser?.media?.length! > 0
                    ? infoUser?.media[0]?.original_url
                    : DefaultImg
                }
                className="w-24 h-20 rounded"
                alt=""
              />
              <div className="flex flex-col gap-3">
                <h3 className="font-medium">
                  {infoUser?.last_name} {infoUser?.first_name}
                </h3>
                <div className="flex gap-3 w-full">
                  <div className="bg-orange-50 rounded-full flex justify-center items-center w-[120px]">
                    <p className="text-orange-400 text-sm font-medium">
                      {infoUser?.is_professional === 0
                        ? "Particulier"
                        : "Professionnel"}
                    </p>
                  </div>
                  {infoUser?.is_certified === 0 ? (
                    <div className="bg-red-50 rounded-full flex justify-center py-2 w-[50px]">
                      <X className="text-red-500 text-sm" />
                    </div>
                  ) : (
                    <div className="bg-green-50 rounded-full flex justify-center py-2 w-[50px]">
                      <Check className="text-green-400 text-sm" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col sm:items-center items-start gap-6">
              <Link
                to="/parametre"
                className="flex justify-center w-[200px] items-center bg-custom-gradient md:h-10 h-8 rounded md:text-base text-sm text-white font-medium hover:opacity-85"
              >
                Modifier le profil
              </Link>
              {/*  <Button 
              disabled={isSubmitting && infoUser?.is_certified === 1}
              onClick={demandeCertif} 

              className="flex justify-center items-center bg-marronFonce md:h-10 h-8 rounded md:text-base text-sm text-white font-medium hover:opacity-85">
                 {isSubmitting ? (
                <>
                  <Loader className="text-white h-5 w-5 animate-spin" />
                </>
              ) : 'Demande de certification'}
              </Button> */}
            </div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 items-center w-full">
            <div className="border border-gray-300 rounded px-6 py-6 w-full">
              <div className="flex gap-4 items-center">
                <Mail className="text-gray-500 w-7 h-7" />
                <div className="flex flex-col">
                  <h3 className="text-gray-500">Email</h3>
                  {infoUser?.email ? (
                    <p className="text-gray-500 font-medium text-md">
                      {infoUser?.email}
                    </p>
                  ) : (
                    <p className="text-gray-500 font-medium text-md">Inconnu</p>
                  )}
                </div>
              </div>
            </div>
            <div className="border border-gray-300 rounded px-6 py-6 w-full">
              <div className="flex gap-4 items-center">
                <Phone className="text-gray-500 w-7 h-7" />
                <div className="flex flex-col">
                  <h3 className="text-gray-500">Téléphone</h3>
                  {infoUser?.phone_number ? (
                    <p className="text-gray-500 font-medium text-md">
                      {infoUser?.phone_number}
                    </p>
                  ) : (
                    <p className="text-gray-500 font-medium text-md">Inconnu</p>
                  )}
                </div>
              </div>
            </div>
            <div className="border border-gray-300 rounded px-6 py-6 w-full">
              <div className="flex gap-4 items-center">
                <MapPinned className="text-gray-500 w-7 h-7" />
                <div className="flex flex-col">
                  <h3 className="text-gray-500">Localisation</h3>
                  {infoUser?.address ? (
                    <p className="text-gray-500 font-medium text-md">
                      {infoUser?.address}
                    </p>
                  ) : (
                    <p className="text-gray-500 font-medium text-md">Inconnu</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 items-center w-full px-6 py-6">
            <h3 className="text-2xl text-gray-500 font-medium">
              Informations générales
            </h3>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 pt-6">
              {infoUser?.country ? (
                <div className="flex gap-4 items-center">
                  <BiSolidCity className="text-gray-500 w-7 h-7" />
                  <div className="flex flex-col">
                    <h3 className="text-gray-500">Pays</h3>
                    <p className="text-gray-500 font-medium text-md">
                      {infoUser?.country}
                    </p>
                  </div>
                </div>
              ) : null}
              {infoUser?.email_verified_at ? (
                <div className="flex gap-4 items-center">
                  <IoCalendarOutline className="text-gray-500 w-7 h-7" />
                  <div className="flex flex-col">
                    <h3 className="text-gray-500">Date de création</h3>
                    <p className="text-gray-500 font-medium text-md">
                      {formatDate(infoUser?.email_verified_at)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 font-medium text-md">Inconnu</p>
              )}
              {infoUser?.city ? (
                <div className="flex gap-4 items-center">
                  <MdLocationCity className="text-gray-500 w-7 h-7" />
                  <div className="flex flex-col">
                    <h3 className="text-gray-500">Ville</h3>
                    <p className="text-gray-500 font-medium text-md">
                      {infoUser?.city}
                    </p>
                  </div>
                </div>
              ) : null}
              {infoUser?.gender ? (
                <div className="flex gap-4 items-center">
                  <PiGenderIntersex className="text-gray-500 w-7 h-7" />
                  <div className="flex flex-col">
                    <h3 className="text-gray-500">Genre</h3>
                    <p className="text-gray-500 font-medium text-md">
                      {infoUser?.gender}
                    </p>
                  </div>
                </div>
              ) : null}
              {infoUser?.certification_date ? (
                <div className="flex gap-4 items-center">
                  <CiCalendarDate className="text-gray-500 w-7 h-7" />
                  <div className="flex flex-col">
                    <h3 className="text-gray-500">Date de certification</h3>
                    {infoUser?.certification_date === null ? (
                      <p className="text-gray-500 font-medium text-md">
                        Invalid Date
                      </p>
                    ) : (
                      <p className="text-gray-500 font-medium text-md">
                        {formatDate(infoUser?.certification_date)}
                      </p>
                    )}
                  </div>
                </div>
              ) : null}
              {infoUser?.postal_code ? (
                <div className="flex gap-4 items-center">
                  <BsSignpost2 className="text-gray-500 w-7 h-7" />
                  <div className="flex flex-col">
                    <h3 className="text-gray-500">Code postal</h3>
                    <p className="text-gray-500 font-medium text-md">
                      {infoUser?.postal_code}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;

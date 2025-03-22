import useStore from "@/store/useStore";
import { FormsType } from "@/types/forms";
import { Input } from "@/ui/design-system/forms/input";
import { SelectCountry } from "@/ui/design-system/forms/selectCountry";
import { Typography } from "@/ui/design-system/typography/typography";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "react-select";

interface Props {
  form: FormsType;
}

export const InformationsAdvanceForm = ({ form }: Props) => {
  const { control, isLoading, register, errors } = form;
  const today = new Date().toISOString().split("T")[0];
  // Pour stocker le key_company de l'utilisateur
  const [missions, setMissions] = useState(null); // Pour stocker les missions récupérées
  const [selectedMissionId, setSelectedMissionId] = useState("");
  const { user, setUser } = useStore();
  // Pour stocker l'ID de la mission sélectionnée
  // Fonction pour récupérer le key_company et les missions depuis l'API
  const fetchMissionsForUser = async () => {
    try {
      console.log("Company", user.key_company);
      const response = await fetch(
        `http://127.0.0.1:8000/api/get-tdr-ids-by-key-company/${user.key_company}`
      );
      const data = await response.json();

      if (response.ok) {
        setMissions(data); // Met à jour la liste des missions
      } else {
        toast.error(data.message); // Si l'API retourne un message d'erreur
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des missions :", error);
    }
  };

  // Appel de l'API pour récupérer les informations au premier rendu
  useEffect(() => {
    if (user?.key_company) {
      fetchMissionsForUser();
    } else {
      console.error("key_company is undefined");
    }
  }, [user]);

  const arr: string[] = [];
  const [formattedMissions, setFormattedMissions] = useState(null);
  useEffect(() => {
    if (missions !== null && Array.isArray(missions)) {
      const formatted = missions.map((mission) => ({
        value: mission.id,
        label: mission.mission_title,
      }));

      // Pour vérifier si les données sont bien formatées
      setFormattedMissions(formatted); // Met à jour l'état avec les missions formatées

      // Remplir le tableau arr avec les valeurs des missions
      const missionIds = missions.map((option) => option.id); // Ne pas muter directement arr
      console.log("Mission IDs:", missionIds); // Pour vérifier si les ids sont bien extraits
      // Mettre à jour l'état de arr
    } else {
      console.log("Missions is not an array or is null");
    }
  }, [missions]);

  return (
    <>
      <Typography variant="h5" theme="black" tag="h5" className="text-center">
        Demande d'avance
      </Typography>
      {formattedMissions && formattedMissions.length > 0 && (
        <Controller
          name="missionId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "#E5E5E5",
                  borderColor: state.isFocused ? "#E5E5E5" : "#E5E5E5",
                  hover: "none",
                }),
              }}
              className="p-3 w-full font-white rounded focus:outline-none focus:ring-1 bg-gray-500 text-gray"
              options={formattedMissions} // Vérifier que formattedMissions est bien un tableau d'objets {value, label}
              value={formattedMissions.find((c) => c.value === value) || null} // Vérifier que value est un objet compatible
              onChange={(val) => onChange(val ? val.value : null)} // Envoyer la valeur correcte (val.value)
            />
          )}
        />
      )}
      <div>
        <div className="grid grid-cols-2 gap-5 mb-5">
          <Input
            id="social_security_number"
            type="text"
            placeholder="Numéro de sécurité sociale"
            register={register}
            errors={errors}
            required={true}
            isLoading={isLoading}
          />
          <SelectCountry control={control} errors={errors} id="nationality" />
        </div>
        <div className="grid grid-cols-2 gap-5 mb-5 items-center">
          <Input
            id="address"
            type="text"
            placeholder="Adresse"
            register={register}
            errors={errors}
            required={true}
            isLoading={isLoading}
          />
          <Typography variant="caption2" tag="p" theme="gray">
            (Exemple: Lot ... Quartier Ville)
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div>
            <label htmlFor="date_requested">Date du requête :</label>
            <Input
              id="date_requested"
              type="date"
              register={register}
              errors={errors}
              required={true}
              isLoading={isLoading}
              defaultValue={today}
            />
          </div>
          <div>
            <label htmlFor="date_need_by">Date requise :</label>
            <Input
              id="date_need_by"
              type="date"
              register={register}
              errors={errors}
              required={true}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-5">
          <Input
            id="purpose_of_travel"
            type="text"
            placeholder="Motif du voyage"
            register={register}
            errors={errors}
            required={true}
            isLoading={isLoading}
          />
          <Input
            id="destination"
            type="text"
            placeholder="Destination"
            register={register}
            errors={errors}
            required={true}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

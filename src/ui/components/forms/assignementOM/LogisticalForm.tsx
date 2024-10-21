import { FormsType } from "@/types/forms";
import { Typography } from "@/ui/design-system/typography/typography";

interface Props {
  form: FormsType;
}

export const LogisticalForm = ({ form }: Props) => {
  const { isLoading, register, errors } = form;
  return (
    <>
      <select
        id="countries"
        className="p-4 w-full font-white rounded focus:outline-none   bg-gray-500 text-gray-800"
      >
        <option selected>Choisit votre moyen de transport</option>
        <option value="">Avion</option>
        <option value="">Taxi</option>
        <option value="">Taxi Brousse</option>
        <option value="">Voiture personnel</option>
        <option value="">Voiture du projet</option>
      </select>

      <Typography variant="lead" tag="h5" theme="black" className="text-center">
        Autres Exigences Logistiques
      </Typography>

      <textarea
        className="placeholder-gray-600  p-4 w-full font-white rounded focus:outline-none  bg-gray-500 text-gray-800 resize-none"
        name=""
        id="other_logistical_requirments"
        placeholder="Autre details"
      ></textarea>
    </>
  );
};

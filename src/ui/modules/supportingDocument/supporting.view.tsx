import { FormsType } from "@/types/forms";
import { SupportingForm } from "./supporting.fom";

interface Props {
  form: FormsType;
}

export const SupportingView = ({ form }: Props) => {
  return <SupportingForm form={form} />;
};

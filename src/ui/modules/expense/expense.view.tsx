import { FormsType } from "@/types/forms";
import { ExpenseForm } from "./expense.form";

interface Props {
  form: FormsType;
}

export const ExpenseView = ({ form }: Props) => {
  return <ExpenseForm form={form} />;
};

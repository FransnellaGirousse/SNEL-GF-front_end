"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ExpenseFormFieldsType } from "@/types/forms";
import { ExpenseView } from "./expense.view";

export const ExpenseContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<ExpenseFormFieldsType>();
  const onSubmit: SubmitHandler<ExpenseFormFieldsType> = async (formData) => {
    setIsLoading(true);
    console.log("formData", formData);
  };
  return (
    <ExpenseView
      form={{ handleSubmit, errors, register, onSubmit, isLoading }}
    />
  );
};

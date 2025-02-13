import { FormsType } from "@/types/forms";
import { LuLogIn } from "react-icons/lu";
import { Input } from "@/ui/design-system/forms/input";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  form: FormsType;
}

export const AdminLoginForm = ({ form }: Props) => {
  const { handleSubmit, errors, register, onSubmit, isLoading } = form;

  const [clientSideLoading, setClientSideLoading] = useState(false);

  useEffect(() => {
    setClientSideLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-8 pb-5 space-y-4">
        <Input
          isLoading={isLoading}
          placeholder="youremail@gmail.com"
          type="email"
          register={register}
          errors={errors}
          id="email"
          pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
          messagePattern="Votre email est invalide"
        />
        <Input
          isLoading={isLoading}
          placeholder="Mot de passe"
          type="password"
          register={register}
          errors={errors}
          id="password"
        />

        <div className="flex justify-between items-center">
          <Typography variant="caption4" tag="span" theme="primary">
            <Link
              href="/forget-password"
              className="hover:text-primary-600 transition-all hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </Typography>
          <Button
            isLoading={isLoading}
            type="submit"
            icon={{ icon: LuLogIn }}
            iconPosition="left"
          >
            Se Connecter
          </Button>
        </div>
      </form>
    </>
  );
};

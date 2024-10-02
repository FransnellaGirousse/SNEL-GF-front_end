
import {redirect} from "next/navigation";
import { toast } from "react-toastify";

export const redirection = () => {
    toast.success(
      "Vous devez connecter pour accéder à la contenue de cette page !"
    );
    redirect("/login")
}
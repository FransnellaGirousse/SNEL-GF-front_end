import {PropsWithChildren} from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navigation} from "@/ui/components/navigation/navigation";

export const Layout = ({children}: PropsWithChildren) => {
    return <>
        <ToastContainer
            position="top-center"
            autoClose={8000}
        />
        <Navigation/>
        {children}
    </>
}
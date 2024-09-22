import {PropsWithChildren} from "react";
import {Navigation} from "@/ui/components/navigation/navigation";

export const Layout = ({children}: PropsWithChildren) => {
    return <>
        <Navigation/>
        {children}
    </>
}
import { FinancialManagementAnimation } from "./components/FinancialManagementAnimation";
import { Footer } from "./components/Footer";
import { SubscriptionPlans } from "./components/SubscriptionPlans ";
import { AcceuilComponents } from "./components/acceuilComponents";

export const HomeView = () => {
  return (
    <>
      <AcceuilComponents/> 
      <FinancialManagementAnimation/>
      <SubscriptionPlans/>
      <Footer/>
     
    </>
  ) 
};

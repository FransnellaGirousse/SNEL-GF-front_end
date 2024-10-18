import { AcceuilComponents } from "./components/acceuilComponents";
import { NewsletterComponents } from "./components/newsletterComponents";
import { PricingComponents } from "./components/pricingComponents";
import { TestimonialComponents } from "./components/testimonialComponents";


export const HomeView = () => {
  return (
    <>
      <AcceuilComponents/> 
      <TestimonialComponents />
      <PricingComponents />
      <NewsletterComponents />
     
    </>
  );
};

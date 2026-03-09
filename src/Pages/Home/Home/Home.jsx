import React from 'react'
import Banner from '../Banner/Banner';
import HowItWorks from './HowItWorks/HowItWorks';
import Services from './Services/Services';
import PartnerBrands from './PartnerBrands/PartnerBrands';
import FeatureSection from './FeatureSection/FeatureSection';
import Merchant from './Merchant/Merchant';
import CustomerReviewSection from './CustomerReviewSection/CustomerReviewSection';
import FAQSection from './FAQ/FAQ';

const Home = () => {
  return (
    <div className="bg-base-200">
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Services></Services>
      <PartnerBrands></PartnerBrands>
      <FeatureSection></FeatureSection>
      <Merchant></Merchant>
      <CustomerReviewSection></CustomerReviewSection>
      <FAQSection></FAQSection>
    </div>
  )
}

export default Home;

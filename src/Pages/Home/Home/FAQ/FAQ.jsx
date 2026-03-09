import React, { useState } from "react";

const faqs = [
  {
    q: "How fast is QuickDrop delivery?",
    a: "Most deliveries are completed within 24–48 hours depending on the location."
  },
  {
    q: "Can I track my parcel?",
    a: "Yes, we provide real-time tracking from pickup to delivery."
  },
  {
    q: "Do you offer cash on delivery?",
    a: "Yes, COD is available for selected regions and merchants."
  },
  {
    q: "Is my package insured?",
    a: "We provide optional insurance for valuable items."
  },
  {
    q: "Do you provide international shipping?",
    a: "Currently we focus on nationwide delivery only."
  },
  {
    q: "How can I contact support?",
    a: "You can reach us 24/7 through live chat or hotline."
  }
];

const FAQSection = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 3);

  return (
    <section className="my-0 px-4 max-w-4xl mx-auto text-center">

      {/* TITLE */}
      <h2 className="text-3xl md:text-4xl font-bold text-primary">
        Frequently Asked Questions (FAQ's)
      </h2>

      {/* SUB TEXT */}
      <p className="text-gray-500 mt-3 mb-10">
        Everything you need to know about our delivery services.
      </p>

      {/* ACCORDION */}
      <div className="space-y-4 text-left">
        {visibleFaqs.map((faq, i) => (
          <div
            key={i}
            className="collapse collapse-plus bg-base-100 shadow-md rounded-xl"
          >
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold text-primary">
              {faq.q}
            </div>
            <div className="collapse-content text-gray-600">
              {faq.a}
            </div>
          </div>
        ))}
      </div>

      {/* SEE MORE BUTTON */}
      <div className="mt-8">
        <button
          onClick={() => setShowAll(!showAll)}
          className="btn btn-outline btn-primary mb-15 rounded-full px-8"
        >
          {showAll ? "Show Less" : "See More FAQ's"}
        </button>
      </div>

    </section>
  );
};

export default FAQSection;

import React, { useRef } from "react";
import reviewImg from "/src/assets/customer-top.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const reviews = [
    {
        comment: "QuickDrop delivery is super fast and reliable. Highly recommended!",
        name: "John Carter",
        role: "E-commerce Seller",
    },
    {
        comment: "Their customer service is amazing and always helpful.",
        name: "Sarah Ahmed",
        role: "Business Owner",
    },
    {
        comment: "Tracking system is smooth and easy to use.",
        name: "Michael Lee",
        role: "Entrepreneur",
    },
    {
        comment: "Secure packaging and timely delivery every time.",
        name: "David Khan",
        role: "Store Manager",
    },
];

const CustomerReviewSection = () => {
    const swiperRef = useRef(null);

    return (
        <section className="my-24 px-4 text-center">

            {/* TOP IMAGE */}
            <img src={reviewImg} alt="Review" className="mx-auto w-24 mb-6" />

            {/* TITLE */}
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
                What Our Customers Say
            </h2>

            {/* TEXT */}
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                Trusted by thousands of businesses and individuals nationwide.
            </p>

            {/* SLIDER */}
            <div className="mt-12">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    centeredSlides
                    loop
                    spaceBetween={30}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    pagination={{ el: ".review-pagination", clickable: true }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    breakpoints={{
                        0: { slidesPerView: 1.2 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="review-swiper"
                >
                    {reviews.map((review, i) => (
                        <SwiperSlide key={i}>
                            <div className="review-card bg-white shadow-lg rounded-2xl p-8 h-full transition duration-300">

                                <p className="text-gray-600 pb-4 border-b border-dashed border-primary/40">
                                    {review.comment}
                                </p>

                                <h3 className="mt-4 font-semibold text-primary">
                                    {review.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {review.role}
                                </p>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* CONTROLS */}
                <div className="flex items-center justify-center gap-3 mt-6">

                    {/* PREV BUTTON - HIDDEN ON MOBILE */}
                    <button
                        onClick={() => swiperRef.current.slidePrev()}
                        className="hidden md:flex btn btn-circle btn-xs bg-white xl:ml-90 md:ml-60 mb-2 hover:bg-primary hover:text-white transition"
                    >
                        ❮
                    </button>

                    {/* DOTS */}
                    <div className="review-pagination"></div>

                    {/* NEXT BUTTON - HIDDEN ON MOBILE */}
                    <button
                        onClick={() => swiperRef.current.slideNext()}
                        className="hidden md:flex btn btn-circle btn-xs bg-white xl:me-90 md:me-60 mb-2 hover:bg-primary hover:text-white transition"
                    >
                        ❯
                    </button>

                </div>

            </div>
        </section>
    );
};

export default CustomerReviewSection;

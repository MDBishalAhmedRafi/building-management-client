// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/autoplay";
// import "swiper/css/pagination";

// const banners = [
//   {
//     title: "Smart Living Starts Here",
//     description: "Your Building, Seamlessly Managed.",
//     image: "https://i.ibb.co/rfdjp4Hj/aprtment1.png",
//   },
//   {
//     title: "Living Made Simple",
//     description: "One Building. One System. Complete Control.",
//     image: "https://i.ibb.co/rgLjh9g/apartment3.png",
//   },
//   {
//     title: "Where Comfort Meets Control",
//     description: "Experience Hassle-Free Living – Your Building, Your Way.",
//     image: "https://i.ibb.co/fPMGS0q/apartment2.png",
//   },
// ];

// const Hero = () => {
//   //lg:mt-21 md:mt-21 mt-21
//   return (
//     <div
//       className="relative w-full h-[400px] md:h-[500px] overflow-hidden 
//                                  "
//     >
//       <Swiper
//         modules={[Autoplay, Pagination]}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         loop={true}
//         className="w-full h-full"
//       >
//         {banners.map((banner, index) => (
//           <SwiperSlide key={index}>
//             <div
//               className="w-full h-full bg-cover bg-center flex items-center justify-center text-center px-4"
//               style={{ backgroundImage: `url(${banner.image})` }}
//             >
//               <div className="bg-opacity-50 p-6 rounded-2xl text-black max-w-xl">
//                 <h2 className="text-3xl md:text-5xl font-bold mb-4">
//                   {banner.title}
//                 </h2>
//                 <p className="text-md md:text-lg">{banner.description}</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default Hero;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const banners = [
  {
    title: "Smart Living Starts Here",
    description: "Your Building, Seamlessly Managed.",
    image: "https://i.ibb.co/rfdjp4Hj/aprtment1.png",
  },
  {
    title: "Living Made Simple",
    description: "One Building. One System. Complete Control.",
    image: "https://i.ibb.co/rgLjh9g/apartment3.png",
  },
  {
    title: "Where Comfort Meets Control",
    description: "Experience Hassle-Free Living – Your Building, Your Way.",
    image: "https://i.ibb.co/fPMGS0q/apartment2.png",
  },
];

const Hero = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              {/* Soft black overlay */}
              <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

              {/* Text content */}
              <div className="relative z-20 w-full h-full flex flex-col justify-center items-center text-center px-4 text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {banner.title}
                </h2>
                <p className="text-md md:text-lg max-w-xl drop-shadow-md">
                  {banner.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;



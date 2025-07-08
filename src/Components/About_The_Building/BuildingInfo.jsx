import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const BuildingInfo = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-base-200 to-base-100 py-10 px-4 md:px-20"
    >
      <div className="" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center text-[#987b53] mb-10">
          About the Building
        </h2>

        <div className="space-y-6 text-lg text-[#797e82] leading-relaxed">
          <p>
            Welcome to <span className="text-primary font-semibold">BuildEase Tower</span> — a
            modern, smart, and secure residential building designed with
            residents' comfort in mind. Located in the heart of the city, our
            building combines architectural elegance with cutting-edge
            technology to deliver a premium living experience.
          </p>

          <p>
            The building comprises <span className="font-medium text-secondary">120+ fully
            furnished apartments</span>, each fitted with high-speed internet,
            smart locks, energy-efficient lighting, and dedicated maintenance
            support. Residents enjoy access to a community rooftop garden,
            fitness center, 24/7 security surveillance, and seamless online rent
            payments.
          </p>

          <p>
            At <span className="font-semibold text-accent">BuildEase</span>, we believe in
            fostering a connected and vibrant community. Whether you're a
            student, a working professional, or a family, our management system
            ensures that everything — from announcements to payments — is just a
            click away.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default BuildingInfo;

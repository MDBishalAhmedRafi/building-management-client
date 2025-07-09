import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Fix marker icon path issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ApartmentMap = () => {
  const shantibaghCoords = [23.7486, 90.4126]; // Shantibagh, Dhaka

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="px-4 md:px-20 py-16 bg-gradient-to-br from-base-200 to-base-100"
    >
      <div className="">
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-[#987b53] mb-6"
          data-aos="fade-up"
        >
          Our Apartment Location
        </h2>

        <p
          className="text-center text-lg text-[#797e82] mb-10 max-w-2xl mx-auto"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          Find us in the heart of Dhaka — Shantibagh, where comfort meets convenience.
        </p>

        <motion.div
          className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <MapContainer
            center={shantibaghCoords}
            zoom={16}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={shantibaghCoords}>
              <Popup>
                <strong>BuildEase Apartment</strong> <br />
                Shantibagh, Dhaka.
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ApartmentMap;

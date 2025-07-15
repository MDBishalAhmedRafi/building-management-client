import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/announcements", data);
      if (res.data.insertedId) {
        toast.success("Announcement posted successfully!");
        reset();
      } else {
        toast.error("Failed to post announcement.");
      }
    } catch (error) {
                console.log(error)
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h2
        className="text-3xl md:text-4xl font-bold text-center text-[#987b53] mb-10"
        data-aos="fade-down"
      >
        Make Announcement
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-6 md:p-8 rounded-lg shadow-lg space-y-6"
        data-aos="fade-up"
      >
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter announcement title"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Write the announcement details..."
            rows={5}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="btn w-full bg-[#987b53] text-white hover:bg-[#7c633f]"
        >
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;

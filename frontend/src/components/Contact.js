import React from "react";
import image from "../assets/contact-1.png";
const Contact = () => {
  return (
    <main className="flex overflow-hidden">
      <div className="flex-1 hidden lg:block">
        <img
          src={image}
          className="h-screen object-cover"
          alt="a plant"
        />
      </div>
      <div className="py-12 flex-1 lg:flex lg:justify-center lg:h-screen lg:overflow-auto">
        <div className="max-w-lg flex-1 mx-auto px-4 text-gray-600">
          <div className="text-center">
            <h3 className="text-5xl font-bold font-title">
              Let's Get In Touch!
            </h3>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5 mt-12 lg:pb-12"
          >
            <div>
              <label className="text-dullGreen font-bold">Full name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-mediumGreen focus:border-dullGreen shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="text-dullGreen font-bold">Email</label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 border-mediumGreen bg-transparent outline-none border focus:border-dullGreen shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="text-dullGreen font-bold">Phone number</label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                  <select className="text-sm bg-transparent outline-none rounded-lg h-full">
                    <option>MY</option>
                    <option>US</option>
                    <option>SG</option>
                  </select>
                </div>
                <input
                  type="number"
                  placeholder="+(60)00 - 0000 0000"
                  required
                  className="w-full pl-[4.5rem] pr-3 py-2 appearance-none border-mediumGreen bg-transparent outline-none border focus:border-dullGreen shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="text-dullGreen font-bold">Message</label>
              <textarea
                required
                className="w-full mt-2 h-36 px-3 py-2 resize-none border-mediumGreen appearance-none bg-transparent outline-none border focus:border-dullGreen shadow-sm rounded-lg"
              ></textarea>
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-mediumGreen hover:bg-dullGreen rounded-lg duration-150">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;

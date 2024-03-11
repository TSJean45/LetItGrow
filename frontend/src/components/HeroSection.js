import { Header } from "../components";
import heroImage from "../assets/heroPlant-1.png";
import { RoughNotation } from "react-rough-notation";

const HeroSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="relative h-full">
        <Header />
        <section className="flex items-center justify-center">
          <div className="max-w-screen-xl mx-auto px-4 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex h-full">
            <div className="flex-1 flex flex-col justify-center space-y-5 max-w-xl">
              <h1 className="font-title text-gray-800 font-extrabold text-6xl">
                <RoughNotation type="highlight" show={true} color="#C7DBE8" animationDelay="10" animationDuration="2000" padding="0" strokeWidth="0">
                  Future of Farming
                </RoughNotation>
              </h1>
              <h1 className="font-title text-gray-800 font-extrabold text-6xl">
                Begins Here
              </h1>
              <p className="text-lg font-medium">
                Let Your Passion Flourish, Let AI Handle the Rest.
              </p>
              <div className="flex items-center justify-start gap-x-3 sm:text-sm">
                <a
                  href="/"
                  className="flex items-center justify-center text-lg gap-x-1 py-2 px-4 text-white font-medium bg-mediumGreen duration-150 hover:bg-darkGreen active:bg-gray-900 rounded-full md:inline-flex"
                >
                  Get started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex-1 hidden md:block">
              <img width={500} src={heroImage} alt="A potted plant" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;

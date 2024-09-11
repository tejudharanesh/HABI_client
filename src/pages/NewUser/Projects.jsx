import * as React from "react";
import thumbNail from "../../assets/images/tumbnail.png";
import home from "../../assets/images/home.png";
import Footer from "../../components/Footer/Footer";
import youtube from "../../assets/svg/youtube.svg";

function Projects({ isExpanded }) {
  return (
    <div className="min-h-screen flex flex-col font-poppins w-full bg-layoutColor">
      <div
        className={`flex flex-col w-full bg-layoutColor h-auto p-2 ${
          isExpanded ? "md:px-20 lg:px-72" : "md:px-16 lg:px-60"
        }`}
      >
        <div className="text-2xl font-semibold text-center text-black">
          Projects
        </div>
        <div className="text-lg text-black mt-4 ml-2 ">Completed</div>

        <div className="mt-1 w-full">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <div className="rounded-xl border border-solid border-stone-300 w-[173px] h-[117px] md:h-[117px] md:w-[222px] lg:w-[270px]  lg:h-[143px] relative">
                <a href="https://youtu.be/tVH_rxUKsvM?si=04ErJhT9KYM2igXw">
                  <img
                    src={thumbNail}
                    className="w-[173px] h-[117px] md:w-[222px] md:h-[117px] lg:w-[270px] lg:h-[143px]"
                  />
                  <img
                    src={youtube} // Replace with the path to your YouTube icon
                    alt="YouTube Icon"
                    className="absolute inset-0 m-auto w-7 h-8"
                  />
                </a>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="text-[16px] text-black">Arvind Kumar</div>
              <div className="text-gray-500 text-[14px]">Bengaluru</div>
              <div className="shrink-0 border border-solid bg-stone-300 border-stone-300 my-2" />
              <div className="text-sm text-black">1200 Sq. Feet</div>
              <div className="text-sm text-black">3BHK Duplex villa</div>
              <div className="text-sm text-black">Orientation: West</div>
            </div>
          </div>
        </div>
        <div className="mt-3 w-full">
          <div className="flex flex-wrap justify-between">
            {[...Array(4)].map((_, index) => (
              <div className="w-1/5 md:w-1/4" key={index}>
                <img src={home} className="" />
              </div>
            ))}
          </div>
        </div>
        <div className="shrink-0 mt-3 h-px border border-solid bg-stone-300 border-stone-300 w-full" />
        <div className="mt-3 text-black w-full text-left text-xs md:text-sm">
          habi has satisfied all my requirements and has done a very beautiful
          and quality construction. Their architects visited the site and made a
          convenient plan despite difficulties due to COVID 19. Overall we are
          very happy with the construction of our house.
        </div>

        <div className="text-lg text-black mt-9 ml-2 ">Ongoing</div>

        <div className="mt-1 w-full">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <div className="rounded-xl border border-solid border-stone-300 w-[173px] h-[117px] md:h-[117px] md:w-[222px] lg:w-[270px]  lg:h-[143px] relative">
                <a href="https://youtu.be/tVH_rxUKsvM?si=04ErJhT9KYM2igXw">
                  <img
                    src={thumbNail}
                    className="w-[173px] h-[117px] md:w-[222px] md:h-[117px] lg:w-[270px] lg:h-[143px]"
                  />
                  <img
                    src={youtube} // Replace with the path to your YouTube icon
                    alt="YouTube Icon"
                    className="absolute inset-0 m-auto w-7 h-8"
                  />
                </a>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="text-[16px] text-black">Arvind Kumar</div>
              <div className="text-gray-500 text-[14px]">Bengaluru</div>
              <div className="shrink-0 border border-solid bg-stone-300 border-stone-300 my-2" />
              <div className="text-sm text-black">1200 Sq. Feet</div>
              <div className="text-sm text-black">3BHK Duplex villa</div>
              <div className="text-sm text-black">Orientation: West</div>
            </div>
          </div>
        </div>
        <div className="mt-3 w-full">
          <div className="flex flex-wrap justify-between">
            {[...Array(4)].map((_, index) => (
              <div className="w-1/5 md:w-1/4" key={index}>
                <img src={home} className="" />
              </div>
            ))}
          </div>
        </div>
        <div className="shrink-0 mt-3 h-px border border-solid bg-stone-300 border-stone-300 w-full" />
        <div className="mt-3 text-black w-full text-left text-xs md:text-sm">
          habi has satisfied all my requirements and has done a very beautiful
          and quality construction. Their architects visited the site and made a
          convenient plan despite difficulties due to COVID 19. Overall we are
          very happy with the construction of our house.
        </div>
      </div>

      <div
        className={`flex flex-col items-center w-full bg-layoutColor h-auto mb-3 ${
          isExpanded ? "md:px-20 lg:px-72" : "md:px-16 lg:px-60"
        }`}
      >
        <Footer />
      </div>
    </div>
  );
}
export default Projects;

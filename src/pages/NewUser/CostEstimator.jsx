import React from "react";
import Footer from "../../components/Footer/Footer";
import go from "../../assets/svg/go.svg";

const CostEstimator = ({ isExpanded }) => {
  return (
    <div className="min-h-screen flex flex-col  bg-background font-poppins w-full h-full">
      <div
        className={`flex flex-col items-center w-full bg-layoutColor shadow p-2 h-auto mb-3 ${
          isExpanded ? "md:px-20 lg:px-60" : "md:px-12 lg:px-40"
        }`}
      >
        <div>
          <h2 className="text-center text-[16px] md:text-[18px] lg:text-[21px] font-bold text-black">
            House Construction Cost Calculator
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="relative mb-5">
                <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 text-sm text-grey">
                  Area Sq.Feet*
                </label>
                <input
                  type="text"
                  name="name"
                  className="text-black block w-[173px] h-[48px] md:w-[222px] lg:w-[270px] border border-gray-300 rounded-xl bg-layoutColor pl-4"
                />
              </div>
              <div className="relative mb-5">
                <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 text-sm text-grey">
                  No of Floors*
                </label>
                <input
                  type="text"
                  name="name"
                  className="text-black block w-[173px] h-[48px] md:w-[222px] lg:w-[270px] border border-gray-300 rounded-xl bg-layoutColor focus:outline-none pl-4"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative mb-5">
                <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 text-sm text-grey">
                  Site Pin code
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Teju"
                  className="text-black block w-[173px] h-[48px] md:w-[222px] lg:w-[270px] border border-gray-300 rounded-xl bg-layoutColor focus:outline-none pl-4"
                />
              </div>
              <div className="relative mb-5">
                <label className="absolute -top-2.5 left-3 bg-layoutColor px-1 text-sm text-grey">
                  No of Cars
                </label>
                <input
                  type="number"
                  name="name"
                  placeholder="00"
                  className="text-black block w-[173px] h-[48px] md:w-[222px] lg:w-[270px] border border-gray-300 rounded-xl bg-layoutColor focus:outline-none pl-4"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="items-center flex justify-center rounded-md text-white bg-primary opacity-50 mx-auto w-[361px] h-[50px]"
            >
              Estimate cost
              <img src={go} alt="" className="ml-2" />
            </button>
          </div>
        </form>
        <div className="my-6 ">
          <h3 className="text-center text-xl font-bold text-gray-900">
            Packages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {[
              {
                price: "₹ 1850/ Sq.Feet",
                name: "Essential",
                description: "structure + civil",
                link: "https://drive.google.com/file/d/17ZE7_ZCw_juTlNsz09mt0gA6fqMWQ2o7/view",
              },
              {
                price: "₹ 2100/ Sq.Feet",
                name: "Classic",
                description: "structure + civil",
              },
              {
                price: "₹ 2400/ Sq.Feet",
                name: "Classic Plus",
                description: "structure + civil + Interiors",
              },
              {
                price: "₹ 2510/ Sq.Feet",
                name: "Premium",
                description: "structure + civil",
              },
              {
                price: "₹ 2900/ Sq.Feet",
                name: "Premium Plus",
                description: "structure + civil + Interiors",
              },
              {
                price: "₹ 3215/ Sq.Feet",
                name: "Luxury",
                description: "structure + civil + Interiors",
              },
            ].map((pkg, index) => (
              <div
                key={index}
                className="p-3 border rounded-lg shadow-md bg-layoutColor w-38 flex flex-col justify-between"
              >
                <div className="flex-grow">
                  <h4 className="text-md text-black text-center">
                    {pkg.price}
                  </h4>
                  <p className="text-sm text-gray-500 text-center mt-3">
                    {pkg.name}
                  </p>
                  <p className="text-sm text-gray-400 text-center">
                    ({pkg.description})
                  </p>
                </div>
                <a href={pkg.link} target="_blank">
                  <button className="myBtn mx-auto mt-3 border-[1px] border-primary1 rounded-lg p-1 px-3 bg-primaryO text-black text-sm">
                    Click to view
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CostEstimator;

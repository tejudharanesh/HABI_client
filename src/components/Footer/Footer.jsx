import React from "react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { name: "Instagram", url: "https://www.instagram.com/habi.wayofliving" },
    { name: "Facebook", url: "https://www.facebook.com/habi.wayofliving" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/habiwayofliving",
    },
    { name: "YouTube", url: "https://www.youtube.com/@habi.wayofliving" },
    { name: "Pinterest", url: "https://www.pinterest.com" },
    { name: "Blog", url: "https://www.habi.one/blog" },
    { name: "Location", url: "https://maps.app.goo.gl/cnr7cBxS6WbYfxTr6" },
  ];

  return (
    <footer className="py-10">
      <div className="max-w-4xl mx-auto text-center pb-5">
        <div className="flex flex-wrap justify-center space-x-4 mb-4">
          {footerLinks.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className="text-slate-500 text-xs md:text-sm hover:text-red-600 transition-colors duration-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          ))}
        </div>
        <p className="text-slate-500 text-xs md:text-sm">
          &copy; <span className="font-semibold">{currentYear}</span> habi from
          Designasm Technologies Pvt. Ltd
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import pdf from "../../assets/images/pdf.png";
import more from "../../assets/images/option.png";

const sections = [
  {
    title: "Costing",
    documents: [
      {
        id: 1,
        name: "Tentative Quotation",
        date: "18 July 2024",
        version: "version1",
      },
      {
        id: 2,
        name: "Final Quotation",
        date: "22 August 2024",
        version: "version2",
      },
    ],
  },
  {
    title: "Legal",
    documents: [
      {
        id: 3,
        name: "Contract Agreement",
        date: "5 September 2024",
        version: "version1",
      },
    ],
  },
];

function Documents() {
  return (
    <div>
      {sections.map((section, index) => (
        <div key={index} className="px-2">
          <p className="text-sm">{section.title}</p>
          {section.documents.map((doc) => (
            <div
              key={doc.id}
              className="flex justify-between items-center my-1"
            >
              <div className="flex items-center space-x-2">
                <p className="text-black text-lg mr-2">{doc.id}.</p>
                <img src={pdf} alt="pdf icon" />
                <div>
                  <p className="text-black text-lg">{doc.name}</p>
                  <p className="text-gray-400 text-sm">{doc.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-primaryO text-primary px-2 rounded-md border-[1px] border-primary mr-2">
                  {doc.version}
                </button>
                <img src={more} alt="more" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Documents;

import { companyData } from "../../Data/Company";

interface CompanyInfo {
  Name: string;
  Overview: string;
  Industry: string;
  Website: string;
  Size: string;
  Headquarters: string;
  Specialties: string[];
}

interface AboutCompProps {
  companyName: keyof typeof companyData;
}

const fieldsToShow: (keyof CompanyInfo)[] = [
  "Overview",
  "Industry",
  "Website",
  "Size",
  "Headquarters",
  "Specialties",
];

const AboutComp = ({ companyName }: AboutCompProps) => {
  const company = companyData[companyName];

  if (!company) {
    return <div>Company not found.</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      {fieldsToShow.map((field, index) => (
        <div key={index}>
          <div className="text-xl mb-3 font-semibold">{field}</div>

          {field === "Website" ? (
            <a
              target="_blank"
              href={company[field]}
              className="text-sm text-bright-sun-400 hover:text-bright-sun-300"
            >
              {company[field]}
            </a>
          ) : field === "Specialties" ? (
            <div className="text-sm text-mine-shaft-300 text-justify">
              {(company[field] as string[]).map((item, idx) => (
                <span key={idx}> &bull; {item}</span>
              ))}
            </div>
          ) : (
            <div className="text-sm text-mine-shaft-300 text-justify">
              {company[field]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AboutComp;

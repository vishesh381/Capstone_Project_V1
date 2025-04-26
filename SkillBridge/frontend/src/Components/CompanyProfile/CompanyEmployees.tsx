import { useEffect, useState } from "react";
import { talents } from "../../Data/TalentData";
import { getAllProfiles } from "../../Services/ProfileService";
import TalentCard from "../FindTalent/TalentCard";

const CompanyEmployees = ({ companyName }: { companyName: string }) => {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profiles = await getAllProfiles();
        
        // Filter profiles from backend
        const backendEmployees = profiles.filter((profile: any) => profile.company === companyName);
        
        // Filter static talents
        const staticEmployees = talents.filter((talent: any) => talent.company === companyName);

        // Combine both
        const combinedEmployees = [...staticEmployees, ...backendEmployees];

        setEmployees(combinedEmployees);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, [companyName]);

  return (
    <div className="flex mt-10 flex-wrap gap-10">
      {employees.slice(0, 6).map((employee: any, index: number) => (
        <TalentCard key={index} {...employee} />
      ))}
    </div>
  );
};

export default CompanyEmployees;

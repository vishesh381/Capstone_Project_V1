import { jobList } from "../../Data/JobsData";
import JobCard from "../FindJobs/JobCard";

const CompanyJobs = ({ companyName }: { companyName: string }) => {
  return (
    <div className="flex mt-10 flex-wrap gap-5">
      {jobList
        .filter((job) => job.company === companyName) // Only show jobs for this company
        .map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
    </div>
  );
};
export default CompanyJobs;

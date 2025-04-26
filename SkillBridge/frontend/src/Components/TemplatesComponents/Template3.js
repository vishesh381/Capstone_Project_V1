import React from 'react'
import { useSelector } from 'react-redux'
const shortid = require('shortid')

function Template3() {
  const dataStore = useSelector((state) => state.dataStore)

  const fullName = `${dataStore.personalInfo.firstName} ${dataStore.personalInfo.lastName}`
  const address = `${dataStore.personalInfo.Address1}, ${dataStore.personalInfo.Address2}, ${dataStore.personalInfo.City}, ${dataStore.personalInfo.State}, ${dataStore.personalInfo.Pin}`
  const title = dataStore.workEx.length > 0 ? dataStore.workEx[dataStore.workEx.length - 1].title : ''

  return (
    <div className="w-full border border-[#4b6982] bg-[#f7eebb]">
      <div className="flex">
        {/* Left Column */}
        <div className="w-1/4 flex flex-col items-center pt-10 bg-[#583131] text-white">
          <img
            src={dataStore.imageFile}
            alt="profile-pic"
            className="rounded object-cover"
            style={{ maxHeight: '180px', minHeight: '100px', width: '100px', background: 'grey' }}
          />
          <div className="mt-3 text-center font-serif">
            <div className="text-2xl">{fullName}</div>
            <h5 className="pt-2 text-lg text-white">{title}</h5>
          </div>
          <div className="p-5 text-sm space-y-4">
            <div>
              <span className="bg-white text-black px-2 py-1 inline-block mb-1">Email:</span>
              <div>{dataStore.personalInfo.Email}</div>
            </div>
            <div>
              <span className="bg-white text-black px-2 py-1 inline-block mb-1">Contact:</span>
              <div>{dataStore.personalInfo.Mobile}</div>
            </div>
            <div>
              <span className="bg-white text-black px-2 py-1 inline-block mb-1">Address:</span>
              <div>{address}</div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-3/4 p-6 font-serif">
          <p className="mb-4 text-black">{dataStore.personalInfo.Objective}</p>
          <hr className="h-1 bg-[#4b6982] border-none my-4" />

          <section>
            <h3 className="text-[#4b6982] text-xl font-bold bg-gray-100 p-2">Professional Experience</h3>
            {dataStore.workEx.map((item) => (
              <div key={shortid.generate()} className="mt-4 text-black text-lg">
                <b>{item.orgName}</b>
                <div className="flex justify-between items-center">
  <p className="italic">{item.title}</p>
  <p className="underline text-sm">{item.startMonth} {item.startYear} - {item.endMonth} {item.endYear}</p>
</div>
                {item.jobDescription
  .split(/(?:\d+\.\s*|[•●]\s*)/)
  .map((point, index) => point.trim())
  .filter(point => point !== '')
  .map((point, index) => (
    <p key={index}>• {point}</p>
))}

              </div>
            ))}
          </section>

          <hr className="h-1 bg-[#4b6982] border-none my-6" />

          <section>
            <h3 className="text-[#4b6982] text-xl font-bold bg-gray-100 p-2">Education</h3>
            {dataStore.education.map((item) => (
              <div key={shortid.generate()} className="mt-4 text-black text-lg">
                <b>{item.Degree}</b>
                <div className="flex justify-between items-center">
                <div>
                  I have persued my {item.Type} in {item.Degree} from {item.University}
                </div>
                <p className="underline">{item.startMonth} {item.startYear} - {item.endMonth} {item.endYear}</p>
                </div>
              </div>
            ))}
          </section>

          <hr className="h-1 bg-[#4b6982] border-none my-6" />

          <section>
            <h3 className="text-[#4b6982] text-xl font-bold bg-gray-100 p-2">Key Skills</h3>
            <ul className="list-disc pl-5 text-black text-lg mt-2">
              {dataStore.skills.map((skill) => (
                <li key={shortid.generate()}>{skill.skillName}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Template3

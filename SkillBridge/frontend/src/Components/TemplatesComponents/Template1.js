import React from 'react'
import { useSelector } from 'react-redux'
const shortid = require('shortid')

function Template1() {
  const dataStore = useSelector(state => state.dataStore)

  return (
    <div className="mb-5 p-4 w-full border-[5px] border-[#00adb5] bg-[#f5f5dc]">
      <div>
        <div className="flex items-center h-[200px] m-0">
          <div className="w-1/6 text-center">
            <img
              className="rounded mx-auto"
              src={dataStore.imageFile}
              alt="profile-pic"
              style={{ maxHeight: '180px', minHeight: '120px', width: '100px', background: 'grey', padding: 0 }}
            />
          </div>
          <div className="w-3/6 font-bold text-center" style={{ fontFamily: 'Serif' }}>
            <div className="text-black text-[55px]">
              {dataStore.personalInfo.firstName + " " + dataStore.personalInfo.lastName}
            </div>
            <h5 className="text-black text-center">{dataStore.workEx[dataStore.workEx.length - 1].title}</h5>
          </div>
          <div className="w-2/6">
            <div className="p-3 text-black text-[18px] text-left">
              <div>{dataStore.personalInfo.Email}</div>
              <div>{dataStore.personalInfo.Mobile}</div>
              <div>
                {dataStore.personalInfo.Address1 + ", " + dataStore.personalInfo.Address2 + ",  " +
                  dataStore.personalInfo.City + ", " + dataStore.personalInfo.State + ", " +
                  dataStore.personalInfo.Pin}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-[5px] bg-[#00adb5]" />
      <div className="text-justify mx-4 text-black">{dataStore.personalInfo.Objective}</div>
      <hr className="h-[5px] bg-[#00adb5]" />

      <div className="px-4" style={{ fontFamily: 'Serif' }}>
        <div className="flex flex-wrap">
          <div className="w-1/4 text-[#00adb5] text-left">
            <h4>Professional Experience</h4>
          </div>
          <div className="w-3/4 text-black text-left">
            {dataStore.workEx.map((item) => (
              <div key={shortid.generate()}>
                <h4 className="font-semibold">{item.orgName}</h4>
                <div className="flex justify-between items-center">
  <p className="italic">{item.title}</p>
  <p className="underline">{item.startMonth} {item.startYear} - {item.endMonth} {item.endYear}</p>
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
          </div>

          <div className="w-full mt-4"></div>
          <hr className="h-[5px] bg-[#00adb5] w-full" />

          <div className="w-1/4 text-left text-[#00adb5]">
            <h4>Education</h4>
          </div>
          <div className="w-3/4 text-left text-black text-[18px]">
            {dataStore.education.map((item) => (
              <div key={shortid.generate()}>
                <b>{item.Degree}</b>
                <div className="flex justify-between items-center">
                <div>
                  I have persued my {item.Type} in {item.Degree} from {item.University}
                </div>
                <p className="underline">{item.startMonth} {item.startYear} - {item.endMonth} {item.endYear}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full mt-4"></div>
          <hr className="h-[5px] bg-[#00adb5] w-full" />

          <div className="w-1/4 text-left text-[#00adb5]">
            <h4>Key Skills</h4>
          </div>
          <div className="w-3/4 text-left text-black text-[18px]">
            {dataStore.skills.map((skill) => (
              <div key={shortid.generate()}>
                <li className="list-none">{skill.skillName}</li>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Template1;

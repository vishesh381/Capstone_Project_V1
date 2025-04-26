import React from 'react'
import { useSelector } from 'react-redux'
const shortid = require('shortid')

function Template2() {
    const dataStore = useSelector(state => state.dataStore)
  return (
    <div className="w-full border-[5px] border-[#f0bebe] bg-[#fffeec]">
        <div>
            <div className="flex items-center h-[200px] bg-[#f0bebe]">
                <div className="w-1/6 text-center">
                    <img className="rounded mx-auto object-cover" src={dataStore.imageFile} alt='profile-pic'
                         style={{maxHeight:'180px',minHeight:"120px", width:'100px', background:'grey',padding:0}}/>
                </div>
                <div className="w-1/2 text-center font-serif">
                    <div className='text-white text-[36px] font-bold'>{dataStore.personalInfo.firstName + " " + dataStore.personalInfo.lastName}</div>
                    <h5 className='text-white text-[20px]'>{dataStore.workEx[dataStore.workEx.length -1]?.title}</h5>
                </div>
                <div className="w-1/3">
                    <div className='p-3 text-[16px] text-white font-bold'>
                        <div>{dataStore.personalInfo.Email}</div>
                        <div>{dataStore.personalInfo.Mobile}</div>
                        <div>{dataStore.personalInfo.Address1 + ", " + dataStore.personalInfo.Address2 + ",  " + dataStore.personalInfo.City + ", " + dataStore.personalInfo.State + ", " + dataStore.personalInfo.Pin}</div>
                    </div>
                </div>
            </div>
        </div>
        <hr className="h-[5px] bg-[#f0bebe] border-none"/>
        <div className="text-black text-justify mx-4">{dataStore.personalInfo.Objective}</div>
        <hr className="h-[5px] bg-[#f0bebe] border-none"/>

        <div className="p-6 font-serif">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 text-left text-[#de5b7b] text-xl font-semibold">Professional Experience</div>
                <div className="col-span-9 text-left text-[16px] space-y-4">
                    {dataStore.workEx.map((item) => (
                        <div key={shortid.generate()}>
                            <h4 className="font-semibold text-black">{item.orgName}</h4>
                <div className="flex justify-between items-center">
  <p className="italic text-black">{item.title}</p>
  <p className="underline text-black">{item.startMonth} {item.startYear} - {item.endMonth} {item.endYear}</p>
</div>
                            {item.jobDescription
  .split(/(?:\d+\.\s*|[•●]\s*)/)
  .map((point, index) => point.trim())
  .filter(point => point !== '')
  .map((point, index) => (
    <p key={index} className="text-black">• {point}</p>
))}
                        </div>
                    ))}
                </div>

                <div className="col-span-12"><hr className="h-[5px] bg-[#f0bebe] border-none my-4"/></div>

                <div className="col-span-3 text-left text-[#de5b7b] text-xl font-semibold">Education</div>
                <div className="col-span-9 text-left text-[16px] text-black space-y-4">
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

                <div className="col-span-12"><hr className="h-[5px] bg-[#f0bebe] border-none my-4"/></div>

                <div className="col-span-3 text-left text-[#de5b7b] text-xl font-semibold mb-3">Key Skills</div>
                <div className="col-span-9 text-left text-[16px] space-y-1 text-black">
                    {dataStore.skills.map((skill) => (
                        <li key={shortid.generate()} className="list-none">{skill.skillName}</li>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Template2

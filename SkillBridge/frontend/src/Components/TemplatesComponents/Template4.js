import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Image, Text, Title, Paper } from '@mantine/core';
const shortid = require('shortid');

function Template4() {
  const dataStore = useSelector((state) => state.dataStore);

  return (
    <div className="w-full border border-[#4b6982] bg-white rounded-lg overflow-hidden">
      <div className="flex flex-row">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-[#4b6982] flex flex-col items-center py-8 px-4 text-white">
          <Image
            src={dataStore.imageFile}
            alt="profile-pic"
            radius="md"
            className="h-[180px] w-[100px] object-cover bg-gray-300"
          />
          <Title order={2} className="mt-4 font-serif text-center">
            {dataStore.personalInfo.firstName + ' ' + dataStore.personalInfo.lastName}
          </Title>
          <Text size="lg" className="text-[#adccc7] mt-2 text-center">
            {dataStore.workEx[dataStore.workEx.length - 1]?.title}
          </Text>

          <div className="mt-6 space-y-4 text-sm w-full">
            <div>
              <Text className="text-black px-2 inline-block">Email:</Text>
              <Text className="text-white">{dataStore.personalInfo.Email}</Text>
            </div>
            <div>
              <Text className="text-black px-2 inline-block">Contact:</Text>
              <Text className="text-white">{dataStore.personalInfo.Mobile}</Text>
            </div>
            <div>
              <Text className="text-black px-2 inline-block">Address:</Text>
              <Text className="text-white">
                {`${dataStore.personalInfo.Address1}, ${dataStore.personalInfo.Address2}, ${dataStore.personalInfo.City}, ${dataStore.personalInfo.State}, ${dataStore.personalInfo.Pin}`}
              </Text>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-3/4 p-6 space-y-6 font-serif text-gray-900">
          {/* Objective */}
          <Text className="text-justify">{dataStore.personalInfo.Objective}</Text>
          <Divider size="lg" color="#4b6982" />

          {/* Experience */}
          <div>
            <Title order={3} className="text-[#4b6982] mb-4">
              Professional Experience
            </Title>
            <div className="space-y-6 text-[17px]">
              {dataStore.workEx.map((item) => (
                <div key={shortid.generate()}>
                  <Title order={4}>{item.orgName}</Title>
                  <div className="flex justify-between items-center">
  <Text className="font-semibold">{item.title}</Text>
  <Text className="">{item.startMonth} {item.startYear} - {item.endMonth} {item.endYear}</Text>
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
          </div>

          <Divider size="lg" color="#4b6982" />

          {/* Education */}
          <div>
            <Title order={3} className="text-[#4b6982] mb-4">
              Education
            </Title>
            <div className="space-y-6 text-[17px]">
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
          </div>

          <Divider size="lg" color="#4b6982" />

          {/* Skills */}
          <div>
            <Title order={3} className="text-[#4b6982] mb-2">
              Key Skills
            </Title>
            <ul className="list-disc list-inside space-y-1 text-[17px]">
              {dataStore.skills.map((skill) => (
                <li key={shortid.generate()}>{skill.skillName}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template4;

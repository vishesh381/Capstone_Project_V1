import React from 'react';
import { Link } from 'react-router-dom';
import { templateImagesPaths } from '../Data/Data';
import { useDispatch } from 'react-redux';
import { updateState } from '../../Slices/dataStoreSlice';
const shortid = require('shortid');

function ResumeBuilderHome() {
  const dispatch = useDispatch();

  return (
    <div className="min-w-[300px] px-4 sm:px-8 py-10">
      <div className="flex justify-center mb-10">
        <h3 className="px-6 py-3 rounded-xl text-lg font-semibold bg-[--mantine-color-brightSun-filled] text-[--mantine-color-white] shadow-md">
          Select a Template to get started!
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {templateImagesPaths.map((template) => (
          <div
            key={shortid.generate()}
            className="relative group transition-transform duration-300 transform hover:scale-[1.02]"
          >
            <div className="w-full flex justify-center mb-2">
              <h3 className="px-6 py-3 rounded-xl text-lg font-semibold bg-[--mantine-color-brightSun-filled] text-[--mantine-color-white]">
                {template.name}
              </h3>
            </div>

            <img
              src={template.imageSource}
              alt="template"
              className="w-full aspect-[3/4] object-cover rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
            />

            <Link to="/detailsfillingpage/personalinfo">
              <button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-[--mantine-color-brightSun-filled] text-white px-4 py-2 rounded-lg shadow 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"     
                onClick={() =>
                  dispatch(
                    updateState({
                      key: 'selectedTemplate',
                      value: template.name,
                    })
                  )
                }
              >
                Use Template
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeBuilderHome;

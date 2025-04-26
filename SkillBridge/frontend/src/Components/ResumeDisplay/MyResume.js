import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Template1 from '../TemplatesComponents/Template1'
import Template2 from '../TemplatesComponents/Template2'
import Template3 from '../TemplatesComponents/Template3'
import Template4 from '../TemplatesComponents/Template4'
import SuccessMessage from './Modal'

function MyResume() {
  const selectedTemplate = useSelector(state => state.dataStore.selectedTemplate)
  const [showModal, setShowModal] = useState(false)

  const downloadComponentPDF = () => {
    const input = document.getElementById('divToPrint');
    const pdf = new jsPDF('p', 'mm', 'a4');
  
    pdf.html(input, {
      callback: function (doc) {
        doc.save('resume.pdf');
        setTimeout(() => {
          setShowModal(true);
          setTimeout(() => setShowModal(false), 5000);
        }, 100);
      },
      x: 10,
      y: 2,
      width: 190,
      windowWidth: 900
    });
  };
  
  

  return (
    <div className="w-full px-6 py-8 overflow-x-auto">
      {/* Action Buttons */}
      <div className="flex justify-center mb-8 gap-4">
        <Link to="/detailsfillingpage/keyskills">
          <button className="px-6 py-3 rounded-xl text-lg font-semibold bg-[--mantine-color-brightSun-dark] text-[--mantine-color-white] shadow-md">
            Go Back
          </button>
        </Link>
        <button
          className="px-6 py-3 rounded-xl text-lg font-semibold bg-green-600 text-white hover:bg-green-700 shadow-md"
          onClick={downloadComponentPDF}
        >
          Save Resume
        </button>
      </div>

      {/* Resume Preview */}
      <div className="w-full flex justify-center min-w-[1200px] overflow-x-scroll">
        <div id="divToPrint" className="w-full max-w-[1900px]">
          {selectedTemplate === '' ? (
            <div className="text-center text-2xl font-semibold text-red-600">
              Please select a template!
            </div>
          ) : selectedTemplate === 'Template 1' ? (
            <Template1 />
          ) : selectedTemplate === 'Template 2' ? (
            <Template2 />
          ) : selectedTemplate === 'Template 3' ? (
            <Template3 />
          ) : (
            <Template4 />
          )}
        </div>
      </div>

      {/* Success Message Modal */}
      <SuccessMessage showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default MyResume

import React from 'react'
import { CheckCircleFill } from 'react-bootstrap-icons'

function SuccessMessage({ showModal, setShowModal }) {
  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-[--mantine-color-brightSun-dark] text-white p-6 rounded-xl shadow-xl w-[90%] max-w-md text-center">
        <div className="flex flex-col items-center space-y-3">
          <CheckCircleFill size={40} className="text-white" />
          <h2 className="text-lg font-semibold">Your Resume has been successfully downloaded!</h2>
          <button
            className="mt-4 px-6 py-3 rounded-xl text-lg font-semibold bg-[--mantine-color-brightSun-filled] text-[--mantine-color-white] hover:bg-[--mantine-color-brightSun-light] transition"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessMessage

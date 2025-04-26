import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfilePicUploadComponent from './ProfileUpload'
import { countries } from '../Data/Data'
import TextField from '../InputComponents/TextField'
import TextArea from '../InputComponents/TextArea'
import BottomNavigation from './BottomNavigation'
import { updatePersonalInfo, updateErrorMessages } from '../../Slices/dataStoreSlice'

function PersonalInfo(props) {
  const personalHeads = useSelector(state => state.dataStore.personalInfo) 
  const selectedTemplate = useSelector(state => state.dataStore.selectedTemplate)
  const dispatch = useDispatch()

  const selectedCountry = personalHeads.Country || "India";  // Get country from Redux store
  const states = countries.find(country => country.name === selectedCountry)?.states || [];

  const onChangeHandler = (key, value, errorMessage = undefined) => {
    dispatch(updatePersonalInfo({
      key: key,
      value: value
    }))
    if (errorMessage !== undefined) {
      dispatch(updateErrorMessages({
        key: key,
        value: errorMessage
      }))
    }
  }

  const handleCountryChange = (e) => {
    const selected = e.target.value;
    dispatch(updatePersonalInfo({
      key: 'Country',
      value: selected
    }))

    const countryStates = countries.find(country => country.name === selected)?.states || [];
    // Reset state to 'Select State' after changing country
    dispatch(updatePersonalInfo({
      key: 'State',
      value: ''
    }))
  }

  return (
    <div style={{ padding: "15px", textAlign: "left" }}>
      <div>
        <ProfilePicUploadComponent />
      </div>
      <div className="row font">
        {/* First Name */}
        <div className="col-lg-6 col-12 pt-5 px-4">
          <div className='row'>
            <div className='col-sm-2 col-12'>
              <label htmlFor="firstname" className="col-form-label">First Name*</label>
            </div>
            <div className='col-sm-10 col-12'>
              <TextField type="text" elementId="firstname" placeholder="First name"
                value={personalHeads.firstName}
                onChange={(value, errorMessage) => {
                  onChangeHandler('firstName', value, errorMessage)
                }}
                validation={{
                  required: true,
                }}
              />
            </div>
          </div>
        </div>
        {/* Last Name */}
        <div className="col-lg-6 col-12 pt-5 px-4">
          <div className='row'>
            <div className='col-sm-2 col-12'>
              <label htmlFor="lastname" className="col-form-label">Last Name</label>
            </div>
            <div className='col-sm-10 col-12'>
              <TextField type="text" elementId="lastname" placeholder="Last name"
                value={personalHeads.lastName}
                onChange={(value) => { onChangeHandler('lastName', value) }}
              />
            </div>
          </div>
        </div>
      </div>
       {/* Other Fields */}
       <div className="row font">
        <div className="col-lg-6 col-12 pt-5 px-4">
          <div className='row'>
            <div className='col-sm-2 col-12'>
              <label htmlFor="staticEmail" className="col-form-label">Email*</label>
            </div>
            <div className="col-sm-10 col-12">
              <TextField type="text" elementId="staticEmail" placeholder="users@example.com"
                validation={{ checkType: 'email', required: true }}
                value={personalHeads.Email}
                onChange={(value, errorMessage) => { onChangeHandler('Email', value, errorMessage) }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row font">
              <div className="col-lg-6 col-12 pt-5 px-4">
                <div className='row '>
                  <div className='col-sm-2  col-12'>
                      <label htmlFor="mobile" className="col-sm-1 col-form-label">Mobile No.*</label>
                  </div>
                  <div className="col-sm-10  col-12">
                      <TextField type="number" elementId="Mobile" 
                            validation={ { maxLengthRequired:10 , required:true, } } 
                            value={personalHeads.Mobile}
                            onChange={(value,errorMessage)=>{ onChangeHandler('Mobile',value,errorMessage) }}
                      />
                  </div>
                </div>
              </div>
          </div>
      <div className="row font" >
              <div className="col-lg-6 col-12 pt-5 px-4">
                <div className='row '>
                  <div className='col-sm-2  col-12'>
                      <label htmlFor="inputAddress1" className="col-sm-1 col-form-label">Address1</label>
                  </div>
                  <div className='col-sm-10 col-12'>
                      <TextField type="text" elementId="inputAddress1" 
                            value={personalHeads.Address1}
                            onChange={(value)=>{ onChangeHandler('Address1',value) }}
                      />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12 pt-5  px-4">
                <div className='row'>
                  <div className='col-sm-2 col-12'>
                    <label htmlFor="inputAddress2" className="col-sm-1 col-form-label">Address2</label>
                  </div>
                  <div className='col-sm-10 col-12'>
                    <TextField type="text" elementId="inputAddress2" value={personalHeads.Address2}
                          onChange={(value)=>{ onChangeHandler('Address2',value) }}
                    />
                  </div>
                </div>
              </div>
          </div>
      {/* Country and State Selection */}
      <div className="row font">
        {/* Country */}
        <div className="col-lg-6 col-12 pt-5 px-4">
          <div className='row'>
            <div className='col-sm-2 col-12'>
              <label htmlFor="country" className="col-form-label">Country*</label>
            </div>
            <div className='col-sm-10 col-12'>
              <select id="country" className="form-control" value={selectedCountry}
                onChange={handleCountryChange}>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* State */}
        <div className="col-lg-6 col-12 pt-5 px-4">
          <div className='row'>
            <div className='col-sm-2 col-12'>
              <label htmlFor="inputState" className="col-form-label">State</label>
            </div>
            <div className='col-sm-10 col-12'>
              <select id="inputState" className="form-control" value={personalHeads.State}
                onChange={(e) => {
                  dispatch(updatePersonalInfo({
                    key: 'State',
                    value: e.target.value
                  }))
                }}>
                <option>Select State</option>
                {states.map((state, i) => (
                  <option key={i} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation prevPagePath="/" nextPagePath="/detailsfillingpage/workex" isFormValid={props.isFormValid} />
    </div>
  )
}

export default PersonalInfo

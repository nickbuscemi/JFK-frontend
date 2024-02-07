import React from 'react';
import { useState } from 'react'

export const IndividualSignUpForm = () => {

    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      subject: 'Golf Tournament Registration',
      registrationType: 'Solo', // Default selection
      teammates: [], // Holds details of teammates
      teamname: ''
    });

    const [validationMessages, setValidationMessages] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        teammates: [], // Holds details of teammates
    });
    

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "registrationType") {
            if (value === "4-Some") {
                setFormData({ ...formData, [name]: value, teammates: [] });
            } else if (value === "Teammate") {
                // Ensure only one teammate input is initialized
                setFormData({ ...formData, [name]: value, teammates: [{ firstName: '', lastName: '', email: '' }] });
            } else {
                setFormData({ ...formData, [name]: value, teammates: [] });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    
    
      

    const isFormValid = () => {

        let isValid = true;
        let errors = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            teammates: formData.teammates.map(() => ({ firstName: '', lastName: '', email: '' })) // Initialize teammate errors
        };

        // Email Validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            errors.email = "Invalid email address.";
            isValid = false;
        }
    
        // First Name Validation
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (!formData.firstName.trim() || !nameRegex.test(formData.firstName)) {
            errors.firstName = "Invalid first name"
            isValid = false;
        }
    
        // Last Name Validation
        if (!formData.lastName.trim() || !nameRegex.test(formData.lastName)) {
            errors.lastName = "Invalid last name"
            isValid = false;
        }
    
        // Phone Number Validation
        // Adjust the regex according to the phone number format you expect
        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phoneNumber.trim() || !phoneRegex.test(formData.phoneNumber)) {
            errors.phoneNumber = "Invalid phone number"
            isValid = false;
        }
    
        // If all checks pass
        setValidationMessages(errors);
        return isValid;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform any client-side validation here
        
        console.log(formData);
       
        if (isFormValid()) {
            try {
                const response = await fetch('http://localhost:4242/submit-marathon-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const responseMessage = await response.text() ; // or response.json() if the server responds with JSON
                console.log("Response Message:", responseMessage);
                setIsSubmitted(true);
        
            } catch (error) {
                console.error('Error submitting form:', error);
                // Here, you can set an error state and show the error message in your UI if needed
            }
        }
    };

    const handleNewForm = () => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          subject: 'Golf Tournament Registration ',
          registrationType: 'Solo', // Default selection
          teammates: [], // Holds details of teammates
          teamname: ''
        });
        setValidationMessages({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
        });
    };

    const handleAddTeammate = () => {
        // Only add a new teammate if there are fewer than 3
        if (formData.teammates.length < 3) {
            setFormData({
                ...formData,
                teammates: [...formData.teammates, { firstName: '', lastName: '', email: '' }]
            });
        }
    };

    const handleDeleteTeammate = (indexToDelete) => {
        setFormData({
            ...formData,
            teammates: formData.teammates.filter((_, index) => index !== indexToDelete)
        });
    };
    
    
    

    const handleTeammateChange = (index, e) => {
        const updatedTeammates = formData.teammates.map((teammate, i) => {
          if (i === index) {
            // Assuming your input names are formatted like "firstName0", "lastName0", "email0" for the first teammate,
            // this will correctly update the respective property by removing digits from the input name.
            const propertyName = e.target.name.replace(/[0-9]/g, '');
            return { ...teammate, [propertyName]: e.target.value };
          }
          return teammate;
        });
      
        setFormData({
          ...formData,
          teammates: updatedTeammates
        });
      };
      
      

    if (isSubmitted) {
        return (
            <div className="bg-white px-2 py-56 mt-20 lg:mt-28 flex flex-col md:flex-row justify-center items-start md:items-center">
                <div className="thank-you-message mt-8 md:mt-0 max-w-[550px] w-full flex flex-col items-center justify-center">
                    <h3 className='mb-10 text-3xl font-bold text-carolina'>Thank you for contacting us about running the NYC marathon!</h3>
                    <button className="whitespace-nowrap overflow-hidden text-overflow-ellipsis text-white bg-carolina hover:bg-deepCarolina focus:outline-none focus:ring-4 focus:ring-carolina-300 font-extrabold rounded-full text-md px-5 py-2.5 text-center dark:bg-carolina dark:hover:bg-deepCarolina dark:focus:ring-carolina" onClick={handleNewForm}>Send Another Message</button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white px-12 py-8 mt-20 lg:mt-10 flex flex-col md:flex-row justify-center items-start md:items-center">
            <div className="w-full max-w-[550px]">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-carolina">Interested in running with us?</h2>
                </div>
                <form onSubmit={handleSubmit} method="POST">
                    {/* Row for First Name and Last Name */}
                    <div className="md:flex md:flex-wrap -mx-2">
                        <div className="px-2 mb-5 md:w-1/2">
                            <label htmlFor="firstName" className="mb-3 block text-base font-medium text-deepCarolina">First Name</label>
                            <input 
                                type="text" 
                                name="firstName" 
                                id="firstName" 
                                placeholder="First Name" 
                                value={formData.firstName} 
                                onChange={handleChange}
                                className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md" 
                            />
                            {validationMessages.firstName && <div className="text-red-500">{validationMessages.firstName}</div>}
                        </div>
                        <div className="px-2 mb-5 md:w-1/2">
                            <label htmlFor="lastName" className="mb-3 block text-base font-medium text-deepCarolina">Last Name</label>
                            <input 
                                type="text" 
                                name="lastName" 
                                id="lastName" 
                                placeholder="Last Name" 
                                value={formData.lastName} 
                                onChange={handleChange}
                                className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md" 
                            />
                            {validationMessages.lastName && <div className="text-red-500">{validationMessages.lastName}</div>}
                        </div>
                    </div>
    
                    {/* Row for Phone Number and Email */}
                    <div className="md:flex md:flex-wrap -mx-2">
                        <div className="px-2 mb-5 md:w-1/2">
                            <label htmlFor="phoneNumber" className="mb-3 block text-base font-medium text-deepCarolina">Phone Number</label>
                            <input 
                                type="tel" 
                                name="phoneNumber" 
                                id="phoneNumber" 
                                placeholder="Your phone number" 
                                value={formData.phoneNumber} 
                                onChange={handleChange}
                                className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md" 
                            />
                            {validationMessages.phoneNumber && <div className="text-red-500">{validationMessages.phoneNumber}</div>}
                        </div>
                        <div className="px-2 mb-5 md:w-1/2">
                            <label htmlFor="email" className="mb-3 block text-base font-medium text-deepCarolina">Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder="example@domain.com" 
                                value={formData.email} 
                                onChange={handleChange}
                                className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md" 
                            />
                            {validationMessages.email && <div className="text-red-500">{validationMessages.email}</div>}
                        </div>
                    </div>

                    <div className="px-2 mb-5">
                        <label htmlFor="registrationType" className="mb-3 block text-base font-medium text-deepCarolina">Registration Type</label>
                        <select
                            name="registrationType"
                            id="registrationType"
                            value={formData.registrationType}
                            onChange={handleChange}
                            className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md"
                        >
                            <option value="Solo">Solo</option>
                            <option value="4-Some">Part of a 4-Some</option>
                            <option value="Teammate">Teammate</option>
                        </select>
                    </div>

                    {formData.registrationType === '4-Some' && (
                        <div className="px-2 mb-5">
                            <label htmlFor="teamName" className="mb-3 block text-base font-medium text-deepCarolina">Team Name</label>
                            <input
                                type="text"
                                name="teamName"
                                id="teamName"
                                placeholder="Team Name"
                                value={formData.teamName}
                                onChange={handleChange}
                                className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md"
                            />
                        </div>
                    )}

                    {(formData.registrationType === '4-Some' || formData.registrationType === 'Teammate') && (
                        <>
                            {formData.teammates.map((teammate, index) => (
                                <div key={index} className="mb-5">
                                    {/* Teammate input fields */}
                                    <div key={index} className="mb-5">
                                        <h4 className="mb-3 text-lg font-medium text-deepCarolina">Teammate {index + 1}</h4>
                                            <input
                                            type="text"
                                            name={`teammateFirstName${index}`}
                                            placeholder="First Name"
                                            value={teammate.firstName}
                                            onChange={e => handleTeammateChange(index, e)}
                                            className="mb-3 w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md"
                                            />
                                            <input
                                            type="text"
                                            name={`teammateLastName${index}`}
                                            placeholder="Last Name"
                                            value={teammate.lastName}
                                            onChange={e => handleTeammateChange(index, e)}
                                            className="mb-3 w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md"
                                            />
                                            <input
                                            type="email"
                                            name={`teammateEmail${index}`}
                                            placeholder="Email"
                                            value={teammate.email}
                                            onChange={e => handleTeammateChange(index, e)}
                                            className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md"
                                            />
                                        {formData.registrationType === '4-Some' && (
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteTeammate(index)}
                                                className="my-3 p-2 text-white bg-carolina hover:bg-deepCarolina rounded-md"
                                            >
                                                - Remove Teammate
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {formData.registrationType === '4-Some' && formData.teammates.length < 3 && (
                                
                                <button
                                    type="button"
                                    onClick={handleAddTeammate}
                                    className="my-3 p-2 text-white bg-carolina hover:bg-deepCarolina rounded-md"
                                >
                                    + Add Teammate
                                </button>
                            )}
                        </>
                    )}
                    {/* Submit Button */}
                    <div className='flex justify-center items-center'>
                        
                        <button 
                            type="submit" 
                            className="whitespace-nowrap overflow-hidden text-overflow-ellipsis text-white bg-carolina hover:bg-deepCarolina focus:outline-none focus:ring-4 focus:ring-carolina-300 font-extrabold rounded-full text-md px-5 py-2.5 text-center dark:bg-carolina dark:hover:bg-deepCarolina dark:focus:ring-carolina"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
};


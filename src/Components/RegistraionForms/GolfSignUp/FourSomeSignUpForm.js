import React from 'react';
import { useState } from 'react'

export const FourSomeSignUpForm = () => {

    const [formData, setFormData] = useState({
        leaderFirstName: '',
        leaderLastName: '',
        leaderPhoneNumber: '',
        leaderEmail: '',
        teamName: '',
        paymentOption: 'individual', // Default to 'individual' or 'full' based on your preference
        teammates: [],
        initialPayment: 0,
    });
    

    const [validationMessages, setValidationMessages] = useState({
        leaderFirstName: '',
        leaderLastName: '',
        leaderPhoneNumber: '',
        leaderEmail: '',
        teammates: [], // Holds details of teammates
    });
    

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Directly set form data without checking registrationType
        setFormData({ ...formData, [name]: value });
    };
    
    const isFormValid = () => {

        let isValid = true;
        let errors = {
            leaderFirstName: '',
            leaderLastName: '',
            leaderPhoneNumber: '',
            leaderEmail: '',
            teammates: formData.teammates.map(() => ({ firstName: '', lastName: '', email: '' })) // Initialize teammate errors
        };

        // Email Validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!formData.leaderEmail.trim() || !emailRegex.test(formData.leaderEmail)) {
            errors.leaderEmail = "Invalid email address.";
            isValid = false;
        }
    
        // First Name Validation
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (!formData.leaderFirstName.trim() || !nameRegex.test(formData.leaderFirstName)) {
            errors.leaderFirstName = "Invalid first name"
            isValid = false;
        }
    
        // Last Name Validation
        if (!formData.leaderLastName.trim() || !nameRegex.test(formData.leaderLastName)) {
            errors.leaderLastName = "Invalid last name"
            isValid = false;
        }
    
        // Phone Number Validation
        // Adjust the regex according to the phone number format you expect
        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.leaderPhoneNumber.trim() || !phoneRegex.test(formData.leaderPhoneNumber)) {
            errors.leaderPhoneNumber = "Invalid phone number"
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
                const response = await fetch('http://localhost:4242/submit-golf-4some-form', {
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
            leaderFirstName: '',
            leaderLastName: '',
            leaderPhoneNumber: '',
            leaderEmail: '',
            teamName: '',
            paymentOption: 'individual', // Default to 'individual' or 'full' based on your preference
            teammates: [],
            initialPayment: 0,
        });
        setValidationMessages({
            leaderFirstName: '',
            leaderLastName: '',
            leaderPhoneNumber: '',
            leaderEmail: '',
            teammates: [], // Holds details of teammates
        });
    };

    const handleAddTeammate = () => {
        if (formData.teammates.length < 3) { // Allows adding teammates up to a total of 4
            setFormData({
                ...formData,
                teammates: [
                    ...formData.teammates, 
                    { 
                        firstName: '', 
                        lastName: '', 
                        email: '' 
                    }
                ]
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
                // Directly use the name attribute to update the correct field
                return { ...teammate, [e.target.name]: e.target.value };
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
                    <h3 className='mb-10 text-3xl font-bold text-carolina'>Thank you for registering for our Annual Golf Tournament!</h3>
                    <button className="whitespace-nowrap overflow-hidden text-overflow-ellipsis text-white bg-carolina hover:bg-deepCarolina focus:outline-none focus:ring-4 focus:ring-carolina-300 font-extrabold rounded-full text-md px-5 py-2.5 text-center dark:bg-carolina dark:hover:bg-deepCarolina dark:focus:ring-carolina" onClick={handleNewForm}>Sign up another team</button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white px-12 py-8 mt-20 lg:mt-10 flex flex-col md:flex-row justify-center items-start md:items-center">
            <div className="w-full max-w-[550px]">
                <div className="mt-24 mb-8 text-center">
                    <h2 className="text-3xl font-bold text-carolina">Sign your team up below!</h2>
                </div>
                <form onSubmit={handleSubmit} method="POST">
                    <div className="mb-5">
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
                    <div className="md:flex md:flex-wrap -mx-2">
                        <div className="px-2 mb-5 md:w-1/2">
                            <label htmlFor="leaderFirstName" className="mb-3 block text-base font-medium text-deepCarolina">Lead First Name</label>
                            <input 
                                type="text" 
                                name="leaderFirstName" 
                                id="leaderFirstName" 
                                placeholder="First Name" 
                                value={formData.leaderFirstName} 
                                onChange={handleChange}
                                className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md" 
                            />
                            {validationMessages.leaderFirstName && <div className="text-red-500">{validationMessages.leaderFirstName}</div>}
                        </div>
                        <div className="px-2 mb-5 md:w-1/2">
                            <label htmlFor="leaderLastName" className="mb-3 block text-base font-medium text-deepCarolina">Lead Last Name</label>
                            <input 
                                type="text" 
                                name="leaderLastName" 
                                id="leaderLastName" 
                                placeholder="Last Name" 
                                value={formData.leaderLastName} 
                                onChange={handleChange}
                                className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md" 
                            />
                            {validationMessages.leaderLastName && <div className="text-red-500">{validationMessages.leaderLastName}</div>}
                        </div>
                    </div>
    
                    {/* Row for Phone Number and Email */}
                    <div className="md:flex md:flex-wrap -mx-2">
                        <div className="px-2 mb-5 md:w-1/2">
                            <label htmlFor="leaderPhoneNumber" className="mb-3 block text-base font-medium text-deepCarolina">Lead Phone Number</label>
                            <input 
                                type="tel" 
                                name="leaderPhoneNumber" 
                                id="leaderPhoneNumber" 
                                placeholder="Your phone number" 
                                value={formData.leaderPhoneNumber} 
                                onChange={handleChange}
                                className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md" 
                            />
                            {validationMessages.leaderPhoneNumber && <div className="text-red-500">{validationMessages.leaderPhoneNumber}</div>}
                        </div>
                        <div className="px-2 mb-5 md:w-1/2">
                            <label htmlFor="leaderEmail" className="mb-3 block text-base font-medium text-deepCarolina">Lead Email Address</label>
                            <input 
                                type="email" 
                                name="leaderEmail" 
                                id="leaderEmail" 
                                placeholder="example@domain.com" 
                                value={formData.leaderEmail} 
                                onChange={handleChange}
                                className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md" 
                            />
                            {validationMessages.leaderEmail && <div className="text-red-500">{validationMessages.leaderEmail}</div>}
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="paymentOption" className="mb-3 block text-base font-medium text-deepCarolina">Payment Option</label>
                        <select
                            name="paymentOption"
                            id="paymentOption"
                            value={formData.paymentOption}
                            onChange={handleChange}
                            className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md"
                        >
                            <option value="individual">Individual Payment</option>
                            <option value="full">Pay in Full</option>
                        </select>
                    </div>


                        <>
                            {formData.teammates.map((teammate, index) => (
                                <div key={index} className="mb-5">
                                    {/* Teammate input fields */}
                                    <div key={index} className="mb-5">
                                        <h4 className="mb-3 text-lg font-medium text-deepCarolina">Teammate {index + 1}</h4>
                                        <input
                                            type="text"
                                            name="firstName" // Changed from `teammateFirstName${index}`
                                            placeholder="First Name"
                                            value={teammate.firstName}
                                            onChange={e => handleTeammateChange(index, e)}
                                            className="mb-3 w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md"
                                        />
                                        <input
                                            type="text"
                                            name="lastName" // Changed from `teammateLastName${index}`
                                            placeholder="Last Name"
                                            value={teammate.lastName}
                                            onChange={e => handleTeammateChange(index, e)}
                                            className="mb-3 w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md"
                                        />
                                        <input
                                            type="email"
                                            name="email" // Changed from `teammateEmail${index}`
                                            placeholder="Email"
                                            value={teammate.email}
                                            onChange={e => handleTeammateChange(index, e)}
                                            className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md"
                                        />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteTeammate(index)}
                                                className="my-3 p-2 text-white bg-carolina hover:bg-deepCarolina rounded-md"
                                            >
                                                - Remove Teammate
                                            </button>
                                    </div>
                                </div>
                            ))}

                            {formData.teammates.length < 3 && (
                                
                                <button
                                    type="button"
                                    onClick={handleAddTeammate}
                                    className="my-3 p-2 text-white bg-carolina hover:bg-deepCarolina rounded-md"
                                >
                                    + Add Teammate
                                </button>
                            )}
                        </>
                    
                    
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


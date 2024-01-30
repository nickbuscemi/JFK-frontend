import React from 'react';
import { useState, useEffect } from 'react'

export const Contact = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        subject: '',
        message: ''
    });

    const [validationMessages, setValidationMessages] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        subject: '',
        message: ''
    });
    

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isFormValid = () => {

        let isValid = true;
        let errors = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            subject: '',
            message: ''
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
    
        // Subject Validation (assuming it should not be too long)
        if (!formData.subject.trim() || formData.subject.length > 100) {
            errors.subject = "Invalid subject. Must be under 100 characters"
            isValid = false;
        }
    
        // Message Validation (with minimum and maximum length)
        if (!formData.message.trim() || formData.message.length < 20 || formData.message.length > 500) {
            errors.message = "Message is required and should be 20 to 500 characters long."
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
                const response = await fetch('http://localhost:4242/submit-form', {
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
                {/*setValidationMessages({
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    email: '',
                    subject: '',
                    message: ''
                });*/}
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
            subject: '',
            message: ''
        });
        setValidationMessages({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    if (isSubmitted) {
        return (
            <div className="bg-white px-2 py-56 mt-20 lg:mt-28 flex flex-col md:flex-row justify-center items-start md:items-center">
                <div className="thank-you-message mt-8 md:mt-0 max-w-[550px] w-full flex flex-col items-center justify-center">
                    <h3 className='mb-10 text-3xl font-bold text-carolina'>Thank you for contacting us!</h3>
                    <button className="whitespace-nowrap overflow-hidden text-overflow-ellipsis text-white bg-carolina hover:bg-deepCarolina focus:outline-none focus:ring-4 focus:ring-carolina-300 font-extrabold rounded-full text-md px-5 py-2.5 text-center dark:bg-carolina dark:hover:bg-deepCarolina dark:focus:ring-carolina" onClick={handleNewForm}>Send Another Message</button>
                </div>
                <div className="deepCarolina mt-8 md:mt-0 max-w-[550px] w-full flex flex-col items-center justify-center">
                    <h3 className="text-3xl font-bold mb-4 text-center">Where You Can Reach Us</h3>
                    <p className="text-center">Address: 123 Example Street</p>
                    <p className="text-center">Email: contact@example.com</p>
                    <p className="text-center">Phone: (123) 456-7890</p>
                    {/* More contact information */}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white px-12 py-8 mt-20 lg:mt-28 flex flex-col md:flex-row justify-center items-start md:items-center">
            <div className="w-full max-w-[550px]">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-carolina">Contact Us!</h2>
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
                            <label htmlFor="subject" className="mb-3 block text-base font-medium text-deepCarolina">Subject</label>
                            <input 
                                type="text" 
                                name="subject" 
                                id="subject" 
                                placeholder="Subject" 
                                value={formData.subject} 
                                onChange={handleChange}
                                className="w-full rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md" 
                            />
                            {validationMessages.subject && <div className="text-red-500">{validationMessages.subject}</div>}
                        </div>
    
                    {/* Message Input */}
                    <div className="mb-5">
                        <label htmlFor="message" className="mb-3 block text-base font-medium text-deepCarolina">Message</label>
                        <textarea 
                            rows="4" 
                            name="message" 
                            id="message" 
                            placeholder="Type your message" 
                            value={formData.message} 
                            onChange={handleChange}
                            className="w-full resize-none rounded-md border border-carolina bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-deepCarolina focus:shadow-md"
                        ></textarea>
                        {validationMessages.message && <div className="text-red-500">{validationMessages.message}</div>}
                    </div>
    
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
            <div className="deepCarolina mt-8 md:mt-0 max-w-[550px] w-full flex flex-col items-center justify-center">
                <h3 className="text-3xl font-bold mb-4 text-center">Where You Can Reach Us</h3>
                <p className="text-center">Address: 123 Example Street</p>
                <p className="text-center">Email: contact@example.com</p>
                <p className="text-center">Phone: (123) 456-7890</p>
                {/* More contact information */}
            </div>
        </div>
    );
    
};

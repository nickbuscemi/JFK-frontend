import { EventsCard } from "./EventsComponents/EventCard"
import { useState } from "react";

export const Events = () => {

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

    

    return (
        <div>
            <div className=" bg-white px-4 sm:px-10 md:px-20 lg:px-60 py-16"> {/* This applies the same horizontal padding as your footer */}
                <h2 className="flex justify-center mb-4 mt-[-20px] text-4xl tracking-tight font-extrabold text-carolina">Upcoming Events</h2>
                <EventsCard />
            </div>

            
            <section className="dark:bg-deepCarolina p-10">
                {isSubmitted ? (
                    <div className="flex justify-center items-center py-8 px-4 mx-auto max-w-screen-xl lg:p-56">
                        <div className="thank-you-message mt-8 md:mt-0 max-w-[550px] w-full flex flex-col items-center justify-center">
                            <h3 className='mb-10 text-4xl font-bold text-white'>Thank you for contacting us!</h3>
                            <button className="whitespace-nowrap overflow-hidden text-overflow-ellipsis text-white bg-carolina hover:text-deepCarolina hover:bg-white focus:outline-none focus:ring-4 focus:ring-carolina-300 font-extrabold rounded-full text-md px-5 py-2.5 text-center dark:focus:ring-carolina" onClick={handleNewForm}>Send Another Message</button>
                        </div>
                    </div>
                ) : (
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:pb-16 lg:px-6">
                    <div className="font-light text-white sm:text-lg">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Help us fundraise your way!</h2>
                        <p className="mb-4"> Do you have an idea about how you can help our cause?
                        </p>
                        <p> Please reach out to us to set up your own event with the Joe Killeen Memorial Foundation. We would love to hear from you!
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} method="POST">
                        {/* Row for First Name and Last Name */}
                        <div className="md:flex md:flex-wrap -mx-2">
                            <div className="px-2 mb-5 md:w-1/2">
                                <label htmlFor="firstName" className="mb-3 block text-base font-medium text-white">First Name</label>
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
                                <label htmlFor="lastName" className="mb-3 block text-base font-medium text-white">Last Name</label>
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
                                <label htmlFor="phoneNumber" className="mb-3 block text-base font-medium text-white">Phone Number</label>
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
                                <label htmlFor="email" className="mb-3 block text-base font-medium text-white">Email Address</label>
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
                                <label htmlFor="subject" className="mb-3 block text-base font-medium text-white">Subject</label>
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
                            <label htmlFor="message" className="mb-3 block text-base font-medium text-white">Message</label>
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
                )}
        </section>
        </div>
    )
}

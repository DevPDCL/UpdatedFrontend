import React from "react";


function Refund() {
    return (
        <div className="bg-[#ffffff] p-5 mx-auto max-w-7xl">
            <div className="flex flex-col pt-[80px] mx-auto max-w-7xl">
                <h2 className="text-gray-900/50 pb-5 text-center pl-2 text-[28px] font-bold font-ubuntu">
                    Refund and Return Policy
                </h2>
                <div className="flex flex-col">
                    <h1 className="font-bold text-[18px]">1. Introduction</h1>
                    <p className="text-gray-500">At Popular Diagnostic Centre Ltd., we are committed to providing high-quality diagnostic services in Pathology, Radiology, and Imaging tests. Our Return and Refund Policy ensures clarity and fairness in handling the unique nature of our services. </p>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-[18px]">2. Refund Eligibility</h1>
                    <p className="text-gray-500">Refunds are generally processed for tests that have not been conducted or processed. Tests that are already in progress or completed are not eligible for a refund.<br></br>
                        In cases of error or technical issues attributable to our facility, clients may be eligible for a retest or partial refund, as determined on a case-by-case basis. </p>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-[18px]">3. Process for Requesting a Refund</h1>
                    <p className="text-gray-500">To initiate a refund, clients must contact Popular Diagnostic Centre Ltd. through our official communication channels, providing details of the test and the reason for the refund request.<br></br>
                        Refund requests must be made within 3 business days of the test date. </p>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-[18px]">4. Refund Timeline</h1>
                    <p className="text-gray-500">Approved refunds will be processed within 7 to 10 working days from the date of approval.<br></br>
                        Refunds will be credited to the original payment method or through an alternative method mutually agreed upon. </p>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-[18px]">5. Non-refundable Services</h1>
                    <p className="text-gray-500">Services where the results have already been provided to the client are non-refundable.<br></br>
                        In cases where test results are contested, we offer a procedure for review or retesting, subject to specific terms and conditions. </p>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-[18px]">6. Contact Information</h1>
                    <p className="text-gray-500">For any queries or further information regarding our Return and Refund Policy, please contact us at -<br></br>
                        Popular Diagnostic Centre Ltd<br></br>
                        House #16, Road # 2, Dhanmondi R/A,<br></br>
                        Dhaka-1205, Bangladesh<br></br>
                        Phone: 09613 787801, 09666 787801<br></br>
                        E-mail: info@populardiagnostic.com </p>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-[18px]">7. Amendments to the Policy</h1>
                    <p className="text-gray-500">Popular Diagnostic Centre Ltd. reserves the right to amend this policy at any time. Amendments will be effective immediately and will be communicated through our official channels. </p>
                </div>
            </div>
            
        </div>
    );
}

export default Refund;
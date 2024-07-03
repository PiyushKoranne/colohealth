import React from 'react'
import OrderForm from './OrderForm';

function NewOrder() {
	return (
		<div className='col-span-3 py-[25px] px-[50px]' >
			<h1 className='text-[40px] text-center uppercase'>New order</h1>
			<h3 className='font-bold mt-[40px] text-[18px]'>ColoHealth is recommended for patients who meet the following
				guidelines.</h3>

			<ul className='list-decimal pl-[15px] mt-[20px] text-[18px]'>
				<li>Patients who are 50 Years or older</li>
				<li>Patients who have declined the recommended U.S. Preventive Services Task Force
					(USPSTF) colorectal cancer (CRC) screening methods such as fecal tests,
					sigmoidoscopy, and/or colonoscopy?</li>
				<li>
					Patients who <span className='font-bold'>do not have</span> close relatives (parent, sibling, child) who have been
					diagnosed with CRC, precancerous polyps or hereditary colorectal cancer
					syndromes such as familial adenomatous polyposis (FAP) or Lynch syndrome?
				</li>
				<li>
					Patients who <span className='font-bold'>do not have</span> a history of CRC, polyps, inflammatory bowel disease,
					or hereditary CRC syndromes?
				</li>
				<li>
					Patients who <span className='font-bold'>do not have</span> any of the following symptoms: A change in bowel
					habits including diarrhea, constipation, or narrowing of stool that persists over a
					couple of days. Constant changing in bowel habits – e.g., feeling like there is bowel
					movement that is not relieved by passing stool. Rectal bleeding with visible red blood.
					Blood in the stool, which can change the appearance of stool to look dark brown or
					black. Abdominal cramping or pain. Weakness and fatigue. Inexplicable weight loss.
				</li>
			</ul>

			<h3 className='font-bold mt-[40px] text-[18px]'>After placing this order, you will:</h3>

			<ul className='list-decimal pl-[15px] mt-[20px] text-[18px]'>
				<li>Download Print the requisition form provided.</li>
				<li>
					Have the Patient sign the requisition/consent form.
					<ol className=''>
						<li>You may also sign for your records. Completing this order qualifies as provider
							signature.</li>
					</ol>
				</li>
				<li>
					Collect a blood sample from the patient
				</li>
				<li>
					Mail the sample to:
					<p className='w-[250px] whitespace-normal mt-[30px]'>
						New Day Diagnostics<br />
						6701 Baum Drive, Suite 110<br />
						Knoxville, TN 37919
					</p>
				</li>
			</ul>

			<h3 className='font-bold mt-[40px] text-[18px]'>Patient Information</h3>
			<div className='w-[70%] mt-[30px]'>

				<OrderForm />
				<p className='text-[40px] text-center uppercase my-[30px]'>Choose payment option</p>
				<p className='text-[18px]'><span className='font-bold'>Invoiced Orders</span>are tablulated and charged to your account as per terms of your
					agreement with NewDay Diagnostics.</p>
				<button className='px-[30px] mt-[30px] py-[12.5px] font-semibold border-[1px] border-black bg-[#DEA52B] uppercase'>Place Invoiced Order</button>
				<p className='text-[18px] font-bold mt-[25px] mb-[10px]'>OR</p>
				<p className='my-[5px] text-[18px]'>Pay directly online and instantly book your order</p>
				<button className='px-[30px] py-[12.5px] font-semibold text-white border-[1px] border-black bg-[#202020] uppercase'>Pay Now</button>
			</div>

		</div>
	)
}

export default NewOrder
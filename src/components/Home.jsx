import React, { useEffect, useState } from 'react'
import Navbar from './common/Navbar'
import Footer from './common/Footer'
import { Calendar, Radio } from 'antd';

function Home() {
	const [preRegistrationForm, setPreRegistrationForm] = useState([
		{
			que: "Are you 50 years of age or older?(Required)",
			ans: "",
			required: true
		},
		{
			que: "Have you declined the recommended U.S. Preventive Services Task Force (USPSTF) colorectal cancer (CRC) screening methods such as fecal tests, sigmoidoscopy, and/or colonoscopy?(Required)",
			ans: "",
			required: true
		},
		{
			que: "Have any of your close relatives (parent, sibling, child) been diagnosed with CRC, precancerous polyps or hereditary colorectal cancer syndromes such as familial adenomatous polyposis (FAP) or Lynch syndrome?(Required)",
			ans: "",
			required: true
		},
		{
			que: "Do you have a history of CRC, polyps, inflammatory bowel disease, or hereditary CRC syndromes?(Required)",
			ans: "",
			required: true
		},
		{
			que: "Are you having any of the following symptoms: A change in bowel habits including diarrhea, constipation, or narrowing of stool that persists over a couple of days. Constant changing in bowel habits – e.g., feeling like there is bowel movement that is not relieved by passing stool. Rectal bleeding with visible red blood. Blood in the stool, which can change the appearance of stool to look dark brown or black. Abdominal cramping or pain. Weakness and fatigue. Inexplicable weight loss.(Required)",
			ans: "",
			required: true
		},
	]);


	const [currentQ, setCurrentQ] = useState(0);
	const [quizComplete, setQuizComplete] = useState(false);
	const [quizError, setQuizError] = useState(false);

	function reAttemptTest() {
		setQuizComplete(false);
		setCurrentQ(0);
		setQuizError(false);
	}

	function setCurrentAnswer(ans) {
		const index = currentQ;
		setPreRegistrationForm(prev => {
			const temp = prev.map(item => {
				if (item.que === prev[index].que) {
					item.ans = ans;
					return item;
				} else {
					return item;
				}
			});
			return temp;
		});
		console.log("CURRENTLY", currentQ);
		if (currentQ === 4) setQuizComplete(true);
		setCurrentQ(prev => prev + 1);
	}

	const onPanelChange = (value, mode) => {
		console.log(value.format('YYYY-MM-DD'), mode);
	};

	useEffect(() => {
		if (quizComplete) {
			// last question done, begin evaluation
			const responseString = preRegistrationForm.map(item => item.ans).join("");
			console.log("I N H E R E", responseString);
			if (responseString !== 'yynnn') {
				setQuizError(true);
				setQuizComplete(true);
			} else {
				// display quix complete and edit option
				setQuizComplete(true);
			}
		}
	}, [quizComplete])

	return (
		<>
			<Navbar />
			<section className='py-[125px]'>
				<div className='center-wr'>
					<h1 className='text-[48px] font-semibold uppercase text-center'>get screened with colohealth</h1>
					<p className='text-[20px] text-center capitalize'>In three easy steps</p>
					<div className='flex items-start justify-evenly py-[40px]'>
						<div className='flex flex-col gap-[10px] max-w-[305px] items-center justify-start p-[10px]'>
							<div className='w-[100px] h-[100px] flex items-center justify-center rounded-full bg-sky-600 font-extrabold text-[54px] shadow-xl text-white'>1</div>
							<h2 className='capitalize text-[30px] text-center'>Answer 5 patient history questions</h2>
							<p className='text-center'>To understand if ColoHealth is
								indicated for you. It is intended for
								those age 50 or older and at
								average risk for colorectal cancer</p>
						</div>
						<div className='flex flex-col gap-[10px] max-w-[305px] items-center justify-start p-[10px]'>
							<div className='w-[100px] h-[100px] flex items-center justify-center rounded-full bg-sky-600 font-extrabold text-[54px] shadow-xl text-white'>2</div>
							<h2 className='capitalize text-[30px] text-center'>schedule your blood draw</h2>
							<p className='text-center'>The cost of the test and your
								blood draw appointment is
								$199. New Day does not
								currently file insurance claims</p>
						</div>
						<div className='flex flex-col gap-[10px] max-w-[305px] items-center justify-start p-[10px]'>
							<div className='w-[100px] h-[100px] flex items-center justify-center rounded-full bg-sky-600 font-extrabold text-[54px] shadow-xl text-white'>3</div>
							<h2 className='capitalize text-[30px] text-center'>Pay For Your
								Test Online</h2>
							<p className='text-center'>Follow the steps below to pay for
								your test and schdule your blood
								draw</p>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className='border-t-[4px] border-b-[4px] border-[#DEA52B] py-[45px]'>
					<div className='center-wr flex items-center justify-center'>
						<div className='flex items-center justify-start gap-[50px]'>
							<div className='w-[100px] h-[100px] flex items-center justify-center rounded-full bg-sky-600 font-extrabold text-[54px] shadow-xl text-white'>1</div>
							<div className='flex flex-col items-center'>
								<h3 className='uppercase text-[40px]'>Pre-registration patient history</h3>
								<p className='text-[20px]'>Please answer the follwoing questions to determine your eligibility for colohealth</p>
							</div>
						</div>
					</div>
				</div>

				{/**
				 * Form Container Starts 
				 */}
				<div className=' center-wr flex flex-col items-center justify-center p-[100px] min-h-[450px]'>
					{
						quizComplete ? quizError ? (<><p>You are not eligible for this.</p></>) : (
							<div className='flex flex-col items-center justify-center'>
								<figure>
									<img src="/success-144.png" alt="Success" />
								</figure>
								<h4 className='capitalize text-[32px] font-semibold text-center'>You are all set! Please Proceed with the process</h4>
								<div className='flex items-center gap-[30px] mt-[25px]'>
									<button onClick={() => { reAttemptTest() }} className='py-[10px] px-[30px] bg-gradient-to-t from-slate-900 to-slate-700 rounded-[4px] text-[22px] text-white'>Reattempt</button>
								</div>
							</div>
						) : (
							<>
								<p className='text-[22px] text-center'>{preRegistrationForm[currentQ].que}</p>
								<div className='flex items-center gap-[30px] mt-[25px]'>
									<button onClick={() => { setCurrentAnswer("y") }} className='py-[10px] px-[30px] bg-gradient-to-t from-slate-900 to-slate-700 rounded-[4px] text-[22px] text-white'>Yes</button>
									<button onClick={() => { setCurrentAnswer("n") }} className='py-[10px] px-[30px] bg-gradient-to-t from-slate-900 to-slate-700 rounded-[4px] text-[22px] text-white'>No</button>
								</div>
							</>
						)
					}
				</div>
			</section>

			<section>
				<div className='border-t-[4px] border-b-[4px] border-[#DEA52B] py-[45px]'>
					<div className='center-wr flex items-center justify-center'>
						<div className='flex items-center justify-start gap-[50px]'>
							<div className='w-[100px] h-[100px] flex items-center justify-center rounded-full bg-sky-600 font-extrabold text-[54px] shadow-xl text-white'>2</div>
							<div className='flex flex-col items-center'>
								<h3 className='uppercase text-[40px]'>SCHEDULE YOUR BLOOD DRAW</h3>
								<p className='text-[20px]'>Please select from the available appointment times</p>
							</div>
						</div>
					</div>
				</div>

				<div className=' center-wr flex flex-col items-center justify-center pt-[50px] pb-[150px]'>
					<div className='flex items-center justify-center w-full'>
						<div className='w-[60%]'>
							<h3 className='font-bold text-[16px]'>Pick a Date & Time</h3>
							<Calendar fullscreen={false} onChange={onPanelChange} />
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className='border-t-[4px] border-b-[4px] border-[#DEA52B] py-[45px]'>
					<div className='center-wr flex items-center justify-center'>
						<div className='flex items-center justify-start gap-[50px]'>
							<div className='w-[100px] h-[100px] flex items-center justify-center rounded-full bg-sky-600 font-extrabold text-[54px] shadow-xl text-white'>3</div>
							<div className='flex flex-col items-center'>
								<h3 className='uppercase text-[40px]'>PAY FOR YOUR TEST</h3>
								<p className='text-[20px]'>Please select from the available appointment times</p>
							</div>
						</div>
					</div>
				</div>

				<div className=' center-wr flex flex-col items-center justify-center pt-[50px] pb-[150px]'>
					<div className='flex items-center justify-center w-full'>
						<div className='w-[60%]'>
							<form className='grid grid-cols-6 gap-3 gap-y-6' action="">
								{/* First Name */}
								<div className='bg-[#E6E7E8] border-[1px] border-[#000] px-[30px] py-[14.5px] col-span-3'>
									<input type="text" placeholder='First Name' className='outline-none width-full border-none bg-transparent' />
								</div>
								{/* Last Name */}
								<div className='bg-[#E6E7E8] border-[1px] border-[#000] px-[30px] py-[14.5px] col-span-3'>
									<input type="text" placeholder='Last Name' className='outline-none width-full border-none bg-transparent' />
								</div>
								{/* Addr */}
								<div className='bg-[#E6E7E8] border-[1px] border-[#000] px-[30px] py-[14.5px] col-span-6'>
									<input type="text" placeholder='Street Address' className='outline-none width-full border-none bg-transparent' />
								</div>
								{/* City */}
								<div className='bg-[#E6E7E8] border-[1px] border-[#000] px-[30px] py-[14.5px] col-span-2'>
									<input type="text" placeholder='City' className='outline-none width-full border-none bg-transparent' />
								</div>
								{/* State */}
								<div className='bg-[#E6E7E8] border-[1px] border-[#000] px-[30px] py-[14.5px] col-span-2'>
									<input type="text" placeholder='State' className='outline-none width-full border-none bg-transparent' />
								</div>
								{/* Zip */}
								<div className='bg-[#E6E7E8] border-[1px] border-[#000] px-[30px] py-[14.5px] col-span-2'>
									<input type="text" placeholder='Zip' className='outline-none width-full border-none bg-transparent' />
								</div>
								{/* Phone */}
								<div className='bg-[#E6E7E8] border-[1px] border-[#000] px-[30px] py-[14.5px] col-span-6'>
									<input type="text" placeholder='Phone' className='outline-none width-full border-none bg-transparent' />
								</div>
								{/* Email */}
								<div className='bg-[#E6E7E8] border-[1px] border-[#000] px-[30px] py-[14.5px] col-span-6'>
									<input type="text" placeholder='Email' className='outline-none width-full border-none bg-transparent' />
								</div>
								{/* Bday */}
								<div className='bg-[#E6E7E8] border-[1px] border-[#000] px-[30px] py-[14.5px] col-span-6'>
									<input type="text" placeholder='Birthday (mm/dd/yyyy)' className='outline-none width-full border-none bg-transparent' />
								</div>
								{/* Race */}
								<div className='bg-[#E6E7E8] border-[1px] border-[#000] px-[30px] py-[14.5px] col-span-6'>
									<p>Race</p>
									<div className='flex flex-wrap items-start mt-[10px] gap-[20px] gap-y-[30px]'>
										<Radio.Group size='large' name="radiogroup" className='flex items-center justify-start gap-[20px] flex-wrap ' defaultValue={1}>
											<Radio value={"American Indian"}>American Indian</Radio>
											<Radio value={"Alaskan Native"}>Alaskan Native</Radio>
											<Radio value={"Asian"}>Asian</Radio>
											<Radio value={"White"}>White</Radio>
											<Radio value={"African American"}>African American</Radio>
											<Radio value={"Native American"}>Native American</Radio>
											<Radio value={"Pacific Islander"}>Pacific Islander</Radio>
											<Radio value={"Other"}>Other</Radio>
										</Radio.Group>
									</div>
								</div>
								{/* Ethnicity */}
								<div className='bg-[#E6E7E8] border-[1px] border-[#000] px-[30px] py-[14.5px] col-span-6'>
									<p>Ethnicity</p>
									<div className='flex flex-wrap items-start mt-[10px] gap-[20px] gap-y-[30px]'>
										<Radio.Group size='large' name="radiogroup" className='flex items-center justify-start gap-[20px] flex-wrap ' defaultValue={1}>
											<Radio value={"American Indian"}>Hispanic / Latino</Radio>
											<Radio value={"Alaskan Native"}>Not Hispanic / Latino</Radio>
										</Radio.Group>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>


			<Footer />
		</>
	)
}

export default Home
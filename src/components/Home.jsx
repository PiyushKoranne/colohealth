import React, { useEffect, useState } from 'react'
import Navbar from './common/Navbar'
import Footer from './common/Footer'
import {  Checkbox, Radio, DatePicker, Calendar } from 'antd';
import { Formik } from 'formik';
import { AcceptHosted, HostedForm } from 'react-acceptjs';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import dayjs from 'dayjs';
import { LuClock4 } from 'react-icons/lu';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ResponseBlock from './ResponseBlock';
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


function Home() {
	const navigate = useNavigate();

	const authData = {
		apiLoginID: '5KP3u95bQpv',
		clientKey: '346HZ32z3fP4hTG2',
	};


	
	const disabledDate = (current) => {
		// Can not select days before today and weekends
		return current && (current < dayjs().startOf('day') || current.getDay() === 0 || current.getDay() === 6);
	};


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

	const [scheduledAt, setScheduledAt] = useState(new Date());
	const [currentQ, setCurrentQ] = useState(0);
	const [quizComplete, setQuizComplete] = useState(false);
	const [quizError, setQuizError] = useState(false);
	const [formToken, setFormToken] = useState('');
	const [showPaymentBlock, setShowPaymentBlock] = useState(false);
	const [blockedTimes, setBlockedTimes] = useState([]);
	const [response, setResponse] = React.useState('');


	function reAttemptTest() {
		setQuizComplete(false);
		setCurrentQ(0);
		setQuizError(false);
	}


	async function getFormToken() {
		const response = await axios.get("http://174.138.76.145/colo-pay");
		if (response.status === 200) {
			setFormToken(response.data.code.token);
		}
	}

	function cellRenderer(value) {
		return (
			<div className='flex justify-center items-center flex-col gap-[10px]'>
				{blockedTimes.indexOf(new Date(value).toDateString()) !== -1 ? <div id='booked-calendar-item'>Booked</div> : new Date(value).toDateString() === new Date(scheduledAt).toDateString() ? <div className='text-[16px] mt-[20px]'>Selected</div> : null}
			</div>
		)
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
		if (currentQ === 4) setQuizComplete(true);
		setCurrentQ(prev => prev + 1);
	}


	async function handleSubmitTestForm(setSubmitting, values) {
		try {
			const response = await axios.post("http://174.138.76.145/register-new-test-data", { ...values, scheduledAt });
			if (response.status === 200) {
				setShowPaymentBlock(true);
			} else {
				toast.error("Failed to register", { style: { backgroundColor: "#101010", color: "white" } });
				console.log('not ok', response);
			}
			setSubmitting(false);
		} catch (error) {
			console.log(error);
			setSubmitting(false);
		}
	}

	async function getScheduledTimes() {
		try {
			const response = await axios.get("http://174.138.76.145/get-scheduled-times");
			if (response.status === 200) {
				setBlockedTimes(response.data.blockedTimes.map(item => new Date(item).toDateString()));
			} else {
				console.log(response);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getScheduledTimes();
	}, [blockedTimes.length])

	useEffect(() => {
		if (quizComplete) {
			const responseString = preRegistrationForm.map(item => item.ans).join("");
			if (responseString !== 'yynnn') {
				setQuizError(true);
				setQuizComplete(true);
				navigate("/not-eligible");
			} else {
				setQuizComplete(true);
			}
		}
	}, [quizComplete])

	useEffect(() => {
		getFormToken();
	}, [])


	return (
		<>
			<Toaster
				position="bottom-center"
				reverseOrder={false}
			/>
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
							<h3 className='font-bold text-[16px] mb-[10px]'>Pick a Date & Time</h3>
							<div className=' flex items-center'>
								<DatePicker
									className='w-full border-[1px] border-[rgba(0,0,0,0.2)]'
									format="YYYY-MM-DD HH:mm:ss"
									disabledDate={disabledDate}
									// disabledTime={disabledDateTime}
									showTime={{
										defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
									}}
									onChange={(date, datestring) => { setScheduledAt(date) }}
								/>
								{/* <DatePicker format="MM/dd/yyyy HH:mm aa" showMeridian shouldDisableDate={disabledDate} value={scheduledAt} onChange={(value, event) => { setScheduledAt(value) }} /> */}
							</div>

							<Calendar fullscreen cellRender={cellRenderer} />
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
							<Formik
								initialValues={{ confirm: false, firstName: '', lastName: '', dob: '', gender: '', streetAddress: "", city: '', state: '', zip: '', phone: '', email: '', race: 'American Indian', ethnicity: 'Hispanic/Latino' }}
								validate={values => {
									const errors = {};
									if (!values.email) {
										errors.email = 'Required';
									} else if (
										!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
									) {
										errors.email = 'Invalid email address';
									}
									if (!values.confirm) errors.confirm = "Please consent to the registration by checking this field."
									if (!values.firstName) errors.firstName = "Please enter your first name";
									if (!values.lastName) errors.lastName = "Please enter your last name";
									if (!values.dob) errors.dob = "Please enter your DoB";
									if (!values.gender) errors.gender = "Please enter your gender";
									if (!values.streetAddress) errors.streetAddress = "Please enter your address";
									if (!values.city) errors.city = "City is required";
									if (!values.state) errors.state = "State is required";
									if (!values.zip) errors.zip = "Zip is required";
									if (!values.phone) errors.phone = "Phone is required";
									if (!values.email) errors.email = "Email is required";
									if (!values.race) errors.race = "Race is required";
									if (!values.ethnicity) errors.ethnicity = "Ethnicity is required";
									return errors;
								}}
								onSubmit={(values, { setSubmitting }) => {
									setTimeout(() => {
										handleSubmitTestForm(setSubmitting, values);
									}, 400);
								}}
							>
								{({
									values,
									errors,
									touched,
									isSubmitting,
									handleChange,
									handleBlur,
									handleSubmit,
									setFieldValue,
								}) => (
									<form className='grid grid-cols-6 gap-3 gap-y-8' onSubmit={handleSubmit}>
										{/* First Name */}
										<div style={{ backgroundColor: touched.firstName && errors.firstName ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[15.5px] col-span-3'>
											{((touched.firstName && errors.firstName) || (touched.lastName && errors.lastName)) && <figure className='error-arrow-hldr absolute left-[-140px] top-0 translate-y-[-25%]'>
												<img src="/error-arrow.png" className='rotate-[-90deg]' alt="" />
											</figure>}
											{errors.firstName && touched.firstName && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.firstName}</span>}
											<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.firstName} name='firstName' placeholder='First Name' className='inline-block outline-none w-full border-none bg-transparent' />
										</div>
										{/* Last Name */}
										<div style={{ backgroundColor: touched.lastName && errors.lastName ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[15.5px] col-span-3'>
											{errors.lastName && touched.lastName && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.lastName}</span>}
											<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.lastName} name='lastName' placeholder='Last Name' className='inline-block outline-none w-full border-none bg-transparent' />
										</div>
										{/* Addr */}
										<div style={{ backgroundColor: touched.streetAddress && errors.streetAddress ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[15.5px] col-span-6'>
											{((errors.streetAddress && touched.streetAddress)) && <figure className='error-arrow-hldr absolute left-[-140px] top-0 translate-y-[-25%]'>
												<img src="/error-arrow.png" className='rotate-[-90deg]' alt="" />
											</figure>}
											{errors.streetAddress && touched.streetAddress && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.streetAddress}</span>}
											<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.streetAddress} name='streetAddress' placeholder='Street Address' className='inline-block outline-none w-full border-none bg-transparent' />
										</div>
										{/* City */}
										<div style={{ backgroundColor: touched.city && errors.city ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[15.5px] col-span-2'>
											{((touched.city && errors.city) || (touched.state && errors.state) || (touched.zip && errors.zip)) && <figure className='error-arrow-hldr absolute left-[-140px] top-0 translate-y-[-25%]'>
												<img src="/error-arrow.png" className='rotate-[-90deg]' alt="" />
											</figure>}
											{errors.city && touched.city && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.city}</span>}
											<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.city} name='city' placeholder='City' className='inline-block outline-none w-full border-none bg-transparent' />
										</div>
										{/* State */}
										<div style={{ backgroundColor: touched.state && errors.state ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[15.5px] col-span-2'>
											{errors.state && touched.state && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.state}</span>}
											<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.state} name='state' placeholder='State' className='inline-block outline-none w-full border-none bg-transparent' />
										</div>
										{/* Zip */}
										<div style={{ backgroundColor: touched.zip && errors.zip ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[15.5px] col-span-2'>
											{errors.zip && touched.zip && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.zip}</span>}
											<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.zip} name='zip' placeholder='Zip' className='inline-block outline-none w-full border-none bg-transparent' />
										</div>
										{/* Phone */}
										<div style={{ backgroundColor: touched.phone && errors.phone ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[15.5px] col-span-6'>
											{((touched.phone && errors.phone)) && <figure className='error-arrow-hldr absolute left-[-140px] top-0 translate-y-[-25%]'>
												<img src="/error-arrow.png" className='rotate-[-90deg]' alt="" />
											</figure>}
											{errors.phone && touched.phone && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.phone}</span>}
											<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.phone} name='phone' placeholder='Phone' className='inline-block outline-none w-full border-none bg-transparent' />
										</div>
										{/* Email */}
										<div style={{ backgroundColor: touched.email && errors.email ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[15.5px] col-span-6'>
											{((touched.email && errors.email)) && <figure className='error-arrow-hldr absolute left-[-140px] top-0 translate-y-[-25%]'>
												<img src="/error-arrow.png" className='rotate-[-90deg]' alt="" />
											</figure>}
											{errors.email && touched.email && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.email}</span>}
											<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.email} name='email' placeholder='Email' className='inline-block outline-none w-full border-none bg-transparent' />
										</div>
										{/* Bday */}
										<div style={{ backgroundColor: touched.dob && errors.dob ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[15.5px] col-span-6'>
											{((touched.dob && errors.dob)) && <figure className='error-arrow-hldr absolute left-[-140px] top-0 translate-y-[-25%]'>
												<img src="/error-arrow.png" className='rotate-[-90deg]' alt="" />
											</figure>}
											{errors.dob && touched.dob && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.dob}</span>}
											<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.dob} name='dob' placeholder='Birthday (mm/dd/yyyy)' className='inline-block outline-none w-full border-none bg-transparent' />
										</div>
										{/* Gender */}
										<div style={{ backgroundColor: touched.gender && errors.gender ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[15.5px] col-span-6'>
											<p>Gender</p>
											<div className='flex flex-wrap items-start mt-[10px] gap-[20px] gap-y-[30px]'>
												<Radio.Group value={values.gender} onChange={handleChange} onBlur={handleBlur} size='large' name="gender" className='flex items-center justify-start gap-[20px] flex-wrap ' defaultValue={1}>
													<Radio value={"Male"}>Male</Radio>
													<Radio value={"Female"}>Female</Radio>
													<Radio value={"Prefer Not To Say"}>Prefer Not To Say</Radio>
												</Radio.Group>
											</div>
										</div>
										{/* Race */}
										<div style={{ backgroundColor: touched.race && errors.race ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[15.5px] col-span-6'>
											<p>Race</p>
											<div className='flex flex-wrap items-start mt-[10px] gap-[20px] gap-y-[30px]'>
												<Radio.Group onChange={handleChange} onBlur={handleBlur} size='large' name="race" className='flex items-center justify-start gap-[20px] flex-wrap ' value={values.race}>
													<Radio value={"American Indian"}>American Indian</Radio>
													<Radio value={"Alaskan Native"}>Alaskan Native</Radio>
													<Radio value={"Asian"}>Asian</Radio>
													<Radio value={"White"}>White</Radio>
													<Radio value={"African American"}>African American</Radio>
													<Radio value={"Native American"}>Native American</Radio>
													<Radio value={"Pacific Islander"}>Pacific Islander</Radio>
													<Radio value={"Other"}>Other</Radio>
													<Radio value={"Prefer Not To Say"}>Prefer Not To Say</Radio>
												</Radio.Group>
											</div>
										</div>
										{/* Ethnicity */}
										<div style={{ backgroundColor: touched.ethnicity && errors.ethnicity ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[15.5px] col-span-6'>
											<p>Ethnicity</p>
											<div className='flex flex-wrap items-start mt-[10px] gap-[20px] gap-y-[30px]'>
												<Radio.Group value={values.ethnicity} onChange={handleChange} onBlur={handleBlur} size='large' name="ethnicity" className='flex items-center justify-start gap-[20px] flex-wrap ' defaultValue={1}>
													<Radio value={"Hispanic/Latino"}>Hispanic / Latino</Radio>
													<Radio value={"Not Hispanic/Latino"}>Not Hispanic / Latino</Radio>
													<Radio value={"Prefer Not To Say"}>Prefer Not To Say</Radio>
												</Radio.Group>
											</div>
										</div>

										<div className='col-span-6 relative'>
											{((touched.confirm && errors.confirm)) && <figure className='error-arrow-hldr absolute left-[-140px] top-0 translate-y-[-25%]'>
												<img src="/error-arrow.png" className='rotate-[-90deg]' alt="" />
											</figure>}
											<p className='font-normal text-[13px] mb-[10px]'>Your presonal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a className='text-red-600' href="">privacy policy</a>.</p>
											<Checkbox name='confirm' onChange={(e) => { setFieldValue('confirm', e.target.checked) }}>Please check here to confirm that you have read and agree to our <a className='text-red-600' href="">terms and conditions (link opens in a new tab)*</a> </Checkbox>
											{(touched.confirm && errors.confirm) && <p className='font-semibold text-red-600'>{errors.confirm}</p>}
											<div className='flex items-center justify-end mt-[15px]'>
												<button type='submit' className='leading-[50px] px-[30px] bg-[#202020] text-white' >{isSubmitting ? <ColorRing
													visible={true}
													height="45"
													width="45"
													ariaLabel="color-ring-loading"
													wrapperStyle={{}}
													wrapperClass="color-ring-wrapper"
													colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
												/> : 'Register'}</button>
											</div>
										</div>
									</form>
								)}
							</Formik>
							<div className='mt-[35px] flex items-center justify-end w-full'>
								{(showPaymentBlock && formToken) && (
									<>
										<div className='flex items-center justify-start flex-col bg-[#E8E7ED] w-full'>
											<div className='flex items-center gap-[10px] py-[25px] pb-[25px] px-[35px] w-full'>
												<h3>Credit Card</h3>
												<img src="/allcard.png" width={170} alt="" />
											</div>
											<div className='border-t-[1px] border-[rgba(0,0,0,0.3)] bg-[#E8E7ED] pt-[20px] px-[35px] pb-[35px] w-full'>
												<p >Your presonal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a className='text-red-600' href="">privacy policy</a>.</p>
												<p className='mt-[15px]'>Please enter your credit card details below to proceed with the payment securely.</p>

												<div className='flex items-center justify-end'>
													<div className="row">
														<div className="flex items-center justify-center">
															
														</div>
														<div className="text-green-600">
															<ResponseBlock response={response} />
														</div>
													</div>
												</div>
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	)
}

export default Home
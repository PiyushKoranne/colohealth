import React, { useState } from 'react'
import Navbar from './common/Navbar'
import Footer from './common/Footer'
import { Formik } from 'formik'
import { Checkbox, Radio } from 'antd'
import { ColorRing } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'


// const { Column, HeaderCell, Cell } = Table;
// const CompactCell = props => <Cell {...props} style={{ padding: 4 }} />;
// const CompactHeaderCell = props => <HeaderCell className='font-bold text-black text-[16px]' {...props} style={{ padding: 4 }} />;
const defaultColumns = [
	{
		key: 'order_number',
		label: 'Order Number',
		fixed: true,
		width: 150
	},
	{
		key: 'firstName',
		label: 'First Name',
		fixed: false,
	},
	{
		key: 'lastName',
		label: 'Last Name',
	},

	{
		key: 'dob',
		label: 'DOB',
		width: 200
	},
	{
		key: 'requisition',
		label: 'Requisition',
		flexGrow: 1
	}
];

const ProviderPage = () => {

	const [loading, setLoading] = useState(false);
	const [compact, setCompact] = useState(true);
	const [bordered, setBordered] = useState(true);
	const [noData, setNoData] = useState(false);
	const [showHeader, setShowHeader] = useState(true);
	const [autoHeight, setAutoHeight] = useState(true);
	const [fillHeight, setFillHeight] = useState(false);
	const [hover, setHover] = useState(true);
	const [patientHistory, setPatientHistory] = useState([]);

	const [tabber, setTabber] = useState('NEW_ORDER');
	const [columnKeys, setColumnKeys] = useState(defaultColumns.map(column => column.key));
	const columns = defaultColumns.filter(column => columnKeys.some(key => key === column.key));
	function printBlankRequisition() {
		const pdfUrl = `${window.location.origin}/colohealth-rec-form-provider.pdf`;
		window.open(pdfUrl, "PRINT", "height=400,width=600");
	}

	async function handlePasswordChange(values) {
		try {
			const response = await axios.post("http://192.168.16.36:4001/password-reset", {...values, accessToken: localStorage.getItem('colo_H_accessToken')});
			if(response.status === 200){
				toast.success("Password reset successfully!")
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<Toaster position='bottom-center' />
			<Navbar />
			<section className=''>
				<div className='center-wr'>
					<div className='border-b-[4px] border-b-[#DEA52B] py-[50px] flex flex-col items-center justify-center'>
						<figure>
							<img src="/logo-updated.png" width={200} alt="" />
						</figure>
						<h1 className='text-[40px] text-center'>Provider Portal</h1>
					</div>
					<div className='grid grid-cols-4'>
						{
							tabber === "NEW_ORDER" ? (
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

										<Formik

											initialValues={{ confirm: false, firstName: '', lastName: '', dob: '', streetAddress: "", city: '', state: '', zip: '', phone: '', email: '', race: 'American Indian', ethnicity: 'Hispanic/Latino' }}
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
													// handleSubmitTestForm(setSubmitting, values);
												}, 400);
											}}
										>
											{({
												values,
												errors,
												touched,
												handleChange,
												handleBlur,
												handleSubmit,
												isSubmitting,
												setFieldValue,
											}) => (
												<form className='grid grid-cols-6 gap-3 gap-y-6' onSubmit={handleSubmit}>
													{/* First Name */}
													<div style={{ backgroundColor: touched.firstName && errors.firstName ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[12.5px] col-span-3'>
														{((touched.firstName && errors.firstName) || (touched.lastName && errors.lastName)) && <figure className='error-arrow-hldr absolute left-[-140px] top-0 translate-y-[-25%]'>
															<img src="/error-arrow.png" className='rotate-[-90deg]' alt="" />
														</figure>}
														{errors.firstName && touched.firstName && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.firstName}</span>}
														<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.firstName} name='firstName' placeholder='First Name' className='inline-block outline-none w-full border-none bg-transparent' />
													</div>
													{/* Last Name */}
													<div style={{ backgroundColor: touched.lastName && errors.lastName ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[12.5px] col-span-3'>
														{errors.lastName && touched.lastName && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.lastName}</span>}
														<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.lastName} name='lastName' placeholder='Last Name' className='inline-block outline-none w-full border-none bg-transparent' />
													</div>
													{/* Addr */}
													<div style={{ backgroundColor: touched.streetAddress && errors.streetAddress ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[12.5px] col-span-6'>
														{((errors.streetAddress && touched.streetAddress)) && <figure className='error-arrow-hldr absolute left-[-140px] top-0 translate-y-[-25%]'>
															<img src="/error-arrow.png" className='rotate-[-90deg]' alt="" />
														</figure>}
														{errors.streetAddress && touched.streetAddress && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.streetAddress}</span>}
														<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.streetAddress} name='streetAddress' placeholder='Street Address' className='inline-block outline-none w-full border-none bg-transparent' />
													</div>
													{/* City */}
													<div style={{ backgroundColor: touched.city && errors.city ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[12.5px] col-span-2'>
														{((touched.city && errors.city) || (touched.state && errors.state) || (touched.zip && errors.zip)) && <figure className='error-arrow-hldr absolute left-[-140px] top-0 translate-y-[-25%]'>
															<img src="/error-arrow.png" className='rotate-[-90deg]' alt="" />
														</figure>}
														{errors.city && touched.city && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.city}</span>}
														<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.city} name='city' placeholder='City' className='inline-block outline-none w-full border-none bg-transparent' />
													</div>
													{/* State */}
													<div style={{ backgroundColor: touched.state && errors.state ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[12.5px] col-span-2'>
														{errors.state && touched.state && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.state}</span>}
														<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.state} name='state' placeholder='State' className='inline-block outline-none w-full border-none bg-transparent' />
													</div>
													{/* Zip */}
													<div style={{ backgroundColor: touched.zip && errors.zip ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[12.5px] col-span-2'>
														{errors.zip && touched.zip && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.zip}</span>}
														<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.zip} name='zip' placeholder='Zip' className='inline-block outline-none w-full border-none bg-transparent' />
													</div>
													{/* Phone */}
													<div style={{ backgroundColor: touched.phone && errors.phone ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[12.5px] col-span-6'>
														{((touched.phone && errors.phone)) && <figure className='error-arrow-hldr absolute left-[-140px] top-0 translate-y-[-25%]'>
															<img src="/error-arrow.png" className='rotate-[-90deg]' alt="" />
														</figure>}
														{errors.phone && touched.phone && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.phone}</span>}
														<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.phone} name='phone' placeholder='Phone' className='inline-block outline-none w-full border-none bg-transparent' />
													</div>
													{/* Email */}
													<div style={{ backgroundColor: touched.email && errors.email ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[12.5px] col-span-6'>
														{((touched.email && errors.email)) && <figure className='error-arrow-hldr absolute left-[-140px] top-0 translate-y-[-25%]'>
															<img src="/error-arrow.png" className='rotate-[-90deg]' alt="" />
														</figure>}
														{errors.email && touched.email && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.email}</span>}
														<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.email} name='email' placeholder='Email' className='inline-block outline-none w-full border-none bg-transparent' />
													</div>
													{/* Bday */}
													<div style={{ backgroundColor: touched.dob && errors.dob ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[12.5px] col-span-6'>
														{((touched.dob && errors.dob)) && <figure className='error-arrow-hldr absolute left-[-140px] top-0 translate-y-[-25%]'>
															<img src="/error-arrow.png" className='rotate-[-90deg]' alt="" />
														</figure>}
														{errors.dob && touched.dob && <span className='inline-block absolute top-[-26px] text-[17px] font-semibold left-[-0px] text-red-600'>{errors.dob}</span>}
														<input type="text" onChange={handleChange} onBlur={handleBlur} value={values.dob} name='dob' placeholder='Birthday (mm/dd/yyyy)' className='inline-block outline-none w-full border-none bg-transparent' />
													</div>
													{/* Race */}
													<div style={{ backgroundColor: touched.race && errors.race ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[12.5px] col-span-6'>
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
															</Radio.Group>
														</div>
													</div>
													{/* Ethnicity */}
													<div style={{ backgroundColor: touched.ethnicity && errors.race ? "red" : "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[12.5px] col-span-6'>
														<p>Ethnicity</p>
														<div className='flex flex-wrap items-start mt-[10px] gap-[20px] gap-y-[30px]'>
															<Radio.Group value={values.ethnicity} onChange={handleChange} onBlur={handleBlur} size='large' name="ethnicity" className='flex items-center justify-start gap-[20px] flex-wrap ' defaultValue={1}>
																<Radio value={"Hispanic/Latino"}>Hispanic / Latino</Radio>
																<Radio value={"Not Hispanic/Latino"}>Not Hispanic / Latino</Radio>
															</Radio.Group>
														</div>
													</div>
												</form>
											)}
										</Formik>
										<p className='text-[40px] text-center uppercase my-[30px]'>Choose payment option</p>
										<p className='text-[18px]'><span className='font-bold'>Invoiced Orders</span>are tablulated and charged to your account as per terms of your
											agreement with NewDay Diagnostics.</p>
										<button className='px-[30px] mt-[30px] py-[12.5px] font-semibold border-[1px] border-black bg-[#DEA52B] uppercase'>Place Invoiced Order</button>
										<p className='text-[18px] font-bold mt-[25px] mb-[10px]'>OR</p>
										<p className='my-[5px] text-[18px]'>Pay directly online and instantly book your order</p>
										<button className='px-[30px] py-[12.5px] font-semibold text-white border-[1px] border-black bg-[#202020] uppercase'>Pay Now</button>
									</div>

								</div>
							) : tabber === "VIEW_PATIENTS" ? (
								<div className='col-span-3 py-[25px] px-[50px]' >
									<h1 className='text-[40px] text-center uppercase'>View Patient orders</h1>
									<p className='mt-[40px] text-[18px]'>Search Patients by entering name, DOB or Order Number</p>
									<div style={{ backgroundColor: "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[12.5px] w-[40%] mt-[20px] mb-[30px]'>
										<input type="text" name='search' placeholder='Search' className='w-full inline-block outline-none  border-none bg-transparent' />
									</div>

									{/* <Table
										loading={loading}
										height={300}
										hover={hover}
										fillHeight={false}
										showHeader={showHeader}
										autoHeight={true}
										data={[]}
										bordered={true}
										cellBordered={true}
										headerHeight={30}
										rowHeight={30}
									>
										{columns.map(column => {
											const { key, label, ...rest } = column;
											return (
												<Column {...rest} key={key}>
													<CompactHeaderCell>{label}</CompactHeaderCell>
													<CompactCell dataKey={key} />
												</Column>
											);
										})}
									</Table> */}
								</div>
							) : tabber === "EDIT_ACCOUNT" ? (
								<div className='col-span-3 py-[25px] px-[50px] pb-[50px]' >
									<h1 className='text-[40px] text-center uppercase'>Edit Your Account</h1>
									<p className='mt-[40px] text-[18px]'>Edit your account details, profile pic and reset your password</p>

									<p className='text-[18px] my-[30px]'>Reset your password</p>

									<Formik
										initialValues={{ oldPassword: "", newPassword: "", newConfirmPassword: "" }}
										validate={values => {
											const errors = {};
											if (!values.oldPassword) errors.oldPassword = "Please enter your last password"
											if (!values.newPassword) errors.newPassword = "Please enter your new password";
											if (!values.newConfirmPassword) errors.firstName = "Please confirm your password";
											if (values.newPassword !== values.newConfirmPassword) errors.newPassword = "Passwords do not match";
											return errors;
										}}
										onSubmit={(values, { setSubmitting }) => {
											setTimeout(() => {
												handlePasswordChange(values);
												setSubmitting(false);
											}, 400);
										}}
									>
										{
											({
												values,
												errors,
												touched,
												handleChange,
												handleBlur,
												handleSubmit,
												isSubmitting,
												setFieldValue,
											}) => (
												<form onSubmit={handleSubmit} className='w-[50%]' >
													<div className='w-[100%] mt-[20px]'>
														<label className='mb-[0px] block' htmlFor="">Old Password:{(errors.oldPassword && touched.oldPassword) && <span className='text-red-600 ml-[10px]'>({errors.oldPassword})</span>}</label>
														<input name='oldPassword' onChange={handleChange} onBlur={handleBlur} value={values.oldPassword} type="password" className='border-[1px] w-[100%] shadow-sm bg-slate-50  px-[30px] py-[8.5px]' />
													</div>
													<div className='w-[100%] mt-[20px]'>
														<label className='mb-[0px] block' htmlFor="">New Password:{(errors.newPassword && touched.newPassword) && <span className='text-red-600 ml-[10px]'>({errors.newPassword})</span>}</label>
														<input name='newPassword' onChange={handleChange} onBlur={handleBlur} value={values.newPassword} type="password" className='border-[1px] w-[100%] shadow-sm bg-slate-50  px-[30px] py-[8.5px]' />
													</div>
													<div className='w-[100%] mt-[20px]'>
														<label className='mb-[0px] block' htmlFor="">Confirm New Password:{(errors.newConfirmPassword && touched.newConfirmPassword) && <span className='text-red-600 ml-[10px]'>({errors.newConfirmPassword})</span>}</label>
														<input name='newConfirmPassword' onChange={handleChange} onBlur={handleBlur} value={values.newConfirmPassword} type="password" className='border-[1px] w-[100%] shadow-sm bg-slate-50  px-[30px] py-[8.5px]' />
													</div>
													<button className='px-[30px] mt-[30px] leading-[50px] font-semibold border-[1px] border-black bg-[#DEA52B]'>{isSubmitting ? <ColorRing
														visible={true}
														height="50"
														width="45"
														ariaLabel="color-ring-loading"
														wrapperStyle={{}}
														wrapperClass="color-ring-wrapper"
														colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
													/> : 'Reset Password'}</button>
												</form>
											)
										}
									</Formik>

									<p className='text-[18px] my-[30px]'>Manage Other Settings</p>

									<form action="">
										<div className='w-[100%] mt-[20px]'>
											<label className='mb-[0px] block' htmlFor="">Phone:</label>
											<input name='phone' type="text" className='border-[1px] w-[100%] shadow-sm bg-slate-50  px-[30px] py-[8.5px]' />
										</div>
										<div className='w-[100%] mt-[20px]'>
											<label className='mb-[0px] block' htmlFor="">Profile Image:</label>
											<input name='profileImage' type="file" className='border-[1px] w-[100%] shadow-sm bg-slate-50  px-[30px] py-[8.5px]' />
										</div>
									</form>
									<figure className='flex flex-col items-center justify-center'>
										<img src="/under_cons.svg" width={500} alt="" />
										<h3 className='text-[24px] font-bold uppercase'>Great things are being built...</h3>
									</figure>
								</div>
							) : (<></>)
						}
						<div className='col-span-1 flex flex-col items-center justify-start border-l-[4px] border-l-[#DEA52B] py-[25px] px-[30px]' >
							<button className='px-[30px] w-full mt-[30px] py-[14.5px] text-[18px] hover:bg-black hover:text-white transition-all duration-300 bg-[#DEA52B] capitalize' onClick={() => { setTabber('NEW_ORDER') }}>Order new test</button>
							<button className='px-[30px] w-full mt-[30px] py-[14.5px] text-[18px] hover:bg-black hover:text-white transition-all duration-300 bg-[#DEA52B] capitalize' onClick={() => { setTabber('VIEW_PATIENTS') }}>View patients</button>
							<button className='px-[30px] w-full mt-[30px] py-[14.5px] text-[18px] hover:bg-black hover:text-white transition-all duration-300 bg-[#DEA52B] capitalize' onClick={() => { printBlankRequisition() }}>print blank requisition</button>
							<button className='px-[30px] w-full mt-[30px] py-[14.5px] text-[18px] hover:bg-black hover:text-white transition-all duration-300 bg-[#DEA52B] capitalize' onClick={() => { setTabber('EDIT_ACCOUNT') }}>edit account details</button>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	)
}

export default ProviderPage
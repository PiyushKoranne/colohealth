import { Formik } from 'formik';
import React from 'react'
import { ColorRing } from 'react-loader-spinner';

function EditAccount({handlePasswordChange}) {
	return (
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
	)
}

export default EditAccount
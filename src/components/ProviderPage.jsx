import React, { useState } from 'react'
import Navbar from './common/Navbar'
import Footer from './common/Footer'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import EditAccount from './EditAccount'
import NewOrder from './NewOrder'

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


	const [tabber, setTabber] = useState('NEW_ORDER');
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
								<NewOrder />
							) : tabber === "VIEW_PATIENTS" ? (
								<div className='col-span-3 py-[25px] px-[50px]' >
									<h1 className='text-[40px] text-center uppercase'>View Patient orders</h1>
									<p className='mt-[40px] text-[18px]'>Search Patients by entering name, DOB or Order Number</p>
									<div style={{ backgroundColor: "#e6e7e8" }} className='bg-[#E6E7E8] relative border-[1px] border-[#000] px-[30px] py-[12.5px] w-[40%] mt-[20px] mb-[30px]'>
										<input type="text" name='search' placeholder='Search' className='w-full inline-block outline-none  border-none bg-transparent' />
									</div>
								</div>
							) : tabber === "EDIT_ACCOUNT" ? (
								<EditAccount handlePasswordChange={handlePasswordChange} />
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
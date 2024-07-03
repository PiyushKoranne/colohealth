import React, { useEffect } from 'react'
import ReactGA from "react-ga"
import Navbar from './common/Navbar';
import Footer from './common/Footer';

function ThankYou() {

	const [appointmentData, setAppointmentData] = useState({
		dateTime: '',
		venue: '',
		address: '',
	});

	function handleAddToCalendar() {
		// link will be generated here
		// window.location.open in a new tab
		console.log("Adding to your calendar");
	}

	useEffect(() => {
		// Track this specific page view
		ReactGA.pageview('/thank-you');
	}, []);

	useEffect(()=>{
		// get data
	})


	// https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20240702T141500Z%2F20240702T141500Z&details=Greeting%20from%20New%20Day%20Diagnostics%21%20Your%20blood%20draw%20is%20scheduled%20for%20this%20date.&location=&text=ColoHealth%20Blood%20Draw
	return (
		<>
			<Navbar />
			<section className='py-[55px]'>
				<div className='center-wr flex flex-col items-center'>
					<h1 className='text-[40px] text-center uppercase '>Thank You <br />For Your Order</h1>
					<div className='w-[75%] flex flex-col items-center justify-start'>
						<p className='font-medium text-[18px] mt-[40px] text-center'>Remember to write down your appointment time!</p>
						<p className='font-bold text-[18px] mt-[20px] text-center'>June 18, 2024, 1:30pm </p>
						<p className=' text-[18px] text-center'> at <br /> New Day Diagnostics <br /> <span className='whitespace-normal inline-block w-[200px]'>6701 Baum Drive, Suit 110 Knoxville, TN 37919</span> </p>
						<button onClick={handleAddToCalendar} className='capitalize px-[30px] mt-[30px] py-[12.5px] font-semibold border-[1px] border-black bg-[#DEA52B]'>
							Add To My Calendar
						</button>
						<p className='text-[18px] text-center mt-[30px]'>
							If you have any questions or need to<br />
							change your appointment, contact us at<br />
							<span className='font-semibold'>865-299-6250</span>
						</p>
					</div>
				</div>
			</section>
			<Footer />
		</>
	)
}

export default ThankYou
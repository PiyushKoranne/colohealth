import axios from 'axios';
import React, { useEffect } from 'react'
import { FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'antd';


function Navbar() {
	const navigate = useNavigate();
	const at = localStorage.getItem("colo_H_accessToken");
	const [isProvider, setIsProvider] = React.useState(false);
	const [providerData, setProviderData] = React.useState({});

	const items = [
		{
			label: 'About',
			key: 'ABOUT',
		},
		{
			label: 'View Settings',
			key: 'VIEW SETTINGS',
		},
		{
			label: 'Sign Out	',
			key: 'SIGN OUT',
		},
	];

	function onNavClick({ key }) {
		switch (key) {
			case "ABOUT":
				console.log("About us nav event");
				break;
			case "VIEW SETTINGS":
				console.log("View settings nav event");
				break;
			case "SIGN OUT":
				console.log("Signing out");
				localStorage.removeItem("colo_H_accessToken");
				localStorage.removeItem("colo_H_providerData");
				navigate("/");
				break;
		}
	} 


	async function verifyAccessToken() {
		try {
			const response = await axios.post("http://174.138.76.145/verify", { accessToken: at });
			if (response.status === 200) {
				setIsProvider(true);
				setProviderData(JSON.parse(localStorage.getItem("colo_H_providerData")))
			} else {
				localStorage.removeItem("colo_H_accessToken");
				localStorage.removeItem("colo_H_providerData");
			}
		} catch (error) {
			console.log(error);
			localStorage.removeItem("colo_H_accessToken");
			localStorage.removeItem("colo_H_providerData");
		}
	}

	

	useEffect(() => {
		if (at) {
			verifyAccessToken();
		}
	}, [at])

	return (
		<nav className='navbar-wr'>
			<div className='center-wr flex items-center justify-between  border-b-[4px] border-b-[#DEA52B]'>
				<figure>
					<img src="/logo-updated.png" className='py-[10px]' alt="" />
				</figure>
				<div className=''>
					<ul className='flex items-center justify-end gap-[27px] list-none py-[20px]'>
						<li className='uppercase text-slate-500 font-semibold text-[14px] cursor-pointer transition-all duration-300 border-b-[2px] border-b-transparent hover:border-b-slate-500'>home</li>
						<li className='uppercase text-slate-500 font-semibold text-[14px] cursor-pointer transition-all duration-300 border-b-[2px] border-b-transparent hover:border-b-slate-500'>learn about Crc</li>
						<li className='uppercase text-slate-500 font-semibold text-[14px] cursor-pointer transition-all duration-300 border-b-[2px] border-b-transparent hover:border-b-slate-500'>schedule your test</li>
						<li className='uppercase text-slate-500 font-semibold text-[14px] cursor-pointer transition-all duration-300 border-b-[2px] border-b-transparent hover:border-b-slate-500' onClick={() => { navigate("/provider-login") }}>clinician site</li>
						{isProvider && <li className='uppercase text-slate-500 font-semibold text-[14px] cursor-pointer pr-[10px]'>
							<Dropdown
								menu={{
									items,
									onClick: onNavClick,
								}}
							><FaRegUser /></Dropdown>
						</li>}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
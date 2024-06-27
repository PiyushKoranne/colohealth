import React from 'react'

function Navbar() {
	return (
		<nav className='navbar-wr'>
			<div className='center-wr flex items-center justify-between  border-b-[4px] border-b-[#DEA52B]'>
				<figure>
					<img src="/logo.png" width={"200px"} alt="" />
				</figure>
				<div className=''>
					<ul className='flex items-center justify-end gap-[27px] list-none py-[20px]'>
						<li className='uppercase text-slate-500 font-semibold text-[14px] cursor-pointer transition-all duration-300 border-b-[2px] border-b-transparent hover:border-b-slate-500'>home</li>
						<li className='uppercase text-slate-500 font-semibold text-[14px] cursor-pointer transition-all duration-300 border-b-[2px] border-b-transparent hover:border-b-slate-500'>learn about Crc</li>
						<li className='uppercase text-slate-500 font-semibold text-[14px] cursor-pointer transition-all duration-300 border-b-[2px] border-b-transparent hover:border-b-slate-500'>schedule your test</li>
						<li className='uppercase text-slate-500 font-semibold text-[14px] cursor-pointer transition-all duration-300 border-b-[2px] border-b-transparent hover:border-b-slate-500'>clinician site</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
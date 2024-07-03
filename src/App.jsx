import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import NeedHelp from './components/common/NeedHelp'
import NotEligible from './components/NotEligible'
import ThankYou from './components/ThankYou'
import ProviderPage from './components/ProviderPage'
import ProviderLogin from './components/ProviderLogin'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<Router>
				<NeedHelp />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/provider-portal" element={<ProviderPage />} />
					<Route path="/not-eligible" element={<NotEligible />} />
					<Route path="/thank-you" element={<ThankYou />} />
					<Route path="/provider-login" element={<ProviderLogin />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
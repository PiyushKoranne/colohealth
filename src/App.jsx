import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/common/ScrollToTop'

import './App.css'
import Home from './components/Home'
import NeedHelp from './components/common/NeedHelp'
import NotEligible from './components/NotEligible'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<Router>
				<NeedHelp />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/not-eligible" element={<NotEligible />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
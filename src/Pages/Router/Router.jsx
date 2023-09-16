import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { HomePage } from '../HomePage/HomePage'

const App = () => {
  return (
    <Router> 
      <div className="flex">
        <div>
          <Sidebar />
        </div>

        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

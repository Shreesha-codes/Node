import React from  'react'
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home.jsx'
import Applications from './pages/Applications.jsx'
import ApplyJob from './pages/ApplyJob.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ManageJobs from './pages/ManageJobs.jsx'


const App = () => {
  return (
    <div>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/applications" element={<Applications/>}/>
      <Route path="/apply-job/:id" element={<ApplyJob/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/manage-jobs" element={<ManageJobs/>}/>
     </Routes>
    </div>
  )
}

export default App

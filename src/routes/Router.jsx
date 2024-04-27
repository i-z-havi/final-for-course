import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Sandbox from '../pages/Sandbox'
import ErrorPage from '../pages/ErrorPage'
import CreatePolicyForm from '../policies/pages/CreatePolicyForm'

export default function Router() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="sandbox" element={<Sandbox/>}/>
        <Route path="new_petition" element={<CreatePolicyForm/>}/>
        <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  );
}

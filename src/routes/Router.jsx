import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Sandbox from '../pages/Sandbox'
import ErrorPage from '../pages/ErrorPage'
import CreatePolicyForm from '../policies/pages/CreatePolicyForm'
import CreateUserPage from '../users/pages/CreateUserPage'
import ROUTES from './routesModel'
import PoliciesPage from '../policies/pages/PoliciesPage'
import LoginPage from '../users/pages/LoginPage'
import MyPoliciesPage from '../policies/pages/MyPoliciesPage'
import PendingPoliciesPage from '../policies/pages/PendingPoliciesPage'
import EditUserPage from '../users/pages/EditUserPage'
import DeleteUserPage from '../users/pages/DeleteUserPage'
import PolicyPage from '../policies/pages/PolicyPage'

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<LandingPage />} />
      <Route path={ROUTES.SANDBOX} element={<Sandbox />} />
      <Route path={ROUTES.CREATE_POLICY} element={<CreatePolicyForm />} />
      <Route path={ROUTES.CREATE_USER} element={<CreateUserPage />} />
      <Route path={ROUTES.POLICY_PAGE} element={<PoliciesPage />} />
      <Route path={ROUTES.LOGIN_PAGE} element={<LoginPage />} />
      <Route path={ROUTES.MY_POLICIES} element={<MyPoliciesPage />} />
      <Route path={ROUTES.PENDING_POLICIES} element={<PendingPoliciesPage />} />
      <Route path={ROUTES.EDIT_USER} element={<EditUserPage />} />
      <Route path={ROUTES.DELETE_USERS} element={<DeleteUserPage />} />
      <Route path={`${ROUTES.SPECIFIC_POLICY}/:id`} element={<PolicyPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

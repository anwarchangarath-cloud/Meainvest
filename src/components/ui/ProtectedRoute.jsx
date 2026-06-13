import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { PageLoader } from './LoadingSpinner'

export function RequireAuth({ children }) {
  const { currentUser } = useAuth()
  const location = useLocation()
  if (!currentUser) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export function RequireAdmin({ children }) {
  const { currentUser, isAdmin } = useAuth()
  const location = useLocation()
  if (!currentUser) return <Navigate to="/admin/login" state={{ from: location }} replace />
  if (!isAdmin) return <Navigate to="/dashboard" replace />
  return children
}

export function RedirectIfAuth({ children }) {
  const { currentUser, isAdmin } = useAuth()
  if (currentUser) return <Navigate to={isAdmin ? '/admin' : '/dashboard'} replace />
  return children
}

import { Outlet, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

export default function Layout() {
  const navigate = useNavigate()

  const signOut = () => {
    auth.signOut()
    navigate('/signin')
  }

  return (
    <>
      <button onClick={signOut}>Sign out</button>
      <Outlet />
    </>
  )
}

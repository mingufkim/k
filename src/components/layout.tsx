import { Outlet } from 'react-router-dom'
import { auth } from '../firebase'

export default function Layout() {
  const signOut = () => {
    auth.signOut()
  }

  return (
    <>
      <button onClick={signOut}>Sign out</button>
      <Outlet />
    </>
  )
}

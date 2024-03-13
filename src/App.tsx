import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout'
import Home from './routes/home'
import Profile from './routes/profile'
import Signin from './routes/signin'
import Signup from './routes/signup'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { useEffect, useState } from 'react'
import Loading from './components/loading'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: 'signin',
    element: <Signin />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }

  body {
    background-color: #333;
    color: #ccc;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }

  a {
    text-decoration: none;
    color: #ccc;
  }
`

function App() {
  const [loading, setLoading] = useState(true)

  const init = async () => {
    // wait for firebase to initialize
    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <GlobalStyles />
      {loading ? <Loading /> : <RouterProvider router={router} />}
    </>
  )
}

export default App

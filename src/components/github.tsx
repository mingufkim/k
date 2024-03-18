import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import styled from 'styled-components'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  background-color: #ccc;
  color: #333;
  padding: 0.5rem;
  border-radius: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #333;
    color: #ccc;
  }
`

const Logo = styled.img`
  width: 2rem;
  height: 2rem;
`

export default function Github() {
  const navigate = useNavigate()

  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider()
      await signInWithPopup(auth, provider)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button onClick={onClick}>
      <Logo src='/public/github-mark.svg' />
      <span>Continue with GitHub</span>
    </Button>
  )
}

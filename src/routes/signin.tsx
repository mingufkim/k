import { useState } from 'react'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { Error, Form, Input, Switch, Title, Wrapper } from '../components/auth'
import Github from '../components/github'

export default function Signup() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')

    if (loading || email === '' || password === '') return

    try {
      setLoading(true)

      await signInWithEmailAndPassword(auth, email, password)

      navigate('/')
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const onForgotPassword = async () => {
    if (email === '') {
      setError('Please enter your email address.')
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      alert('Password reset email sent. Please check your email.')
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message)
      }
    }
  }

  return (
    <>
      <Wrapper>
        <Title>Sign in</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name='email'
            type='text'
            value={email}
            placeholder='Email'
            required
          />
          <Input
            onChange={onChange}
            name='password'
            type='password'
            value={password}
            placeholder='Password'
            required
          />
          <Input type='submit' value={loading ? 'Loading...' : 'Next'} />
        </Form>
        {error !== '' ? <Error>{error}</Error> : null}
        <Switch onClick={onForgotPassword}>
          <a>Forgot password?</a>
        </Switch>
        <Switch>
          <Link to='/signup'>Create account</Link>
        </Switch>
        <Github />
      </Wrapper>
    </>
  )
}

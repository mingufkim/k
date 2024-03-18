import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { Error, Form, Input, Switch, Title, Wrapper } from '../components/auth'

export default function Signup() {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e

    if (name === 'name') {
      setName(value)
    } else if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')

    if (loading || name === '' || email === '' || password === '') return

    try {
      setLoading(true)

      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await updateProfile(credentials.user, { displayName: name })

      navigate('/')
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Wrapper>
        <Title>Create a K Account</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name='name'
            type='text'
            value={name}
            placeholder='Name'
            required
          />
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
          <Input
            type='submit'
            value={loading ? 'Loading...' : 'Create account'}
          />
        </Form>
        {error !== '' ? <Error>{error}</Error> : null}
        <Switch>
          <Link to='/signin'>Already have an account?</Link>
        </Switch>
      </Wrapper>
    </>
  )
}

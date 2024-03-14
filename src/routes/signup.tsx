import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import styled from 'styled-components'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30rem;
  padding: 3rem 0;
`

const Form = styled.form`
  margin: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`

const Input = styled.input`
  background-color: #333;
  color: #ccc;
  padding: 1rem 3rem;
  border: none;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 1.5rem;
  &::placeholder {
    color: #bbb;
  }
  &:focus {
    outline: none;
    border: 1px solid #ccc;
  }
  &[type='submit'] {
    border: none;
    margin: 1.5rem 0;
    padding: 1rem;
    width: 50%;
    margin-left: auto;
    background-color: #ccc;
    color: #333;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
    }
  }
`

const Error = styled.p`
  color: #ff453a;
  font-size: 1.5rem;
  margin-top: 1rem;
`

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
      console.error(error)
      // TODO: Set error
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
      </Wrapper>
    </>
  )
}

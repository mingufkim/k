import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30rem;
  padding: 3rem 0;
`

export const Form = styled.form`
  margin: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`

export const Input = styled.input`
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

export const Error = styled.p`
  color: #ff453a;
  font-size: 1.5rem;
  margin-top: 1rem;
`

export const Switch = styled.div`
  margin-top: 1rem;
  a {
    padding: 0.5rem;
    border-radius: 1rem;
    font-weight: bold;
    text-decoration: none;
    &:hover {
      color: #fff;
    }
  }
`

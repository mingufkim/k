import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Text = styled.span`
  font-size: 2rem;
`

export default function Loading() {
  return (
    <Wrapper>
      <Text>Loading...</Text>
    </Wrapper>
  )
}

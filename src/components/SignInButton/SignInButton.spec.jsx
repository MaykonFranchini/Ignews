import { render, screen } from '@testing-library/react'
import { SignInButton } from '.'
import { useSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'


jest.mock('next-auth/client')

describe('SignInButton component', () => {

  it('renders correctly when user is not authenticated', ()=> {

    const userSessionMocked = mocked(useSession)

    userSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SignInButton/>
    )
  
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', ()=> {

    const userSessionMocked = mocked(useSession)

    userSessionMocked.mockReturnValueOnce([{
      user: { 
        name: 'John Doe', 
        email: 'john.doe@example.com'
      },
      expires: 'fake-expires'
    }, false])
    render(
      <SignInButton/>
    )
  
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
  
})

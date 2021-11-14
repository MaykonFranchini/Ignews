import { render, screen, fireEvent, getByText } from '@testing-library/react'
import { SubscribeButton } from '.'
import { useSession, signIn } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'
import { useRouter } from 'next/router';

jest.mock('next-auth/client');

jest.mock('next/router');

describe('SubscribeButton component', () => {

  it('renders correctly', ()=> {

    const userSessionMocked = mocked(useSession)

    userSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SubscribeButton/>
    )
  
    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', ()=> {

    const userSessionMocked = mocked(useSession)
    const signInMocked = mocked(signIn)
    userSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SubscribeButton/>
    )
    
    const subscibeButton = screen.getByText('Subscribe now');
    fireEvent.click(subscibeButton)

    expect(signInMocked).toHaveBeenCalled()
  
  
  })

  it('redirtects to posts when user already has a subscription', () => {

    const userSessionMocked = mocked(useSession)
    userSessionMocked.mockReturnValueOnce([{
      user: { name: 'John Doe', email: 'john.doe@example.com'},
      activeSubscription: 'fake-subscription',
      expires: 'fake-expires'
    }, false])

    const useRouterMocked = mocked(useRouter)
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValueOnce({ 
      push: pushMock
    } as any)

    render(<SubscribeButton/>)

    const subscibeButton = screen.getByText('Subscribe now');
    fireEvent.click(subscibeButton)

    expect(pushMock).toHaveBeenCalledWith('/posts')
  })
  
  
})

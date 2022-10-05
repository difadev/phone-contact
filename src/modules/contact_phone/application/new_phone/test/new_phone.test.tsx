import { MockedProvider } from "@apollo/client/testing";
import { render, screen, fireEvent } from '@testing-library/react'
import { AppContext } from "@/context/app-context";
import '@testing-library/jest-dom';
import NewPhone from '../index'
import { ADD_PHONE  } from '@/graphql/contact/mutations';
import { act } from "react-dom/test-utils";

describe('NewPhone', () => {
  const mock: any = [
    {
      request: {
          query: ADD_PHONE ,
          variables: {
            phone_number: '0877202878',
            contact_id: 45
          },
      },
      result: {
          data: {
            insert_contact:{
              first_name: 'tes',
              last_name: 'tes',
              phones: [
                {
                  number:'087720727888'
                }
              ]
            }
          },
      },
  },
  ]
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')
  

  const listContact: any = {
    listContact: [],
    listContactFavorite: [{ id: '001' }],
    detailContact: {}
  }
  const setListContact = jest.fn()
  const appContextValue: any = {
    listContact,
    setListContact,
  }
  useRouter.mockImplementation(() => ({
    query: { id: 45 },
  }))
  it("should render new phone", async  () => {
  
     render(
      <MockedProvider mocks={mock} addTypename={false}>
        <AppContext.Provider value={appContextValue}>
          <NewPhone show={true} setShow={jest.fn()} id={45}/>
        </AppContext.Provider>
      </MockedProvider>
    )
    const containerPhoneTest = screen.getByTestId('containerPhoneTest')
    expect(containerPhoneTest).toBeInTheDocument()
    const buttonSubmitTest = screen.getByTestId('buttonSubmitTest')
    act(() => {
        fireEvent.click(buttonSubmitTest)
    })
    const submitPhone = screen.getByTestId('submitPhone')
    act(() => {
        fireEvent.click(submitPhone)
    })
  });
})
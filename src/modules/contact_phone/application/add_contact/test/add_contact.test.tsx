import { MockedProvider } from "@apollo/client/testing";
import { render, screen, fireEvent } from '@testing-library/react'
import { AppContext } from "@/context/app-context";
import '@testing-library/jest-dom';
import AddContact from '../index'
import { ADD_CONTACT  } from '@/graphql/contact/mutations';
import { act } from "react-dom/test-utils";

describe('AddContact', () => {
  const mock: any = [
    {
      request: {
          query: ADD_CONTACT ,
          variables: {
            id: 45,
            _set: {
                first_name: 'tes',
                last_name: 'tes',
            }
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
  it("should render edit contact", async  () => {
  
     render(
      <MockedProvider mocks={mock} addTypename={false}>
        <AppContext.Provider value={appContextValue}>
          <AddContact show={true} setShow={jest.fn()}/>
        </AppContext.Provider>
      </MockedProvider>
    )
    const containerNewContactTest = screen.getByTestId('containerNewContactTest')
    expect(containerNewContactTest).toBeInTheDocument()
    const buttonCloseTest = screen.getByTestId('buttonCloseTest')
    act(() => {
        fireEvent.click(buttonCloseTest)
    })
  });
})
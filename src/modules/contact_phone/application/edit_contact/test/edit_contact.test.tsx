import { MockedProvider } from "@apollo/client/testing";
import { render, screen, fireEvent } from '@testing-library/react'
import { AppContext } from "@/context/app-context";
import '@testing-library/jest-dom';
import EditContact from '../index'
import { UPDATE_CONTACT  } from '@/graphql/contact/mutations';
import { act } from "react-dom/test-utils";

describe('EditContact', () => {
  const mock: any = [
    {
      request: {
          query: UPDATE_CONTACT ,
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
            update_contact_by_pk:{
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
          <EditContact show={true} setShow={jest.fn()} id={45} />
        </AppContext.Provider>
      </MockedProvider>
    )
    const containerLoading = screen.getByTestId('text-loading')
    expect(containerLoading).toBeInTheDocument()
  });

  it("should render edit contact", async  () => {
  
    render( <EditContact show={true} setShow={jest.fn()} id={45} />)
   const containerEditTest = screen.getByTestId('containerEditTest')
   expect(containerEditTest).toBeInTheDocument()
   const buttonCloseTest = screen.getByTestId('buttonCloseTest')
   act(() => {
     fireEvent.click(buttonCloseTest)
   })
 });
})
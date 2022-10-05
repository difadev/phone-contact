import { MockedProvider } from "@apollo/client/testing";
import { render, screen, fireEvent } from '@testing-library/react'
import { AppContext } from "@/context/app-context";
import '@testing-library/jest-dom';
import EditPhone from '../index'
import { UPDATE_PHONE  } from '@/graphql/contact/mutations';
import { act } from "react-dom/test-utils";

describe('EditPhone', () => {
  const mock: any = [
    {
      request: {
          query: UPDATE_PHONE ,
          variables: {
            pk_columns: {
                number: '087720727888',
                contact_id: 45
            } 
          },
      },
      result: {
          data: {
            update_phone_by_pk:{
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
  it("should render edit phone", async  () => {
  
     render(
      <MockedProvider mocks={mock} addTypename={false}>
        <AppContext.Provider value={appContextValue}>
          <EditPhone show={true} setShow={jest.fn()} id={45} phoneNumber='08772072727' />
        </AppContext.Provider>
      </MockedProvider>
    )
    const containerEditPhone = screen.getByTestId('containerEditPhone')
    expect(containerEditPhone).toBeInTheDocument()
  });

  it("should render edit phone", async  () => {
  
    render(
    <AppContext.Provider value={appContextValue}>
        <EditPhone show={true} setShow={jest.fn()} id={45} phoneNumber='08772072727' />
      </AppContext.Provider>
   )
   const containerEditTest = screen.getByTestId('containerEditTest')
   expect(containerEditTest).toBeInTheDocument()
   const buttonCloseTest = screen.getByTestId('buttonCloseTest')
   act(() => {
     fireEvent.click(buttonCloseTest)
   })
 });
})
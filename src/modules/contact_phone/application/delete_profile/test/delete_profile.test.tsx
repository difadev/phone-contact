import { MockedProvider } from "@apollo/client/testing";
import { render, screen, fireEvent } from '@testing-library/react'
import { AppContext } from "@/context/app-context";
import '@testing-library/jest-dom';
import DeleteProfile from '../index'
import { DELETE_CONTACT  } from '@/graphql/contact/mutations';
import { act } from "react-dom/test-utils";

describe('Delete Profile', () => {
  const mock: any = [
    {
      request: {
          query: DELETE_CONTACT ,
          variables: {
              id:'45'
          },
      },
      result: {
          data: {
            delete_contact_by_pk:{
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
  it("should render cancel delete", async  () => {
  
     render(
      <MockedProvider mocks={mock} addTypename={false}>
        <AppContext.Provider value={appContextValue}>
          <DeleteProfile show={true} setShow={jest.fn()} id={45} />
        </AppContext.Provider>
      </MockedProvider>
    )
    const buttonDeleteTest = screen.getByTestId('buttonDeleteTest')
    act(() => {
      fireEvent.click(buttonDeleteTest)
    })
    const containerDelete = screen.getByTestId('containerDelete')
    expect(containerDelete).toBeInTheDocument()
  });
  it("should render submit delete", async  () => {
  
    render(
     <MockedProvider mocks={mock} addTypename={false}>
       <AppContext.Provider value={appContextValue}>
         <DeleteProfile show={true} setShow={jest.fn()} id={45} />
       </AppContext.Provider>
     </MockedProvider>
   )
   const buttonSubmitTest = screen.getByTestId('buttonSubmitTest')
   act(() => {
     fireEvent.click(buttonSubmitTest)
   })
   const containerDelete = screen.getByTestId('containerDelete')
   expect(containerDelete).toBeInTheDocument()
 });
})
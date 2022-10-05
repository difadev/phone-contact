import { MockedProvider } from "@apollo/client/testing";
import { render, screen, fireEvent } from '@testing-library/react'
import { AppContext } from "@/context/app-context";
import '@testing-library/jest-dom';
import Detail from '../[id]'
import { DETAIL_CONTACT } from '@/graphql/contact/queries';
import { act } from "react-dom/test-utils";

describe('Detail', () => {
  const mock: any = [
    {
      request: {
          query: DETAIL_CONTACT,
          variables: {
              id:'45'
          },
      },
      result: {
          data: {
            contact_by_pk:{
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
  it("should render edit link", async  () => {
  
    render(
      <MockedProvider mocks={mock} addTypename={false}>
        <AppContext.Provider value={appContextValue}>
          <Detail />
        </AppContext.Provider>
      </MockedProvider>
    )
    const editContactTest = screen.getByTestId('editContactTest')
    act(() => {
      fireEvent.click(editContactTest)
    })
    expect(editContactTest).toBeInTheDocument()
  });

  it("should render New Phone", async  () => {
    render(
      <MockedProvider mocks={mock} addTypename={false}>
        <AppContext.Provider value={appContextValue}>
          <Detail />
        </AppContext.Provider>
      </MockedProvider>
    )
    const newPhoneTest = screen.getByTestId('newPhoneTest')
    act(() => {
      fireEvent.click(newPhoneTest)
    })
    const containerPhoneTest = screen.getByTestId('containerPhoneTest')
    expect(containerPhoneTest).toBeInTheDocument()
    const buttonCloseTest = screen.getByTestId('buttonCloseTest')
    act(() => {
      fireEvent.click(buttonCloseTest)
    })
  });
})
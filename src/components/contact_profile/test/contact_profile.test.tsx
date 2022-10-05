import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ContactProfile from '../index';
import { AppContext } from "@/context/app-context";
import Router from 'next/router'
import { act } from 'react-dom/test-utils';
import { MockedProvider } from "@apollo/client/testing";

jest.mock('next/router', () => ({ push: jest.fn() }))
const setLocalStorage = (id:string, data:any) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
describe('ContactProfile', () => {

    beforeAll(() => {
        setLocalStorage('list-favorite', [{id: '1', name:'tes'}]);
    })
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

    it('ContactProfile', function () {
        render(<AppContext.Provider value={appContextValue}>
            <ContactProfile name="tes" phone="08772051187" id={45} />
        </AppContext.Provider>
        )
        const titleText = screen.getByText('tes')
        expect(titleText).toBeInTheDocument()
    })

    it('Title Name Document + Phone', function () {
        render(<AppContext.Provider value={appContextValue}>
            <ContactProfile name="tes" phone="08772051187" id={45} />
        </AppContext.Provider>
        )
        const nameTest = screen.getByTestId('nameTest')
        expect(nameTest).toHaveTextContent('tes')
        const phoneTest = screen.getByTestId('phoneTest')
        expect(phoneTest).toHaveTextContent('08772051187')
    })
   
    it('Heart profile', function () {
        render(
            <AppContext.Provider value={appContextValue}>
                <ContactProfile name="tes" phone="08772051187" id={45} />
            </AppContext.Provider>
        )
        

        const heartButtonTest = screen.getByTestId('heartButtonTest')
        act(() => {
            fireEvent.click(heartButtonTest)
        })
    })
    it('detailProfileTest', function () {
        render(<AppContext.Provider value={appContextValue}>
            <ContactProfile name="tes" phone="08772051187" id={45} />
        </AppContext.Provider>
        )
        const detailProfileTest = screen.getByTestId('detailProfileTest')
        act(() => {
            fireEvent.click(detailProfileTest)
        })
        expect(Router.push).toHaveBeenCalledWith('/contact/detail/45')
    })
    it('slideButtonTest simulate edit', function () {
        render(<AppContext.Provider value={appContextValue}>
            <ContactProfile name="tes" phone="08772051187" id={45} />
        </AppContext.Provider>
        )
        const slideButtonTest = screen.getByTestId('slideButtonTest')
        act(() => {
            fireEvent.click(slideButtonTest)
        })
        const slideContainerTest = screen.getByTestId('slideContainerTest');
        expect(slideContainerTest).toBeInTheDocument()
        const editButtonTest = screen.getByTestId('editButtonTest');
        act(() => {
            fireEvent.click(editButtonTest)
        })
        const containerEditTest = screen.getByTestId('containerEditTest')
        expect(containerEditTest).toHaveBeenCalled()
    })
    it('slideButtonTest simulate delete', function () {
        render(
            <MockedProvider>
                <AppContext.Provider value={appContextValue}>
                    <ContactProfile name="tes" phone="08772051187" id={45} />
                </AppContext.Provider>
            </MockedProvider>
        )
        const slideButtonTest = screen.getByTestId('slideButtonTest')
        act(() => {
            fireEvent.click(slideButtonTest)
        })
        const slideContainerTest = screen.getByTestId('slideContainerTest');
        expect(slideContainerTest).toBeInTheDocument()
        const deleteButtonTest = screen.getByTestId('deleteButtonTest');
        act(() => {
            fireEvent.click(deleteButtonTest)
        })
        const containerDelete = screen.getByTestId('containerDelete')
        expect(containerDelete).toBeInTheDocument()
    })
    it('slideButtonTest detail', function () {
        render(
                <AppContext.Provider value={appContextValue}>
                    <ContactProfile name="tes" phone="08772051187" id={45} />
                </AppContext.Provider>
        )
        const slideButtonTest = screen.getByTestId('slideButtonTest')
        act(() => {
            fireEvent.click(slideButtonTest)
        })
        const slideContainerTest = screen.getByTestId('slideContainerTest');
        expect(slideContainerTest).toBeInTheDocument()
        const detailButtonTest = screen.getByTestId('detailButtonTest');
        act(() => {
            fireEvent.click(detailButtonTest)
        })
        expect(Router.push).toHaveBeenCalledWith('/contact/detail/45')
    })
})  
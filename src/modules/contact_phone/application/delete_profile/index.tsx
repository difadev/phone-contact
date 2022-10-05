import { useContext, useState } from 'react'
import { IPropsDeleteContact } from './type'
import Image from 'next/image'
import Modal from 'react-modal';
import { AppContext } from '@/context/app-context';
import { ButtonContainer, ContainerButtonHeader, ContainerContent, SubTitleModal, TitleModal } from './styles'
import { useMutation } from '@apollo/client';
import Buttons from '@/components/buttons';
import { DELETE_CONTACT } from '@/graphql/contact/mutations';
import Alert from '@/components/alert';
import { saveToLocalStorage } from '@/utils/local-storage-helper';
import { LIST_FAVORITE } from '@/utils/local-storage-key';
import CloseImage from '@/public/assets/icon/close.png'


export default function DeleteProfile({ show, setShow, id }: IPropsDeleteContact) {
    const context: any = useContext(AppContext)
    const [stateFinish, setStateFinish] = useState(false)
    const [delete_contact_by_pk, { loading, error }] = useMutation(DELETE_CONTACT, {
        onCompleted: () => {
            const loadContact = context.listContact.listContact
            const loadContactFavorite = context.listContact.listContactFavorite
            const arrayFilterContact = loadContact.filter((item: any) => {
                return id !== item.id;
            });
            const arrayFilterContactFavorite = loadContactFavorite.filter((item: any) => {
                return id !== item.id;
            });
            saveToLocalStorage(LIST_FAVORITE, arrayFilterContactFavorite)
            context.setListContact((prevState: any) => ({
                ...prevState,
                listContact: arrayFilterContact,
                listContactFavorite: arrayFilterContactFavorite
            }))
            setStateFinish(true)
            setTimeout(() => {
                setShow(false)
            }, 1000)
        }
    })
    const closeModal = () => {
        setShow(false)
    }

    const handleAfterSubmit = () => {
        delete_contact_by_pk({
            variables: {
                id: id
            }
        })
    }
    return (
        <>
            <Modal
                isOpen={show}
                onAfterOpen={() => { }}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={
                    {
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            width: '80%',
                            transform: 'translate(-50%, -50%)',
                            padding: '1em'
                        },
                        overlay: {
                            backgroundColor: "rgba(0, 29, 45, 0.5)",
                            zIndex: 1,
                            overflowX: "auto",
                        },
                    }
                }
                
            >
                <ContainerContent data-testid="containerDelete">
                    <ButtonContainer onClick={closeModal}>
                        <Image src={CloseImage} alt="button-close" width={14} height={14} />
                    </ButtonContainer>
                    {
                        error && (
                            <Alert category='danger' title={error.message} />
                        )
                    }
                    {
                        stateFinish && (
                            <Alert category='success' title='Success Delete Data' />
                        )
                    }
                    <TitleModal>Are you sure ? </TitleModal>
                    <SubTitleModal>Do you really want to delete these contact ? </SubTitleModal>
                    <ContainerButtonHeader>
                        <Buttons category='default' dataTest="buttonDeleteTest" styleProps={{ marginRight: '1em' }} onClick={closeModal} title="Cancel" type="button" />
                        <Buttons category='danger' dataTest="buttonSubmitTest" onClick={handleAfterSubmit} disabled={loading ? true : false} title="Yes, Delete" type="button" />
                    </ContainerButtonHeader>
                </ContainerContent>
            </Modal>
        </>
    )
}
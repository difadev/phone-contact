import { useContext, useState } from 'react'
import { IPropsEditContact } from './type'
import Image from 'next/image'
import Modal from 'react-modal';
import { AppContext } from '@/context/app-context';
import FormContact from '@/modules/contact_phone/application/form_contact'
import { ButtonContainer, ContainerEdit } from './styles'
import { useMutation, useQuery } from '@apollo/client';
import { DETAIL_CONTACT } from '@/graphql/contact/queries';
import Alert from '@/components/alert';
import CloseImage from '@/public/assets/icon/close.png'
import { UPDATE_CONTACT } from '@/graphql/contact/mutations';


export default function EditContact({ show, setShow, id }: IPropsEditContact) {
    const context: any = useContext(AppContext)
    const [stateFinish, setStateFinish] = useState(false)
    const { loading, error, data } = useQuery(DETAIL_CONTACT, {
        variables: {
            id: id,
        }
    })
    const [update_contact_by_pk, { }] = useMutation(UPDATE_CONTACT, {
        onCompleted: (tData) => {
            const newContact: any = tData?.update_contact_by_pk
            setStateFinish(true)
            finishSubmit(newContact)
        }
    })
    const closeModal = () => {
        setShow(false)
    }

    const onChangeData = () => {

    }
    const handleAfterSubmit = (stateData: any) => {
        update_contact_by_pk({
            variables: {
                id: id,
                _set: {
                    first_name: stateData.first_name,
                    last_name: stateData.last_name,
                }
            }
        })
    }
    const finishSubmit = (newValue: any) => {
        const newValueSubmit = [...context.listContact.listContact]
        const newValueEditIndex = newValueSubmit.findIndex((item) => item.id === newValue.id)
        newValueSubmit[newValueEditIndex] = newValue;
        context.setListContact((prevState: any) => ({
            ...prevState,
            listContact: newValueSubmit,
        }))
        setTimeout(() => {
            setShow(false)
        }, 1000)
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
                {
                    error && (
                        <Alert category='danger' title={error.message} />
                    )
                }
                {
                    loading ? <p data-testid="text-loading">Loading</p> : (
                        <ContainerEdit data-testid="containerEditTest">
                            <ButtonContainer data-testid="buttonCloseTest"  onClick={closeModal}>
                                <Image src={CloseImage} alt="button-close" width={10} height={10} />
                            </ButtonContainer>
                            <FormContact stateFinish={stateFinish} type="edit" dataProps={data?.contact_by_pk} onChangeData={onChangeData} loading={loading} finishSubmit={handleAfterSubmit} />
                        </ContainerEdit>
                    )
                }

            </Modal>
        </>
    )
}
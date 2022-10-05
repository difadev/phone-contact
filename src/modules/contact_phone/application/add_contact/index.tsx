import { useContext, useState } from 'react'
import {IContext, IPropsEditContact, IPropsState } from './type'
import Image from 'next/image'
import Modal from 'react-modal';
import { AppContext } from '@/context/app-context';
import FormContact from '@/modules/contact_phone/application/form_contact'
import { ContainerButton, ContainerNewContact } from './styles'
import { useMutation } from '@apollo/client';
import { ADD_CONTACT } from '@/graphql/contact/mutations';
import Close from '@/public/assets/icon/close.png'


export default function AddContact({show, setShow }:IPropsEditContact) {
    const context:any = useContext(AppContext)
    const [stateFinish, setStateFinish] = useState(false)
    const [insert_contact,{loading,error}] = useMutation(ADD_CONTACT, {
        onCompleted: (tData) => {
            const newContact:any = tData?.insert_contact?.returning[0]
            setStateFinish(true)
            finishSubmit(newContact)
        }
    })
    const closeModal = () => {
        setShow(false)
    }

    const handleAfterSubmit = (stateData:IPropsState) => {
        insert_contact({
            variables:{
                first_name: stateData.first_name,
                last_name: stateData.last_name,
                phones: stateData.phones
            }
        })
    }

    const finishSubmit = (newValue:IPropsState) => {
        const newValueSubmit = [...context.listContact.listContact]
        newValueSubmit.unshift(newValue)
        context.setListContact((prevState:IContext) => ({
          ...prevState,
          listContact:newValueSubmit,
        }))
        setTimeout(() => {
            setShow(false)
        },1000)
      }
    return ( 
       <>
        <Modal
           isOpen={show}
           onAfterOpen={()=>{}}
           onRequestClose={closeModal}
           ariaHideApp={false}
           style={{
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                width:'80%',
                transform: 'translate(-50%, -50%)',
              },
              overlay: {
                backgroundColor: "rgba(0, 29, 45, 0.5)",
                zIndex: 1,
                overflowX: "auto",
              },
           }}
           
         >
            <ContainerNewContact data-testid="containerNewContactTest">
                <ContainerButton onClick={closeModal} data-testid="buttonCloseTest">
                    <Image src={Close} alt="button-close" width={10} height={10}/>
                </ContainerButton>
                <FormContact loading={loading} type="add" stateFinish={stateFinish} finishSubmit={handleAfterSubmit} error={error} />
            </ContainerNewContact>
          
         </Modal>
       </>
    )
  }
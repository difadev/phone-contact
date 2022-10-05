import { useState} from 'react'
import {IPropsNewPhone} from './type'
import Image from 'next/image'
import Modal from 'react-modal';
import { useMutation  } from '@apollo/client';
import {  ADD_PHONE } from '@/graphql/contact/mutations';
import FormPhone from '../form_phone';
import { ButtonContainer, ContainerPhone } from './styles';
import CloseImage from '@/public/assets/icon/close.png'


export default function NewPhone({show, setShow, id }:IPropsNewPhone) {
    const [stateFinish, setStateFinish] = useState(false)
    const [insert_phone,{loading,error}] = useMutation(ADD_PHONE, {
        onCompleted: () => {
            setStateFinish(true)
            setTimeout(() => {
                setShow(false)
            }, 1000)
        }
    })
    const closeModal = () => {
        setShow(false)
    }
    const handleAfterSubmit = (stateData:any) => {
        insert_phone({
            variables:{
                phone_number: stateData.phone_number,
                contact_id: id
            }
        })
    }
    return ( 
       <>
        <Modal
           isOpen={show}
           onAfterOpen={()=>{}}
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
            <ContainerPhone data-testid="containerPhoneTest">
                <ButtonContainer data-testid="buttonCloseTest" onClick={closeModal}>
                    <Image src={CloseImage} alt="button-close" width={14} height={14}/>
                </ButtonContainer>
                <FormPhone stateFinish={stateFinish} type="add" loading={loading} finishSubmit={handleAfterSubmit} error={error}/>
            </ContainerPhone>
          
         </Modal>
       </>
    )
  }
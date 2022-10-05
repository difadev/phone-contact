import { useContext, useState} from 'react'
import {IPropsEditPhone} from './type'
import Image from 'next/image'
import Modal from 'react-modal';
import { AppContext } from '@/context/app-context';
import { ButtonContainer, ContainerContent } from './styles'
import { useMutation  } from '@apollo/client';
import Alert from '@/components/alert';
import {  UPDATE_PHONE } from '@/graphql/contact/mutations';
import FormPhone from '../form_phone';
import CloseImage from '@/public/assets/icon/close.png'


export default function EditPhone({show, setShow, id, phoneNumber}:IPropsEditPhone) {
    const context:any = useContext(AppContext)
    const [stateFinish, setStateFinish] = useState(false)
    const [update_phone_by_pk,{loading,error}] = useMutation(UPDATE_PHONE, {
        onCompleted: (tData) => {
            const newContact:any = tData?.contact?.returning[0]
            setStateFinish(true)
            finishSubmit(newContact)
        }
    })
    const closeModal = () => {
        setShow(false)
    }
    const handleAfterSubmit = (stateData:any) => {
        update_phone_by_pk({
            variables:{
                pk_columns: {
                    number: phoneNumber,
                    contact_id: id
                } ,
                new_phone_number: stateData.new_phone_number
            }
        })
    }
    const finishSubmit = (newValue:any) => {
        const newValueSubmit = [...context.listContact.listContact]
        newValueSubmit.unshift(newValue)
        context.setListContact((prevState:any) => ({
          ...prevState,
          listContact:newValueSubmit,
        }))
        setShow(false)
      }
    return ( 
       <>
        <Modal
           isOpen={show}
           onAfterOpen={()=>{}}
           onRequestClose={closeModal}
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
                <Alert category='danger' title={error.message}/>
            )
        }
            <ContainerContent data-testid="containerEditPhone">
                <ButtonContainer onClick={closeModal}>
                    <Image src={CloseImage} alt="button-close" width={10} height={10}/>
                </ButtonContainer>
                <FormPhone stateFinish={stateFinish} type="edit" dataProps={phoneNumber}  finishSubmit={handleAfterSubmit} loading={loading}/>
              </ContainerContent>
          
         </Modal>
       </>
    )
  }
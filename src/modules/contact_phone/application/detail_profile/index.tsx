import { useEffect, useContext, useState } from "react";
import { useRouter } from 'next/router'
import { DETAIL_CONTACT } from '@/graphql/contact/queries';
import { useQuery } from '@apollo/client';
import { AppContext } from "@/context/app-context";
import Alert from "@/components/alert";
import {  ContainerActionProfile, ContainerArrowBack, ContainerCard, ContainerContent, ContainerHeader, ContainerImageProfile, ContainerPhone, ContainerProfile, LinkContact, ListPhone, TextContent, TitleHeader } from "./styles";
import ButtonIcon from "@/components/button_icon";
import Image from 'next/image'
import EditProfile from '@/modules/contact_phone/application/edit_contact'
import EditPhone from '@/modules/contact_phone/application/edit_phone'
import NewPhone from "@/modules/contact_phone/application/new_phone";
import Loading from "@/components/loading";
import { initDetailData, initFormEdit } from "./helpers";
import Head from 'next/head'
import ArrowBack from '@/public/assets/icon/arrow.png'
import UserImage from '@/public/assets/icon/user.png'




const Detail = () => {
    const context:any = useContext(AppContext)
    const [actionEdit, setActionEdit] = useState(initFormEdit)
    const [detailData, setDetailData] = useState(initDetailData)
    const router = useRouter()
    const { id } = router.query
     /* istanbul ignore next */
    const {loading, error, data}  = useQuery(DETAIL_CONTACT,{
        variables: {
            id: id,
        }
    })
    useEffect(() => {
        context.setListContact((prevState:any) => ({
            ...prevState,
            detailContact:data?.contact_by_pk,
        }))
        setDetailData(data?.contact_by_pk)
    },[data])


    const onHandleBack = () => {
        router.push('/')
    }

    const onHandleEdit = (type:string, phoneNumberProps?:string) => {
        setActionEdit(prevState => ({
            ...prevState,
            [type] : true,
            phoneNumber:phoneNumberProps !== undefined ? phoneNumberProps :''
        }))
    }

    const closeModal = (type:string) => {
        setActionEdit(prevState => ({
            ...prevState,
            [type] : false
        }))
    }

    return (
        <>
        <Head>
            <title>Phone Detail - {detailData?.first_name}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head> 
        <ContainerCard>
            {loading && (
                <Loading />
            )}
           {
            error && (
                <Alert category="danger" title={error?.message}/>
            )
           }
            <ContainerHeader>
              <TitleHeader>Contacts</TitleHeader>
              <ContainerArrowBack>
                <ButtonIcon srcIcon={ArrowBack} onClick={onHandleBack}/>
              </ContainerArrowBack>
            </ContainerHeader>
            <ContainerProfile>
                <ContainerImageProfile>
                    <Image alt="userImage" src={UserImage} width={50} height={50}/>
                </ContainerImageProfile>
                <ContainerActionProfile>
                    <LinkContact className="editClass" data-testid="editContactTest" onClick={() => {onHandleEdit('editContact')}} >
                        Edit Contact
                    </LinkContact>
                    <LinkContact data-testid="newPhoneTest" onClick={() => {onHandleEdit('newPhone')}}>
                        New Phone
                    </LinkContact>
                </ContainerActionProfile>
            </ContainerProfile>

            <ContainerContent>
                <TextContent>First Name : <span style={{fontWeight:'normal'}}>{detailData?.first_name}</span></TextContent>
                <TextContent>Last Name : <span style={{fontWeight:'normal'}}>{detailData?.last_name}</span></TextContent>
                <TextContent>Phone : </TextContent>
                <ul>
                    {detailData?.phones.length > 0 && detailData?.phones.map((item:any, index) => (
                        <ListPhone key={index}>
                            <ContainerPhone>
                                <span>{item.number}</span>
                                <ButtonIcon styleProps={{marginRight:'.5em'}} onClick={() => {onHandleEdit('editPhone',item.number)}} srcIcon='/assets/icon/edit_color.png' />
                            </ContainerPhone>
                        </ListPhone>
                    ))}
                </ul>
            </ContainerContent>
        </ContainerCard>
        {
            actionEdit.editContact && (
                <EditProfile show={actionEdit.editContact} setShow={() =>{closeModal('editContact')}} id={id}/>
            )
        }
        {
            actionEdit.editPhone && (
                <EditPhone show={actionEdit.editPhone} setShow={() =>{closeModal('editPhone')}} id={id} phoneNumber={actionEdit.phoneNumber}/>
            )
        }
        {
            actionEdit.newPhone && (
                <NewPhone show={actionEdit.newPhone} setShow={() =>{closeModal('newPhone')}} id={id} />
            )
        }
        </>
    )
};
export default Detail;

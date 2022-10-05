import { useState, useEffect, useContext } from 'react'
import { IPropsCardProfile } from './type'
import Image from 'next/image'
import ButtonIcon from '../button_icon'
import { AppContext } from '@/context/app-context';
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/local-storage-helper'
import { LIST_FAVORITE } from '@/utils/local-storage-key'
import { ContainerIcon, ContainerProfile, ContainerSlide, ContainerTitle, TitleName, TitlePhone } from './styles'
import EditProfile from '@/modules/contact_phone/application/edit_contact'
import DeleteProfile from '@/modules/contact_phone/application/delete_profile'
import Router from 'next/router'
import User from '@/public/assets/icon/user.png'
import HeartNoFill from '@/public/assets/icon/heart_nofill.png'
import Edit from '@/public/assets/icon/edit.png'
import Delete from '@/public/assets/icon/delete.png'
import Detail from '@/public/assets/icon/detail.png'
import HeartFill from '@/public/assets/icon/heart_fill.png'
import Bar from '@/public/assets/icon/bar.png'
import BarLeft from '@/public/assets/icon/bar_left.png'



export default function ContactProfile({ name, phone, id }: IPropsCardProfile) {
    // Emd Import Asset
    const context: any = useContext(AppContext)
    const [slideProfile, setSlideProfile] = useState(false)
    const [modalIsOpen, setIsOpen] = useState({
        edit: false,
        delete: false
    });
    const [stateFavorite, setStateFavorite] = useState({
        favoriteByID: false,
        dataID: id
    })
    const loadFavorite = context.listContact.listContactFavorite
    useEffect(() => {
        const findFavorite = (loadFavorite !== undefined && loadFavorite.length > 0) ? loadFavorite.filter((item: any) => item.id === id) : saveToLocalStorage(LIST_FAVORITE, [])
        findFavorite !== undefined && findFavorite.length > 0 && setStateFavorite((prevState: any) => ({
            ...prevState,
            favoriteByID: true
        }))
    }, [])
    /* istanbul ignore next */
    const handleClickIcon = () => {
        let arrayFavorite: any = loadFavorite;
        if (stateFavorite.favoriteByID) {
            arrayFavorite = loadFavorite.filter((item: any) => {
                return id !== item.id;
            });

        } else {
            const loadFavorite = loadFromLocalStorage(LIST_FAVORITE)
            const namaSplit: Array<string> = name.split(' ')
            loadFavorite.push({ name: namaSplit[0], id: id })
            arrayFavorite = loadFavorite
        }
        context.setListContact((prevState: any) => ({
            ...prevState,
            listContactFavorite: arrayFavorite
        }))
        saveToLocalStorage(LIST_FAVORITE, arrayFavorite)
        setStateFavorite((prevState: any) => ({
            ...prevState,
            favoriteByID: !stateFavorite.favoriteByID
        }))
    }

    const handleSlideMore = () => {
        setSlideProfile(!slideProfile)
    }
    const onHandleContact = (type: string) => {
        setSlideProfile(false)
        setIsOpen(prevState => ({
            ...prevState,
            [type]: true
        }));
    }
    const closeModal = (type: string) => {
        setIsOpen(prevState => ({
            ...prevState,
            [type]: false
        }));
    }

    const handleDetail = () => {
        Router.push('/contact/detail/' + id)
    }
    return (
        <>
            <ContainerProfile >
                <Image src={User} width={40} height={40} />
                <ContainerTitle data-testid="detailProfileTest" onClick={handleDetail}>
                    <TitleName data-testid="nameTest">
                        {`${name}`}
                    </TitleName>
                    <TitlePhone data-testid="phoneTest">
                        {`${phone}`}
                    </TitlePhone>
                </ContainerTitle>
                <ContainerIcon >
                    <ButtonIcon dataTest="heartButtonTest" onClick={() => { handleClickIcon() }} styleProps={{ marginRight: '10px' }} srcIcon={stateFavorite.favoriteByID ? HeartFill : HeartNoFill} />
                    <ButtonIcon dataTest="slideButtonTest" onClick={handleSlideMore} srcIcon={slideProfile ? BarLeft : Bar} />
                </ContainerIcon>

                <ContainerSlide data-testid="slideContainerTest" slideData={slideProfile}>
                    <ButtonIcon dataTest="editButtonTest" styleProps={{ marginRight: '.5em' }} onClick={() => { onHandleContact('edit') }} srcIcon={Edit} />
                    <ButtonIcon dataTest="deleteButtonTest" styleProps={{ marginRight: '.5em' }} onClick={() => { onHandleContact('delete') }} srcIcon={Delete} />
                    <ButtonIcon dataTest="detailButtonTest" onClick={() => { handleDetail() }} srcIcon={Detail} />
                </ContainerSlide>
            </ContainerProfile>
            {
                modalIsOpen.edit && (
                    <EditProfile show={modalIsOpen.edit} setShow={() => { closeModal('edit') }} id={id} />
                )
            }
            {
                modalIsOpen.delete && (
                    <DeleteProfile show={modalIsOpen.delete} setShow={() => { closeModal('delete') }} id={id} />
                )
            }
        </>
    )
}
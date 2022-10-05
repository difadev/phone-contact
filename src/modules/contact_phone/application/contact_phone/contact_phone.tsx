import React, { useContext, useCallback, useState,  } from 'react'
import Cards from '@/components/cards'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useForm } from "react-hook-form";
import Input from '@/components/input';
import { ContainerCard, ContainerHeader, ContainerIcon, TextCenter, TitleContact } from './styles';
import ContactProfile from '@/components/contact_profile';
import { AppContext } from '@/context/app-context';
import ContactFavorite from '@/components/contact_favorites';
import ButtonIcon from '@/components/button_icon';
import AddContact from '../add_contact';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_CONTACT } from '@/graphql/contact/queries';
import Buttons from '@/components/buttons';
import { initStateLoadData, settingsSlider } from './helpers';
import Loading from '@/components/loading';
import SearchImage from '@/public/assets/icon/search.png'
import ContactImage from '@/public/assets/icon/contact.png'
import { IContext, IPropsContact, IPropsState, IPropsStateFavorite, IResponse } from './type';

export default function ContactPhone({ lastContactProps, setLastContactProps }: IPropsContact) {

    const context: IContext = useContext(AppContext)
    const listContactStateFavorite = context.listContact.listContactFavorite || []
    const [hasMore, setHasMore] = useState(false)
    const [stateLoadData, setStateLoadData] = useState(initStateLoadData)
    const listContactState:any = context.listContact.listContact || []
    const { register } = useForm();
    const [getSearchContact, { loading }] = useLazyQuery(GET_ALL_CONTACT, {
        variables: {
            limit: stateLoadData.limit,
            offset: stateLoadData.offset,
            order_by: [{ "id": "desc" }],
            where: {
                first_name: {
                    _like: `%${stateLoadData.inputSearch}%`
                }
            },
        },
        onCompleted: (tData:IResponse) => {
            const newContact:any = tData?.contact
            if (newContact.length < 10) {
                setLastContactProps(true)
            } else {
                setLastContactProps(false)
            }

            if (hasMore) {
                finishSubmit(newContact, 'more')
            } else {
                finishSubmit(newContact, 'reset')
            }

        }
    })
    const finishSubmit = (newValue: any, type: string) => {
        let newContactValue = newValue;
        if (type !== 'reset') {
            const prevContact = context.listContact
            newContactValue = prevContact.listContact.concat(newValue)
        }
        context.setListContact((prevState: any) => ({
            ...prevState,
            listContact: newContactValue,
        }))
    }

    React.useEffect(() => {
        if (stateLoadData.offset !== 0) {
            getSearchContact()
        }
    }, [stateLoadData.offset])


    const onHandleLoadMore = () => {
        setHasMore(true)
        setStateLoadData((prevState: any) => ({
            ...prevState,
            offset: stateLoadData.offset + stateLoadData.limit + 1
        }))
    }
    const onChangeData = (_: string, value: string) => {
        setHasMore(false)
        setStateLoadData(prevState => ({
            ...prevState,
            inputSearch: value,
            offset: 0,
            limit: 10
        }))
        getSearchContact()
    }
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const onHandleAddContact = () => {
        setIsOpen(true);
    }

    const generateRenderContact = () => {
        if (loading) {
            return (
                <Loading />
            )
        } else {
            if (listContactState.length > 0) {
               return (
                listContactState.map((item: IPropsState, index: number) => (
                    <React.Fragment key={index}>
                        <ContactProfile name={`${item?.first_name} ${item?.last_name}`} id={item?.id} phone={`${item?.phones[0].number} `} />
                    </React.Fragment>
                ))
               )
            } else {
                return (
                    <TextCenter>Not Found Contact</TextCenter>
                )
            }
        }
    }
    const debounce = (funct:any) => {
        let timer:any;
        return function debounced(...args:any) {
          const context = args.this;
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            timer = null;
            funct.apply(context, args);
          }, 700);
        };
      };
    const optimisedVersion = useCallback(debounce(onChangeData), []);

    return (
        <>
            <ContainerCard>
                <ContainerHeader>
                    <TitleContact>Contacts</TitleContact>
                    <ContainerIcon>
                        <ButtonIcon srcIcon={ContactImage} onClick={onHandleAddContact} />
                    </ContainerIcon>
                </ContainerHeader>
                <Cards>
                    <Input
                        placeholder='Search your contacts'
                        type="text"
                        id="inputSearch"
                        name="inputSearch"
                        iconLeft={SearchImage}
                        onChange={(_, value) => {
                            optimisedVersion(_, value);
                          }}
                        register={register}
                        validateOptions={
                            {
                                minLen: 0,
                                maxLen: 50
                            }
                        }
                    />
                </Cards>
                {/* Favorite */}
                <Cards styleProps={{ marginTop: '1.5em', padding: '.5em 1em' }} title="FAVORITES" marginBottom=".5em">
                    <Slider {...settingsSlider}>
                        {
                            listContactStateFavorite?.length > 0 && listContactStateFavorite.map((item: IPropsStateFavorite, index:number) => (
                                  <div style={{ display: 'flex' }} key={index}>
                                    <ContactFavorite name={item.name} id={item.id} />
                                </div>
                            ))
                        }
                    </Slider>
                </Cards>
                {/* End Favorite */}
                {/* Contact List */}
                <Cards styleProps={{ marginTop: '1.5em', padding: '.5em 1em', overflow:'auto' }} title="LIST CONTACT">
                    {generateRenderContact()}
                </Cards>
                {!lastContactProps && (
                    <Buttons type="button" styleProps={{ marginTop: '1em' }} title={loading ? 'Loading ...' : 'Load More'} onClick={onHandleLoadMore} />
                )}
            </ContainerCard>
            {
                modalIsOpen && (
                    <AddContact show={modalIsOpen} setShow={setIsOpen} />
                )
            }
        </>
    );
}

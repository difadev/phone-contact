import { useEffect, useContext, useState } from "react";
import { default as ContactPhone } from "@/modules/contact_phone/application/contact_phone/contact_phone";
import { GET_ALL_CONTACT } from '@/graphql/contact/queries';
import { useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from "@/graphql/lib/apolloClient";
import { AppContext } from "@/context/app-context";
import Alert from "@/components/alert";
import { loadFromLocalStorage } from "@/utils/local-storage-helper";
import { LIST_FAVORITE } from "@/utils/local-storage-key";
import Head from 'next/head'


const Contact = () => {
    const [lastContact, setLastContact] = useState(false)
    const context:any = useContext(AppContext)
    const {loading, error, data}  = useQuery(GET_ALL_CONTACT,{
        variables: {
            limit: 10,
            offset: 0,
            order_by:[{"id" : "desc"}],
        }
    })
    useEffect(() => {
        const listFavoriteStorage:any = loadFromLocalStorage(LIST_FAVORITE)
        data.contact.length < 10 && setLastContact(true)
        context.setListContact((prevState:any) => ({
            ...prevState,
            listContact:data.contact,
            listContactFavorite: listFavoriteStorage
        }))
    },[data])
    if(loading) return (<p>Loading</p>)
    if(error) return (
        <Alert category="danger" title={error.message}/>
    )

    return (       
      <>
        <Head>
            <title>Phone Contact</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head> 
    <ContactPhone lastContactProps={lastContact}/>
    </>
    )
};
 

export async function getServerSideProps({req}:any) {
    const offsetData = req.cookies['offset']
    const apolloClient = initializeApollo({ctx:{req}})
    const {data}  = await apolloClient.query({query:GET_ALL_CONTACT,
    variables: {
        limit: 10,
        offset: offsetData !== undefined ? offsetData : 0,
        order_by:[{"id" : "desc"}]
    }})
   
    return addApolloState(apolloClient, {
      props:{
          contact: data
      }
    })
  }
  
export default Contact;

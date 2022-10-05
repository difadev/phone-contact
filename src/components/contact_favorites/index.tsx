import {ContainerProfile, SubContainer, TitleName, ContainerImage} from './styles'
import {IPropsCardProfile} from './type'
import Image from 'next/image'
import Router from 'next/router'
import User from '@/public/assets/icon/user.png'


export default function ContactFavorite({name, id}:IPropsCardProfile) {
    const handleDetail = () => {
        Router.push('/contact/detail/'+ id)
     }
    return ( 
            <ContainerProfile data-testid="profileClick" onClick={handleDetail}>
                <SubContainer>
                    <ContainerImage>
                        <Image src={User} layout="fill"  alt = "iconSidebar"/>        
                    </ContainerImage>
                    <TitleName>
                        {name}
                    </TitleName>
                </SubContainer>
            </ContainerProfile>

    )
  }
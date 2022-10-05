import {ContainerCard, TitleCard} from './styles'
import {IPropsCard} from './type'

export default function Cards({styleProps,children, title, marginBottom}:IPropsCard) {
  
    return ( 
        <ContainerCard style={styleProps}>
            <TitleCard marginBottom={marginBottom}>
                {title}
            </TitleCard>
            {children}
        </ContainerCard>
    )
  }
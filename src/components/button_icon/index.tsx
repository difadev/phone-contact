import {ButtonContainer} from './styles'
import {IButtonIcon} from './type'
import Image from 'next/image'

export default function ButtonIcon({srcIcon, styleProps, onClick, dataTest = 'buttonClick'}:IButtonIcon) {

    const onClickButton = () => {
        onClick()
    }


    return ( 
        <ButtonContainer data-testid={dataTest} style={styleProps} onClick={onClickButton}> 
            <Image src={srcIcon} alt="button-icon" height={16} width={16} />
        </ButtonContainer>
    )
  }
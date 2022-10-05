import {ContainerError,ContainerSuccess, TitleError} from './styles'
import {IPropsAlert} from './type'

export default function Alert({ title, category }:IPropsAlert) {
  

    const generateRenderAlert= () => {
        if(category === 'danger'){
            return (
                <ContainerError>
                    <TitleError>
                        {title}
                    </TitleError>
                </ContainerError>
            )
        } else {
            return (
                <ContainerSuccess>
                    <TitleError>
                        {title}
                    </TitleError>
                </ContainerSuccess>
            )
        }
    }

    return (
        generateRenderAlert()
    )
  }
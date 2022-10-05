import { ButtonContainerPrimary, ButtonContainerDanger, ButtonContainerSuccess, ButtonContainerDefault } from './styles'
import { IButtonIcon } from './type'

export default function Buttons({ title, styleProps, onClick, type = "button", category = "primary", disabled = false, dataTest = 'buttonTest' }: IButtonIcon) {

    const onClickButton = () => {
        onClick()
    }

    const generateRenderButton = () => {
        switch (category) {
            case "primary":
                return (
                    <ButtonContainerPrimary data-testid={dataTest} disabled={disabled} style={styleProps} onClick={onClickButton} type={type} >
                        {title}
                    </ButtonContainerPrimary>
                );
            case "danger":
                return (
                    <ButtonContainerDanger data-testid={dataTest} disabled={disabled} style={styleProps} onClick={onClickButton} type={type} >
                        {title}
                    </ButtonContainerDanger>
                )
            case "success":
                return (
                    <ButtonContainerSuccess data-testid={dataTest} disabled={disabled} style={styleProps} onClick={onClickButton} type={type} >
                        {title}
                    </ButtonContainerSuccess>
                )

            case "default":
                return (
                    <ButtonContainerDefault data-testid={dataTest} disabled={disabled} style={styleProps} onClick={onClickButton} type={type} >
                        {title}
                    </ButtonContainerDefault>
                )
        }
    }

    return generateRenderButton()
}
import styled from '@emotion/styled'


export const ContainerCard = styled.div`
    display: flex;
    padding: 0px .5em .5em .5em;
`
export const InputComponent = styled.input`
    width: 100%;
    padding: 1em 1em;
    border-radius: 4px;
    border: none;
    background:  ${(props:{styleProps?:any}) => (props.styleProps?.background ? props.styleProps.background : '#ffffff')}
`

export const ErrorText = styled.p `
    margin: 0px;
    font-size: 12px;
    font-weight: bold;
    color: #eb5e5e;
    margin-left: 1em;
`
export const ContainerButton = styled.button`
    border: none;
    background-color: transparent;
    cursor:pointer;
`

export const TextLabel = styled.p`
    font-size: 12px;
    margin: 0px 0px 0px 1em;
`


export const ContainerInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: .5em ;
`

export const ContainerIconLeft = styled.div`
    align-self:center;
    padding:0px .5em;
`
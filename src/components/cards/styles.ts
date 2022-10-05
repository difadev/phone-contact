import styled from '@emotion/styled'


export const ContainerCard = styled.div`
    background-color: #F9FAFA;
    font-size: 18px;
    border-radius: .7em;
    color: #291461;
    box-shadow: rgba(123, 130, 158, 0.2) 0px 8px 8px;
`

export const TitleCard = styled.h5`
    color:#7382bf;
    font-size: 14px;
    margin: 0px 0px  ${(props:{marginBottom?:string}) => (props.marginBottom ? props.marginBottom : '1.2em')} 0px;
`
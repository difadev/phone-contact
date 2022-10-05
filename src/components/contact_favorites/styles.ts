import styled from '@emotion/styled'


export const ContainerProfile = styled.div`
border-radius:.5em;
position:relative;
width:40px;
margin-right:.7em;
display:flex;
flex-direction:column;
text-align:center;
cursor: pointer;
`

export const SubContainer = styled.div`
height:40px;
width:40px;
position:relative;
text-align:center;
`

export const TitleName = styled.h5`
font-size:12px;
color:#2f395e;
margin:3px;
& :hover{
    color: #2d344d;
}
`

export const ContainerImage = styled.div`
width:40px;
height:40px;
border-radius:.5em;
`
import styled from "@emotion/styled"
import {mq} from '@/utils/global-style'

export const ContainerCard = styled.div`
    background:#F0F1F5;
    padding: .5em 1.5em 10em 1.5em;
    background:#F4F6FA;
    height: 100vh;
    ${mq[1]} {
        background:#F4F6FA;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;
        width:550px;
        height: 750px;
        overflow: auto;
        padding:2em;
        border-radius:1em;
    }
`
export const ContainerHeader = styled.div`
    display:flex;
    position:relative;
    width:100%;
    margin:1em 0px 2em 0px;
    justify-content:center;
`

export const TitleHeader = styled.h4`
    padding:0px;
    margin:0px;
`
export const ContainerArrowBack = styled.div`
    position:absolute;
    left:0px;
`

export const ContainerProfile = styled.div`
    margin-top:2em;
    display:flex;
    flex-direction:column;
    justify-content:center;
    text-align:center;
`

export const ContainerImageProfile = styled.div`
justify-content:center; 
text-align:center;
`

export const ContainerActionProfile = styled.div`
    display:flex;
    font-size:14px;
    flex-direction: row;
    justify-content:center;
    align-items:center;

 
`

export const LinkContact  = styled.h5`
    margin:0px;
    cursor:pointer;
    &.editClass {
        ::after {
            content:" | ";
            margin:0px .5em 0px 0px;
        }
    }
`

export const ContainerContent = styled.div`
    margin-top:5em;
    display:flex;
    flex-direction:column;
    background:#fafbfc;
    padding:.5em 2em;
`

export const TextContent = styled.p`
    margin-bottom:0px;
    font-weight:bold;
    font-size:14px;

`

export const ListPhone = styled.li`
    margin-bottom:0px;
    font-size:14px
`

export const ContainerPhone = styled.li`
display:flex;
justify-content:space-between;
`
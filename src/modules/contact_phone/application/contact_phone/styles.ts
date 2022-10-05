import styled from '@emotion/styled'
import {mq} from '@/utils/global-style'

export const ContainerCard = styled.div`
    background:#F0F1F5;
    padding: .5em 1.5em 2em 1.5em;
    display:flex;
    flex-direction: column;
    ${mq[0]} {
    background:#F4F6FA;
    }
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
    }
`
export const TitleContact = styled.h4`
  padding: 0px;
  margin: 0px 
`

export const TextCenter = styled.p`
  font-size: 14px;
  text-align: center;
`

export const ContainerHeader = styled.div`
  display: flex;
  margin: 1em 0px 2em 0px;
  justify-content: center;
  position: relative ;

  ${mq[1]} {
    margin-top:0px;
    margin-bottom:1em;
  }
`

export const ContainerIcon = styled.div`
  position: absolute;
  right: 0px;
  cursor:pointer;
`
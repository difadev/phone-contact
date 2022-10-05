import styled from '@emotion/styled'

export const ContainerProfile = styled.div`
    display:flex;
    width: 100%;
    margin: .5em 0px;
    position:relative;
    overflow:hidden;
`

export const ContainerTitle = styled.div`
    display:flex;
    margin: 0px;
    justify-content: center;
    margin-left:.5em;
    flex-direction: column;
    cursor: pointer;  
`
export const TitleName = styled.p `
    font-weight: bold;
    margin: 0px;
    font-size: 14px;
    color:#5b6487;

    &:hover {
        color: #2d344d;
    }
`

export const TitlePhone = styled.p `
    margin: 0px;
    font-size: 12px;
    color:#7e88a8;
`

export const ContainerIcon = styled.div`
    display: flex;
    position: absolute;
    right: 0px;
    top: .5em;
`

export const ContainerSlide = styled.div`
    right: ${(props:{slideData?:boolean}) => (props.slideData ? '20px' : '-100px')};
    background: #756cbd;
    position: absolute;
    top: 10px;
    padding: 0px 1em;
    transition: .7s ease;
    border-radius: 4px;
    display: flex;
`
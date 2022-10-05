import styled from '@emotion/styled'

export const ButtonContainerPrimary = styled.button`
    border: none;
    background:#8998d6;
    padding: .7em .5em;
    color: white;
    border-radius: 6px;
    width: 100%;
    cursor:pointer;

    &:hover {
        background:#7685c2;
    }
`

export const ButtonContainerDanger = styled.button`
    border: none;
    background:#eb5e5e;
    padding: .7em .5em;
    color: white;
    border-radius: 6px;
    width: 100%;
    cursor:pointer;
    &:hover {
        background:#de5050;
    }
`

export const ButtonContainerSuccess = styled.button`
    border: none;
    background:#3fba85;
    padding: .7em .5em;
    color: white;
    border-radius: 6px;
    width: 100%;
    cursor:pointer;
    &:hover {
        background:#35ab78;
    }
`
export const ButtonContainerDefault = styled.button`
    border: none;
    background:#d3d8e3;
    padding: .7em .5em;
    color: white;
    border-radius: 6px;
    width: 100%;
    cursor:pointer;
    &:hover {
        background:#b8becc;
    }
`
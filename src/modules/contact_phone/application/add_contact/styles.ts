import styled from '@emotion/styled'

export const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width:'80%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: "rgba(0, 29, 45, 0.5)",
      zIndex: 1,
      overflowX: "auto",
    },
};


export const ContainerNewContact = styled.div`
  position:relative;
`

export const ContainerButton = styled.button`
  position:absolute;
  top:-20px;
  right:-10px;
  background:transparent;
  border:none;
  cursor:pointer;
`
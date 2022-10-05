export interface IPropsEditPhone {
    show: boolean;
    setShow: (show:boolean) => void;
    id: number | string[] | undefined | string;
    phoneNumber?:string
  }
  
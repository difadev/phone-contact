export interface IPropsNewPhone {
    show: boolean;
    setShow: (show:boolean) => void;
    id: number | string[] | undefined | string;
    phoneNumber?:string
  }
  
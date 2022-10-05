export interface IPropsEditContact {
    show: boolean;
    setShow: (show:boolean) => void;
  }
  
export interface IPropsState {
  first_name: string,
  last_name: string,
  phones: Array<{number:string}>,
  id:number
}

export interface IPropsStateFavorite {
  name: string,
  id: number,
}

export interface IContext {
  detailData:Array<IPropsState>,
  listContact:{
    listContactFavorite:Array<{name:string,id:number}>,
    listContact:Array<{listContact:IPropsState}>
  },
  setListContact:any,
  listContactFavorite:Array<{name:string}>,
}

export interface IPropsContact {
  lastContactProps:boolean
}

export interface IResponse {
  contact: Array<{contact:IPropsState}>
}
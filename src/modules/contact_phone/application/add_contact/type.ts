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

export interface IContext {
  detailData:Array<IPropsState>,
  listContact:Array<IPropsState>,
  listContactFavorite:Array<{name:string}>,
}
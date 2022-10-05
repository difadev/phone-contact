export interface IPropsInput {
    type: string,
    onChange:(name:string, value:string) => void,
    placeholder: string,
    name: string,
    id: string,
    register?: any,
    validateOptions: {
        minLen: number,
        maxLen: number
    }
    value?: string,
    iconLeft?: any,
    iconRight?: any,
    errors?: any,
    label?: string,
    styleProps?: React.CSSProperties,
    onChangeIcon?: () => void,
    requiredData?: boolean,
    ref?: any,
    dataTest?: string;
  }
  
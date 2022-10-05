export interface IButtonIcon {
    title?: string;
    styleProps?:React.CSSProperties;
    onClick: () => void;
    type?: "button" | "submit";
    category?: "primary" | "success" | "danger" | "default";
    disabled?: boolean;
    dataTest?: string;
  }
  
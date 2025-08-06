import {FC, ReactNode} from 'react'
import s from './Custom.module.scss'


interface ICustomBtnProps {
    text: string;
    icon?: string;
    width?: number;
    height?: number
    disabled?: boolean;
    onClick?: () => void;
    mt?: string;
    ml?: string;
}

const CustomBtn:FC<ICustomBtnProps> = ({text,icon,width,disabled,ml, mt,onClick, height}) => {
  return (
    <button 
      className={s.btn} 
      onClick={onClick} 
      style={{maxWidth: width, marginTop:mt, marginRight: ml, marginLeft: ml, height: height}} 
      disabled={disabled}
    >
        <img src={icon} alt="" />
        <span>{text}</span>
    </button>
  )
}

export default CustomBtn
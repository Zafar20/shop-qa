import { FC} from 'react'
import s from './Modal.module.scss'

interface IModalProps {
    no: () => void;
    yes: ()=> void;
}

const Modal:FC<IModalProps> = ({no, yes}) => {
  return (
    <div className={s.modal}>
        <div className={s.modal_block}>
            <h2 className={s.modal_block_title}>Вы точно хотите выйти?</h2>
            <div className={s.modal_block_btns}>
                <button onClick={no}>Нет</button>
                <button onClick={yes}>Да</button>
            </div>
        </div>
    </div>
  )
}

export default Modal
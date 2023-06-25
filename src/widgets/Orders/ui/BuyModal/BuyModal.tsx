import image from 'images/closeBtn.svg';
import { FC, useState } from 'react';
import Button, { ThemeButtonEnum } from 'shared/ui/Button/Button';
import Modal from 'shared/ui/Modal/Modal';
import Portal from 'shared/ui/Portal/Portal';
import ProcessBar from 'shared/ui/ProcessBar/ProcessBar';
import s from './BuyModal.module.scss';

interface BuyModalProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
}

const BuyModal: FC<BuyModalProps> = ({ className, isOpen, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };
  return (
    <Portal>
      <Modal
        isOpen={isOpen}
        className={className}
        onClose={onClose}
      >
        <div className={s.buyModal}>
          <div className={s.header}>
            <h3 className={s.title}>Процесс оплаты</h3>
            <Button className={s.button} onClick={onClose} theme={ThemeButtonEnum.CLEAR}>
              <img className={s.image} src={image} alt='Крестик' />
            </Button>
          </div>
          <div className={s.content}>
            {isSuccess
              ? <p>Покупка завершена</p>
              : <ProcessBar onSuccess={handleSuccess} />}
          </div>
        </div>
      </Modal>
    </Portal>
  );
};

export default BuyModal;

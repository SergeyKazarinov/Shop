import { patchProductFx } from '@entities/productList';
import { $order, removeOrderEvent } from '@features/orders';
import { Button, ThemeButtonEnum } from '@shared/ui/Button';
import { Modal } from '@shared/ui/Modal';
import { Portal } from '@shared/ui/Portal';
import { ProcessBar } from '@shared/ui/ProcessBar';
import { useEvent, useStore } from 'effector-react';
import image from 'images/closeBtn.svg';
import { FC, useState } from 'react';

import s from './BuyModal.module.scss';
import BuyList from '../BuyList/BuyList';

interface BuyModalProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
}

const BuyModal: FC<BuyModalProps> = ({ className, isOpen, onClose }) => {
  const { orders } = useStore($order);
  const patchProduct = useEvent(patchProductFx);

  const [isSuccess, setIsSuccess] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleSuccess = () => {
    setIsSuccess(true);
    setDisabled(false);
  };

  const handleClose = () => {
    if (isSuccess) {
      patchProduct(orders);
      removeOrderEvent();
    }
    onClose();
  };

  return (
    <Portal>
      <Modal
        isOpen={isOpen}
        className={className}
        onClose={handleClose}
        disabled={disabled}
      >
        <div className={s.buyModal}>
          <div className={s.header}>
            <h3 className={s.title}>Процесс оплаты</h3>
            <Button
              className={s.button}
              onClick={handleClose}
              theme={ThemeButtonEnum.CLEAR}
              disabled={disabled}
            >
              <img className={s.image} src={image} alt='Крестик' />
            </Button>
          </div>
          <div className={s.content}>
            {isSuccess
              ? <BuyList />
              : <ProcessBar onSuccess={handleSuccess} />}
          </div>
        </div>
      </Modal>
    </Portal>
  );
};

export default BuyModal;

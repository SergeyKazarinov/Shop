import image from 'images/closeBtn.svg';
import { FC, useState } from 'react';
import Button, { ThemeButtonEnum } from 'shared/ui/Button/Button';
import Modal from 'shared/ui/Modal/Modal';
import Portal from 'shared/ui/Portal/Portal';
import ProcessBar from 'shared/ui/ProcessBar/ProcessBar';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import patchProduct from 'widgets/ProductList/model/services/patchProduct';
import { orderActions } from '../../model/slice/orderSlice';
import s from './BuyModal.module.scss';
import BuyList from '../BuyList/BuyList';

interface BuyModalProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
}

const BuyModal: FC<BuyModalProps> = ({ className, isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((store) => store.order.orders);
  const [isSuccess, setIsSuccess] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleSuccess = () => {
    setIsSuccess(true);
    setDisabled(false);
  };

  const handleClose = () => {
    if (isSuccess) {
      dispatch(patchProduct(orders));
      dispatch(orderActions.removeOrder());
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

import {
  FC,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Loader from 'shared/ui/Loader/Loader';
import Portal from 'shared/ui/Portal/Portal';
import { OrderFormLazy } from '../OrderForm/OrderForm.lazy';
import s from './OrderModal.module.scss';

interface OrderModalProps {
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  modalPortal?: HTMLElement;
  onBuy: () => void;
}

const OrderModal: FC<OrderModalProps> = ({
  className = '', isOpen, onClose, modalPortal, onBuy,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClose = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 400);
    }
  }, [onClose]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (onClose) {
        handleClose();
      }
    }
  }, [onClose, handleClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setIsOpening(true);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const onClick = () => {
    handleClose();
  };

  const mods: Record<string, boolean> = {
    [s.opened]: isOpening,
    [s.closing]: isClosing,
  };

  return (
    <Portal element={modalPortal}>
      <div className={(classNames(s.modal, mods, [className]))} >
        <Suspense fallback={<Loader />}>
          <OrderFormLazy onBuy={onBuy} />
        </Suspense>
      </div>
      <div className={s.overlay} onClick={onClick} />
    </Portal>
  );
};

export default OrderModal;

import {
  FC,
  useCallback, useEffect, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Portal from 'shared/ui/Portal/Portal';
import { OrderFormLazy } from '../OrderForm/OrderForm.lazy';
import s from './OrderModal.module.scss';

interface OrderModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  modalPortal?: HTMLElement
}

const OrderModal: FC<OrderModalProps> = ({
  className = '', isOpen, onClose, modalPortal,
}) => {
  const mods: Record<string, boolean> = {
    [s.opened]: isOpen,
  };
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (onClose) {
        onClose();
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const onClick = () => {
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Portal element={modalPortal}>
      <div className={(classNames(s.modal, mods, [className]))} >
        <OrderFormLazy />
      </div>
      <div className={s.overlay} onClick={onClick} />
    </Portal>
  );
};

export default OrderModal;
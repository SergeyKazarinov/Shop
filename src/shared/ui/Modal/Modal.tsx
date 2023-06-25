import {
  FC, MouseEvent, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import s from './Modal.module.scss';
import Portal from '../Portal/Portal';

interface ModalProps {
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
  modalPortal?: HTMLElement;
  className?: string;
}

const Modal: FC<ModalProps> = ({
  children,
  isOpen = false,
  onClose,
  lazy,
  modalPortal,
  className = '',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClose = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 500);
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
      setIsMounted(true);
      setIsOpening(true);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const mods: Record<string, boolean> = {
    [s.opened]: isOpening,
    [s.closing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal element={modalPortal}>
      <div className={(classNames(s.modal, mods, [className]))}>
        <div
          className={s.overlay}
          onClick={handleClose}
        >
          <div
            className={s.content}
            onClick={handleContentClick}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;

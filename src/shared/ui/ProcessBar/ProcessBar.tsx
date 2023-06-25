import { Line } from 'rc-progress';
import {
  FC, useEffect, useRef, useState,
} from 'react';
import Loader from '../Loader/Loader';

interface ProcessBarProps {
  onSuccess: () => void;
}
const ProcessBar: FC<ProcessBarProps> = ({ onSuccess }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent((state) => state + 1);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (percent < 100) {
      timerRef.current = setTimeout(() => {
        setPercent((state) => state + 1);
      }, 50);
    }

    if (percent === 100) {
      onSuccess();
    }
  }, [percent, onSuccess]);
  return (
    <>
      <Loader className='' />
      <p>Процесс оплаты {percent} %</p>
      <Line percent={percent} strokeWidth={2} strokeColor="#2db7f5" />
    </>
  );
};

export default ProcessBar;

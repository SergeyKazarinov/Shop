import { FC, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

interface AnimateProviderProps {
  children: ReactNode;
}

const AnimateProvider: FC<AnimateProviderProps> = ({ children }) => (
  <AnimatePresence>
    {children}
  </AnimatePresence >
);

export default AnimateProvider;

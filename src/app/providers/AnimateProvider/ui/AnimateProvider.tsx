import { AnimatePresence } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface AnimateProviderProps {
  children: ReactNode;
}

const AnimateProvider: FC<AnimateProviderProps> = ({ children }) => (
  <AnimatePresence>
    {children}
  </AnimatePresence >
);

export default AnimateProvider;

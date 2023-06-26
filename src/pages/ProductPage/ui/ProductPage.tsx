import { Product } from '@widgets/Product';
import { motion } from 'framer-motion';
import { FC } from 'react';

const ProductPage: FC = () => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.7 } }}
    exit={{ opacity: 0 }}
  >
    <Product />
  </motion.section>
);

export default ProductPage;

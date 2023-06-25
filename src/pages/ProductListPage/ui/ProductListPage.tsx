import { FC } from 'react';
import { ProductList } from 'entities/productList';
import { motion } from 'framer-motion';

const ProductListPage: FC = () => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.7 } }}
    exit={{ opacity: 0 }}
  >
    <ProductList />
  </motion.section>
);

export default ProductListPage;

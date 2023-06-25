import { FC } from 'react';
import { CategoriesList } from 'entities/categoriesList';
import { motion } from 'framer-motion';

const CategoriesListPage: FC = () => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.7 } }}
    exit={{ opacity: 0 }}
  >
    <CategoriesList />
  </motion.section>
);

export default CategoriesListPage;

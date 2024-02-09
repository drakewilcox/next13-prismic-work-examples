'use client';

import styles from './pageWrapper.module.css';

import { motion } from 'framer-motion';
import classNames from 'classnames';

export const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  if (process.env.NODE_ENV !== 'production') {
    return (
      <main className={classNames([styles.pageWrapper, className])} id="main">
        {children}
      </main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.645, 0.045, 0.355, 1] }}
      className={classNames([styles.pageWrapper, className])}
      id="main"
    >
      {children}
    </motion.main>
  );
};

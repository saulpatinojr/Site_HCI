import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      className="text-center mb-16 md:mb-24"
    >
      <h1 className="text-5xl md:text-6xl lg:text-7xl hch-title mb-6">
        {title}
      </h1>
      <div className="accent-line mx-auto mb-8"></div>
      {subtitle && (
        <p className="text-lg md:text-xl font-mono text-text-med max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default PageHeader;
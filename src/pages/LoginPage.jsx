import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Admin Login - Hybrid Cloud Insights</title>
        <meta name="description" content="Administrator login page for Hybrid Cloud Insights." />
      </Helmet>
      <main className="py-20 px-4 flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="retro-card p-8 text-center">
            <h1 className="text-4xl hch-title">Admin Access Disabled</h1>
            <p className="text-text-med font-mono mt-4">&gt; Database services are currently disconnected. Please contact the site administrator.</p>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default LoginPage;
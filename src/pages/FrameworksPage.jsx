import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

const FrameworksPage = () => {
    return (
        <>
            <Helmet>
                <title>Frameworks - Hybrid Cloud Insights</title>
                <meta name="description" content="Discover cloud frameworks and methodologies to guide your architecture decisions." />
            </Helmet>
            <main className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <PageHeader
                        title="Frameworks"
                        subtitle="Structured approaches and methodologies to guide your cloud architecture decisions."
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="blueprint-card p-12 text-center bg-ink-800"
                    >
                        <Layers className="w-16 h-16 text-accent mx-auto mb-6" />
                        <h2 className="text-3xl font-semibold text-white mb-4">Frameworks Content Coming Soon</h2>
                        <p className="text-lg text-medium-gray max-w-2xl mx-auto">
                            This section will soon feature comprehensive details on established cloud frameworks, such as the AWS Well-Architected Framework and the Microsoft Azure Well-Architected Framework.
                        </p>
                    </motion.div>
                </div>
            </main>
        </>
    );
};

export default FrameworksPage;
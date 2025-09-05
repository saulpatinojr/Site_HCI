import React from 'react';
import { Helmet } from 'react-helmet-async';
import Title from '@/components/Title';
import { motion } from 'framer-motion';
import { Cloud, Server, Database } from 'lucide-react';

const ArchitectureDesignsPage = () => {
    return (
        <>
            <Helmet>
                <title>Architecture Designs - Hybrid Cloud Insights</title>
                <meta name="description" content="Explore cloud architecture designs for Azure, AWS, and GCP." />
            </Helmet>
            <main className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <Title
                        title="Architecture Designs"
                        subtitle="Explore cloud architecture designs and solutions for major cloud platforms."
                    />

                    <div className="space-y-16">
                        {/* Azure Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6 font-mono flex items-center">
                                <Cloud className="w-8 h-8 mr-4 text-blue-500" />
                                Azure
                            </h2>
                            <div className="blueprint-card p-8 text-center bg-ink-800">
                                <h3 className="text-2xl font-semibold text-white mb-4">Content Coming Soon</h3>
                                <p className="text-medium-gray">Detailed architecture designs for Microsoft Azure will be available here shortly.</p>
                            </div>
                        </motion.section>

                        {/* AWS Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6 font-mono flex items-center">
                                <Server className="w-8 h-8 mr-4 text-orange-500" />
                                AWS
                            </h2>
                            <div className="blueprint-card p-8 text-center bg-ink-800">
                                 <h3 className="text-2xl font-semibold text-white mb-4">Content Coming Soon</h3>
                                <p className="text-medium-gray">Detailed architecture designs for Amazon Web Services will be available here shortly.</p>
                            </div>
                        </motion.section>

                        {/* GCP Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6 font-mono flex items-center">
                                <Database className="w-8 h-8 mr-4 text-green-500" />
                                GCP
                            </h2>
                            <div className="blueprint-card p-8 text-center bg-ink-800">
                                 <h3 className="text-2xl font-semibold text-white mb-4">Content Coming Soon</h3>
                                <p className="text-medium-gray">Detailed architecture designs for Google Cloud Platform will be available here shortly.</p>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ArchitectureDesignsPage;
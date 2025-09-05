import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { useData } from '@/context/DataContext';
import Title from '@/components/Title';
import { Button } from '@/components/ui/button';

const CertificationsPage = () => {
    const { certifications, loading, error, fetchData } = useData();

    useEffect(() => {
        const controller = new AbortController();
        if (certifications.length === 0) {
            fetchData('certifications', 'certifications', 'certifications', {
                orderOptions: { column: 'display_order', ascending: true },
                signal: controller.signal
            });
        }

        return () => {
            controller.abort();
        };
    }, [fetchData, certifications.length]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <>
            <Helmet>
                <title>Certifications - Hybrid Cloud Insights</title>
                <meta name="description" content="A showcase of professional certifications and expertise in cloud technologies." />
            </Helmet>
            <main className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <Title title="Professional Certifications" subtitle="> Validated expertise in cloud and hybrid technologies." />

                    {loading.certifications && (
                        <div className="text-center py-16">
                            <p className="text-electric-teal font-mono text-xl">Loading Credentials...</p>
                        </div>
                    )}

                    {error.certifications && (
                        <div className="text-center py-16">
                            <p className="text-red-500 font-mono">Error loading certifications: {error.certifications}</p>
                        </div>
                    )}

                    {!loading.certifications && !error.certifications && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                        >
                            {certifications.map((cert) => (
                                <motion.div
                                    key={cert.id}
                                    variants={itemVariants}
                                    className="retro-card-2 p-6 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-start justify-between mb-4">
                                            <Award className="w-10 h-10 text-electric-teal" />
                                            {cert.image_url && (
                                                <img  class="h-12 w-auto object-contain" alt={`${cert.issuer} logo`} src="https://images.unsplash.com/photo-1689245696621-3d2503e0903d" />
                                            )}
                                        </div>
                                        <h3 className="font-display text-2xl text-white mb-2">{cert.name}</h3>
                                        <p className="font-mono text-text-med mb-4">Issued by: {cert.issuer}</p>
                                        {cert.tags && cert.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {cert.tags.map(tag => (
                                                    <span key={tag} className="text-xs font-mono bg-cyber-purple/50 text-electric-teal px-2 py-1 rounded-md">{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {cert.verify_url && (
                                        <Button asChild className="w-full mt-4 font-mono bg-neon-pink text-bg-dark hover:bg-electric-teal hover:shadow-lg hover:shadow-electric-teal/50 rounded-none transition-all">
                                            <a href={cert.verify_url} target="_blank" rel="noopener noreferrer">
                                                Verify Credential <ExternalLink className="ml-2 w-4 h-4" />
                                            </a>
                                        </Button>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </main>
        </>
    );
};

export default CertificationsPage;
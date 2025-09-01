import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const WalkthroughItemPage = () => {
    const { slug } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('walkthrough_items')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) {
                    throw error;
                }
                setItem(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load the walkthrough. It might not exist.');
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-electric-teal font-mono text-2xl">Loading Transmission...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <main className="py-20 px-4 text-center">
                 <PageHeader title="Transmission Lost" subtitle="> Could not retrieve data." />
                 <p className="text-text-med mt-4">{error}</p>
                 <Button asChild className="mt-8">
                     <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Return to Home</Link>
                 </Button>
            </main>
        );
    }

    return (
        <>
            <Helmet>
                <title>{item?.title ? `${item.title} - Walkthrough` : 'Walkthrough'} - Hybrid Cloud Insights</title>
                <meta name="description" content={item?.description || 'A deep dive into hybrid cloud topics.'} />
            </Helmet>
            <main className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Button asChild variant="outline" className="mb-8 font-mono border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-bg-dark">
                            <Link to="/#walkthrough">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Walkthroughs
                            </Link>
                        </Button>
                        <PageHeader title={item.title} subtitle={item.description} />
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-12"
                    >
                         <div className="aspect-w-16 aspect-h-9">
                            {item.iframe_src ? (
                                <iframe
                                    src={item.iframe_src}
                                    title={item.title}
                                    className="w-full h-full rounded-xl border-2 border-cyber-purple/50"
                                    style={{ minHeight: '60vh' }}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="w-full rounded-xl border-2 border-dashed border-cyber-purple/50 bg-bg-med flex items-center justify-center" style={{minHeight: '60vh'}}>
                                    <p className="text-text-med font-mono">No video content available for this topic.</p>
                                </div>
                            )}
                        </div>
                        {item.image_placeholder && (
                             <div className="mt-12 flex flex-col items-center">
                                 <h2 className="text-2xl hch-title mb-6">Architectural Diagram</h2>
                                 <img  class="max-w-full md:max-w-2xl h-auto object-contain rounded-lg border-2 border-electric-teal/30 p-2" alt={item.image_placeholder} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>
        </>
    );
};

export default WalkthroughItemPage;
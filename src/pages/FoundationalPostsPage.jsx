import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Info, Loader2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { useData } from '@/context/DataContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FoundationalPostsPage = () => {
    const { blogPosts, loading } = useData();

    return (
        <>
            <Helmet>
                <title>Foundational Posts - Hybrid Cloud Insights</title>
                <meta name="description" content="Explore essential reads that form the cornerstone of modern cloud architecture understanding. In-depth articles on security, cost, migration, and more." />
            </Helmet>
            <main className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <PageHeader
                        title="Foundational Posts"
                        subtitle="> Essential reads that form the cornerstone of modern cloud architecture understanding."
                    />

                    {loading.blog ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-12 h-12 text-neon-pink animate-spin" />
                        </div>
                    ) : blogPosts.length === 0 ? (
                        <div className="text-center p-10 retro-card">
                            <h3 className="text-3xl font-display text-electric-teal mb-4">Transmission Log Empty</h3>
                            <p className="text-text-med mb-6 max-w-2xl mx-auto font-mono">
                                > This section is ready for your content. Blog posts are managed via the `posts` table in your Supabase project.
                            </p>
                            <Button asChild className="font-mono bg-neon-pink text-bg-dark hover:bg-electric-teal rounded-none">
                                <Link to="/management-guide">
                                    <Info className="mr-2 h-4 w-4" /> [Access_Admin_Panel]
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post, index) => (
                                <motion.div
                                    key={post.id || index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="retro-card flex flex-col"
                                >
                                    <div className="relative w-full h-48 bg-bg-light overflow-hidden">
                                        <img src={post.imageUrl || 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=6000'} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" alt={post.title} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-bg-med to-transparent"></div>
                                        <span className="absolute top-4 right-4 font-mono text-sm bg-cyber-purple/80 text-electric-teal px-2 py-1 rounded-md">{post.category || 'General'}</span>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h2 className="text-2xl font-display text-white mb-3 leading-tight flex-grow">
                                            {post.title}
                                        </h2>
                                        <p className="text-text-med mb-4 leading-relaxed font-mono text-sm">
                                            {post.description}
                                        </p>
                                        <div className="border-t border-cyber-purple/50 pt-4 mt-auto">
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-text-med font-mono">
                                                    <p>By {post.author || 'Saul Patino'}</p>
                                                    <p>{new Date(post.published_at).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex items-center text-neon-pink font-mono">
                                                    Read <ArrowRight className="ml-2 w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default FoundationalPostsPage;
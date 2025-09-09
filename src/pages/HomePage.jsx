import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import WalkthroughCarousel from '@/components/WalkthroughCarousel';

const StatCard = ({
  value,
  label,
  delay
}) => <motion.div initial={{
  opacity: 0,
  y: 20
}} animate={{
  opacity: 1,
  y: 0
}} transition={{
  duration: 0.5,
  delay
}} className="text-center">
        <p className="font-display text-5xl text-electric-teal" style={{
    textShadow: 'var(--glow-teal)'
  }}>{value}</p>
        <p className="font-mono text-text-med mt-1">{label}</p>
    </motion.div>;
    
const HomePage = () => {
  const {
    videos = [],
    blogPosts = [],
    loading = {}
  } = useData() || {};

  return <>
            <Helmet>
                <title>Hybrid Cloud Insights - Architecting the Future of Cloud</title>
                <meta name="description" content="Your public cloud architecture, decoded. Expert analysis, visual guides, and in-depth discussions on cloud computing." />
            </Helmet>

            <main className="overflow-x-hidden">
                <section className="relative min-h-screen flex items-center justify-center text-center px-4 py-20 -mt-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-dark to-cyber-purple/20 z-0"></div>
                    <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/24f0c0cb-5154-4515-a61d-c58b5e4b263e/acf883a56fb4f0e77937aa33e32940fe.png')] bg-cover bg-center opacity-20 mix-blend-lighten z-10"></div>
                    <div className="relative z-20">
                        <motion.h1 initial={{
            opacity: 0,
            y: -50
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            ease: 'easeOut'
          }} className="text-5xl md:text-7xl lg:text-8xl hch-title">
                            Hybrid Cloud Insights
                        </motion.h1>
                        <motion.p initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="mt-6 text-xl md:text-2xl font-mono text-text-med max-w-3xl mx-auto">
                            &gt; Your public cloud architecture, decoded.
                        </motion.p>
                        <motion.div initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }} className="mt-12">
                            <Button asChild size="lg" className="font-mono text-lg bg-neon-pink text-bg-dark hover:bg-electric-teal hover:shadow-lg hover:shadow-electric-teal/50 rounded-none px-10 py-6 transition-all">
                                <Link to="/foundational-posts">
                                    [Enter_The_Grid] <ArrowRight className="ml-3 w-5 h-5" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </section>

                <section className="py-20 px-4 bg-bg-med/50 border-y-2 border-cyber-purple">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                        <StatCard value={loading.blog ? '...' : blogPosts.length} label="Foundational Posts" delay={0.2} />
                        <StatCard value={loading.videos ? '...' : videos.length} label="Visualizations" delay={0.4} />
                        <StatCard value="03" label="Core Pillars" delay={0.6} />
                    </div>
                </section>

                <section id="walkthrough" className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <motion.div initial={{
              opacity: 0,
              x: -50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.7
            }} viewport={{
              once: true
            }} className="text-center md:text-left md:max-w-xl mb-12">
                                <h2 className="text-4xl md:text-5xl hch-title">The Walkthrough</h2>
                                <div className="accent-line mx-auto md:mx-0"></div>
                                <p className="text-lg text-text-med leading-relaxed mt-6">As the cloud landscape constantly shifts, complexity can obscure the path forward. Hybrid Cloud Insights is your navigator, translating multifaceted architectural challenges into lucid and decisive guidance.</p>
                         </motion.div>
                         <div className="text-center p-8 retro-card">
                           <p className="text-text-med font-mono">Walkthrough content coming soon...</p>
                         </div>
                    </div>
                </section>

                <section className="py-20 px-4 bg-bg-med/50 border-t-2 border-cyber-purple">
                    <div className="max-w-7xl mx-auto">
                        <motion.div initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} transition={{
            duration: 0.8
          }} viewport={{
            once: true
          }} className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl hch-title mb-4">Latest Transmissions</h2>
                            <p className="text-lg font-mono text-text-med max-w-2xl mx-auto">&gt; Key articles from the knowledge base.</p>
                        </motion.div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(loading.blog ? Array(3).fill({}) : blogPosts.slice(0, 3)).map((post, index) => <motion.div key={post.id || index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: index * 0.1
            }} viewport={{
              once: true
            }} className="retro-card p-6 flex flex-col">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-mono text-sm bg-cyber-purple/50 text-electric-teal px-2 py-1 rounded-md">{post.category || '...'}</span>
                                        <span className="font-mono text-sm text-text-med">{post.read_time || ''}</span>
                                    </div>
                                    <h3 className="font-display text-xl text-white mb-3 leading-tight flex-grow">{post.title || 'Loading...'}</h3>
                                    <div className="flex items-center text-neon-pink font-mono mt-4">Read Article <ArrowRight className="ml-2 w-4 h-4" /></div>
                                </motion.div>)}
                        </div>
                    </div>
                </section>

                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} viewport={{
            once: true
          }} className="space-y-6">
                            <h2 className="text-4xl md:text-5xl hch-title">Open a Comms Channel</h2>
                            <p className="text-lg font-mono text-text-med max-w-2xl mx-auto">&gt; Ready to discuss your cloud architecture challenges? Let's build something remarkable together.</p>
                            <Button asChild size="lg" className="font-mono text-lg bg-electric-teal text-bg-dark hover:bg-neon-pink hover:shadow-lg hover:shadow-neon-pink/50 rounded-none px-10 py-6 transition-all">
                                <Link to="/contact">[Contact_Me]</Link>
                            </Button>
                        </motion.div>
                    </div>
                </section>
            </main>
        </>;
};
export default HomePage;
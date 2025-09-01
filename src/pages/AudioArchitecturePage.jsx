import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Podcast, Headphones, Mic, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AudioArchitecturePage = () => {
  return (
    <>
      <Helmet>
        <title>Audio Architecture - Hybrid Cloud Insights Podcast</title>
        <meta name="description" content="Tune into the Hybrid Cloud Insights podcast for in-depth discussions on cloud architecture, best practices, and emerging trends." />
      </Helmet>
      <main className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <PageHeader title="Audio Architecture" subtitle="> Listen to the latest insights." />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="retro-card p-8 grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="space-y-6">
              <h2 className="text-4xl hch-title">The Hybrid Cloud Insights Podcast</h2>
              <p className="text-lg text-text-light leading-relaxed">
                Join us as we dive deep into the world of public cloud architecture, hybrid environments, and the strategies that power modern digital transformation. Each episode brings you expert analysis, practical tips, and engaging conversations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <Button asChild size="lg" className="font-mono text-lg bg-electric-teal text-bg-dark hover:bg-neon-pink hover:shadow-lg hover:shadow-neon-pink/50 rounded-none transition-all">
                  <a href="https://podcasts.apple.com/us/podcast/-/id1813828323" target="_blank" rel="noopener noreferrer">
                    <Headphones className="mr-3 w-5 h-5" /> Listen on Apple Podcasts
                  </a>
                </Button>
                <Button asChild size="lg" className="font-mono text-lg bg-neon-pink text-bg-dark hover:bg-electric-teal hover:shadow-lg hover:shadow-electric-teal/50 rounded-none transition-all">
                  <a href="https://open.spotify.com/show/4XNv8cVw34Q4SOb05kf1Ud" target="_blank" rel="noopener noreferrer">
                    <Podcast className="mr-3 w-5 h-5" /> Listen on Spotify
                  </a>
                </Button>
                <Button asChild size="lg" className="font-mono text-lg bg-cyber-purple text-electric-teal hover:bg-electric-teal hover:text-bg-dark hover:shadow-lg hover:shadow-electric-teal/50 rounded-none transition-all">
                  <a href="https://music.amazon.com/podcasts/906d73b2-2045-4e6d-8fce-63c791854f7b" target="_blank" rel="noopener noreferrer">
                    <Headphones className="mr-3 w-5 h-5" /> Listen on Amazon Music
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Mic className="w-48 h-48 text-cyber-purple/50 md:w-full md:h-full max-w-sm" />
            </div>
          </motion.div>

          <section className="mt-16">
            <h2 className="text-3xl hch-title text-center mb-8">Latest Episode Transmission</h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="retro-card p-6 flex justify-center"
            >
                <iframe title="Unlocking the Power of Microsoft's Cloud: The CSP Advantage" allowTransparency="true" height="150" width="100%" style={{ border: 'none', minWidth: 'min(100%, 430px)', height: '150px' }} scrolling="no" data-name="pb-iframe-player" src="https://www.podbean.com/player-v2/?i=idsvh-193a8b0-pb&from=pb6admin&share=1&download=0&rtl=0&fonts=Tahoma&skin=f6f6f6&font-color=auto&logo_link=episode_page&btn-skin=fb0584" loading="lazy"></iframe>
            </motion.div>
          </section>

          <section className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl hch-title mb-4">Want to be a Guest?</h2>
              <p className="text-lg text-text-med leading-relaxed max-w-2xl mx-auto">
                Are you a cloud expert with unique insights to share? We're always looking for engaging guests to join our discussions. Reach out to us!
              </p>
              <Button asChild size="lg" className="font-mono text-lg bg-cyber-purple text-electric-teal hover:bg-electric-teal hover:text-bg-dark hover:shadow-lg hover:shadow-electric-teal/50 rounded-none px-10 py-6 mt-8 transition-all">
                <Link to="/contact">
                  <Sparkles className="mr-3 w-5 h-5" /> [Inquire_About_Guest_Spot]
                </Link>
              </Button>
            </motion.div>
          </section>
        </div>
      </main>
    </>
  );
};

export default AudioArchitecturePage;
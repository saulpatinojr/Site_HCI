import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Loader2, Mic } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataContext';
import SessionizeWidget from '@/components/SessionizeWidget';

const AboutPage = () => {
  const { certifications, loading } = useData();

  const certificationsByIssuer = useMemo(() => {
    if (loading.certifications || !certifications) return {};
    return certifications.reduce((acc, cert) => {
      const issuer = cert.issuer || 'Other';
      if (!acc[issuer]) {
        acc[issuer] = [];
      }
      acc[issuer].push(cert);
      return acc;
    }, {});
  }, [certifications, loading.certifications]);

  return (
    <>
      <Helmet>
        <title>About - Hybrid Cloud Insights</title>
        <meta name="description" content="Learn more about the architect behind Hybrid Cloud Insights, their mission, and their expertise in cloud technologies." />
      </Helmet>
      <main className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <PageHeader title="About The Architect" subtitle="> System.out.println('Hello, World!');" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-5 gap-8 retro-card p-8"
          >
            <div className="md:col-span-2 flex justify-center items-center">
              <div className="w-56 h-56 rounded-lg bg-bg-light border-2 border-neon-pink p-2 shadow-[0_0_20px_var(--neon-pink)]">
                <img src="https://horizons-cdn.hostinger.com/24f0c0cb-5154-4515-a61d-c58b5e4b263e/b1f7e75441066ec8505f5a5ccd7a071d.jpg" className="w-full h-full rounded-md object-cover" alt="Profile picture of Saul Patino" />
              </div>
            </div>
            <div className="md:col-span-3 space-y-4">
              <h2 className="text-4xl hch-title">Saul Patino</h2>
              <p className="text-lg text-text-light leading-relaxed">
                I'm a seasoned cloud architect with over 15 years of experience designing, building, and managing complex, secure, and cost-effective cloud infrastructures. My passion lies in demystifying cloud technologies and empowering teams to build resilient and scalable systems.
              </p>
              <p className="text-text-med leading-relaxed font-mono">
                &gt; Hybrid Cloud Insights is my platform for sharing practices, patterns, and strategies I've developed throughout my career.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl hch-title text-center mb-8 flex items-center justify-center">
                <Mic className="w-8 h-8 mr-4 text-electric-teal" />
                Speaker Sessions
              </h2>
              <div className="retro-card p-2">
                <SessionizeWidget type="sessions" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl hch-title text-center mb-8">Certifications</h2>
               {loading.certifications ? (
                  <div className="flex justify-center items-center py-10">
                      <Loader2 className="w-10 h-10 text-neon-pink animate-spin" />
                  </div>
              ) : Object.keys(certificationsByIssuer).length === 0 ? (
                  <div className="text-center p-8 retro-card">
                      <ShieldCheck className="w-12 h-12 mx-auto text-text-med mb-4" />
                      <h3 className="text-xl font-display text-white">No Certifications Found</h3>
                  </div>
              ) : (
                  <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                    {Object.entries(certificationsByIssuer).map(([issuer, certs]) => (
                      <div key={issuer}>
                        <h3 className="text-2xl font-display text-electric-teal mb-4 flex items-center">
                          <Award className="w-6 h-6 mr-3" />
                          {issuer}
                        </h3>
                        <div className="space-y-4">
                          {certs.map((cert) => (
                            <div key={cert.id} className="retro-card p-4 flex items-center space-x-4">
                              <img src={cert.image_url} alt={`${cert.name} icon`} className="w-12 h-12 object-contain flex-shrink-0" />
                              <div className="flex-grow">
                                <p className="font-semibold text-white">{cert.name}</p>
                                 {cert.verify_url && (
                                  <a href={cert.verify_url} target="_blank" rel="noopener noreferrer">
                                  <Button variant="link" className="p-0 h-auto text-neon-pink hover:text-electric-teal font-mono text-sm">
                                    Verify <ExternalLink className="w-3 h-3 ml-1" />
                                  </Button>
                                </a>
                                 )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AboutPage;
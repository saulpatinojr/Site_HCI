import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Loader2, Mic } from 'lucide-react';
import Title from '@/components/Title';
import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataContext';
import CustomSessionizeWidget from '@/components/CustomSessionizeWidget';

const CertificationCard = ({ cert, onImageClick }) => {
    const isRetired = cert.cert_state === false;
    const expDate = cert.exp_date ? new Date(cert.exp_date) : null;
    const issueDate = cert.issue_date ? new Date(cert.issue_date) : null;
    const isExpired = expDate && expDate < new Date();
    
    const displayDate = expDate || issueDate;
    const formattedDate = displayDate ? displayDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null;
    const dateLabel = expDate ? 'expires' : 'issued';
    
    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: '0 0 30px var(--cyber-purple)' }}
            className="retro-card overflow-hidden flex flex-col justify-between h-full hover:shadow-[0_0_30px_var(--neon-pink)] transition-all duration-300 relative"
        >
            {/* Status Stamp */}
            {isRetired ? (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="transform rotate-12 bg-gray-500/20 border-4 border-gray-500 px-6 py-2 rounded-lg">
                        <span className="text-2xl font-black text-gray-500 tracking-wider" style={{fontFamily: 'Impact, Arial Black, sans-serif'}}>RETIRED</span>
                    </div>
                </div>
            ) : isExpired ? (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="transform rotate-12 bg-red-500/20 border-4 border-red-500 px-6 py-2 rounded-lg">
                        <span className="text-2xl font-black text-red-500 tracking-wider" style={{fontFamily: 'Impact, Arial Black, sans-serif'}}>EXPIRED</span>
                    </div>
                </div>
            ) : null}
            
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start gap-4">
                    <h4 className="text-lg font-mono text-white flex-grow leading-tight">{cert.name}</h4>
                    {cert.image_url && (
                        <div onClick={() => onImageClick(cert.image_url)} className="flex-shrink-0 w-20 h-20 flex items-center justify-center p-2 bg-bg-light rounded-lg border border-cyber-purple hover:bg-cyber-purple/20 transition-colors cursor-pointer">
                            <img src={cert.image_url} alt={`${cert.issuer} logo`} className="max-w-full max-h-full object-contain" />
                        </div>
                    )}
                </div>
            </div>
            
            <div className="px-6 py-4 border-t border-cyber-purple/30 bg-gradient-to-r from-bg-light/30 to-bg-light/60 flex justify-between items-center text-sm text-text-med">
                {cert.verify_url ? (
                     <a href={cert.verify_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-neon-pink hover:text-electric-teal transition-colors">
                        <ExternalLink className="w-4 h-4" />
                    </a>
                ) : <div />}
                
                <div className="flex items-center gap-4 text-right text-xs font-mono">
                    {cert.code && (
                        <span>{cert.code}</span>
                    )}
                    {formattedDate && (
                        <span>{dateLabel} {formattedDate}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const AboutPage = () => {
  const { certifications, loading, error } = useData();
  const [selectedImage, setSelectedImage] = useState(null);

  const certificationsByIssuer = useMemo(() => {
    if (!certifications) return {};
    const sortedCerts = [...certifications].sort((a, b) => (a.display_order || 999) - (b.display_order || 999));

    return sortedCerts.reduce((acc, cert) => {
      const issuer = cert.issuer || 'Other';
      if (!acc[issuer]) {
        acc[issuer] = [];
      }
      acc[issuer].push(cert);
      return acc;
    }, {});
  }, [certifications]);



  const PREFERRED_ISSUER_ORDER = [
    'Microsoft',
    'Amazon Web Services', 
    'Google Cloud',
    'Broadcom',
    'Microsoft Global Partner Solutions (GPS)',
    'Microsoft Management Customer Connection Program',
    'Arc Jumpstart'
  ];
    
  const issuerOrder = Object.keys(certificationsByIssuer).sort((a, b) => {
    const aIndex = PREFERRED_ISSUER_ORDER.indexOf(a);
    const bIndex = PREFERRED_ISSUER_ORDER.indexOf(b);
    
    // If both are in preferred list, sort by preferred order
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    // If only one is in preferred list, it comes first
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    
    // If neither is in preferred list, sort by display_order
    const aMinOrder = Math.min(...certificationsByIssuer[a].map(c => c.display_order || 999));
    const bMinOrder = Math.min(...certificationsByIssuer[b].map(c => c.display_order || 999));
    return aMinOrder - bMinOrder;
  });

  return (
    <>
      <Helmet>
        <title>Hybrid Cloud Insights</title>
        <meta name="description" content="Learn more about the architect behind Hybrid Cloud Insights, their mission, and their expertise in cloud technologies." />
      </Helmet>
      <main className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Title title="About The Architect" subtitle="> System.out.println('Hello, World!');" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-5 gap-8 retro-card p-8"
          >
            <div className="md:col-span-2 flex justify-center items-center">
              <div className="w-56 h-56 rounded-lg bg-bg-light border-2 border-neon-pink p-2 shadow-[0_0_20px_var(--neon-pink)]">
                <img src="https://horizons-cdn.hostinger.com/24f0c0cb-5154-4515-a61d-c58b5e4b263e/b1f7e75441066ec8505f5a5ccd7a071d.jpg" className="w-full h-full rounded-md object-cover" alt="Saul Patino" />
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-3xl hch-title text-center mb-8 flex items-center justify-center">
              <Mic className="w-8 h-8 mr-4 text-electric-teal" />
              Speaker Sessions
            </h2>
            <div className="retro-card p-4">
              <CustomSessionizeWidget speakerId="c6yicoezls" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
              <h2 className="text-3xl hch-title text-center mb-8">Certifications</h2>
               {loading.certifications ? (
                  <div className="flex justify-center items-center py-10">
                      <Loader2 className="w-10 h-10 text-neon-pink animate-spin" />
                  </div>
              ) : error.certifications ? (
                  <div className="text-center p-8 retro-card">
                      <ShieldCheck className="w-12 h-12 mx-auto text-text-med mb-4" />
                      <h3 className="text-xl font-display text-white">Error Loading Certifications</h3>
                      <p className="text-text-light mt-2">{error.certifications}</p>
                  </div>
              ) : issuerOrder.length === 0 ? (
                  <div className="text-center p-8 retro-card">
                      <ShieldCheck className="w-12 h-12 mx-auto text-text-med mb-4" />
                      <h3 className="text-xl font-display text-white">No Certifications Found</h3>
                  </div>
              ) : (
                  <div className="space-y-16">
                    {issuerOrder.map((issuer) => (
                      <div key={issuer}>
                        <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-cyber-purple/30">
                          <Award className="w-8 h-8 text-electric-teal" />
                          <h3 className="text-2xl hch-title text-electric-teal">{issuer}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                          {certificationsByIssuer[issuer].map(cert => <CertificationCard key={cert.id} cert={cert} onImageClick={setSelectedImage} />)}
                        </div>
                      </div>
                    ))}
                  </div>
              )}
          </motion.div>
          
          {/* Image Modal */}
          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <img 
                src={selectedImage} 
                alt="Certification" 
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default AboutPage;
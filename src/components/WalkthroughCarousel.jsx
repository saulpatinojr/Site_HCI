import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';

const WalkthroughCarousel = () => {
    const { walkthroughItems, loading } = useData();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!loading.walkthrough && walkthroughItems.length > 3) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % walkthroughItems.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [walkthroughItems, loading.walkthrough]);

    if (loading.walkthrough) {
        return (
            <div className="h-[500px] flex justify-center items-center">
                <p className="text-electric-teal font-mono">Loading Walkthroughs...</p>
            </div>
        );
    }
    
    if (walkthroughItems.length === 0) {
        return (
             <div className="h-[500px] flex justify-center items-center">
                <p className="text-text-med font-mono">No walkthroughs available at the moment.</p>
            </div>
        );
    }

    const getVisibleItems = () => {
        const items = [];
        for (let i = 0; i < 3; i++) {
            if (walkthroughItems.length > i) {
               items.push(walkthroughItems[(currentIndex + i) % walkthroughItems.length]);
            }
        }
        return items;
    };

    const visibleItems = getVisibleItems();

    const cardVariants = {
        initial: { opacity: 0, y: 50, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
    };

    return (
        <div className="relative h-[650px] flex flex-col items-center justify-center space-y-6 overflow-hidden">
            <AnimatePresence initial={false}>
                {visibleItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        custom={index}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full max-w-4xl"
                        style={{ zIndex: 3 - index, position: 'absolute', top: `${15 + index * 25}%` }}
                    >
                        <Link to={`/walkthrough/${item.slug}`} className="block retro-card-2 p-6 transition-transform duration-300 hover:scale-105">
                            <div className={`grid ${item.image_placeholder ? 'md:grid-cols-3' : 'grid-cols-1'} gap-6 items-center`}>
                                <div className="md:col-span-2 space-y-3">
                                    <h3 className="font-display text-2xl text-white">{item.title}</h3>
                                    <p className="font-mono text-sm text-text-med">{item.description}</p>
                                    <div className="aspect-w-16 aspect-h-9 mt-4">
                                        {item.iframe_src ? (
                                            <iframe
                                                src={item.iframe_src}
                                                title={item.title}
                                                className="w-full h-full rounded-lg border-2 border-neon-pink/20"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ) : <div className="w-full h-full rounded-lg border-2 border-neon-pink/20 bg-bg-dark flex items-center justify-center"><p className="text-text-med">No preview available.</p></div>}
                                    </div>
                                </div>
                                {item.image_placeholder && (
                                    <div className="hidden md:flex justify-center items-center">
                                        <img  class="w-48 h-48 object-contain opacity-70" alt={item.image_placeholder} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                                    </div>
                                )}
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default WalkthroughCarousel;
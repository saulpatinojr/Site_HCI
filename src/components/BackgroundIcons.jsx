import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Cloud, Database, Server, Terminal, Share2, Shield, GitBranch, Zap, Layers } from 'lucide-react';

const icons = [Cpu, Cloud, Database, Server, Terminal, Share2, Shield, GitBranch, Zap, Layers];

const BackgroundIcons = () => {
    const generatedIcons = useMemo(() => {
        const iconData = [];
        const count = 100; // Original count was 100, no change needed per request.
        for (let i = 0; i < count; i++) {
            const IconComponent = icons[Math.floor(Math.random() * icons.length)];
            iconData.push({
                id: i,
                Icon: IconComponent,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                // Size increased by 100% (doubled)
                size: `${Math.random() * 160 + 80}px`,
                delay: Math.random() * 2,
                duration: Math.random() * 2 + 1,
            });
        }
        return iconData;
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
            {generatedIcons.map(({ id, Icon, top, left, size, delay, duration }) => (
                <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], y: [0, -20, -40] }}
                    transition={{
                        delay,
                        duration,
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 5,
                    }}
                    style={{
                        position: 'absolute',
                        top,
                        left,
                        width: size,
                        height: size,
                    }}
                >
                    {/* Opacity increased from 0.20 to 0.30 (50% darker/more opaque) */}
                    <Icon className="w-full h-full text-plum-700 opacity-30" />
                </motion.div>
            ))}
        </div>
    );
};

export default BackgroundIcons;
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Title = React.forwardRef(({ className, as: Comp = 'h1', subtitle, bar = true, ...props }, ref) => {
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className={cn("text-center mb-12 md:mb-16", className)}
        >
            <Comp
                className={cn(
                    'text-4xl md:text-5xl lg:text-6xl hch-title mb-4',
                    {
                        'text-3xl md:text-4xl lg:text-5xl': Comp !== 'h1',
                    }
                )}
                {...props}
            />
            {bar && <div className="accent-line mx-auto mb-6"></div>}
            {subtitle && (
                <p className="text-base md:text-lg font-mono text-text-med max-w-3xl mx-auto">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
});

Title.displayName = 'Title';

export default Title;
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Title from '@/components/Title';
import { motion } from 'framer-motion';
import { Cloud, Server, Database, CheckSquare, Loader2, ExternalLink } from 'lucide-react';
import { useData } from '@/context/DataContext';

const Checklist = ({ title, items, icon: Icon, color }) => (
    <div className="blueprint-card p-6 bg-ink-800">
        <h3 className={`text-2xl font-semibold mb-4 flex items-center ${color}`}>
            <Icon className="w-6 h-6 mr-3" />
            {title}
        </h3>
        <ul className="space-y-3">
            {items.map(item => (
                 <li key={item.id} className="flex items-center text-medium-gray">
                    <CheckSquare className="w-5 h-5 mr-3 text-accent flex-shrink-0" />
                    <span className="flex-grow">{item.item_text}</span>
                     {item.external_url && (
                        <a href={item.external_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-accent hover:underline">
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                </li>
            ))}
             {items.length === 0 && <p className="text-medium-gray">No checklist items yet. Check back soon!</p>}
        </ul>
    </div>
);

const BestPracticesPage = () => {
    const { checklists, loading } = useData();

    const checklistsByProvider = useMemo(() => {
        if (loading.checklists || !checklists) return {};
        return checklists.reduce((acc, checklist) => {
            const provider = checklist.provider || 'Other';
            if (!acc[provider]) {
                acc[provider] = [];
            }
            acc[provider].push(checklist);
            return acc;
        }, {});
    }, [checklists, loading.checklists]);

    const providers = [
        { name: 'Azure', icon: Cloud, color: 'text-blue-500' },
        { name: 'AWS', icon: Server, color: 'text-orange-500' },
        { name: 'GCP', icon: Database, color: 'text-green-500' },
    ];

    return (
        <>
            <Helmet>
                <title>Best Practices - Hybrid Cloud Insights</title>
                <meta name="description" content="Explore best practice checklists for Azure, AWS, and GCP cloud platforms." />
            </Helmet>
            <main className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <Title
                        title="Best Practices"
                        subtitle="Actionable checklists to ensure your cloud environments are secure, resilient, and optimized."
                    />

                    {loading.checklists ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-12 h-12 text-brand animate-spin" />
                        </div>
                    ) : (
                         <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            {providers.map(provider => (
                                <motion.div 
                                    key={provider.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * providers.indexOf(provider) }}
                                >
                                    {(checklistsByProvider[provider.name] || []).length > 0 ? (
                                         (checklistsByProvider[provider.name] || []).map(checklist => (
                                            <Checklist
                                                key={checklist.id}
                                                title={checklist.title}
                                                items={checklist.checklist_items || []}
                                                icon={provider.icon}
                                                color={provider.color}
                                            />
                                         ))
                                    ) : (
                                        <div className="blueprint-card p-6 bg-ink-800">
                                            <h3 className={`text-2xl font-semibold mb-4 flex items-center ${provider.color}`}>
                                                <provider.icon className="w-6 h-6 mr-3" />
                                                {provider.name}
                                            </h3>
                                             <p className="text-medium-gray">No checklists available yet.</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default BestPracticesPage;
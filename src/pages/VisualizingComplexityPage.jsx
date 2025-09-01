import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Play, Film, Loader2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { useData } from '@/context/DataContext';

const VisualizingComplexityPage = () => {
    const { videos, loading } = useData();

    const getYouTubeThumbnail = (videoId) => {
        if (!videoId) return 'https://horizons-cdn.hostinger.com/24f0c0cb-5154-4515-a61d-c58b5e4b263e/ad39add6f0da82870909f681dc2aab16.png';
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };

  return (
    <>
      <Helmet>
        <title>Visualizing Complexity - Hybrid Cloud Insights</title>
        <meta name="description" content="Watch technical concepts brought to life through detailed visual explanations and demonstrations on cloud architecture, DevOps, data, and security." />
      </Helmet>
      <main className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <PageHeader
            title="Visualizing Complexity"
            subtitle="> Technical concepts brought to life through detailed visual explanations and demonstrations."
          />
          {loading.videos ? (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-12 h-12 text-neon-pink animate-spin" />
            </div>
           ) : videos.length === 0 ? (
            <div className="text-center p-10 retro-card">
                <Film className="w-16 h-16 mx-auto text-electric-teal mb-4" />
                <h3 className="text-3xl font-display text-electric-teal">No Visual Data Found</h3>
                <p className="text-text-med mt-2 font-mono">> Video content is managed via Supabase. Add videos to the `youtube_videos` table.</p>
            </div>
           ) : (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="retro-card flex flex-col cursor-pointer group"
                  onClick={() => video.video_id && window.open(`https://www.youtube.com/watch?v=${video.video_id}`, '_blank')}
                >
                  <div className="relative w-full h-48 bg-bg-light overflow-hidden">
                    <img src={getYouTubeThumbnail(video.video_id)} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" alt={video.title || "Video thumbnail"} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center">
                      <Play className="w-16 h-16 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-center mb-4">
                          <span className="font-mono text-sm bg-cyber-purple/50 text-electric-teal px-2 py-1 rounded-md">
                           {video.channel_title || 'YouTube'}
                          </span>
                          <span className="font-mono text-sm text-text-med">{video.published_at ? new Date(video.published_at).toLocaleDateString() : '...'}</span>
                      </div>
                      <h2 className="text-xl font-display text-white mb-3 leading-tight flex-grow">
                          {video.title || 'Loading...'}
                      </h2>
                      <p className="font-mono text-sm text-text-med leading-relaxed">
                          {video.description ? `${video.description.substring(0, 100)}...` : 'No description available.'}
                      </p>
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

export default VisualizingComplexityPage;
import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { BookOpen, Key, Users, Info, CheckSquare, Youtube } from 'lucide-react';

const ApiCodeBlock = ({ children }) => (
  <div className="bg-bg-dark border border-cyber-purple/50 text-electric-teal p-4 rounded-md my-4 font-mono text-sm overflow-x-auto">
    <pre><code>{children}</code></pre>
  </div>
);

const ManagementGuidePage = () => {
  return (
    <>
      <Helmet>
        <title>Content Management Guide - Hybrid Cloud Insights</title>
        <meta name="description" content="Administrator guide for managing content on the Hybrid Cloud Insights website." />
      </Helmet>
      <main className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <PageHeader title="Admin Panel" subtitle="> Your central hub for updating website content via Supabase." />

          <div className="space-y-16">
            
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl hch-title mb-6 flex items-center"><Users className="w-8 h-8 mr-4 text-electric-teal" />User Management</h2>
              <div className="retro-card p-6">
                <p className="text-lg text-text-med mb-4 font-mono">&gt; User management is handled directly through your Supabase dashboard for maximum security.</p>
                <h3 className="text-xl font-display text-white mt-6 mb-3">Changing Your Password:</h3>
                <ol className="list-decimal list-inside space-y-2 text-text-med font-mono">
                  <li>Navigate to your <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-neon-pink underline">Supabase Dashboard</a> and select your project.</li>
                  <li>In the left sidebar, go to <span className="text-white">Authentication &rarr; Users</span>.</li>
                  <li>Find your user (`administrator@hybridcloudworks.com`) and click the three dots (`...`) on the right.</li>
                  <li>Select <span className="text-white">"Send password recovery"</span>. You will receive an email with instructions to set a new password.</li>
                </ol>

                <h3 className="text-xl font-display text-white mt-6 mb-3">Adding New Admins/Users:</h3>
                <ol className="list-decimal list-inside space-y-2 text-text-med font-mono">
                   <li>In the <span className="text-white">Authentication &rarr; Users</span> section of your Supabase dashboard, click the <span className="text-white">"Invite user"</span> button.</li>
                  <li>Enter the new user's email address and click <span className="text-white">"Invite"</span>.</li>
                  <li>The new user will receive an email invitation to create their account and set a password. All new users can log in.</li>
                </ol>
                 <div className="mt-6 p-4 bg-neon-pink/10 border-l-4 border-neon-pink text-neon-pink/80 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Info className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-mono">
                          <span className="font-bold">Important Note:</span> For security, this application does not have a public sign-up page. All users must be invited via the Supabase dashboard.
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
            </motion.section>
            
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2 className="text-3xl hch-title mb-6 flex items-center"><BookOpen className="w-8 h-8 mr-4 text-electric-teal" />Managing Blog Posts</h2>
              <div className="retro-card p-6">
                <p className="text-text-med mb-4 font-mono">&gt; Blog posts are stored in the <span className="bg-cyber-purple/50 px-1 rounded">posts</span> table. Add them via the Supabase dashboard or API.</p>
                <p className="text-text-med font-mono">&gt; Here is an example of a curl command to create a new blog post. You'll need your <span className="text-white">Project URL</span> and <span className="text-white">Service Role Key</span> from your Supabase dashboard (Settings &rarr; API).</p>
                <ApiCodeBlock>
{`curl -X POST 'YOUR_SUPABASE_URL/rest/v1/posts' \\
-H "apikey: YOUR_SUPABASE_SERVICE_ROLE_KEY" \\
-H "Authorization: Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY" \\
-H "Content-Type: application/json" \\
-d '{
  "title": "My New Awesome Post",
  "description": "A summary of the post.",
  "image_url": "https://example.com/image.jpg",
  "category": "Cloud Security",
  "read_time": "10 min read",
  "author": "Saul Patino",
  "published_at": "2025-08-15",
  "tags": ["aws", "security", "best-practices"]
}'`}
                </ApiCodeBlock>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <h2 className="text-3xl hch-title mb-6 flex items-center"><Youtube className="w-8 h-8 mr-4 text-electric-teal" />Managing YouTube Videos</h2>
                <div className="retro-card p-6">
                    <p className="text-text-med mb-4 font-mono">&gt; Videos are stored in the <span className="bg-cyber-purple/50 px-1 rounded">youtube_videos</span> table.</p>
                     <ApiCodeBlock>
{`curl -X POST 'YOUR_SUPABASE_URL/rest/v1/youtube_videos' \\
-H "apikey: YOUR_SUPABASE_SERVICE_ROLE_KEY" \\
-H "Authorization: Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY" \\
-H "Content-Type: application/json" \\
-d '{
  "video_id": "YourYouTubeVideoID",
  "title": "Understanding Kubernetes",
  "description": "A deep dive into k8s.",
  "published_at": "2025-08-14T10:00:00Z",
  "channel_title": "Hybrid Cloud Insights",
  "tags": ["kubernetes", "devops"]
}'`}
                    </ApiCodeBlock>
                </div>
            </motion.section>
            
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                <h2 className="text-3xl hch-title mb-6 flex items-center"><Key className="w-8 h-8 mr-4 text-electric-teal" />Managing Certifications</h2>
                <div className="retro-card p-6">
                    <p className="text-text-med mb-4 font-mono">&gt; Certifications are in the <span className="bg-cyber-purple/50 px-1 rounded">certifications</span> table.</p>
                     <ApiCodeBlock>
{`curl -X POST 'YOUR_SUPABASE_URL/rest/v1/certifications' \\
-H "apikey: YOUR_SUPABASE_SERVICE_ROLE_KEY" \\
-H "Authorization: Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY" \\
-H "Content-Type: application/json" \\
-d '{
  "name": "Certified Kubernetes Administrator",
  "issuer": "The Linux Foundation",
  "image_url": "https://example.com/cka_badge.png",
  "verify_url": "https://verify.credential.net/...",
  "display_order": 10,
  "tags": ["cka", "kubernetes"]
}'`}
                    </ApiCodeBlock>
                </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <h2 className="text-3xl hch-title mb-6 flex items-center"><CheckSquare className="w-8 h-8 mr-4 text-electric-teal" />Managing Best Practices Checklists</h2>
                <div className="retro-card p-6">
                    <p className="text-text-med mb-4 font-mono">&gt; Checklists are managed across two tables: <span className="bg-cyber-purple/50 px-1 rounded">best_practices_checklists</span> and <span className="bg-cyber-purple/50 px-1 rounded">checklist_items</span>.</p>
                    <h3 className="text-xl font-display text-white mt-6 mb-3">1. Create a Checklist:</h3>
                     <ApiCodeBlock>
{`# First, get the ID of the new checklist.
curl -X POST 'YOUR_SUPABASE_URL/rest/v1/best_practices_checklists' \\
-H "apikey: YOUR_SUPABASE_SERVICE_ROLE_KEY" \\
-H "Content-Type: application/json" \\
-H "Prefer: return=representation" \\
-d '{
  "provider": "AWS",
  "title": "S3 Bucket Security Checklist",
  "display_order": 1
}'`}
                    </ApiCodeBlock>
                    <h3 className="text-xl font-display text-white mt-6 mb-3">2. Add Items to that Checklist:</h3>
                    <p className="text-text-med mb-4 font-mono">&gt; Use the `id` from step 1 as the `checklist_id`.</p>
                     <ApiCodeBlock>
{`curl -X POST 'YOUR_SUPABASE_URL/rest/v1/checklist_items' \\
-H "apikey: YOUR_SUPABASE_SERVICE_ROLE_KEY" \\
-H "Authorization: Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY" \\
-H "Content-Type: application/json" \\
-d '{
  "checklist_id": "THE_ID_FROM_STEP_1",
  "item_text": "Enable Block Public Access",
  "external_url": "https://docs.aws.amazon.com/...",
  "display_order": 1
}'`}
                    </ApiCodeBlock>
                </div>
            </motion.section>

          </div>
        </div>
      </main>
    </>
  );
};

export default ManagementGuidePage;
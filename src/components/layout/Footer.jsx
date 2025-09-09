import React from 'react';
import { ChevronUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 px-4 border-t border-cyber-purple/50 bg-bg-dark mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <span className="hch-title text-2xl">Hybrid Cloud Insights</span>
            <p className="text-text-med text-sm mt-2 font-mono">
              &copy; 2025 HCI // All Rights Reserved
            </p>
            <div className="mt-3">
              <a href="//www.dmca.com/Protection/Status.aspx?ID=ac0893f6-1f9d-496b-b76d-caa23ab61130" title="DMCA.com Protection Status" className="dmca-badge">
                <img src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=ac0893f6-1f9d-496b-b76d-caa23ab61130" alt="DMCA.com Protection Status" />
              </a>
              <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
             <h4 className="font-display text-lg text-electric-teal tracking-widest">NAVIGATE</h4>
             <Link to="/foundational-posts" className="font-mono text-text-med hover:text-neon-pink">Posts</Link>
             <Link to="/visualizing-complexity" className="font-mono text-text-med hover:text-neon-pink">Videos</Link>
             <Link to="/audio-architecture" className="font-mono text-text-med hover:text-neon-pink">Podcast</Link>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-4">
             <Button asChild variant="ghost" size="sm" className="font-mono text-text-med hover:text-electric-teal hover:bg-cyber-purple/30">
                <Link to="/management-guide">
                    <BookOpen className="mr-2 w-4 h-4" /> [Admin_Panel]
                </Link>
            </Button>
            <Button
              onClick={scrollToTop}
              variant="ghost"
              size="sm"
              className="font-mono text-text-med hover:text-electric-teal hover:bg-cyber-purple/30"
            >
              <ChevronUp className="w-4 h-4 mr-1" />
              [Go_To_Top]
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
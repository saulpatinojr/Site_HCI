import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, ExternalLink, Play, Globe, Film } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';

const CustomSessionizeWidget = ({ speakerId = 'c6yicoezls' }) => {
  const [sessions, setSessions] = useState([]);
  const [customEventData, setCustomEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Sessionize data
        const sessionizeResponse = await fetch(`https://sessionize.com/api/speaker/json/${speakerId}`);
        if (!sessionizeResponse.ok) {
          throw new Error(`HTTP error! status: ${sessionizeResponse.status}`);
        }
        const sessionizeData = await sessionizeResponse.json();
        const allEvents = sessionizeData.events || sessionizeData.sessions || sessionizeData || [];
        
        // Fetch custom event data from Supabase
        const { data: customEvents, error: supabaseError } = await supabase
          .from('speaker_events')
          .select('*')
          .order('date', { ascending: false });
        
        if (supabaseError) {
          console.error('Supabase error:', supabaseError);
        }
        
        setCustomEventData(customEvents || []);
        
        // Merge Sessionize events with manual entries
        const sessionizeEventNames = allEvents.map(event => event.name || event.title);
        const manualEntries = (customEvents || []).filter(custom => !sessionizeEventNames.includes(custom.name));
        
        // Mark manual entries for identification
        const markedManualEntries = manualEntries.map(entry => ({ ...entry, isManualEntry: true }));
        
        // Combine and sort by date
        const combinedEvents = [...allEvents, ...markedManualEntries].sort((a, b) => {
          const dateA = new Date(a.date || a.startsAt || a.startDate || '1970-01-01');
          const dateB = new Date(b.date || b.startsAt || b.startDate || '1970-01-01');
          return dateA - dateB; // Oldest first (top to bottom)
        });
        
        setSessions(combinedEvents);
      } catch (err) {
        setError('Failed to load sessions');
        console.error('API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [speakerId]);

  if (loading) return <div className="animate-pulse bg-cyber-purple/30 h-32 rounded-lg"></div>;
  if (error) return <div className="text-neon-pink p-4">{error}</div>;

  // Helper function to get custom data for an event
  const getCustomEventData = (eventName) => {
    return customEventData.find(custom => custom.name === eventName) || {};
  };
  
  // Helper function to create Google Maps link
  const getLocationLink = (location) => {
    if (!location) return null;
    if (location.toLowerCase().includes('virtual')) return null;
    return `https://www.google.com/maps/search/${encodeURIComponent(location)}`;
  };

  return (
    <div className="space-y-8">
      {sessions.map((session, index) => {
        const customData = getCustomEventData(session.name);
        const locationLink = getLocationLink(session.location || session.venue);
        const sessionKey = session.id || `${session.name || 'session'}-${session.date || index}`;
        
        return (
          <div key={sessionKey} className="retro-card p-6 hover:shadow-[0_0_30px_var(--cyber-purple)] transition-all duration-300">
            <div className="flex justify-between items-start gap-6">
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-mono text-electric-teal">
                    {session.title || session.name || session.eventName || 'Event Title'}
                  </h3>
                  <div className="flex gap-2">
                    {customData.event_url && (
                      <a href={customData.event_url} target="_blank" rel="noopener noreferrer" className="text-neon-pink hover:text-electric-teal">
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                    {customData.presentation_url && (
                      <a href={customData.presentation_url} target="_blank" rel="noopener noreferrer" className="text-neon-pink hover:text-electric-teal">
                        <Film className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-text-light mb-4 leading-relaxed">
                  {customData.description || session.description || session.eventDescription || 'Event description not available'}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-text-med mb-3">
                  {(session.date || session.startsAt || session.startDate) && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(session.date || session.startsAt || session.startDate).toLocaleDateString()}
                    </div>
                  )}
                  {(() => {
                    // For manual entries, use custom location; for Sessionize events, use their location
                    const displayLocation = session.isManualEntry ? customData.location : (session.room || session.location || session.venue);
                    
                    return displayLocation ? (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {locationLink ? (
                          <a href={locationLink} target="_blank" rel="noopener noreferrer" className="text-neon-pink hover:text-electric-teal underline">
                            {displayLocation}
                          </a>
                        ) : (
                          <span>{displayLocation}</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Virtual</span>
                      </div>
                    );
                  })()}
                  {session.categoryItems && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {session.categoryItems.map(cat => cat.name).join(', ')}
                    </div>
                  )}
                </div>
                
                {/* View Session Link */}
                {session.sessionUrl && (
                  <a href={session.sessionUrl} target="_blank" rel="noopener noreferrer"
                     className="text-xs text-neon-pink hover:text-electric-teal underline">
                    View Session
                  </a>
                )}
              </div>
              
              {/* Event Image */}
              <div className="flex-shrink-0 w-48 h-32 bg-bg-light rounded-lg border-2 border-dashed border-cyber-purple flex items-center justify-center">
                {customData.event_image_url ? (
                  <img 
                    src={customData.event_image_url} 
                    alt={session.name} 
                    className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity" 
                    onClick={() => setSelectedImage(customData.event_image_url)}
                  />
                ) : (
                  <span className="text-text-med text-xs text-center">Event Image</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Event" 
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default CustomSessionizeWidget;
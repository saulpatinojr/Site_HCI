import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [checklists, setChecklists] = useState([]);
    const [walkthroughItems, setWalkthroughItems] = useState([]);

    const [loading, setLoading] = useState({
        videos: true,
        blog: true,
        certifications: true,
        checklists: true,
        walkthrough: true
    });
    const [error, setError] = useState({
        videos: null,
        blog: null,
        certifications: null,
        checklists: null,
        walkthrough: null
    });

    const fetchData = useCallback(async (table, setData, loadingKey, errorKey, orderOptions = { column: 'created_at', ascending: false }) => {
        try {
            setLoading(prev => ({ ...prev, [loadingKey]: true }));
            setError(prev => ({ ...prev, [errorKey]: null }));
            
            // Check if Supabase is properly configured
            if (!supabase || !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
                console.warn(`Supabase not configured, using empty data for ${loadingKey}`);
                setData([]);
                return;
            }
            
            const { data, error } = await supabase.from(table).select('*').order(orderOptions.column, { ascending: orderOptions.ascending });
            if (error) throw error;
            setData(data || []);
        } catch (err) {
            setError(prev => ({ ...prev, [errorKey]: err.message }));
            console.error(`Error fetching ${table}:`, err);
            setData([]);
        } finally {
            setLoading(prev => ({ ...prev, [loadingKey]: false }));
        }
    }, []);

    useEffect(() => {
        fetchData('videos', setVideos, 'videos', 'videos');
        fetchData('blog_posts', setBlogPosts, 'blog', 'blog');
        fetchData('certifications', setCertifications, 'certifications', 'certifications', { column: 'display_order', ascending: true });
        fetchData('checklists', setChecklists, 'checklists', 'checklists');
        fetchData('walkthrough_items', setWalkthroughItems, 'walkthrough', 'walkthrough', { column: 'display_order', ascending: true });
    }, [fetchData]);

    const value = {
        videos,
        blogPosts,
        certifications,
        checklists,
        walkthroughItems,
        loading,
        error,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
import React, { createContext, useContext, useState, useCallback } from 'react';
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
        videos: false,
        blog: false,
        certifications: false,
        checklists: false,
        walkthrough: false
    });
    const [error, setError] = useState({
        videos: null,
        blog: null,
        certifications: null,
        checklists: null,
        walkthrough: null
    });

    const fetchData = useCallback(async (table, loadingKey, errorKey, options = {}) => {
        const { orderOptions = { column: 'created_at', ascending: false }, signal } = options;

        const stateMap = {
            'videos': setVideos,
            'blog_posts': setBlogPosts,
            'certifications': setCertifications,
            'checklists': setChecklists,
            'walkthrough_items': setWalkthroughItems,
        };
        const setData = stateMap[table];

        if (!setData) {
            console.error(`Invalid table for fetchData: ${table}`);
            return;
        }

        setLoading(prev => ({ ...prev, [loadingKey]: true }));
        setError(prev => ({ ...prev, [errorKey]: null }));

        try {
            if (!supabase || !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
                setData([]);
                return;
            }

            const { data, error: fetchError } = await supabase
                .from(table)
                .select('*')
                .order(orderOptions.column, { ascending: orderOptions.ascending })
                .abortSignal(signal);

            if (signal?.aborted) return;

            if (fetchError) throw fetchError;
            setData(data || []);
        } catch (err) {
            if (err.name !== 'AbortError') {
                const errorMessage = err.message || 'An unknown error occurred.';
                setError(prev => ({ ...prev, [errorKey]: errorMessage }));
                setData([]);
            }
        } finally {
            if (!signal?.aborted) {
                setLoading(prev => ({ ...prev, [loadingKey]: false }));
            }
        }
    }, []);

    const value = {
        videos,
        blogPosts,
        certifications,
        checklists,
        walkthroughItems,
        loading,
        error,
        fetchData,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
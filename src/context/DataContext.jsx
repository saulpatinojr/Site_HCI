import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const DataContext = createContext(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === null) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    videos: [],
    blogPosts: [],
    embeddedData: [],
    certifications: [],
    checklists: [],
    frameworks: [],
    pillarDetails: [],
  });

  const [loading, setLoading] = useState({
    videos: true,
    blog: true,
    embeddedData: true,
    certifications: true,
    checklists: true,
    frameworks: true,
    pillarDetails: true,
  });

  const [error, setError] = useState({
    videos: null,
    blog: null,
    embeddedData: null,
    certifications: null,
    checklists: null,
    frameworks: null,
    pillarDetails: null,
  });

  const fetchData = useCallback(async (table, dataKey, options = {}) => {
    setLoading(prev => ({ ...prev, [dataKey]: true }));
    setError(prev => ({ ...prev, [dataKey]: null }));
    try {
      // Check if Supabase is properly configured
      if (!supabase || !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
        console.warn(`Supabase not configured, using empty data for ${dataKey}`);
        setData(prev => ({ ...prev, [dataKey]: [] }));
        return;
      }
      
      let query = supabase.from(table).select(options.select || '*');
      if (options.order) {
        query = query.order(options.order.column, { ascending: options.order.ascending });
      }
      const { data: result, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setData(prev => ({ ...prev, [dataKey]: result || [] }));
    } catch (e) {
      console.error(`Error fetching ${dataKey}:`, e.message || 'Unknown error');
      setError(prev => ({ ...prev, [dataKey]: e.message }));
      setData(prev => ({ ...prev, [dataKey]: [] }));
    } finally {
      setLoading(prev => ({ ...prev, [dataKey]: false }));
    }
  }, []);

  useEffect(() => {
    // Fetch certifications data on mount
    fetchData('certifications', 'certifications', { 
      order: { column: 'display_order', ascending: true } 
    });
  }, [fetchData]);
  
  const value = {
    ...data,
    loading,
    error,
    fetchData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
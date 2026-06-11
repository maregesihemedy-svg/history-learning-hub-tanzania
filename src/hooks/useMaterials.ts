import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Material, MaterialFilter, PaginatedResponse } from '@/types';

export const useMaterials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const fetchMaterials = useCallback(
    async (filters?: MaterialFilter) => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('materials')
          .select('*', { count: 'exact' })
          .eq('status', 'published')
          .is('deleted_at', null)
          .order('created_at', { ascending: false });

        // Apply filters
        if (filters?.form_level_id) {
          query = query.eq('form_level_id', filters.form_level_id);
        }
        if (filters?.material_type_id) {
          query = query.eq('material_type_id', filters.material_type_id);
        }
        if (filters?.history_topic_id) {
          query = query.eq('history_topic_id', filters.history_topic_id);
        }
        if (filters?.search) {
          query = query.or(
            `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
          );
        }

        // Apply sorting
        if (filters?.sort_by === 'popular') {
          query = query.order('view_count', { ascending: false });
        } else if (filters?.sort_by === 'downloads') {
          query = query.order('download_count', { ascending: false });
        }

        // Apply pagination
        const currentPage = filters?.page || page;
        const currentPerPage = filters?.per_page || perPage;
        const offset = (currentPage - 1) * currentPerPage;

        const { data, error: fetchError, count } = await query.range(
          offset,
          offset + currentPerPage - 1
        );

        if (fetchError) throw fetchError;

        setMaterials(data || []);
        setTotal(count || 0);
        setPage(currentPage);
        setPerPage(currentPerPage);

        return { data: data || [], total: count || 0, error: null };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch materials';
        setError(message);
        return { data: [], total: 0, error: message };
      } finally {
        setLoading(false);
      }
    },
    [page, perPage]
  );

  const getMaterial = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('materials')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Increment view count
      await supabase
        .from('activity_logs')
        .insert([
          {
            action: 'material_viewed',
            resource_type: 'material',
            resource_id: id,
            resource_name: data.title,
          },
        ]);

      return { data, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch material';
      return { data: null, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const searchMaterials = useCallback(async (query: string) => {
    try {
      setLoading(true);
      const { data, error: searchError } = await supabase
        .from('materials')
        .select('*')
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(20);

      if (searchError) throw searchError;
      return { data: data || [], error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Search failed';
      return { data: [], error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    materials,
    total,
    loading,
    error,
    page,
    perPage,
    fetchMaterials,
    getMaterial,
    searchMaterials,
  };
};

import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Favorite } from '@/types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId);

      if (fetchError) throw fetchError;
      setFavorites(data || []);
      return { data: data || [], error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch favorites';
      setError(message);
      return { data: [], error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = useCallback(async (userId: string, materialId: string) => {
    try {
      setLoading(true);
      const { error: insertError } = await supabase.from('favorites').insert([
        {
          user_id: userId,
          material_id: materialId,
        },
      ]);

      if (insertError) throw insertError;
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add favorite';
      setError(message);
      return { error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFavorite = useCallback(async (userId: string, materialId: string) => {
    try {
      setLoading(true);
      const { error: deleteError } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('material_id', materialId);

      if (deleteError) throw deleteError;
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove favorite';
      setError(message);
      return { error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const isFavorite = useCallback(
    (materialId: string) => {
      return favorites.some((fav) => fav.material_id === materialId);
    },
    [favorites]
  );

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};

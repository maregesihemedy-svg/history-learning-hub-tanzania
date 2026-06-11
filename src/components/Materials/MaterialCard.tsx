'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Material } from '@/types';
import { Download, Heart, Eye } from 'lucide-react';
import { formatFileSize, formatDate } from '@/utils/helpers';

interface MaterialCardProps {
  material: Material;
  onFavoriteClick?: (materialId: string) => void;
  isFavorite?: boolean;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  onFavoriteClick,
  isFavorite = false,
}) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative h-40 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 overflow-hidden">
        {material.thumbnail_url ? (
          <Image
            src={material.thumbnail_url}
            alt={material.title}
            fill
            className="object-cover group-hover:scale-110 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl font-bold text-primary-300 dark:text-primary-700 opacity-50">
              {material.file_type.toUpperCase()}
            </div>
          </div>
        )}
        <button
          onClick={() => onFavoriteClick?.(material.id)}
          className="absolute top-3 right-3 p-2 bg-white dark:bg-neutral-700 rounded-full shadow-md hover:bg-accent-500 hover:text-white transition"
        >
          <Heart
            className="w-5 h-5"
            fill={isFavorite ? 'currentColor' : 'none'}
            color={isFavorite ? '#ffc000' : 'currentColor'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/materials/${material.id}`}>
          <h3 className="font-semibold text-neutral-900 dark:text-white line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition">
            {material.title}
          </h3>
        </Link>

        {material.description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
            {material.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{material.view_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>{material.download_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{material.favorites_count}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            {formatFileSize(material.file_size_bytes)}
          </div>
          <Link
            href={`/materials/${material.id}`}
            className="px-3 py-1 bg-primary-500 text-white rounded text-xs hover:bg-primary-600 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;

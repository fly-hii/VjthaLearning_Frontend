/* eslint-disable @typescript-eslint/no-explicit-any */

import { articlesApi } from '@/Services/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

// Fetch all articles
export function useGroupedArticlesByCategory() {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: () => articlesApi.getAll(),
  });

  // Group articles by category name
  const groupedArticles = useMemo(() => {
    return articles.reduce((acc: Record<string, any[]>, article: any) => {
      const categoryName = article.category?.name || 'Uncategorized';
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(article);
      return acc;
    }, {});
  }, [articles]);

  return { groupedArticles, isLoading };
}

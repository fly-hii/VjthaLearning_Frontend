/* eslint-disable @typescript-eslint/no-explicit-any */
import { articlesApi } from '@/Services/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useGroupedArticlesByCategory(
  filterCategories?: string[] // Optional
) {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: () => articlesApi.getAll(),
  });

  const groupedArticles = useMemo(() => {
    return articles.reduce((acc: Record<string, any[]>, article: any) => {
      const categoryName = article.category?.name || 'Uncategorized';

      if (
        !filterCategories || // No filter = include all
        filterCategories.includes(categoryName)
      ) {
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(article);
      }

      return acc;
    }, {});
  }, [articles, filterCategories]);

  return { groupedArticles, isLoading };
}

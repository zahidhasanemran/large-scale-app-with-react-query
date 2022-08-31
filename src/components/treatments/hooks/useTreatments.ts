import { useQuery } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  // TODO: get data from server via useQuery
  const fallback = [];
  const toast = useCustomToast();
  const { data = fallback } = useQuery(queryKeys.treatments, getTreatments, {
    staleTime: 1000 * 10,
    retry: false,
    onError: (error) => {
      const title =
        error instanceof Error
          ? error.toString().replace(/^Error:\s*/, '')
          : 'error connecting to the server';
      toast({ title, status: 'error' });
    },
  });
  return data;
}

import useSWR from 'swr';
import professionnelService from '@/services/professionnel.service';

function useFetchProfileNoPaginate() {
  const { data, error, isLoading } = useSWR(
    'fetch_professionnel_profile_no_paginate',
    async () => await professionnelService.fetchProfessionnelleProfileNoPaginate()
  );
  return { data, error, isLoading };
}

export default useFetchProfileNoPaginate;

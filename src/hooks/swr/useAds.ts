import useSWR from "swr";
import {IAdsContent} from "@/db/models/Advertisement";
import {fetcher} from "@/consts";


const getAds = async (url: string): Promise<IAdsContent> => {
  const { data: ads } = await fetcher(url);
  
  if (!ads.data?.length) {
    return { data: [], count: 0 };
  }
  
  return ads;
}

const interval = 60 * 1000;

export const useAds = (page: number) => {
  const { data: ads , isLoading, isValidating, error } = useSWR<IAdsContent>(`/api/advertisement?page=${page}`, getAds, {
    refreshInterval: interval,
    refreshWhenHidden: true,
    refreshWhenOffline: true
  });
  
  return { ads, isLoading, isValidating, error };
}
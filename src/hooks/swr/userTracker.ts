import useSWR from "swr";
import {IUserTracker} from "@/types/tracker";
import {fetcher} from "@/consts";
import useSWRMutation from "swr/mutation";

const url = '/api/tracker';

const createTracker = async (url: string, { arg }: { arg: { url: string } }) => {
  return fetcher(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  });
}

const updateTracker = async (url: string, { arg }: { arg: { id: string, status: boolean } }) => {
  return await fetcher(url, {
    method: 'PATCH',
    body: JSON.stringify(arg)
  });
}

const deleteTracker = async (url: string, { arg }: { arg: { id: string, trackerId: string } }) => {
  return await fetcher(url, {
    method: 'DELETE',
    body: JSON.stringify(arg)
  });
}

export const useTracker = () => {
  const { data: trackers = [], error, isLoading } = useSWR<IUserTracker[]>(url, fetcher);
  return {
    trackers,
    error,
    isLoading
  }
}


export const useMutationCreateTracker = () => {
  const { trigger: mutationCreate, error: createError, isMutating: isMutatingCreate } = useSWRMutation(url, createTracker);
  
  return {
    mutationCreate,
    createError,
    isMutatingCreate
  }
}

export const useMutationUpdateTracker = () => {
  const { trigger: mutationUpdate, error: updateError, isMutating: isMutatingUpdate } = useSWRMutation(url, updateTracker);
  
  return {
    mutationUpdate,
    updateError,
    isMutatingUpdate
  }
}

export const useMutationDeleteTracker = () => {
  const { trigger: mutationDelete, error: deleteError, isMutating: isMutatingDelete } = useSWRMutation(url, deleteTracker);
  
  return {
    mutationDelete,
    deleteError,
    isMutatingDelete
  }
}
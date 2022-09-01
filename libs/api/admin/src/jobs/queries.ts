import { jobsApi } from './api';
import { Job, JobData } from './types';
import { useApiClient } from '@help-line/core/http';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useJobsQuery = () => {
  const api = useApiClient(jobsApi);
  return useQuery(['jobs', 'list'], api.get);
};

export const useJobTasksQuery = () => {
  const api = useApiClient(jobsApi);
  return useQuery(['jobs', 'tasks'], api.getTasks);
};

export const useJobsStateQuery = (jobIds: Array<Job['id']>) => {
  const api = useApiClient(jobsApi);
  return useQuery(['jobs', 'state', jobIds], () => api.getState(jobIds));
};

export const useCreateJobMutation = (task: string) => {
  const client = useQueryClient();
  const api = useApiClient(jobsApi);

  return useMutation(
    ['jobs', 'create', task],
    (data: JobData) => api.create(task, data),
    {
      onSuccess: async (data, variables, context) => {
        await client.invalidateQueries(['jobs', 'state']);
        await client.invalidateQueries(['jobs', 'list']);
      },
    }
  );
};

export const useUpdateJobMutation = (jobId: Job['id']) => {
  const client = useQueryClient();
  const api = useApiClient(jobsApi);

  return useMutation(
    ['jobs', 'update', jobId],
    (data: JobData) => api.update(jobId, data),
    {
      onSuccess: async (data, variables, context) => {
        await client.invalidateQueries(['jobs', 'state']);
        await client.invalidateQueries(['jobs', 'list']);
      },
    }
  );
};

export const useDeleteJobMutation = (jobId: Job['id']) => {
  const client = useQueryClient();
  const api = useApiClient(jobsApi);

  return useMutation(['jobs', 'delete', jobId], () => api.delete(jobId), {
    onSuccess: (data, variables, context) => {
      client.setQueryData(['jobs', 'list'], (list?: Job[]) => {
        return (list || []).filter((x) => x.id !== jobId);
      });
    },
  });
};

export const useToggleJobMutation = (jobId: Job['id']) => {
  const client = useQueryClient();
  const api = useApiClient(jobsApi);

  return useMutation(
    ['jobs', 'toggle', jobId],
    (enable: boolean) => api.toggle(jobId, enable),
    {
      onSuccess: async (data, variables, context) => {
        await client.refetchQueries(['jobs', 'state']);
        client.setQueryData(['jobs', 'list'], (list?: Job[]) => {
          (list || []).forEach((x) => {
            if (x.id === jobId) {
              x.enabled = variables;
            }
          });
          return list || [];
        });
      },
    }
  );
};

export const useToggleJobsMutation = (jobsIds: Job['id'][]) => {
  const client = useQueryClient();
  const api = useApiClient(jobsApi);

  return useMutation(
    ['jobs', 'toggle', jobsIds],
    (enable: boolean) =>
      Promise.all(jobsIds.map((jobId) => api.toggle(jobId, enable))),
    {
      onSuccess: async (data, variables, context) => {
        await client.refetchQueries(['jobs', 'state']);
        client.setQueryData(['jobs', 'list'], (list?: Job[]) => {
          (list || []).forEach((x) => {
            if (jobsIds.includes(x.id)) {
              x.enabled = variables;
            }
          });
          return list || [];
        });
      },
    }
  );
};

export const useFireJobMutation = (jobId: Job['id']) => {
  const api = useApiClient(jobsApi);

  return useMutation(['jobs', 'delete', jobId], () => api.fire(jobId), {});
};

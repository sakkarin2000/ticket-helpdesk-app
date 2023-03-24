import {
  useMutation as UseMutation,
  useQuery as UseQuery,
  useQueryClient as UseQueryClient,
} from "react-query";

import axios from "./axios";

export const getData = (resource: string) => {
  return UseQuery(
    [resource],
    async () => {
      const { data } = await axios.get(`/${resource}`);
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const postData = (resource: string, data?: Object) => {
  return UseMutation(
    async (variables: any) => {
      const { data } = await axios.post(`/${resource}`, variables);
      return data;
    },
    {
      onSuccess: (data, variables) => {
        console.log("Data has been posted", data);
      },
      onError: (error) => {
        console.log("Error posting data", error);
      },
    }
  );
};

export const putData = (resource: string, data?: Object) => {
  const queryClient = UseQueryClient();
  return UseMutation(
    async (variables: any) => {
      const { data } = await axios.put(`/${resource}`, variables);
      return data;
    },
    {
      onSuccess: (data, variables) => {
        console.log("Data has been posted", data);
      },
      onError: (error) => {
        console.log("Error Updatinging data", error);
      },
    }
  );
};

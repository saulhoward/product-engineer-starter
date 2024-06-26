/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import axios from 'axios'
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type {
  Case,
  HTTPValidationError
} from '../api.schemas'



/**
 * @summary Health
 */
export const healthHealthGet = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    
    return axios.get(
      `/health`,options
    );
  }


export const getHealthHealthGetQueryKey = () => {
    return [`/health`] as const;
    }

    
export const getHealthHealthGetQueryOptions = <TData = Awaited<ReturnType<typeof healthHealthGet>>, TError = AxiosError<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof healthHealthGet>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getHealthHealthGetQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof healthHealthGet>>> = ({ signal }) => healthHealthGet({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof healthHealthGet>>, TError, TData> & { queryKey: QueryKey }
}

export type HealthHealthGetQueryResult = NonNullable<Awaited<ReturnType<typeof healthHealthGet>>>
export type HealthHealthGetQueryError = AxiosError<unknown>

/**
 * @summary Health
 */
export const useHealthHealthGet = <TData = Awaited<ReturnType<typeof healthHealthGet>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof healthHealthGet>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getHealthHealthGetQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary Get All Cases
 */
export const getAllCasesCasesGet = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Case[]>> => {
    
    return axios.get(
      `/cases`,options
    );
  }


export const getGetAllCasesCasesGetQueryKey = () => {
    return [`/cases`] as const;
    }

    
export const getGetAllCasesCasesGetQueryOptions = <TData = Awaited<ReturnType<typeof getAllCasesCasesGet>>, TError = AxiosError<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getAllCasesCasesGet>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAllCasesCasesGetQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAllCasesCasesGet>>> = ({ signal }) => getAllCasesCasesGet({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getAllCasesCasesGet>>, TError, TData> & { queryKey: QueryKey }
}

export type GetAllCasesCasesGetQueryResult = NonNullable<Awaited<ReturnType<typeof getAllCasesCasesGet>>>
export type GetAllCasesCasesGetQueryError = AxiosError<unknown>

/**
 * @summary Get All Cases
 */
export const useGetAllCasesCasesGet = <TData = Awaited<ReturnType<typeof getAllCasesCasesGet>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getAllCasesCasesGet>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetAllCasesCasesGetQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary Post Cases
 */
export const postCasesCasesPost = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Case>> => {
    
    return axios.post(
      `/cases`,undefined,options
    );
  }



export const getPostCasesCasesPostMutationOptions = <TError = AxiosError<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postCasesCasesPost>>, TError,void, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof postCasesCasesPost>>, TError,void, TContext> => {
const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postCasesCasesPost>>, void> = () => {
          

          return  postCasesCasesPost(axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostCasesCasesPostMutationResult = NonNullable<Awaited<ReturnType<typeof postCasesCasesPost>>>
    
    export type PostCasesCasesPostMutationError = AxiosError<unknown>

    /**
 * @summary Post Cases
 */
export const usePostCasesCasesPost = <TError = AxiosError<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postCasesCasesPost>>, TError,void, TContext>, axios?: AxiosRequestConfig}
): UseMutationResult<
        Awaited<ReturnType<typeof postCasesCasesPost>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getPostCasesCasesPostMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary Get Case By Id
 */
export const getCaseByIdCasesCaseIdGet = (
    caseId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Case>> => {
    
    return axios.get(
      `/cases/${caseId}`,options
    );
  }


export const getGetCaseByIdCasesCaseIdGetQueryKey = (caseId: string,) => {
    return [`/cases/${caseId}`] as const;
    }

    
export const getGetCaseByIdCasesCaseIdGetQueryOptions = <TData = Awaited<ReturnType<typeof getCaseByIdCasesCaseIdGet>>, TError = AxiosError<HTTPValidationError>>(caseId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getCaseByIdCasesCaseIdGet>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetCaseByIdCasesCaseIdGetQueryKey(caseId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getCaseByIdCasesCaseIdGet>>> = ({ signal }) => getCaseByIdCasesCaseIdGet(caseId, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(caseId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getCaseByIdCasesCaseIdGet>>, TError, TData> & { queryKey: QueryKey }
}

export type GetCaseByIdCasesCaseIdGetQueryResult = NonNullable<Awaited<ReturnType<typeof getCaseByIdCasesCaseIdGet>>>
export type GetCaseByIdCasesCaseIdGetQueryError = AxiosError<HTTPValidationError>

/**
 * @summary Get Case By Id
 */
export const useGetCaseByIdCasesCaseIdGet = <TData = Awaited<ReturnType<typeof getCaseByIdCasesCaseIdGet>>, TError = AxiosError<HTTPValidationError>>(
 caseId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getCaseByIdCasesCaseIdGet>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetCaseByIdCasesCaseIdGetQueryOptions(caseId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




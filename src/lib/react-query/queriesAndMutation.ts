import {
    //query these are all the things we'll use from react query and once again the reason why
    //we're using it is to simplify data fetching and mutation while getting all the benefits such as caching 
    //infinite scroll and more out of the box now what
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { createUserAccount, signInAccount } from '../appwrite/api'
import { INewUser } from '@/types'

//This is for creating a user
export const useCreateUserAccount = () => {
    return useMutation( {
        mutationFn: (user: INewUser) => createUserAccount(user),
    });
}

//and this is for signin the user
export const useSignInAccount = () => {
    return useMutation( {
        mutationFn: (user: { email: string; 
            password: string; 
        }) => signInAccount(user),
    });
}
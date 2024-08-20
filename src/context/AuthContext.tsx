import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

//Empty user
export const INTIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: ''
};

//default user 
const INTIAL_STATE =  {
    user: INTIAL_USER,
    isLoading: false,
    isAuthentication: false,
    //funtion to set authenticated user to set user
    setuser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INTIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INTIAL_STATE)
    const [isLoading, setIsLoading] = useState(false);
    const [isAthenticated, setIsAuthenticated] = useState(false);
    //false beacuse there is no user signed in yet

    const navigate = useNavigate();

    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentUser();

//values but in the catch it's not returning anything so if this function
// fails then these values will be undefined and and they'll cause an error
            if(currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                })

                setIsAuthenticated(true);

                return true;
            }

            return false;

        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if(localStorage.getItem('cookieFallback') === '[]' || 
            localStorage.getItem('cookieFallback') === null
        ) navigate('/sign-in')

        //whenever we reload the page we want to recall the check
        checkAuthUser();
    }, []);

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }

  return (
    <AuthContext.Provider value={value}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useuserContext = () => useContext(AuthContext);
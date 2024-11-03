"use server"

import {signIn , signOut} from '@/auth';
import { messaging } from 'firebase-admin';

import { AuthError } from 'next-auth';

export async function handleCredentialsSignin({email, password} :{
            email : string,
            password : string
}) {
    try {
        await signIn("credentials" , {email , password, redirectTo : "/storeorders"});
    } catch (error) {
        if(error instanceof AuthError){
            switch ( error.type){
                case 'CredentialsSignin' :
                    return {
                        message : 'Invalid credentials'
                    }

                    default:
                        return {
                            message : 'something went wrong'
                        }
            }
        }

        throw error;
    }
    
}


export async function handleSignOut() {
    await signOut();
}
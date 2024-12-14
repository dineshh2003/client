"use server"

import {signIn , signOut} from '@/auth';
import { messaging } from 'firebase-admin';


export async function handleCredentialsSignin({email, password} :{
            email : string,
            password : string
}) {
    try {
        await signIn("credentials" , {email , password, redirectTo : "/storeorders"});
    } catch (error : unknown) {
        if(error instanceof Error){
                    if (error.message.includes("CredentialsSignin")) {
                      return {
                        message: "Invalid credentials",
                      };
                    }
                    return {
                      message: "Something went wrong",
                    };
                  }
                  throw error; // If error isn't an instance of Error
                }
              
        }


export async function handleGoogleSignin() {
    try {
      await signIn("google", { redirectTo: "/storeorders" });
    } catch (error : unknown) {
        if(error instanceof Error){
                    if (error.message.includes("CredentialsSignin")) {
                      return {
                        message: "Invalid credentials",
                      };
                    }
                    return {
                      message: "Something went wrong",
                    };
                  }
                  throw error; // If error isn't an instance of Error
                }
              
        }



export async function handleSignOut() {
    await signOut();
}
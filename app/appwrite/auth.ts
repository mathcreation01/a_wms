import { ID, OAuthProvider, Query } from "appwrite";
import { account, database, appwriteConfig } from "~/appwrite/client";
import { redirect } from "react-router";

export const loginWithAppwrite = async (email: string, password: string) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    return response;
  } catch (error) {
    console.error("Login failed:", error);
     
  } 
};

export const logoutFromAppwrite = async () => {
  try {
    await account.deleteSession("current");
    redirect("/login");
  } catch (error) {
    console.error("Logout failed:", error);
     
  }
};

export const signUpWithAppwrite = async (email: string, password: string, name: string) => {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    return response;
  } catch (error) {
    console.error("Sign up failed:", error);
     
  }
};


export const recoverPassword = async (email: string) => {
  try {
    await account.createRecovery(email, `${window.location.origin}/reset-password`);
  } catch (error) {
    console.error("Password recovery failed:", error);
     
  }
};

export const signInWithMagicLink = async (email: string) => {
  try {
    await account.createMagicURLToken(email, `${window.location.origin}/verify-email`);
  } catch (error) {
    console.error("Magic link sign-in failed:", error);
     
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};


export const getUserInData = async () => {
    try {
        const user = await account.get();
        
        if(!user) { return redirect("/login"); }
        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("email", user.email),
             Query.select(["userId", "email", "firstName", "lastName", "jobRole", "joinedOn"])
            ],

        );


    } catch (error) {
        console.error("Failed to get user:", error);
        return null;
    }
};


export const storeUserData = async () => {
    try {
        const user = await account.get();
        if (!user) throw new Error("User not found");
        
        const createdUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                email: user.email,
                joinedOn: new Date().toISOString(),
                userId: user.$id,
                provider: 'appwrite',
                userType: 'admin'
            }
        );

        if (!createdUser.$id) redirect("/sign-in");
    } catch (error) {
        console.error("Failed to get user:", error);
         
    }
};


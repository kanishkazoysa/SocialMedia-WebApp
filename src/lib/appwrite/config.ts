import { Client, Account, Databases, Storage, Avatars } from 'appwrite';
//import environment variable

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);

// Check if appwriteConfig.url is defined before setting the endpoint
if (appwriteConfig.url) {
    client.setEndpoint(appwriteConfig.url);
} else {
    console.error("Appwrite URL is not defined. Make sure to set VITE_APPWRITE_URL environment variable.");
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

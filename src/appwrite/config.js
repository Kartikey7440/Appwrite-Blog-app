import conf from '../conf/conf.js'
import {Client, ID, Databases, Storage, Query} from "appwrite"

export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featureimage,status, userID}){
        try {
            return await this.databases.createDocument({
                databaseId: conf. appwriteDatabaseID,
                collectionId: conf. appwriteCollectionID,
                documentId: slug,
                data: {
                    "title": title,
                    "slug": slug,
                    "content": content,
                    "featureimage": featureimage,
                    "status": status,
                    "userID": userID
                }});
            
        } catch (error) {
            console.log("Appwrite sevice:: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featureimage,status, userID}){
        try {
            return await this.databases.updateDocument({
                databaseId: conf. appwriteDatabaseID,
                collectionId: conf. appwriteCollectionID,
                documentId: slug,
                data: {
                   "title": title,
                    "slug": slug,
                    "content": content,
                    "featureimage": featureimage,
                    "status": status,
                    "userID": userID
                }});
            
        } catch (error) {
            console.log("Appwrite sevice:: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument({
                databaseId: conf. appwriteDatabaseID,
                collectionId: conf. appwriteCollectionID,
                documentId: slug
            })
            return true
        } catch (error) {
            console.log("Appwrite sevice:: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument({
                databaseId: conf. appwriteDatabaseID,
                collectionId: conf. appwriteCollectionID,
                documentId: slug
            })
        } catch (error) {
            console.log("Appwrite sevice:: getPost :: error", error);
            
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments({
                databaseId: conf. appwriteDatabaseID,
                collectionId: conf. appwriteCollectionID,
                queries
            })
        } catch (error) {
            console.log("Appwrite sevice:: getPosts :: error", error);
            
        }
    }

    // file upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketID,
                fileId: ID.unique(),
                file: file,
            })
        } catch (error) {
            console.log("Appwrite sevice:: uploadfile :: error", error);
            
        }
    }

    async deleteFile(fileID){
        try {
            return await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketID,
                fileId: fileID,
            })
        } catch (error) {
            console.log("Appwrite sevice:: deletefile :: error", error);
            
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketID,
            fileId: fileID,
        })
       
    }
}


const service = new Service()
export default service

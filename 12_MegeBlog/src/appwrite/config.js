import { Client, Account, ID,Databases,Storage,Query } from "appwrite";
import conf from "../conf/conf.js";
import { retry } from "@reduxjs/toolkit/query";

export class dbService{
    client=new Client;
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(
            conf.appwriteUrl
        ).setProject(conf.appwriteProjectiD)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title,content,featuredImage,status,userId}){
        try {
            return await this.databases.createRow(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error)
            
        }
    }


    async updatePost({title,content,featuredImage,status,userId}){
        try {
            return await this.databases.updateRow(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error);
            
        }
    }
    async deletePost(){
        try {
            return await this.databases.deleteRow(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug
        )
        } catch (error) {
            console.log(("Appwrite service :: deletePost :: error",error))
            return false
        }
        
    }
    async getPost(slug){
        try {
            return await this.databases.getRow(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
            return false
            
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listRows({
                databaseId: conf.appwriteDatabaseID,
                collectionId: conf.appwriteCollectionID,
                queries: queries
            })
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file operations

    async uploadFile(file){
        try {
            return await this.bucket.updateDocument(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: UploadFile :: error",error)
        }
    }


    async deleteFile(fileId){
        try {
            await this.bucket.deleteDocument(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}
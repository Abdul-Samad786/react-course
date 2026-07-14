import { Client, Account, ID } from "appwrite";
import conf from "../conf/config.js";
class AuthService{
    client = new Client()
    account
    constructor(){
        this.client
        .setProject(conf.appwriteProjectiD) // Your project ID
        .setEndpoint(conf.appwriteUrl);
        this.account=new Account(client)

    }
    async createAccount(email,password){
        try {
            const userAccount=await this.account.create({
                userId:ID.unique(),
                email: email,
                password: password
            });
            if(userAccount){
                return this.login({email,password})
            }
            else{
                return userAccount
            }
        } catch (error) {
            console.log(`Error in create account service,${error}`);
            
        }
    }
    async login(email,password){
        try {
            const result= await this.account.createEmailPasswordSession({
            email:email,
            password: password
        });
        return result;

        } catch (error) {
            console.log(`Error in login,${error}`);
                        
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
    }




const authService = new AuthService();

export default authService
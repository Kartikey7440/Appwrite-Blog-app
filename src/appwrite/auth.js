import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectID);

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const user = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name
            })

            if (user) {
                return this.login({email, password})
            }
            else {
                return user
            }
        } catch (error) {
            console.log("Appwrite sevice:: createAccount :: error", error);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession({
                email: email,
                password: password
            });
            
        } catch (error) {
            console.log("Appwrite sevice:: login :: error", error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite sevice:: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite sevice:: Logout :: error", error);
        }
    }

}
const authService = new AuthService();
export default authService
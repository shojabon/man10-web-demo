import axios from "axios";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
export class AuthAPI{
    private readonly address: string;

    private cookie = new Cookies();
    constructor() {
        if(window.location.href.startsWith("http://localhost:3000")){
            this.address = "http://localhost:9877/public";
        }else{
            this.address = "https://api.man10.red/v1/auth/public"
        }
        axios.defaults.headers.common['content-type'] = 'application/json';
    }

    login(username: string, password: string){
        return axios.create({
            baseURL: this.address,
        }).post("/login", {
            "minecraftUsername": username,
            "password": password
        });
    }

    async validate(): Promise<boolean> {
        return await axios.create({
            baseURL: this.address,
        }).get("/info").then( (data) =>{
            if(!("status"  in data.data)) return false;
            if(data.data["status"] !== "success") return false;
            return true;
            }
        ).catch((data) => {
            return false;
        })
    }

    public getUserInfo(): any{
        if(this.cookie.get("jwt") === undefined) return null;
        return jwt_decode(this.cookie.get("jwt"));
    }


}
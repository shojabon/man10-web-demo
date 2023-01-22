import React from "react";
import Cookies from "universal-cookie";
import {AuthAPI} from "../manager/AuthAPI";

export class CheckIfAuthenticatedModule extends React.Component<{}, {}>{

    private cookie = new Cookies();
    private api: AuthAPI = new AuthAPI();
    async componentDidMount() {
        console.log(window.location.href)
        if (this.cookie.get("jwt") === undefined) {
            if(window.location.pathname !== "/login"){
                window.location.replace('/login');
            }
            return;
        }
        let result = await this.api.validate();
        if(result) return; // good jwt

        // bad jwt
        this.cookie.remove("jwt");
        window.location.replace('/login');

    }
    render(){
        return <></>
    }
}
import React from "react";
import "./Login.scss"
import Cookies from 'universal-cookie';
import {Button, TextField} from "@mui/material";
import {AuthAPI} from "../manager/AuthAPI";

interface ILoginState{
    username: string
    password: string
    error: string
}
export class LoginPage extends React.Component<{}, ILoginState>{

    private cookie = new Cookies();
    private api: AuthAPI = new AuthAPI();

    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: ""
        }
    }

    onClickLogin = async () => {
        try{
            let result = await this.api.login(this.state.username, this.state.password);
            let data = result.data;
            if(!("status" in data)) return; // bad request
            if(data["status"] !== "success"){
                this.setState({error: data["message"]})
                return;
            }

            let expire = new Date();
            expire.setDate(new Date().getDate() + 13);
            this.cookie.set("jwt", result.data["data"], {
                expires: expire
            });
        }catch (e){
            this.setState({error: "内部エラーが発生しました"})
            return;
        }
        let userData = this.api.getUserInfo();
        if(userData === null){
            this.setState({error: "内部エラーが発生しました"})
            return;
        }
        window.location.replace('/u/' + userData["minecraftUUID"]);
    }

    render() {
        return (
            <>
                <div className="login-container">
                    <div className="login-form">
                        <h3>ログイン（仮）</h3>
                        <TextField label="ユーザー名" variant="standard" value={this.state.username} onChange={(event) => this.setState({"username": event.target.value})}/>
                        <TextField label="パスワード" variant="standard" type="password" value={this.state.password} onChange={(event) => this.setState({"password": event.target.value})}/>
                        <Button variant="contained" onClick={this.onClickLogin}>ログイン</Button>
                        <p style={{"color": "red"}}>{this.state.error}</p>
                    </div>
                </div>
            </>
        );
    }
}

import React from "react";
import {AuthAPI} from "../manager/AuthAPI";

export class UserPageModule extends React.Component<{}, {}>{

    private api: AuthAPI = new AuthAPI();
    getNameTitle(){
        let info = this.api.getUserInfo();
        if(info === null) return <></>
        return <h1>{info["minecraftName"] + "さん(ログイン済み)"}</h1>
    }

    getSkinImage(){
        let info = this.api.getUserInfo();
        if(info === null) return <></>
        return <img src={"https://crafatar.com/renders/body/" + info["minecraftUUID"]}/>
    }

    render(){
        return (
            <>
                {this.getNameTitle()}
                {this.getSkinImage()}
            </>
        )
    }
}
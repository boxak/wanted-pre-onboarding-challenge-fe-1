import axios from "axios";
import NullChecker from "../util/NullChecker";

class ServerRemote {

    host = "http://localhost:8080";

    post = async(url, params, token) => {

        const requestUrl = this.host + url;

        let promise = undefined;

        if (NullChecker.isEmpty(token)) {
            promise = await axios.post(requestUrl, params)
                                    .then(function(res) {
                                            return res.data;
                                    }).catch(function(error) {
                                            console.log("error : " + JSON.stringify(error.response))
                                            return error.response
                                    });
        } else {

            const headers = {
                Authorization : token
            };

            promise = await axios.post(requestUrl, params, {
                headers : headers
            })
            .then(function(res) {
                    return res.data;
            }).catch(function(error) {
                    console.log("error : " + JSON.stringify(error.response))
                    return error.response
            });
        }

        
        return promise;
    }

    get = async(url, params, token) => {

        const requestUrl = this.host + url;

        const headers = {
            Authorization : token
        };

        const promise = await axios.get(requestUrl, {
                                    headers : headers,
                                    params : params, 
                                    timeout : 5000})
                                   .then(function(res) {
                                        return res.data;
                                   }).catch(function(error) {
                                        return error.response
                                   });

        return promise;
    }

    delete = async(url, token) => {
        const requestUrl = this.host + url;

        const headers = {
            Authorization : token
        };

        const promise = await axios.delete(requestUrl, 
            {
                headers : headers
            }    
        ).then(function(res) {
            return res.data;
       }).catch(function(error) {
            return error.response
       });

       return promise;
    }

    put = async(url, params, token) => {
        const requestUrl = this.host + url;

        const headers = {
            Authorization : token
        };

        const promise = await axios.put(requestUrl, params, {
            headers : headers
        }).then(function(res) {
            return res.data;
        }).catch(function(error) {
            return error.response;
        });

        return promise;
    }
}

export default new ServerRemote();
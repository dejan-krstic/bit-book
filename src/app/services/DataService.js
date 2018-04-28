
import React from 'react';
import axios from 'axios';
import { PostVideo, PostText, PostImage } from '../models/TextPost'
import User from '../models/User'
import Comment from '../models/Comment';

const sessionId = sessionStorage.getItem('sessionId');

const requestUrl = 'https://bitbookapi.azurewebsites.net/api';
class FetchData {
    async getUsers() {
        try {
            const users = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Key': '5256EE4',
                    'SessionId': sessionStorage.getItem('sessionId')
                },
                url: `${requestUrl}/users`,
                method: 'get',
            })
            console.log(users.data);
            return users.data.map(e => new User(e))
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }


    async getUser(id) {
        try {
            const user = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Key': '5256EE4',
                    'SessionId': sessionStorage.getItem('sessionId')
                },
                url: `${requestUrl}/users/${id}`,
                method: 'get',
            })
            console.log('user iz servisa', user.data);
            return new User(user.data)
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    async getProfile() {
        try {
            const profile = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Key': '5256EE4',
                    'SessionId': sessionStorage.getItem('sessionId')
                },
                url: `${requestUrl}/profile`,
                method: 'get',
            });
            console.log(profile.data.userId);
            sessionStorage.setItem('userId', profile.data.userId)
            return new User(profile.data)
        }
        catch (error) {
            return error;
        }
    }

    createRequest(url, method) {
        let request = new Request(requestUrl + url, {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Key': '5256EE4',
                'SessionId': sessionStorage.getItem('sessionId')
            }),
            method: method


        });

        return request;
    }

    fetchPosts() {

        return fetch(this.createRequest("/Posts", "GET"))
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                return result.map(post => {

                    if (post.type === 'video') {
                        return new PostVideo(post);
                    } else
                        if (post.type === 'text') {
                            return new PostText(post);
                        } else {
                            return new PostImage(post);
                        }

                })

            })
            .catch(error => {
                console.log(error);
                return error;
            })

    }


    fetchComments(id) {

        return fetch(this.createRequest("/Comments/?postId=" + id, "GET"))
            .then(response => {
                return response.json();
            })
            .then(result => {

                return result.map(comment => {
                    return new Comment(comment);

                })

            })
            .catch(error => {
                console.log(error);
                return error;
            })

    }

    fetchVideoPost(id) {

        return fetch(this.createRequest(`/VideoPosts/${id}`, "GET"))
            .then(function (response) {
                return response.json();
            })
            .then(function (post) {

                return new PostVideo(post);
            })
            .catch(error => {
                console.log(error);
                return error;
            })

    }

    fetchTextPost(id) {

        return fetch(this.createRequest(`/TextPosts/${id}`, "GET"))
            .then(function (response) {
                return response.json();
            })
            .then(function (post) {

                return new PostText(post);
            })
            .catch(error => {
                console.log(error);
                return error;
            })

    }

    fetchImagePost(id) {

        return fetch(this.createRequest('/ImagePosts/' + id, "GET"))
            .then((response) => {
                return response.json();
            })
            .then((post) => {

                return new PostImage(post);
            })
            .catch(error => {
                console.log(error);
                return error;
            })

    }


}

export const getData = new FetchData();

class PostData {
    async postText(data) {
        try {
            const post = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Key': '5256EE4',
                    'SessionId': sessionStorage.getItem('sessionId')
                },
                url: `${requestUrl}/TextPosts`,
                method: 'post',
                data: {
                    text: data
                }
            });
            return await getData.fetchPosts();
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    async postImage(data) {
        try {
            return await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Key': '5256EE4',
                    'SessionId': sessionStorage.getItem('sessionId')
                },
                url: `${requestUrl}/ImagePosts`,
                method: 'post',
                data: {
                    imageUrl: data
                }
            })
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }


    async postVideo(data) {
        try {
            return await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Key': '5256EE4',
                    'SessionId': sessionStorage.getItem('sessionId')
                },
                url: `${requestUrl}/VideoPosts`,
                method: 'post',
                data: {
                    videoUrl: data
                }
            });
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    async postComment(data, id) {
        try {
            return await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Key': '5256EE4',
                    'SessionId': sessionStorage.getItem('sessionId')
                },
                url: `${requestUrl + '/Comments'}/TextPosts`,
                method: 'post',
                data: {
                    body: data,
                    postId: id,
                    // 664
                }
            });
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async editUser(data) {
        try {
            return await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'Key': '5256EE4',
                    'SessionId': sessionStorage.getItem('sessionId')
                },
                url: `${requestUrl}/Profiles`,
                method: 'put',
                data
            });
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    imageUpload(file) {
        const url = `${requestUrl}/upload`;
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Key': '5256EE4',
                'SessionId': sessionStorage.getItem('sessionId')
            }
        }
        return axios.post(url, formData, config)
    }

    userRegister(user, pass) {
        return axios({
            headers: {
                'Content-Type': 'application/json',
                'Key': '5256EE4',
            },
            url: `${requestUrl}/register`,
            method: 'post',
            data: {
                username: user,
                password: pass,
                name: user,
                email: `${user}@gmail.com`
                // 664
            }
        })
            .then(result => {
                console.log(result.status);
                return result
            })
            .catch(error => {
                // console.log(error.response.data.error.message)
                // console.log(JSON.stringify(error));
                return error.response.data.error.message
            })


    }

    userLogin(user, pass){
        return axios({
            headers: {
                'Content-Type': 'application/json',
                'Key': '5256EE4',
            },
            url: `${requestUrl}/login`,
            method: 'post',
            data: {
                username: user,
                password: pass,
            }
        })
        .then(result => {
            console.log(result);
            sessionStorage.setItem('sessionId', result.data.sessionId);
            getData.getProfile();
            return result
        })
        .catch(error => {
            // console.log(error.response.data.error.message)
            // console.log(JSON.stringify(error));
            return error.response.data.error.message
        })


        }
}

export const postData = new PostData();


class DeleteData {

    deletePost(id) {
        return axios({
            headers: {
                'Content-Type': 'application/json',
                'Key': '5256EE4',
                'SessionId': sessionStorage.getItem('sessionId')
            },
            url: `${requestUrl}/Posts/${id}`,
            method: 'delete',

        });
    }
    // deleteComments(id) {
    //     return axios({
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Key': '5256EE4',
    //             'SessionId': sessionId
    //         },
    //         url: `${requestUrl}/Comments/${id}`,
    //         method: 'delete',

    //     });
    // }

}



export const deleteData = new DeleteData();

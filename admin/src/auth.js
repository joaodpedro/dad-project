/*taken from: https://github.com/vuejs/vue-router/blob/dev/examples/auth-flow/auth.js*/
/* globals localStorage */
import axios from 'axios';

export default {
    login (nickname, pass, cb) {
        cb = arguments[arguments.length - 1]
        if (localStorage.user) {
            if (cb) cb(true);
            this.onChange(true);
            return;
        }
      
        doRequest(nickname, pass, (response) => {
            if (response.authenticated) {
                localStorage.user = JSON.stringify(response.user);
                if (cb) cb(true);
                this.onChange(true);
            } else {
                if (cb) cb(false);
                this.onChange(false);
            }
        })
    },
  
    getLoggedUser () {
        return JSON.parse(localStorage.user);
    },
  
    logout (cb) {
        axios.get('http://localhost:8080/api/logout').then(response => {
            delete localStorage.user;
            if (cb) cb();
            this.onChange(false);
        });
    },
  
    loggedIn () {
        return !!localStorage.user;
    },
  
    onChange () {}
}
  
function doRequest (nickname, pass, cb) {
    axios.post('http://localhost:8080/api/login', {username: nickname, password: pass}).then(response => {
        if(response.status == 200){
            cb({
                authenticated: true,
                user: response.data
            })
        }else {
            cb({ authenticated: false });
        }
    })
    .catch(err => {
        console.log(err);
        cb({ authenticated: false })
    });
}
const URL = "https://forum2022.codeschool.cloud";


Vue.component("login-screen", {
    template: `
    <div>
        <h2>Login</h2>
        <input v-model="emailInput" placeholder="Email">
        <input v-model="passwordInput" placeholder="Password">
        <button v-on:click="attemptLogin()">Login</button>
    </div>
    `,
    data: function () {
        return {
            emailInput: '',
            passwordInput: ''
        }
    },
    methods: {
        attemptLogin: function () {

        }
    }
});

Vue.component('register-screen', {
    template: `
    <div>
        <h2>Register</h2>
        <input v-model="usernameInput" placeholder="Username">
        <input v-model="emailInput" placeholder="Email">
        <input v-model="passwordInput" placeholder="Password">
        <button v-on:click="attemptLogin()">Login</button>
    </div>
    `,
    data: function () {
        return {
            usernameInput: '',
            emailInput: '',
            passwordInput: ''
        }
    },
    methods: {
        attemptLogin: function () {

        }
    }
});

var app = new Vue({
    el: "#app",
    data: {
        page: 'login'
    },
    methods: {
        changePage: function () {
            if (this.page == 'login') {
                this.page = 'register';
            } else {
                this.page = 'login';
            }
        },
        getSession: async function () {
            let response = await fetch(`${URL}/session`, {
                method: 'GET',
                credentials: 'include'
            });
            console.log(response)
        }
    },
    created: function () {
        this.getSession();
    }
});
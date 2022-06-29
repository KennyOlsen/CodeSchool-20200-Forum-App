Vue.component("login-screen", {
    template: `
    <div>
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

var app = new Vue({
    el: "#app",
    data: {
        page: 'login'
    }
});
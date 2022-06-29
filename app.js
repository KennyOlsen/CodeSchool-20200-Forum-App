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
        attemptLogin: async function () {
            let response = await fetch(URL + '/session', {
                method: 'POST',
                credentials: 'include'
            });
            console.log(response);
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
        <button v-on:click="attemptLogin()">Register</button>
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
            console.log(response);

            if (response.status == 200) {
                console.log("logged in");
                let data = await response.json();
                console.log("Data recieved from GET /session: " + data);
            } else if (response.status == 401) {
                console.log("Not logged in");
                let data = await response.json();
                console.log("Data recieved from GET /session: " + data);
            } else {
                console.log("Error: status not 200 or 401 when GETTING /session---" + response.status + response);
            }
        }
    },
    created: function () {
        this.getSession();
    }
});
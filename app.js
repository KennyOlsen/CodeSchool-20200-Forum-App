const URL = "https://forum2022.codeschool.cloud";


Vue.component("login-screen", {
    template: `
    <div>
        <h2>Login</h2>
        <input v-model="emailInput" placeholder="Email" v-on:keydown.enter="attemptLogin()">
        <input v-model="passwordInput" placeholder="Password" type="password" v-on:keydown.enter="attemptLogin()">
        <button v-on:click="attemptLogin()">Login</button>
    </div>
    `,
    data: function () {
        return {
            emailInput: '',
            passwordInput: '',
        }
    },
    methods: {
        attemptLogin: async function () {
            let loginCredentials = {username: this.emailInput, password: this.passwordInput};

            let response = await fetch(URL + '/session', {
                method: 'POST',
                body: JSON.stringify(loginCredentials),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            let body = await response.json();
            console.log(body);

            console.log(response);
            if (response.status == 201) {
                console.log("Login successful");

                this.emailInput = '';
                this.passwordInput = '';

                app.toLoginPage();
            } else if (response.status == 401) {
                console.log("Login unsuccessful");
                this.passwordInput = '';
            } else {
                console.log("Error: status not 200 or 401 when POSTING /session---" + response.status + response);
            }
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

Vue.component('home-page', {
    template: `
    <div>
        <h3>You are now logged in</h3>
    </div>
    `
})

var app = new Vue({
    el: "#app",
    data: {
        page: 'login'
    },
    methods: {
        changePage: function () {
            if (this.page == 'login') {
                this.page = 'register';
            } else if (this.page == 'register') {
                this.page = 'home';
            } else {
                this.page = 'login';
            }
        },
        toLoginPage: function () {
            this.page = 'home';
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
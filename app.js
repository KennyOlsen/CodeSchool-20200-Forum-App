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
            emailInput: "",
            passwordInput: "",
        }
    },
    methods: {
        attemptLogin: async function () {
            let loginCredentials = {"username": this.emailInput, "password": this.passwordInput};

            let response = await fetch(URL + '/session', {
                method: 'POST',
                body: JSON.stringify(loginCredentials),
                headers: {
                    "content-type": "application/json"
                },
                credentials: 'include'
            });

            try {
                let body = await response.json();
                console.log(body);
            } catch(error) {
                console.error("json failed: " + error);
            }

            console.log(response);
            if (response.status == 201) {
                console.log("Login successful");

                this.emailInput = '';
                this.passwordInput = '';

                app.toLoggedInPage();
            } else if (response.status == 401) {
                console.log("Login unsuccessful");
                this.passwordInput = '';
            } else {
                console.log("Error: status not 201 or 401 when POSTING /session---" + response.status + response);
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
        <input v-model="passwordInput" placeholder="Password" type="password">
        <button v-on:click="createUser()">Create</button>
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
        createUser: async function () {
            if (this.usernameInput && this.emailInput && this.passwordInput){
                let accountCredentials = {fullname: this.usernameInput, username: this.emailInput, password: this.passwordInput};

                let response = await fetch(URL + '/user', {
                    method: 'POST',
                    body: JSON.stringify(accountCredentials),
                    headers: {
                        "content-type": "application/json"
                    },
                    credentials: 'include'
                });

                let body = await response.json();
                console.log(body);

                console.log(response);
                if (response.status == 201) {
                    console.log("Account created");

                    this.usernameInput = '';
                    this.emailInput = '';
                    this.passwordInput = '';

                    app.toLoggedInPage();
                } else if (response.status == 401) {
                    console.log("Account not created");
                } else {
                    console.log("Error: status not 200 or 401 when POSTING /user---" + response.status + response);
                }
            } else {
                console.log("empty credentials");
            }
        }
    }
});

Vue.component('home-page', {
    template: `
    <div>
        <h3>You are now logged in</h3>

    </div>
    `
});

Vue.component('thread-input', {
    template: `
    <div>
        name: <input v-model="name">
        description: <input v-model="description">
        category: <input v-model="category">
        <button v-on:click="submitThread()">Submit</button>
        <h2 v-show="warningShown">One or more inputs are empty</h2>
    </div>
    `,
    data: function () {
        return {
            name: '',
            description: '',
            category: '',
            warningShown: false
        }
    },
    methods: {
        submitThread: function () {
            let thread = {"name": this.name, "description": this.description, "category": this.category};

            if (this.name && this.description && this.category) {
                app.createThread(thread);
            } else {
                warningShown = true;
                setTimeout(() => {
                    warningShown = false;
                }, 3000);
            }
        }
    }
})

Vue.component('listed-thread', {
    template: `
    <div>
        <h3> {{ thread.name }} </h3>
        <h5> ({{ thread.category }}) </h5>
        <p> {{ thread.description }} </p>
    </div>
    `,
    props: [
        'thread'
    ]
})

var app = new Vue({
    el: "#app",
    data: {
        page: 'main',
        threads: [],
        addingThread: false
    },
    methods: {
        /*changePage: function () {
            if (this.page == 'login') {
                this.page = 'register';
            } else if (this.page == 'register') {
                this.page = 'home';
            } else {
                this.page = 'login';
            }
        },*/
        toLoggedInPage: function () {
            this.page = 'home';
        },
        toRegisterPage: function () {
            this.page = 'register';
        },
        toLoginPage: function () {
            this.page = 'login';
        },
        toMainPage: function () {
            this.page = 'main';
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
                this.toLoggedInPage();
            } else if (response.status == 401) {
                console.log("Not logged in");
                let data = await response.json();
                console.log("Data recieved from GET /session: " + data);
                this.toMainPage();
            } else {
                console.log("Error: status not 200 or 401 when GETTING /session---" + response.status + response);
                this.toMainPage();
            }
        },
        getThreads: async function () {
            let response = await fetch(URL + "/thread", {
                method: "GET",
                credentials: 'include'
            });

            let answer = await response.json();

            console.log(answer);
            this.threads = answer;
        },
        startAddThread: function () {
            this.addingThread = true;
        },
        createThread: async function (thread) {
            let response = await fetch(URL + "/thread", {
                method: 'POST',
                body: JSON.stringify(thread),
                headers: {
                    "content-type": "application/json"
                },
                credentials: 'include'
            });

            let answer = response.json();

            console.log(answer);
        }
    },
    created: function () {
        this.getSession();
        this.getThreads();
    }
});
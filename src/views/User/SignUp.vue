<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-flex xs12 md6>
                <v-alert v-if="error" @dismissed="onDismissed" border="left" dismissible type="error">{{
                    error.message
                }}</v-alert>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignup">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            id="name"
                                            name="name"
                                            label="Name"
                                            v-model="name"
                                            type="text"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            id="email"
                                            name="email"
                                            label="Email"
                                            v-model="email"
                                            type="email"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            id="password"
                                            name="password"
                                            label="Password"
                                            v-model="password"
                                            type="password"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            v-model="confirmPassword"
                                            type="password"
                                            :rules="[comparePasswords]"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12 class="text-right">
                                        <v-btn depressed dark class="body-2" type="submit" :loading="loading"
                                            >Sign Up</v-btn
                                        >
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            passwordValidated: false
        }
    },
    methods: {
        onSignup() {
            if (!this.passwordValidated) {
                return
            }
            this.$store.dispatch('signUserUp', { name: this.name, email: this.email, password: this.password })
        },
        onDismissed() {
            console.log('Dismiss Alert')
            this.$store.dispatch('clearError')
        }
    },
    computed: {
        comparePasswords() {
            if (this.password !== '' && this.password === this.confirmPassword) {
                this.passwordValidated = true
            } else {
                this.passwordValidated = false
            }
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        },
        user() {
            return this.$store.getters.user
        },
        error() {
            return this.$store.getters.error
        },
        loading() {
            return this.$store.getters.loading
        }
    },
    watch: {
        user(value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/')
            }
        }
    }
}
</script>

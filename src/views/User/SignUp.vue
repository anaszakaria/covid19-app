<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignup">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            id="email"
                                            name="email"
                                            label="Mail"
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
                                            v-bind:rules="[comparePasswords]"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12 text-xs-right>
                                        <v-btn depressed type="submit" :disabled="loading" :loading="loading"
                                            >Sign Up
                                            <span slot="loader" class="custom-loader">
                                                <v-icon light>cached</v-icon>
                                            </span>
                                        </v-btn>
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
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        onSignup() {
            this.$store.dispatch('signUserUp', { email: this.email, password: this.password })
        },
        onDismissed() {
            console.log('Dismiss Alert')
            this.$store.dispatch('clearError')
        }
    },
    computed: {
        comparePasswords() {
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

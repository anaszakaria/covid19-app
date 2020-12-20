<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-col xs="12" md="6">
                <v-card>
                    <v-card-text>
                        <v-alert
                            type="error"
                            dense
                            v-if="error"
                            :value="true"
                            color="error"
                            icon="mdi-alert"
                            transition="scale-transition"
                            >{{ error.message }}</v-alert
                        >
                        <v-container>
                            <form @submit.prevent="onSignin">
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
                                    <v-flex xs12 class="text-right">
                                        <v-btn depressed color="primary" class="body-2" type="submit" :loading="loading"
                                            >Sign In</v-btn
                                        >
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-layout>
    </v-container>
</template>

<script>
import { EventBus } from '@/main'
export default {
    data() {
        return {
            email: '',
            password: '',
            showAlert: false
        }
    },
    methods: {
        onSignin() {
            this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
            // EventBus.$emit('showLeftPanel')
        },
        onDismissAlert() {
            this.$store.dispatch('clearError')
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        loading() {
            return this.$store.getters.loading
        },
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        user(value) {
            if (value !== null && value !== undefined) {
                //this.$router.push('/')
            }
        }
    }
}
</script>

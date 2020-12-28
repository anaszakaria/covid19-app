<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-col xs="12" md="6">
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
                                        <v-select
                                            v-model="selectedCountry"
                                            :items="countries"
                                            :loading="isLoadingCountryList"
                                            label="Country"
                                        ></v-select>
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
                                        <v-btn depressed color="primary" class="body-2" type="submit" :loading="loading"
                                            >Sign Up</v-btn
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
import { statisticService } from '@/services/statisticService'

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            passwordValidated: false,
            selectedCountry: 'Malaysia',
            countries: [],
            isLoadingCountryList: false
        }
    },
    methods: {
        onSignup() {
            if (!this.passwordValidated) {
                return
            }
            this.$store.dispatch('signUserUp', {
                name: this.name,
                email: this.email,
                password: this.password,
                savedCountry: 'Malaysia',
                selectedCountries: [],
                widget: this.$store.getters.widget
            })
        },
        onDismissed() {
            console.log('Dismiss Alert')
            this.$store.dispatch('clearError')
        },
        async getCountryList() {
            this.isLoadingCountryList = true
            try {
                this.countries = await statisticService.getCountryList()
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoadingCountryList = false
            }
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
    },
    created() {
        this.getCountryList()
    }
}
</script>

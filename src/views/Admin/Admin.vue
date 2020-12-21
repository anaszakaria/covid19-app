<template>
    <v-container fluid>
        <h4 class="font-weight-medium ml-3">User List</h4>
        <v-row class="ma-0">
            <v-col sm="12">
                <v-card outlined tile>
                    <v-data-table
                        :height="tableHeight"
                        fixed-header
                        :headers="headers"
                        :items="users"
                        :sort-by="['name']"
                        :sort-asc="[true, false]"
                        :search="search"
                        must-sort
                        item-key="name"
                        class="elevation-1"
                        :loading="loadDataTable"
                        loading-text="Loading... Please wait"
                        :footer-props="{
                            'items-per-page-options': [15, 30, -1]
                        }"
                        :items-per-page="-1"
                    >
                        <template v-slot:top>
                            <v-row class="pt-1">
                                <v-col sm="5">
                                    <v-text-field dense v-model="search" label="Search" class="mx-4"></v-text-field>
                                </v-col>
                            </v-row>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { userService } from '@/services/userService'

export default {
    data() {
        return {
            search: '',
            users: [],
            loadDataTable: false,
            tableHeight: ''
        }
    },
    methods: {
        async getUserList() {
            this.loadDataTable = true
            try {
                const result = await userService.getUserList()
                this.users = result
                console.log(this.users)
            } catch (error) {
                console.log(response.error)
            } finally {
                this.loadDataTable = false
            }
        },
        resetTableHeight() {
            if (window.innerHeight < 500) {
                return
            }
            this.tableHeight = window.innerHeight - 280
        }
    },
    computed: {
        headers() {
            return [
                {
                    text: 'Name',
                    value: 'name',
                    align: 'left'
                },
                {
                    text: 'Email',
                    value: 'email',
                    align: 'left'
                },
                {
                    text: 'Country',
                    value: 'savedCountry',
                    align: 'left'
                },
                {
                    text: 'Member Since',
                    value: 'createdAt',
                    align: 'left'
                },
                {
                    text: 'Roles',
                    value: 'roles',
                    align: 'left'
                },
                {
                    text: 'Action',
                    align: 'center'
                }
            ]
        }
    },
    created() {
        window.addEventListener('resize', this.resetTableHeight)
        this.getUserList()
    },
    mounted() {
        this.resetTableHeight()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resetTableHeight)
    }
}
</script>

<style lang="scss" scoped></style>

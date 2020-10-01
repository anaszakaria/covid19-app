<template>
    <v-footer
        id="app-footer"
        v-if="$route.meta.showFooter"
        height="auto"
        color="primaryDarkGrey"
        class="white--text pl-2 pr-2"
        app
    >
        <v-layout justify-center row wrap>
            <v-flex text-center xs12 class="pa-2">
                <v-btn
                    v-for="(link, index) in links"
                    :key="index"
                    text
                    dark
                    class="font-weight-regular"
                    @click="gotoPage(link.url)"
                    >{{ link.text }}</v-btn
                >
                <!-- <v-divider vertical v-if="index !== links.length - 1"></v-divider> -->
            </v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            links: [
                { text: 'About CMIS', url: '/about' },
                { text: 'Contact Us', url: '/contact' },
                { text: 'Support', url: '/support' },
                { text: 'Admin', url: '/admin' }
            ]
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
#toolbar-item {
    margin: 0 auto;
}

#app-footer {
    button {
        border-radius: 0px !important;
    }
}

#copyright {
    border-top: 1px solid #90a4ae;
}
</style>

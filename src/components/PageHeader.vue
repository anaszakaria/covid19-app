<template>
    <v-btn color="success">Test</v-btn>
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

<style lang="scss" scoped></style>

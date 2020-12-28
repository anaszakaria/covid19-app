<template>
    <v-list dense subheader>
        <v-subheader class="subtitle-2">{{ widgetSection }}</v-subheader>
        <v-list-item v-for="(widget, index) in widgetList" :key="index">
            <v-list-item-action>
                <v-switch v-model="widget.enabled" color="accent"></v-switch>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title class="subtitle-2 font-weight-regular">{{ widget.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    props: {
        widgetSection: {
            type: String,
            required: true
        },
        widgetList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {}
    }
}
</script>

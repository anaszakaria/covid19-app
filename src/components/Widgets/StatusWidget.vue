<template>
    <v-card :dark="isDark" :color="widgetColor">
        <!-- <v-progress-linear v-if="preLoader" indeterminate></v-progress-linear> -->
        <v-card-title>
            <v-icon medium left>
                {{ icon }}
            </v-icon>
            <span class="title font-weight-light">{{ title }}</span>
        </v-card-title>
        <v-card-text v-if="total" class="headline font-weight-bold text-center">
            {{ total | numberWithCommas }}
        </v-card-text>
        <v-card-text v-else class="text-center">
            <v-progress-circular v-if="preLoader" indeterminate color="primary"></v-progress-circular>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        widgetColor: String,
        total: [Number, String],
        title: String,
        icon: String,
        isDark: {
            type: Boolean,
            default: true
        },
        preLoader: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    }
}
</script>

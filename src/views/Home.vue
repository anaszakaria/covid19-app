<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
            </v-col>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">
                    COVID-19 App Home
                </h1>
                <p class="subheading font-weight-regular">
                    COVID-19 Outbreak Live Updates
                    <br />
                    Mapping the novel coronavirus pandemic
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Home',
    data: () => ({
        status: true
    })
}
</script>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { VApp, VAppBar, VToolbarTitle, VSpacer, VBtn, VMain } from 'vuetify/components'
</script>

<template>
    <VApp>
        <VAppBar app color="primary" dark>
            <VToolbarTitle>Konvertor mien</VToolbarTitle>
            <VSpacer />
            <VBtn variant="text" to="/" tag="RouterLink">Domov</VBtn>
            <VBtn variant="text" to="/about" tag="RouterLink">O mne</VBtn>
        </VAppBar>
        <VMain>
            <RouterView />
        </VMain>
    </VApp>
</template>

<style scoped></style>

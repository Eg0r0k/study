<template>
    <section>
        <codemirror :style="{ height: '400px' }" v-model="code">

        </codemirror>
    </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const code = ref(`console.log('Hello, world!')`)


</script>
<template>
    <div class="achievement-card-wrapper w-full  h-[324px]">
        <div class="achievement-card">
            <!-- Front side -->
            <div class="achievement-front  rounded-lg">
                <div class="relative flex items-center justify-center mb-6">
                    <div class="bg-muted/50 rounded-full size-[120px] flex items-center justify-center">
                        <img :src="icon" :alt="name" class="size-16" />
                    </div>
                    <div
                        class="absolute -bottom-3 text-nowrap bg-background border rounded-full px-3 py-0.5 text-sm font-medium">
                        {{ subtitle }}
                    </div>
                </div>

                <h3 class="font-semibold text-lg mb-6">{{ name }}</h3>

                <div class="text-sm text-muted-foreground mt-2.5">
                    {{ level }} level
                </div>
            </div>

            <!-- Back side -->
            <div class="achievement-back bg-accent p-6 flex flex-col h-full rounded-lg">
                <h3 class="font-semibold text-lg mb-6">{{ name }}</h3>
                <p class="text-sm text-muted-foreground mb-auto">
                    {{ description }}
                </p>
                <time class="text-xs text-muted-foreground">
                    Получено: {{ formatDate(date) }}
                </time>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    name: string;
    subtitle: string;
    level: string;
    icon: string;
    description: string;
    date: string;
}>();

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
</script>

<style scoped>
.achievement-card-wrapper {
    perspective: 1000px;
}

.achievement-card {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    cursor: pointer;
}

.achievement-card-wrapper:hover .achievement-card {
    transform: rotateY(180deg);
}

.achievement-front,
.achievement-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border: 1px solid var(--border);
}

.achievement-front {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--card);
}

.achievement-back {
    transform: rotateY(180deg);
}
</style>

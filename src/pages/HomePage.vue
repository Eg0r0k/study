<template>
    <section class="px-4">
        <div class="flex mb-3.5 items-center justify-between ">
            <div>
                <h1 class="text-2xl font-semibold mb-0">
                    {{ pageTitle }}
                </h1>
                <p class="text-sm">
                    {{ pageDescription }}
                </p>
            </div>
            <div class="flex items-center gap-3">
                <RouterLink to="/database" class="flex items-center text-sm py-1 px-2 rounded-4xl"
                    :class="{ ' bg-accent': $route.path === '/database' }">
                    База знаний
                </RouterLink>
                <RouterLink to="/achievements" class="flex items-center text-sm py-1 px-2 rounded-4xl"
                    :class="{ 'bg-accent': $route.path === '/achievements' }">
                    Достижения
                </RouterLink>
            </div>
        </div>

        <div class="main border rounded-[40px] p-3.5">
            <template v-if="showDatabaseContent">
                <div class="div1">
                    <MainCourse />
                </div>
                <div class="div2">
                    <MainCourse />
                </div>
                <div class="div3">
                    <Card class="h-full">
                        <CardHeader>
                            <CardTitle>Статистика</CardTitle>
                            <CardDescription>Уровень успеваемости за последние 30 дней</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                <div class="div4 flex flex-col gap-3.5">
                    <p class="mb-1 font-semibold">Доступные проекты</p>
                    <Card v-for="i in 2" :key="i" class="!gap-[20px]">
                        <CardHeader>
                            <CardTitle>BSA08_BPMN</CardTitle>
                            <CardDescription>В этом проекте вы научитесь моделированию бизнес процессов с использованием
                                нотации BPMN 2.0, включая построение диаграмм процессов и событий</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div class="flex items-center gap-2">
                                <div class=" size-[12px] rounded-full bg-[#f73083]"></div>
                                BSA
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </template>

            <!-- Content for Achievements -->
            <template v-else>
                <div class="achievements-grid">
                    <AchievementCard name="Real programmer" subtitle="Strong Middle" level="4/5"
                        icon="/achievements/programmer.svg"
                        description="Достигните высокого уровня мастерства в программировании, освоив продвинутые техники и паттерны разработки"
                        date="2024-02-15" />
                </div>
            </template>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MainCourse from '@/components/cards/MainCourse.vue';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CardContent from '@/components/ui/card/CardContent.vue';
import AchievementCard from '@/components/achievements/AchievementCard.vue';

const route = useRoute();

const showDatabaseContent = computed(() => route.path === '/database');
const showAchievementsContent = computed(() => route.path === '/achievements');

const pageTitle = computed(() =>
    showAchievementsContent.value ? 'Мои бейджи и ачивки' : 'База знаний'
);

const pageDescription = computed(() =>
    showAchievementsContent.value
        ? 'Собрали все ваши достижения в одном месте: отслеживайте прогресс и учитесь когда удобно'
        : 'Изучайте материалы и развивайтесь вместе с нами'
);
</script>

<style scoped>
.main {
    display: grid;
    gap: 14px;
}

@media (max-width: 768px) {
    .main {
        grid-template-columns: 1fr;
    }

    .div1,
    .div2,
    .div3,
    .div4 {
        grid-column: 1 / -1;
    }
}



@media (min-width: 769px) and (max-width: 1024px) {
    .main {
        grid-template-columns: repeat(2, 1fr);
    }

    .div1 {
        grid-column: 1 / 3;
    }

    .div2 {
        grid-column: 1 / 3;
    }

    .div3 {
        grid-column: 1 / 2;
    }

    .div4 {
        grid-column: 2 / 3;
    }
}

@media (min-width: 1025px) {
    .main {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }

    .div1 {
        grid-area: 1 / 1 / 2 / 3;
    }

    .div2 {
        grid-area: 1 / 3 / 2 / 5;
    }

    .div3 {
        grid-area: 2 / 1 / 3 / 4;
    }

    .div4 {
        grid-area: 2 / 4 / 3 / 5;
    }
}

.achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
}

.achievement-card {
    background-color: var(--card);
    transition: transform 0.2s;
}

.achievement-card:hover {
    transform: translateY(-2px);
}
</style>
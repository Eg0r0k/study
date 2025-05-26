<template>
    <section class="px-4">
        <div class="flex mb-3.5 items-center justify-between flex-wrap gap-3 ">
            <div>
                <h1 class="text-2xl font-semibold mb-0">
                    {{ pageTitle }}
                </h1>
                <p class="text-sm">
                    {{ pageDescription }}
                </p>
            </div>
            <div class="flex items-center gap-3">
                <RouterLink to="/database"
                    class="flex items-center text-sm py-1 px-2 rounded-4xl font-medium"
                    :class="{ ' bg-accent': $route.path === '/database' }">
                    База знаний
                </RouterLink>
                <RouterLink to="/achievements"
                    class="flex items-center text-sm py-1 px-2 rounded-4xl font-medium"
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
                    <SecondCourse />
                </div>
                <div class="div3">
                    <Card class="h-full ">
                        <CardHeader class="flex justify-between items-center">

                            <div>
                                <CardTitle class="text-2xl font-semibold ">Статистика</CardTitle>
                                <CardDescription>Уровень успеваемости за последние 30 дней</CardDescription>
                            </div>
                            <div class="flex items-center gap-3">
                                <Button variant="outline"
                                    class=" bg-transparent"
                                    :class="{ 'bg-accent': chartPeriod === 'quarter' }"
                                    @click="chartPeriod = 'quarter'">
                                    За 3 месяца
                                </Button>
                                <Button variant="outline"
                                    class=" bg-transparent"
                                    :class="{ 'bg-accent': chartPeriod === 'month' }"
                                    @click="chartPeriod = 'month'">
                                    За 30 дней
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent class="h-full ">
                            <div class="w-full h-[300px]">
                                <AreaChart :period="chartPeriod" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div class="div4 flex flex-col gap-3.5">
                    <p class="mb-1 font-semibold">Доступные проекты</p>
                    <Card class="!gap-[20px]">
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
                    <Card class="!gap-[20px]">
                        <CardHeader>
                            <CardTitle>BSA09_SQL</CardTitle>
                            <CardDescription>В этом проекте вы изучите основы работы с базами данных с использованием
                                языка SQL, включая написание запросов, фильтрацию, агрегирование данных и работу с
                                несколькими таблицами</CardDescription>
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

            <template v-else>
                <div class="achievements-wrapper">
                    <div class="achievements-grid">
                        <AchievementCard v-for="achivement in authStore.user?.unlocked_achievements"
                            :key="achivement.achievement.id"
                            :name="achivement.achievement.name"
                            subtitle="Strong Middle"
                            :level="achivement.level"
                            :icon="`/achievements/${achivement.achievement.code}.png`"
                            :description="achivement.achievement.description"
                            :date="achivement.date_earned" />
                        <AchievementCard class="grayscale-100"
                            v-for="achivement in authStore.user?.locked_achievements"
                            :key="achivement.id"
                            :name="achivement.name"
                            subtitle="Strong Middle"
                            :icon="`/achievements/${achivement.code}.png`"
                            :description="achivement.description" />
                    </div>
                </div>
            </template>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import MainCourse from '@/components/cards/MainCourse.vue';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AchievementCard from '@/components/achievements/AchievementCard.vue';
import { Button } from '@/components/ui/button';
import AreaChart from '@/components/charts/AreaChart.vue';
import { useAuthStore } from '@/stores/authStore';
import SecondCourse from '@/components/cards/SecondCourse.vue';

const route = useRoute();
const authStore = useAuthStore()

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

const chartPeriod = ref<'month' | 'quarter'>('month');
</script>

<style scoped>
.main {
    display: grid;
    gap: 14px;
}

.div1,
.div2 {
    height: 371px;
    min-height: 371px;
}

@media (max-width: 768px) {

    .div1,
    .div2 {
        height: auto;
        min-height: 0;
    }

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

.achievements-wrapper {
    grid-column: 1 / -1;
}

.achievements-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
}

@media (max-width: 1400px) {
    .achievements-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 1200px) {
    .achievements-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .achievements-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .achievements-grid {
        grid-template-columns: 1fr;
    }
}

.achievement-card {
    background-color: var(--card);
    transition: transform 0.2s;
}

.achievement-card:hover {
    transform: translateY(-2px);
}
</style>
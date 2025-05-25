<template>
    <section class="px-4">
        <div class="grid gap-4">
            <div class="bg-card border p-6 rounded-lg">
                <Button variant="ghost" @click="router.back()">
                    <ArrowLeft class="w-5 h-5" />
                    <span>Назад</span>
                </Button>
                <div class="flex items-start gap-6   mb-3.5">
                    <h1 class="text-4xl font-semibold ">TECH SQUAD: МИССИЯ 'ИИ' от IT кластера Газпром Нефти</h1>
                    <div
                        :class="['inline-flex items-center rounded-full border  text-xs font-semibold transition-colors px-4 py-3', statusStyles[status]]">
                        <DotIcon class=" size-3.5" /> {{ statusLabels[status] }}
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <CalendarIcon class="w-4 h-4" />
                    <span>Окончание приёма решений <span class=" font-semibold">20.05.2025, 8:30</span> </span>
                </div>
            </div>

            <div class="bg-card border p-6 rounded-lg">
                <h2 class=" text-2xl font-semibold mb-3.5">Описание</h2>
                <p class="text-sm text-muted-foreground">
                    Тебе предстоит разработать MVP (минимально жизнеспособный продукт) системы, которая с помощью
                    ML-моделей будет анализировать сложные промышленные изображения (например, рентгеновские снимки) и
                    находить в них критически важные аномалии или дефекты. Тебе и твоей команде нужно будет подобрать,
                    протестировать и обучить лучшие ИИ-модели на уникальном датасете.
                </p>
            </div>

            <div class="bg-card border p-6 rounded-lg">
                <h2 class="text-2xl font-semibold mb-3.5">Решения</h2>
                <p class="text-sm text-muted-foreground mb-6">
                    Тебе предстоит разработать MVP (минимально жизнеспособный продукт) системы, которая с помощью
                    ML-моделей будет анализировать сложные промышленные изображения (например, рентгеновские снимки) и
                    находить в них критически важные аномалии или дефекты. Тебе и твоей команде нужно будет подобрать,
                    протестировать и обучить лучшие ИИ-модели на уникальном датасете.
                </p>
                <div class="grid grid-cols-5 gap-3">
                    <div v-for="solution in displayedSolutions" :key="solution.id" class="bg-muted rounded-lg p-4">
                        <div class="flex items-center gap-2 mb-2">
                            <Avatar class="size-8">
                                <AvatarFallback class="bg-card">
                                    <UserIcon />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 class="font-semibold text-sm">{{ solution.name }}</h3>
                                <p class="text-xs text-muted-foreground">{{ solution.team }}</p>
                            </div>
                        </div>
                        <p class="text-sm text-muted-foreground">
                            {{ solution.description }}
                        </p>
                    </div>
                </div>
                <div class="mt-3" v-if="solutions.length > 5">
                    <Button variant="ghost" class="w-full mt-6" @click="toggleShowAll">
                        {{ showAll ? 'Скрыть' : 'Показать все' }}
                        <ChevronDown class="ml-2 size-4" :class="{ 'rotate-180': showAll }" />
                    </Button>
                </div>
            </div>

            <div class="bg-card border p-6 rounded-lg">
                <h2 class="text-xl font-semibold mb-4">Документы</h2>
                <div class="grid gap-2">
                    <div v-for="i in 1" :key="i" class="flex items-center justify-between  bg-muted  rounded-lg p-3">
                        <div class="flex items-center gap-2">
                            <FileIcon class=" size-8  text-primary" />
                            <div class="flex flex-col">
                                <span class=" text-sm font-medium">Документ {{ i }}.pdf</span>
                                <span class="  text-muted-foreground/70 font-medium">1.2мб</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon">
                            <DownloadIcon class="  size-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Button } from '@/components/ui/button';
import { CalendarIcon, FileIcon, DownloadIcon, ArrowLeft, ChevronDown, UserIcon, DotIcon } from 'lucide-vue-next';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'vue-router';

const router = useRouter();

const solutions = [
    { id: 1, name: 'Команда Alpha', team: 'Team 1', description: 'Решение с использованием CV и трансформеров' },
    { id: 2, name: 'ML Masters', team: 'Team 2', description: 'Подход на основе глубокого обучения' },
    { id: 3, name: 'AI Innovators', team: 'Team 3', description: 'Гибридная архитектура нейронных сетей' },
    { id: 4, name: 'Deep Vision', team: 'Team 4', description: 'Комбинация CNN и LSTM для анализа' },
    { id: 5, name: 'Tech Wizards', team: 'Team 5', description: 'Ансамбль моделей машинного обучения' },
    { id: 6, name: 'Data Miners', team: 'Team 6', description: 'Решение на основе градиентного бустинга' },
];

const showAll = ref(false);
const displayedSolutions = computed(() => {
    return showAll.value ? solutions : solutions.slice(0, 5);
});

const toggleShowAll = () => {
    showAll.value = !showAll.value;
};

type EventStatus = 'pending' | 'accepted' | 'counting';

const statusLabels: Record<EventStatus, string> = {
    pending: 'Подаются решения',
    accepted: 'Решения приняты',
    counting: 'Подсчет результатов'
};

const statusStyles: Record<EventStatus, string> = {
    pending: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    accepted: 'border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    counting: 'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
};

const status = ref<EventStatus>('pending');
</script>

<style scoped>
@media (max-width: 1200px) {
    .grid-cols-5 {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .grid-cols-5 {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .grid-cols-5 {
        grid-template-columns: 1fr;
    }
}
</style>

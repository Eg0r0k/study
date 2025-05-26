<template>
    <div class="group  bg-card border rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
        <div class="p-4 h-full flex flex-col justify-between ">
            <div class="flex gap-2 mb-4">
                <Badge>{{ getCategoryName(course.category) }}</Badge>
                <Badge variant="secondary">{{ course.experienceLevel }}</Badge>
            </div>

            <div class="flex items-center justify-center   relative rounded-lg overflow-hidden mb-4">
                <img :src="course.image" :alt="course.title" class=" max-w-full h-auto  " />
            </div>
            <h3 class="text-xl font-semibold line-clamp-2 mb-4">{{ course.title }}</h3>

            <div>
                <div class="space-y-2">
                    <Progress :model-value="(course.completedLessons / course.totalLessons) * 100" />
                    <div class="flex justify-between text-sm text-muted-foreground">
                        <span>{{ course.duration }} часов</span>
                        <span>Уроков {{ course.completedLessons }}/{{ course.totalLessons }}</span>
                    </div>
                </div>

                <div class="flex gap-2 mt-4">
                    <Button variant="outline" class="flex-1" @click.stop="$emit('openDetails', course)">
                        О курсе
                    </Button>
                    <Button class="flex-1">Поступить</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Course } from '@/types/course';

defineProps<{
    course: Course
}>();

defineEmits<{
    openDetails: [course: Course]
}>();

const getCategoryName = (id: string) => {
    const categories: Record<string, string> = {
        'ai': 'Искусственный интеллект',
        'tech': 'Современные технологии',
        'dev': 'Разработка',
        'business': 'Бизнес'
    };
    return categories[id] || id;
};
</script>

<template>
    <section class="px-4">
        <div class="flex flex-col gap-6">
            <!-- Фильтры -->
            <div class="flex gap-2 overflow-x-auto pb-2">
                <Button v-for="category in categories" 
                    :key="category.id"
                    variant="outline"
                    :class="{ 'bg-accent': selectedCategory === category.id }"
                    @click="selectedCategory = category.id">
                    {{ category.name }}
                </Button>
            </div>

            <div v-if="!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CourseCard v-for="course in filteredCourses" 
                    :key="course.id" 
                    :course="course"
                    @open-details="openCourseDetails" />
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CourseCardSkeleton v-for="i in 6" :key="i" />
            </div>
        </div>

        <CourseDialog v-model:open="showCourseDialog" :course="selectedCourse" />
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/courses/CourseCard.vue';   
import CourseCardSkeleton from '@/components/courses/CourseCardSkeleton.vue';
import CourseDialog from '@/components/courses/CourseDialog.vue';
import type { Course } from '@/types/course';
import { fetchCourses } from '@/api/courses';

const categories = [
    { id: 'all', name: 'Все' },
    { id: 'ai', name: 'Искусственный интеллект' },
    { id: 'tech', name: 'Современные технологии' },
    { id: 'dev', name: 'Разработка' },
    { id: 'business', name: 'Бизнес' },
];

const selectedCategory = ref('all');
const courses = ref<Course[]>([]);
const isLoading = ref(true);
const showCourseDialog = ref(false);
const selectedCourse = ref<Course | null>(null);

const filteredCourses = computed(() => {
    if (selectedCategory.value === 'all') return courses.value;
    return courses.value.filter(course => course.category === selectedCategory.value);
});

const openCourseDetails = (course: Course) => {
    selectedCourse.value = course;
    showCourseDialog.value = true;
};

onMounted(async () => {
    try {
        courses.value = await fetchCourses();
    } finally {
        isLoading.value = false;
    }
});
</script>
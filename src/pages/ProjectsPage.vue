<template>
    <section class="px-4">
        <div class="w-full max-w-[400px] mx-auto flex flex-col items-center space-y-4">
            <h1 class="text-2xl font-bold">Смена пароля</h1>
            <p class="text-sm text-muted-foreground">Обновите свой пароль для безопасности.</p>

            <form @submit="onSubmit" class="w-full space-y-4">
                <!-- Текущий пароль -->
                <FormField v-slot="{ componentField }" name="oldPassword">
                    <FormItem>
                        <FormLabel>Текущий пароль</FormLabel>
                        <FormControl>
                            <Input autocomplete="current-password" class="h-10 !bg-card" v-bind="componentField"
                                type="password" placeholder="Введите текущий пароль" />
                        </FormControl>
                        <FormMessage class="text-xs text-destructive" />
                    </FormItem>
                </FormField>

                <!-- Новый пароль -->
                <FormField v-slot="{ componentField }" name="newPassword">
                    <FormItem>
                        <FormLabel>Новый пароль</FormLabel>
                        <FormControl>
                            <Input autocomplete="new-password" class="h-10 !bg-card" v-bind="componentField"
                                type="password" placeholder="Введите новый пароль" />
                        </FormControl>
                        <FormMessage class="text-xs text-destructive" />
                    </FormItem>
                </FormField>

                <!-- Подтверждение нового пароля -->
                <FormField v-slot="{ componentField }" name="confirmPassword">
                    <FormItem>
                        <FormLabel>Подтвердите новый пароль</FormLabel>
                        <FormControl>
                            <Input autocomplete="new-password" class="h-10 !bg-card" v-bind="componentField"
                                type="password" placeholder="Подтвердите новый пароль" />
                        </FormControl>
                        <FormMessage class="text-xs text-destructive" />
                    </FormItem>
                </FormField>

                <!-- Кнопка отправки -->
                <Button size="lg" type="submit" class="w-full" :disabled="isLoading">
                    {{ isLoading ? "Загрузка..." : "Изменить пароль" }}
                </Button>
            </form>
        </div>
    </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Icon } from "@iconify/vue";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form'
import LottieAnimation from '@/components/animations/LottieAnimation.vue'
import { ref } from 'vue'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { useAuthStore } from "@/stores/authStore";
import { REGEX_PATTERNS } from '@/utils/validation'


const formSchema = toTypedSchema(
    z
        .object({
            oldPassword: z.string().min(1, "Текущий пароль обязателен."),
            newPassword: z.string()
                .min(6, "Новый пароль должен содержать минимум 6 символов.")
                .max(50, "Новый пароль не должен превышать 50 символов."),
            confirmPassword: z.string().min(1, "Подтвердите новый пароль."),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
            message: "Пароли не совпадают.",
            path: ['confirmPassword'],
        })
);

// Инициализация формы
const { handleSubmit, isSubmitting } = useForm({
    validationSchema: formSchema,
    initialValues: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    },
});

const isLoading = ref(false);
const authStore = useAuthStore();

const onSubmit = handleSubmit(async (values) => {
    if (isLoading.value) return;

    try {
        isLoading.value = true;
        await authStore.changePassword(values.oldPassword, values.newPassword);

        toast.success("Пароль успешно изменён", {
            description: "Ваш пароль был успешно обновлён.",
        });
    } catch (error) {
        toast.error("Ошибка при смене пароля", {
            description: error instanceof Error ? error.message : "Произошла ошибка при смене пароля.",
        });
    } finally {
        isLoading.value = false;
    }
});
</script>
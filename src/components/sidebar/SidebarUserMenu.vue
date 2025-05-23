<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="w-full h-auto p-2">
                <Avatar class="h-8 w-8">
                    <AvatarImage src="/" :alt="user.username" />
                    <AvatarFallback class="dark:bg-muted font-bold bg-primary !text-white">
                        {{ userInitials }}
                    </AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ user.username }}</span>
                    <span class="truncate text-xs">{{ user.username }}</span>
                </div>
                <ChevronsUpDown class="ml-auto size-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-[230px] rounded-lg" side="bottom"
            align="center">
            <DropdownMenuLabel class="p-0 font-normal">
                <div class="flex flex-col gap-1 px-1 py-1 text-left text-sm">
                    <div class="flex gap-2   items-center ">
                        <Avatar class="h-8 w-8">
                            <AvatarImage src="/" :alt="user.username" />
                            <AvatarFallback class="dark:bg-muted font-bold bg-primary !text-white">
                                {{ userInitials }}
                            </AvatarFallback>
                        </Avatar>
                        <div class="grid flex-1 text-left text-sm leading-tight">
                            <span class="truncate font-semibold">{{ user.username }}</span>
                            <span class="truncate text-xs">{{ user.username }}</span>
                        </div>
                    </div>
                    <!-- <div>
                        <span class="text-xs">Уровень: {{ user.level }}</span>
                        <Progress :model-value="progressPercentage" class="mt-1 h-1" />
                        <span class="text-xs">XP: {{ user.xp }} / {{ user.nextLevelXp }}</span>
                    </div> -->
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <RouterLink to="/profile">
                        <UserIcon />
                        {{ $t('common.profile') }}
                    </RouterLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Sparkles />
                    Pro версия
                </DropdownMenuItem>

            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
                <DropdownMenuItem @click="authStore.logout">
                    <LogOut />
                    {{ $t('common.logout') }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
    ChevronsUpDown,
    Sparkles,
    LogOut,
    UserIcon
} from 'lucide-vue-next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@/types/auth';

interface Props {
    user: User
}
const props = defineProps<Props>();
const authStore = useAuthStore()

const userInitials = computed(() => {
    if (!props.user.username.trim()) {
        return 'U';
    }
    const names = props.user.username.trim().split(/\s+/);
    let initials = '';
    if (names.length >= 2) {
        initials = names[0][0] + names[names.length - 1][0];
    } else {
        initials = names[0].slice(0, 2);
    }
    return initials.toUpperCase().padEnd(2, '').slice(0, 2);
});


</script>

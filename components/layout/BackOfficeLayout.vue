<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  CircleUser,
  PanelLeft,
  LogOut,
  ArrowLeftToLine,
  ChevronDown,
  ChevronRight,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import { Icon } from '@iconify/vue'
import { useAuth } from '@/composables/useAuth'

// Props pour personnalisation du layout
interface MenuItem {
  title: string
  icon?: any
  to: string
  children?: MenuItem[]
}
const props = defineProps<{
  title: string
  prefix: string
  menu: MenuItem[]
}>()

// Auth & Router
const { user, signOut } = useAuth()
const router = useRouter()

const backToSite = () => router.push('/')

// États pour les collapsibles (desktop & mobile)
const openStates = reactive<Record<string, boolean>>({})
</script>

<template>
  <div class="flex min-h-screen w-full bg-muted/40">
    <!-- Sidebar desktop -->
    <aside class="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
      <!-- Logo -->
      <div class="flex items-center p-4 border-b">
        <NuxtLink :to="props.prefix" class="flex items-center gap-2 font-semibold text-xl">
          <img src="/logo.svg" alt="Logo" class="w-16 h-16 pt-2" />
          <span class="text-bleu font-bold">{{ props.title }}</span>
        </NuxtLink>
      </div>
      <!-- Navigation -->
      <nav class="flex-1 overflow-auto py-4 px-3 space-y-1">
        <template v-for="item in props.menu" :key="item.to">
          <Collapsible v-if="item.children" v-model:open="openStates[item.to]" class="w-full">
            <CollapsibleTrigger as-child>
              <button class="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                <div class="flex items-center">
                  <component :is="item.icon" class="h-4 w-4 mr-2" v-if="item.icon" />
                  {{ item.title }}
                </div>
                <ChevronDown v-if="openStates[item.to]" class="h-4 w-4" />
                <ChevronRight v-else class="h-4 w-4" />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div class="pl-8 pt-1 space-y-1">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  class="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  {{ child.title }}
                </NuxtLink>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <NuxtLink
            v-else
            :to="item.to"
            class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <component :is="item.icon" class="h-4 w-4 mr-2" v-if="item.icon" />
            {{ item.title }}
          </NuxtLink>
        </template>
      </nav>
      <!-- Footer -->
      <div class="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <button class="flex items-center justify-between w-full rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
              <div class="flex items-center gap-2">
                <CircleUser class="h-6 w-6" />
                <div class="text-left">
                  <p class="font-medium truncate">{{ user?.email || 'Utilisateur' }}</p>
                  <p class="text-xs text-muted-foreground">{{ props.title }}</p>
                </div>
              </div>
              <Icon name="mdi:dots-vertical" class="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56">
            <DropdownMenuItem @click="backToSite">
              <ArrowLeftToLine class="mr-2 h-4 w-4" /> Retour au site
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="signOut()">
              <LogOut class="mr-2 h-4 w-4" /> Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>

    <!-- Sidebar mobile -->
    <Sheet>
      <SheetTrigger as-child class="sm:hidden">
        <Button size="icon" variant="outline" class="fixed top-4 left-4 z-40">
          <PanelLeft class="h-5 w-5" /><span class="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" class="w-64 sm:max-w-none p-0">
        <div class="flex flex-col h-full">
          <!-- Logo mobile -->
          <div class="flex items-center p-4 border-b">
            <NuxtLink :to="props.prefix" class="flex items-center gap-2 font-semibold text-xl">
              <img src="/logo.svg" alt="Logo" class="w-12 h-12" />
              <span>{{ props.title }}</span>
            </NuxtLink>
          </div>
          <!-- Mobile navigation -->
          <nav class="flex-1 overflow-auto py-4 px-3 space-y-1">
            <template v-for="item in props.menu" :key="item.to">
              <Collapsible v-if="item.children" v-model:open="openStates[item.to]" class="w-full">
                <CollapsibleTrigger as-child>
                  <button class="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                    <div class="flex items-center">
                      <component :is="item.icon" class="h-4 w-4 mr-2" v-if="item.icon" />
                      {{ item.title }}
                    </div>
                    <ChevronDown v-if="openStates[item.to]" class="h-4 w-4" />
                    <ChevronRight v-else class="h-4 w-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div class="pl-8 pt-1 space-y-1">
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.to"
                      :to="child.to"
                      class="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {{ child.title }}
                    </NuxtLink>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <NuxtLink
                v-else
                :to="item.to"
                class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                <component :is="item.icon" class="h-4 w-4 mr-2" v-if="item.icon" />
                {{ item.title }}
              </NuxtLink>
            </template>
          </nav>
          <!-- Footer mobile -->
          <div class="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <button class="flex items-center justify-between w-full rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                  <div class="flex items-center gap-2">
                    <CircleUser class="h-6 w-6" />
                    <div class="text-left">
                      <p class="font-medium truncate">{{ user?.email || 'Utilisateur' }}</p>
                    </div>
                  </div>
                  <Icon name="mdi:dots-vertical" class="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-56">
                <DropdownMenuItem @click="backToSite">
                  <ArrowLeftToLine class="mr-2 h-4 w-4" /> Retour au site
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="signOut()">
                  <LogOut class="mr-2 h-4 w-4" /> Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SheetContent>
    </Sheet>

    <!-- Contenu principal -->
    <div class="flex flex-col sm:pl-64 w-full">
        <main class="flex-1 p-4 sm:px-6 sm:py-4">
            <slot />
        </main>
    </div>
  </div>
</template>

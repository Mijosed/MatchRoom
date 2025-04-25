<template>
    <!-- sidebar -->
    <slot />
</template>

<script setup lang="ts">
import {
    CircleUser,
    Home,
    Hotel,
    Bed,
    Users,
    PanelLeft,
    Settings,
    Tag,
    CalendarCheck,
    Store,
    Gauge,
    ChevronDown,
    ChevronRight,
    LogOut,
    ArrowLeftToLine,
    Calendar
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Icon } from '@iconify/vue'
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'

const { user, signOut } = useAuth()
const router = useRouter()

// État pour le menu offres dépliable
const offresOpen = ref(false)

// Retour au site
const backToSite = () => {
    router.push('/')
}
</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
        <!-- Sidebar -->
        <aside class="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
            <!-- Logo -->
            <div class="flex items-center p-4 border-b">
                <NuxtLink to="/admin" class="flex items-center gap-2 font-semibold text-xl">
                    <img src="/logo.svg" alt="Logo" class="w-16 h-16 pt-2">
                    <span class="text-bleu font-bold">MatchRoom Admin</span>
                </NuxtLink>
            </div>

            <!-- Sections de navigation -->
            <div class="flex-1 overflow-auto py-4 px-3">
                <!-- Section Hôtellerie -->
                <div class="mb-6">
                    <h2 class="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Hôtellerie
                    </h2>
                    <nav class="space-y-1">
                        <!-- Menu Offres dépliable -->
                        <Collapsible v-model:open="offresOpen" class="w-full">
                            <CollapsibleTrigger as-child>
                                <button class="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                                    <div class="flex items-center">
                                        <Tag class="h-4 w-4 mr-2" />
                                        <span>Offres</span>
                                    </div>
                                    <ChevronDown v-if="offresOpen" class="h-4 w-4" />
                                    <ChevronRight v-else class="h-4 w-4" />
                                </button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div class="pl-8 pt-1 space-y-1">
                                    <NuxtLink to="/admin/offres" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                                        Toutes les offres
                                    </NuxtLink>
                                    <NuxtLink to="/admin/offres/create" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                                        Nouvelle offre
                                    </NuxtLink>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                        <!-- Réservations -->
                        <NuxtLink to="/admin/reservations" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                            <CalendarCheck class="h-4 w-4 mr-2" />
                            <span>Réservations</span>
                        </NuxtLink>

                        <!-- Seuils -->
                        <NuxtLink to="/admin/seuil" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                            <Gauge class="h-4 w-4 mr-2" />
                            <span>Seuils</span>
                        </NuxtLink>

                        <!-- Saisonalité -->
                        <NuxtLink to="/admin/saisonalite" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                            <Calendar class="h-4 w-4 mr-2" />
                            <span>Saisonalité</span>
                        </NuxtLink>
                    </nav>
                </div>

                <!-- Section Administration -->
                <div>
                    <h2 class="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Administration
                    </h2>
                    <nav class="space-y-1">
                        <!-- Utilisateurs -->
                        <NuxtLink to="/admin/users" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                            <Users class="h-4 w-4 mr-2" />
                            <span>Utilisateurs</span>
                        </NuxtLink>

                        <!-- Hôtels -->
                        <NuxtLink to="/admin/hotels" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                            <Hotel class="h-4 w-4 mr-2" />
                            <span>Hôtels</span>
                        </NuxtLink>

                        <!-- Chambres -->
                        <NuxtLink to="/admin/rooms" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                            <Bed class="h-4 w-4 mr-2" />
                            <span>Chambres</span>
                        </NuxtLink>
                    </nav>
                </div>
            </div>

            <!-- Footer de la sidebar -->
            <div class="border-t p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <button class="flex items-center justify-between w-full rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                            <div class="flex items-center gap-2">
                                <CircleUser class="h-6 w-6" />
                                <div class="text-left">
                                    <p class="font-medium truncate">{{ user?.email || 'Utilisateur' }}</p>
                                    <p class="text-xs text-muted-foreground">Administrateur</p>
                                </div>
                            </div>
                            <Icon name="mdi:dots-vertical" class="h-5 w-5" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-56">
                        <DropdownMenuItem @click="backToSite">
                            <ArrowLeftToLine class="mr-2 h-4 w-4" />
                            <span>Retour au site</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem @click="signOut().then(() => router.push('/'))">
                            <LogOut class="mr-2 h-4 w-4" />
                            <span>Déconnexion</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </aside>

        <!-- Version mobile -->
        <Sheet>
            <SheetTrigger as-child class="sm:hidden">
                <Button size="icon" variant="outline" class="fixed top-4 left-4 z-40">
                    <PanelLeft class="h-5 w-5" />
                    <span class="sr-only">Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" class="w-64 sm:max-w-none p-0">
                <!-- Contenu de la sidebar mobile - reprend la même structure -->
                <div class="flex flex-col h-full">
                    <!-- Logo -->
                    <div class="flex items-center p-4 border-b">
                        <div class="flex items-center gap-2 font-semibold text-xl">
                            <Store class="h-6 w-6 text-primary" />
                            <span>MatchRoom Admin</span>
                        </div>
                    </div>

                    <!-- Sections de navigation -->
                    <div class="flex-1 overflow-auto py-4 px-3">
                        <!-- Section Hôtellerie -->
                        <div class="mb-6">
                            <h2 class="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Hôtellerie
                            </h2>
                            <nav class="space-y-1">
                                <!-- Menu Offres dépliable -->
                                <Collapsible v-model:open="offresOpen" class="w-full">
                                    <CollapsibleTrigger as-child>
                                        <button class="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                                            <div class="flex items-center">
                                                <Tag class="h-4 w-4 mr-2" />
                                                <span>Offres</span>
                                            </div>
                                            <ChevronDown v-if="offresOpen" class="h-4 w-4" />
                                            <ChevronRight v-else class="h-4 w-4" />
                                        </button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div class="pl-8 pt-1 space-y-1">
                                            <NuxtLink to="/admin/offres" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                                                Toutes les offres
                                            </NuxtLink>
                                            <NuxtLink to="/admin/offres/create" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                                                Nouvelle offre
                                            </NuxtLink>
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>

                                <!-- Réservations -->
                                <NuxtLink to="/admin/reservations" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                                    <CalendarCheck class="h-4 w-4 mr-2" />
                                    <span>Réservations</span>
                                </NuxtLink>

                                <!-- Seuils -->
                                <NuxtLink to="/admin/seuil" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                                    <Gauge class="h-4 w-4 mr-2" />
                                    <span>Seuils</span>
                                </NuxtLink>
                            </nav>
                        </div>

                        <!-- Section Administration -->
                        <div>
                            <h2 class="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Administration
                            </h2>
                            <nav class="space-y-1">
                                <!-- Utilisateurs -->
                                <NuxtLink to="/admin/users" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                                    <Users class="h-4 w-4 mr-2" />
                                    <span>Utilisateurs</span>
                                </NuxtLink>

                                <!-- Hôtels -->
                                <NuxtLink to="/admin/hotels" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                                    <Hotel class="h-4 w-4 mr-2" />
                                    <span>Hôtels</span>
                                </NuxtLink>

                                <!-- Chambres -->
                                <NuxtLink to="/admin/chambres" class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                                    <Bed class="h-4 w-4 mr-2" />
                                    <span>Chambres</span>
                                </NuxtLink>
                            </nav>
                        </div>
                    </div>

                    <!-- Footer de la sidebar -->
                    <div class="border-t p-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <button class="flex items-center justify-between w-full rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                                    <div class="flex items-center gap-2">
                                        <CircleUser class="h-6 w-6" />
                                        <div class="text-left">
                                            <p class="font-medium truncate">{{ user?.email || 'Utilisateur' }}</p>
                                            <p class="text-xs text-muted-foreground">Administrateur</p>
                                        </div>
                                    </div>
                                    <Icon name="mdi:dots-vertical" class="h-5 w-5" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" class="w-56">
                                <DropdownMenuItem @click="backToSite">
                                    <ArrowLeftToLine class="mr-2 h-4 w-4" />
                                    <span>Retour au site</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem @click="signOut().then(() => router.push('/'))">
                                    <LogOut class="mr-2 h-4 w-4" />
                                    <span>Déconnexion</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </SheetContent>
        </Sheet>

        <!-- Main Content -->
        <div class="flex flex-col sm:pl-64">

            <!-- Page Content -->
            <main class="flex-1 p-4 sm:px-6 sm:py-4">
                <slot />
            </main>
        </div>
    </div>
</template> 

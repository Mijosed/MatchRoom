<script setup>
import {
    User,
    Search,
    PlusCircle,
    Trash2,
    Pencil,
    Mail
} from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

const client = useSupabaseClient()
const searchQuery = ref('')

// Récupération des utilisateurs via l'API (comme dans index.vue)
const { data: rawUsersData, pending: loadingUsers, refresh } = await useAsyncData('admin-users', () =>
    $fetch('/api/admin/users')
)

// Récupération des hôtels
const { data: hotelsData } = await useAsyncData('hotels-list', fetchHotels)
const hotels = computed(() => hotelsData.value || [])

// État pour les utilisateurs enrichis
const users = ref([])

// Surveiller les changements de données brutes pour enrichir les utilisateurs
watchEffect(() => {
    if (!rawUsersData.value) return
    enrichUsersWithHotelInfo(rawUsersData.value).then((enriched) => {
        users.value = enriched
    })
})

// Filtrer les utilisateurs en fonction de la recherche
const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value
    
    const query = searchQuery.value.toLowerCase()
    return users.value.filter(user => 
        user.email?.toLowerCase().includes(query) || 
        user.hotelName?.toLowerCase().includes(query)
    )
})

async function fetchHotels() {
    const { data, error } = await client.from('hotel').select('id, name')
    if (error) {
        console.error('Erreur lors du chargement des hôtels:', error)
        return []
    }
    return data
}

async function enrichUsersWithHotelInfo(userList) {
    // Récupérer les informations utilisateur
    const { data: userInfo, error: userInfoError } = await client
        .from('user_informations')
        .select('*')
    
    if (userInfoError) {
        console.error('Erreur lors de la récupération des informations utilisateur:', userInfoError)
        return userList
    }
    
    // Enrichir les utilisateurs avec les informations supplémentaires
    return userList.map(user => {
        const info = userInfo?.find(info => info.id === user.id) || {}
        const hotelId = info.id_hotel
        const hotel = hotels.value?.find(h => h.id === hotelId)
        
        return {
            ...user,
            ...info,
            id_hotel: hotelId || null,
            hotelName: hotel?.name || 'Aucun hôtel'
        }
    })
}

async function deleteUser(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        try {
            // Supprimer les informations de l'utilisateur
            const { error: infoError } = await client
                .from('user_informations')
                .delete()
                .eq('id', id)
            
            if (infoError) {
                console.error('Erreur lors de la suppression des informations:', infoError)
                throw infoError
            }
            
            // Vous pouvez ajouter ici une API pour supprimer l'utilisateur de auth si nécessaire
            
            alert('Les informations de l\'utilisateur ont été supprimées.')
            refresh()
        } catch (error) {
            console.error('Erreur lors de la suppression:', error)
            alert('Erreur lors de la suppression: ' + (error.message || 'Erreur inconnue'))
        }
    }
}

function editUser(id) {
    // À implémenter: redirection vers la page d'édition
    alert('Fonctionnalité d\'édition à implémenter.')
}
</script>

<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Gestion des utilisateurs</h1>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Utilisateurs</CardTitle>
                <CardDescription>Liste des utilisateurs enregistrés dans le système</CardDescription>
                
                <div class="flex items-center mt-4">
                    <div class="relative flex-1 max-w-sm">
                        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            v-model="searchQuery"
                            type="search" 
                            placeholder="Rechercher un utilisateur..." 
                            class="pl-8" 
                        />
                    </div>
                </div>
            </CardHeader>
            
            <CardContent>
                <div v-if="loadingUsers" class="flex justify-center py-8">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#457891]"></div>
                </div>
                
                <div v-else-if="filteredUsers.length === 0" class="text-center py-8 text-muted-foreground">
                    Aucun utilisateur trouvé
                </div>
                
                <Table v-else>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Hôtel associé</TableHead>
                            <TableHead>Rôle</TableHead>
                            <TableHead class="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="user in filteredUsers" :key="user.id">
                            <TableCell class="font-medium">
                                <div class="flex items-center">
                                    <Mail class="h-4 w-4 mr-2" />
                                    {{ user.email || 'Email non disponible' }}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge v-if="user.id_hotel" variant="outline">
                                    {{ user.hotelName }}
                                </Badge>
                                <span v-else class="text-muted-foreground text-xs">Non associé</span>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary">
                                    {{ user.role || 'Utilisateur' }}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div class="flex gap-2">
                                    <Button @click="editUser(user.id)" size="icon" variant="ghost">
                                        <Pencil class="h-4 w-4" />
                                        <span class="sr-only">Modifier</span>
                                    </Button>
                                    <Button @click="deleteUser(user.id)" size="icon" variant="ghost" class="text-destructive">
                                        <Trash2 class="h-4 w-4" />
                                        <span class="sr-only">Supprimer</span>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            
            <CardFooter>
                <div class="text-xs text-muted-foreground">
                    Affichage de <strong>{{ filteredUsers.length }}</strong> sur <strong>{{ users.length }}</strong> utilisateurs
                </div>
            </CardFooter>
        </Card>
    </div>
</template>

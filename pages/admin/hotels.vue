<script setup>
import {
    File,
    ListFilter,
    MoreHorizontal,
    PlusCircle,
    Search,
    Trash2,
    Pencil
} from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import { toast } from "@/components/ui/toast"

const client = useSupabaseClient()
const { data: hotelsData, pending: loadingHotels, refresh } = await useAsyncData('hotels-admin', fetchHotels)
const hotels = computed(() => hotelsData.value || [])
const searchQuery = ref('')

// État du formulaire d'ajout
const showAddDialog = ref(false)
const newHotel = ref({
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    tags: '',
    photo: ''
})
const isSubmitting = ref(false)

// Filtrer les hôtels en fonction de la recherche
const filteredHotels = computed(() => {
    if (!searchQuery.value) return hotels.value
    
    const query = searchQuery.value.toLowerCase()
    return hotels.value.filter(hotel => 
        hotel.name?.toLowerCase().includes(query) || 
        hotel.address?.toLowerCase().includes(query) ||
        hotel.email?.toLowerCase().includes(query)
    )
})

async function fetchHotels() {
    const { data, error } = await client.from('hotel').select('*')
    if (error) {
        console.error('Erreur lors du chargement des hôtels:', error)
        return []
    }
    return data
}

async function deleteHotel(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet hôtel ?')) {
        const { error } = await client.from('hotel').delete().eq('id', id)
        if (error) {
            console.error('Erreur lors de la suppression:', error)
            alert('Erreur lors de la suppression de l\'hôtel')
        } else {
            refresh()
        }
    }
}

function editHotel(id) {
    // Rediriger vers la page d'édition
    navigateTo(`/admin/hotels/${id}/edit`)
}

function resetForm() {
    newHotel.value = {
        name: '',
        address: '',
        phone: '',
        email: '',
        description: '',
        tags: '',
        photo: ''
    }
}

async function submitNewHotel() {
    if (!newHotel.value.name || !newHotel.value.address) {
        alert('Veuillez remplir les champs obligatoires')
        return
    }

    isSubmitting.value = true

    try {
        // Formatage des tags au format tableau PostgreSQL
        let formattedTags = null
        if (newHotel.value.tags && newHotel.value.tags.trim()) {
            // Transformation de "tag1, tag2, tag3" en format tableau PostgreSQL "{tag1,tag2,tag3}"
            const tagsArray = newHotel.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            formattedTags = `{${tagsArray.join(',')}}`
        }

        const { data, error } = await client.from('hotel').insert([
            {
                name: newHotel.value.name,
                address: newHotel.value.address,
                phone: newHotel.value.phone,
                email: newHotel.value.email,
                description: newHotel.value.description,
                tags: formattedTags, // Utilisation des tags formatés
                photo: newHotel.value.photo
            }
        ])

        if (error) throw error

        // Réinitialiser le formulaire et fermer le modal
        resetForm()
        showAddDialog.value = false
        
        // Actualiser la liste
        refresh()
        
        // Notification de succès
        alert('Hôtel ajouté avec succès')
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'hôtel:', error)
        alert('Erreur lors de l\'ajout de l\'hôtel')
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Gestion des hôtels</h1>
            
            <!-- Dialog pour ajouter un hôtel -->
            <Dialog v-model:open="showAddDialog">
                <DialogTrigger as-child>
                    <Button class="gap-2">
                        <PlusCircle class="h-4 w-4" />
                        Ajouter un hôtel
                    </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>Ajouter un nouvel hôtel</DialogTitle>
                        <DialogDescription>
                            Remplissez les informations de l'hôtel ci-dessous. Les champs marqués d'un astérisque (*) sont obligatoires.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <form @submit.prevent="submitNewHotel" class="space-y-4 py-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="hotel-name">Nom de l'hôtel *</Label>
                                <Input 
                                    id="hotel-name" 
                                    v-model="newHotel.name" 
                                    placeholder="Hôtel du Parc"
                                    required
                                />
                            </div>
                            
                            <div class="space-y-2">
                                <Label for="hotel-address">Adresse *</Label>
                                <Input 
                                    id="hotel-address" 
                                    v-model="newHotel.address" 
                                    placeholder="123 rue de la Paix, 75001 Paris"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="hotel-phone">Téléphone</Label>
                                <Input 
                                    id="hotel-phone" 
                                    v-model="newHotel.phone" 
                                    placeholder="01 23 45 67 89"
                                />
                            </div>
                            
                            <div class="space-y-2">
                                <Label for="hotel-email">Email</Label>
                                <Input 
                                    id="hotel-email" 
                                    v-model="newHotel.email" 
                                    placeholder="contact@hotelduparc.fr"
                                    type="email"
                                />
                            </div>
                        </div>
                        
                        <div class="space-y-2">
                            <Label for="hotel-description">Description</Label>
                            <Textarea 
                                id="hotel-description" 
                                v-model="newHotel.description" 
                                placeholder="Décrivez l'hôtel, ses services, etc."
                                class="min-h-[100px]"
                            />
                        </div>
                        
                        <div class="space-y-2">
                            <Label for="hotel-tags">Tags (séparés par des virgules)</Label>
                            <Input 
                                id="hotel-tags" 
                                v-model="newHotel.tags" 
                                placeholder="luxe, spa, piscine"
                            />
                        </div>

                        <div class="space-y-2">
                            <Label for="hotel-photo">Photo (URL)</Label>
                            <Input 
                                id="hotel-photo" 
                                v-model="newHotel.photo" 
                                placeholder="https://exemple.com/photo.jpg"
                                type="url"
                            />
                        </div>
                    
                        <DialogFooter>
                            <Button @click="showAddDialog = false" type="button" variant="outline" :disabled="isSubmitting">
                                Annuler
                            </Button>
                            <Button type="submit" :disabled="isSubmitting" class="ml-2">
                                <span v-if="isSubmitting" class="mr-2">
                                    <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                                </span>
                                {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer' }}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Hôtels</CardTitle>
                <CardDescription>Liste des hôtels enregistrés dans le système</CardDescription>
                
                <div class="flex items-center mt-4">
                    <div class="relative flex-1 max-w-sm">
                        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            v-model="searchQuery"
                            type="search" 
                            placeholder="Rechercher un hôtel..." 
                            class="pl-8" 
                        />
                    </div>
                </div>
            </CardHeader>
            
            <CardContent>
                <div v-if="loadingHotels" class="flex justify-center py-8">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#457891]"></div>
                </div>
                
                <div v-else-if="filteredHotels.length === 0" class="text-center py-8 text-muted-foreground">
                    Aucun hôtel trouvé
                </div>
                
                <Table v-else>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Photo</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Adresse</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead class="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="hotel in filteredHotels" :key="hotel.id">
                            <TableCell>
                                <div class="w-12 h-12 rounded overflow-hidden">
                                    <img v-if="hotel.photo" :src="hotel.photo" alt="Photo" class="w-full h-full object-cover" />
                                    <div v-else class="w-full h-full bg-muted flex items-center justify-center">
                                        <File class="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell class="font-medium">{{ hotel.name }}</TableCell>
                            <TableCell>{{ hotel.address }}</TableCell>
                            <TableCell>
                                <div>{{ hotel.phone }}</div>
                                <div class="text-muted-foreground text-xs">{{ hotel.email }}</div>
                            </TableCell>
                            <TableCell class="max-w-xs truncate">{{ hotel.description }}</TableCell>
                            <TableCell>
                                <div class="flex gap-2">
                                    <Button @click="editHotel(hotel.id)" size="icon" variant="ghost">
                                        <Pencil class="h-4 w-4" />
                                        <span class="sr-only">Modifier</span>
                                    </Button>
                                    <Button @click="deleteHotel(hotel.id)" size="icon" variant="ghost" class="text-destructive">
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
                    Affichage de <strong>{{ filteredHotels.length }}</strong> sur <strong>{{ hotels.length }}</strong> hôtels
                </div>
            </CardFooter>
        </Card>
    </div>
</template>
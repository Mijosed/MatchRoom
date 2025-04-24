<script setup>
import {
  PlusCircle, Trash2, Pencil, Image, Search
} from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

definePageMeta({ layout: 'admin' })

const client = useSupabaseClient()

const { data: roomsData, pending: loadingRooms, refresh } = await useAsyncData('rooms-admin', fetchRooms)
const rooms = computed(() => roomsData.value || [])

const { data: hotelsData } = await useAsyncData('hotels-list', fetchHotels)
const hotels = computed(() => hotelsData.value || [])

const searchQuery = ref('')
const showAddDialog = ref(false)
const isSubmitting = ref(false)

const newRoom = ref({
  description: '',
  images: '',
  price: null,
  data: '{}',
  id_hotel: null
})

const filteredRooms = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return !query
    ? rooms.value
    : rooms.value.filter(room => {
        const hotelName = getHotelName(room.id_hotel).toLowerCase()
        return (
          room.description?.toLowerCase().includes(query) ||
          String(room.price).includes(query) ||
          hotelName.includes(query)
        )
      })
})

function getHotelName(hotelId) {
  const hotel = hotels.value.find(h => h.id === hotelId)
  return hotel?.name || 'Hôtel non trouvé'
}

function formatPrice(price) {
  return price ? `${price} €` : 'Non défini'
}

function formatImagesDisplay(imagesArray) {
  if (!imagesArray) return 'Aucune image'
  return Array.isArray(imagesArray) ? `${imagesArray.length} image(s)` : 'Non défini'
}

function resetForm() {
  newRoom.value = {
    description: '',
    images: '',
    price: null,
    data: '{}',
    id_hotel: null
  }
}

async function fetchRooms() {
  const { data, error } = await client.from('room').select('*')
  if (error) {
    console.error('Erreur chambres:', error)
    return []
  }
  return data
}

async function fetchHotels() {
  const { data, error } = await client.from('hotel').select('id, name')
  if (error) {
    console.error('Erreur hôtels:', error)
    return []
  }
  return data
}

async function deleteRoom(id) {
  if (!confirm('Supprimer cette chambre ?')) return
  const { error } = await client.from('room').delete().eq('id', id)
  if (error) return alert('Erreur lors de la suppression')
  refresh()
}

async function submitNewRoom() {
  const room = newRoom.value
  if (!room.description || !room.price || !room.id_hotel) {
    return alert('Champs obligatoires manquants')
  }

  isSubmitting.value = true

  try {
    const images = room.images?.trim()
      ? `{${room.images.split(',').map(i => i.trim()).filter(Boolean).join(',')}}`
      : null

    const parsedData = room.data && room.data.trim() !== '{}'
      ? JSON.parse(room.data)
      : {}

    const { error } = await client.from('room').insert([{
      description: room.description,
      images,
      price: parseFloat(room.price),
      data: parsedData,
      id_hotel: room.id_hotel // UUID intact
    }])

    if (error) throw error

    resetForm()
    showAddDialog.value = false
    refresh()
    alert('Chambre ajoutée avec succès')
  } catch (err) {
    alert('Erreur : ' + err.message)
    console.error(err)
  } finally {
    isSubmitting.value = false
  }
}
</script>


<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Gestion des chambres</h1>
            
            <!-- Dialog pour ajouter une chambre -->
            <Dialog v-model:open="showAddDialog">
                <DialogTrigger as-child>
                    <Button class="gap-2">
                        <PlusCircle class="h-4 w-4" />
                        Ajouter une chambre
                    </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>Ajouter une nouvelle chambre</DialogTitle>
                        <DialogDescription>
                            Remplissez les informations de la chambre ci-dessous. Les champs marqués d'un astérisque (*) sont obligatoires.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <form @submit.prevent="submitNewRoom" class="space-y-4 py-4">
                        <div class="space-y-2">
                            <Label for="room-hotel">Hôtel *</Label>
                            <div class="relative">
                                <select 
                                    id="room-hotel"
                                    v-model="newRoom.id_hotel" 
                                    class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                    @change="handleHotelChange"
                                >
                                    <option value="">Sélectionnez un hôtel</option>
                                    <option 
                                        v-for="hotel in hotels" 
                                        :key="hotel.id" 
                                        :value="hotel.id"
                                    >
                                        {{ hotel.name }} (ID: {{ hotel.id }})
                                    </option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="room-price">Prix par nuit (€) *</Label>
                                <Input 
                                    id="room-price" 
                                    v-model="newRoom.price" 
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="100.00"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div class="space-y-2">
                            <Label for="room-description">Description *</Label>
                            <Textarea 
                                id="room-description" 
                                v-model="newRoom.description" 
                                placeholder="Décrivez la chambre, ses caractéristiques, etc."
                                class="min-h-[100px]"
                                required
                            />
                        </div>
                        
                        <div class="space-y-2">
                            <Label for="room-images">Images (URLs séparées par des virgules)</Label>
                            <Textarea 
                                id="room-images" 
                                v-model="newRoom.images" 
                                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                                class="min-h-[80px]"
                            />
                        </div>
                        
                        <div class="space-y-2">
                            <Label for="room-data">Données supplémentaires (JSON)</Label>
                            <Textarea 
                                id="room-data" 
                                v-model="newRoom.data" 
                                placeholder='{"lit": "King size", "équipements": ["TV", "WiFi"]}'
                                class="min-h-[80px] font-mono text-sm"
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
                <CardTitle>Chambres</CardTitle>
                <CardDescription>Liste des chambres enregistrées dans le système</CardDescription>
                
                <div class="flex items-center mt-4">
                    <div class="relative flex-1 max-w-sm">
                        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            v-model="searchQuery"
                            type="search" 
                            placeholder="Rechercher une chambre..." 
                            class="pl-8" 
                        />
                    </div>
                </div>
            </CardHeader>
            
            <CardContent>
                <div v-if="loadingRooms" class="flex justify-center py-8">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#457891]"></div>
                </div>
                
                <div v-else-if="filteredRooms.length === 0" class="text-center py-8 text-muted-foreground">
                    Aucune chambre trouvée
                </div>
                
                <Table v-else>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Hôtel</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Images</TableHead>
                            <TableHead class="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="room in filteredRooms" :key="room.id">
                            <TableCell class="font-medium">{{ getHotelName(room.id_hotel) }}</TableCell>
                            <TableCell>{{ formatPrice(room.price) }}</TableCell>
                            <TableCell class="max-w-xs truncate">{{ room.description }}</TableCell>
                            <TableCell>
                                <div class="flex items-center">
                                    <Image class="mr-2 h-4 w-4" />
                                    <span>{{ formatImagesDisplay(room.images) }}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div class="flex gap-2">
                                    <Button size="icon" variant="ghost">
                                        <Pencil class="h-4 w-4" />
                                        <span class="sr-only">Modifier</span>
                                    </Button>
                                    <Button @click="deleteRoom(room.id)" size="icon" variant="ghost" class="text-destructive">
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
                    Affichage de <strong>{{ filteredRooms.length }}</strong> sur <strong>{{ rooms.length }}</strong> chambres
                </div>
            </CardFooter>
        </Card>
    </div>
</template>

<script setup lang="ts">
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdminLayout from '@/layouts/admin.vue'

import { ref, onMounted } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

// On stocke la liste des hôtels (ici un seul) pour alimenter le tableau
const hotels = ref<Record<string, any>[]>([])
const loading = ref(true)

onMounted(async () => {
  if (!user.value) {
    loading.value = false
    return
  }

  // 1. Récupérer l'ID de l'hôtel de l'utilisateur
  const { data: userData, error: userError } = await supabase
    .from('user_informations')
    .select('hotel')
    .eq('id', user.value.id)
    .single<{ hotel: string | null }>()

  if (userError || !userData?.hotel) {
    console.error('Impossible de charger l\'id de l\'hôtel :', userError)
    loading.value = false
    return
  }

  // 2. Récupérer les infos de l'hôtel
  const { data: hotelData, error: hotelError } = await supabase
    .from('hotel')
    .select('*')
    .eq('id', userData.hotel)
    .single<Record<string, any>>()

  if (hotelError || !hotelData) {
    console.error('Impossible de charger les informations de l\'hôtel :', hotelError)
  } else {
    // On place l'objet hotelData dans un tableau pour le v-for
    hotels.value = [hotelData]
  }

  loading.value = false
})
</script>

<template>
  <AdminLayout>
    <Tabs default-value="all">
      <!-- <div class="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" class="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div class="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" size="sm" class="h-7 gap-1">
                <ListFilter class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem checked>Active</DropdownMenuItem>
              <DropdownMenuItem>Draft</DropdownMenuItem>
              <DropdownMenuItem>Archived</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" class="h-7 gap-1">
            <File class="h-3.5 w-3.5" />
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" class="h-7 gap-1">
            <PlusCircle class="h-3.5 w-3.5" />
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Hotel
            </span>
          </Button>
        </div>
      </div> -->

      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>Hotels</CardTitle>
            <CardDescription>
              Informations sur votre hôtel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div v-if="loading" class="py-4 text-center">Chargement…</div>
            <div v-else>
              <Table v-if="hotels.length">
                <TableHeader>
                  <TableRow>
                    <TableHead class="hidden w-[100px] sm:table-cell">
                      <span class="sr-only">img</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead class="hidden md:table-cell">Address</TableHead>
                    <TableHead class="hidden md:table-cell">Phone</TableHead>
                    <TableHead class="hidden md:table-cell">Email</TableHead>
                    <TableHead>
                      <span class="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="hotel in hotels" :key="hotel.id">
                    <TableCell class="hidden sm:table-cell">
                      <img
                        :alt="hotel.name"
                        class="aspect-square rounded-md object-cover"
                        height="64"
                        :src="hotel.photo || './placeholder.svg'"
                        width="64"
                      />
                    </TableCell>
                    <TableCell class="font-medium">{{ hotel.name }}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {{ hotel.tags?.join(', ') || 'No Tags' }}
                      </Badge>
                    </TableCell>
                    <TableCell class="hidden md:table-cell">
                      {{ hotel.address }}
                    </TableCell>
                    <TableCell class="hidden md:table-cell">
                      {{ hotel.phone }}
                    </TableCell>
                    <TableCell class="hidden md:table-cell">
                      {{ hotel.email }}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal class="h-4 w-4" />
                            <span class="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p v-else class="py-4 text-center text-muted-foreground">
                Informations de l'hôtel non trouvées.
              </p>
            </div>
          </CardContent>
          <CardFooter v-if="hotels.length">
            <div class="text-xs text-muted-foreground">
              Showing <strong>1-{{ hotels.length }}</strong> of
              <strong>{{ hotels.length }}</strong> hotel
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

definePageMeta({
  layout: 'admin'
})

const client = useSupabaseClient()

const threshold = ref([])
const periods = ref([])
const hotels = ref([])
const userHotelId = ref(null)
const loading = ref(false)

const newPeriod = ref({
  name: '',
  start_date: '',
  end_date: '',
  accept_threshold: 0,
  reject_threshold: 0
})

const showDialog = ref(false)
const isSubmitting = ref(false)

const updatedThreshold = ref({
  accept_threshold: 80,
  reject_threshold: 20
})

onMounted(async () => {
  await loadUserHotel()
  if (userHotelId.value) {
    await loadthreshold()
    await loadPeriods()
  }
})

async function loadUserHotel() {
  console.log('Chargement des informations de l\'hôtel de l\'utilisateur...')
  try {
    // Récupérer toutes les informations pour vérifier la structure
    const { data, error } = await client.from('user_informations').select('*')
    
    console.log('Données user_informations complètes:', data)
    
    if (error) {
      console.error('Erreur lors de la récupération des informations:', error)
      return
    }
    
    if (data && data.length > 0) {
      console.log('Structure de la première ligne:', data[0])
      console.log('Colonnes disponibles:', Object.keys(data[0]))
      
      // Vérifier quelle colonne est disponible
      if ('hotel_id' in data[0]) {
        userHotelId.value = data[0].hotel_id
        console.log('Utilisation de hotel_id:', userHotelId.value)
      } 
      else if ('id_hotel' in data[0]) {
        userHotelId.value = data[0].id_hotel
        console.log('Utilisation de id_hotel:', userHotelId.value)
      }
      else {
        console.log('Ni hotel_id ni id_hotel ne sont présents dans la table')
      }
    } else {
      console.log('Aucune donnée trouvée dans user_informations')
    }
  } catch (e) {
    console.error('Exception dans loadUserHotel:', e)
  }
}

async function loadthreshold() {
  console.log('Chargement des seuils...')
  loading.value = true
  try {
    const { data, error } = await client.from('threshold')
      .select('*')
      .eq('id_hotel', userHotelId.value)
      .maybeSingle()

    console.log('Données reçues (threshold):', data, 'Erreur:', error)

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading threshold:', error)
      return
    }

    if (data) {
      threshold.value = [data]
      updatedThreshold.value = { ...data }
      console.log('Seuils chargés:', threshold.value)
    } else {
      // Initialize with default values when no threshold exist
      updatedThreshold.value = {
        id_hotel: userHotelId.value,
        accept_threshold: 80,
        reject_threshold: 20
      }
      console.log('Aucun seuil trouvé, valeurs par défaut:', updatedThreshold.value)
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

async function loadPeriods() {
  console.log('Chargement des périodes avec id_hotel:', userHotelId.value)
  const { data, error } = await client.from('threshold_period').select('*').eq('id_hotel', userHotelId.value)
  console.log('Données reçues (periods):', data, 'Erreur:', error)
  periods.value = data
}

async function savePeriod() {
  isSubmitting.value = true
  const payload = { ...newPeriod.value, id_hotel: userHotelId.value }
  const { error } = await client.from('threshold_period').insert([payload])
  if (!error) {
    showDialog.value = false
    await loadPeriods()
    resetForm()
  }
  isSubmitting.value = false
}

function resetForm() {
  newPeriod.value = {
    name: '',
    start_date: '',
    end_date: '',
    accept_threshold: 0,
    reject_threshold: 0
  }
}

async function updateDefaultThreshold() {
  if (!userHotelId.value) return

  const accept = updatedThreshold.value.accept_threshold
  const reject = updatedThreshold.value.reject_threshold

  if (accept + reject > 100) {
    alert("La somme des seuils d'acceptation et de refus ne doit pas dépasser 100%.")
    return
  }

  if (threshold.value.length === 0) {
    const { error } = await client
      .from('threshold')
      .insert([{
        id_hotel: userHotelId.value,
        accept_threshold: accept,
        reject_threshold: reject
      }])

    if (!error) {
      await loadthreshold()
      alert('Seuil par défaut créé.')
    } else {
      alert('Erreur lors de la création du seuil: ' + error.message)
    }
  } else {
    const { error } = await client
      .from('threshold')
      .update({
        accept_threshold: accept,
        reject_threshold: reject
      })
      .eq('id_hotel', userHotelId.value)

    if (!error) {
      await loadthreshold()
      alert('Seuil par défaut mis à jour.')
    } else {
      alert('Erreur lors de la mise à jour: ' + error.message)
    }
  }
}

async function deletePeriod(id) {
  if (confirm('Supprimer cette période ?')) {
    await client.from('threshold_period').delete().eq('id', id)
    await loadPeriods()
  }
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Seuils - Gestion</h1>

    <div>
      <h2 class="text-lg font-semibold">Seuil par défaut</h2>
      <div class="space-y-2 max-w-xs">
        <div>
          <Label>Seuil d'acceptation (%)</Label>
          <Input type="number" v-model="updatedThreshold.accept_threshold" min="0" max="100" />
        </div>
        <div>
          <Label>Seuil de refus (%)</Label>
          <Input type="number" v-model="updatedThreshold.reject_threshold" min="0" max="100" />
        </div>
        <Button class="mt-2" @click="updateDefaultThreshold">
          {{ threshold.length ? 'Enregistrer les seuils' : 'Créer un seuil' }}
        </Button>
      </div>
      <div v-if="!userHotelId" class="text-sm text-muted-foreground mt-2">
        Vous devez être associé à un hôtel pour gérer les seuils.
      </div>
    </div>

    <div>
      <h2 class="text-lg font-semibold">Périodes spécifiques</h2>

      <Dialog v-model:open="showDialog">
        <DialogTrigger as-child>
          <Button class="my-2">Ajouter une période</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle période spécifique</DialogTitle>
          </DialogHeader>

          <div class="space-y-3">
            <div>
              <Label>Nom</Label>
              <Input v-model="newPeriod.name" />
            </div>
            <div>
              <Label>Début</Label>
              <Input v-model="newPeriod.start_date" type="date" />
            </div>
            <div>
              <Label>Fin</Label>
              <Input v-model="newPeriod.end_date" type="date" />
            </div>
            <div>
              <Label>Seuil Acceptation (%)</Label>
              <Input v-model="newPeriod.accept_threshold" type="number" min="0" max="100" />
            </div>
            <div>
              <Label>Seuil Refus (%)</Label>
              <Input v-model="newPeriod.reject_threshold" type="number" min="0" max="100" />
            </div>
          </div>

          <DialogFooter class="mt-4">
            <Button variant="outline" @click="showDialog = false">Annuler</Button>
            <Button :disabled="isSubmitting" @click="savePeriod">Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Table v-if="periods.length">
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Début</TableHead>
            <TableHead>Fin</TableHead>
            <TableHead>Acceptation</TableHead>
            <TableHead>Refus</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="p in periods" :key="p.id">
            <TableCell>{{ p.name }}</TableCell>
            <TableCell>{{ p.start_date }}</TableCell>
            <TableCell>{{ p.end_date }}</TableCell>
            <TableCell>{{ p.accept_threshold }}%</TableCell>
            <TableCell>{{ p.reject_threshold }}%</TableCell>
            <TableCell>
              <Button variant="destructive" size="sm" @click="deletePeriod(p.id)">Supprimer</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div v-else class="text-muted">Aucune période spécifique définie.</div>
    </div>
  </div>
</template>

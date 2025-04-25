<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Saisonnalité</h1>

    <div v-if="loading">Chargement...</div>

    <div v-else>
      <div class="max-w-md space-y-4">
        <h2 class="text-lg font-semibold">Nouvelle saison</h2>

        <div>
          <Label>Chambre</Label>
          <select v-model="newSeason.id_room" class="w-full border rounded p-2">
            <option value="">Sélectionnez une chambre</option>
            <option v-for="room in rooms" :key="room.id" :value="room.id">
              {{ room.description }}
            </option>
          </select>
        </div>

        <div>
          <Label>Début</Label>
          <Input type="date" v-model="newSeason.start_date" />
        </div>

        <div>
          <Label>Fin</Label>
          <Input type="date" v-model="newSeason.end_date" />
        </div>

        <div>
          <Label>Impact (%)</Label>
          <Input type="number" min="0" max="100" v-model="newSeason.impact_percent" />
        </div>

        <div>
          <Label>Direction</Label>
          <select v-model="newSeason.direction" class="w-full border rounded p-2">
            <option value="">Sélectionnez</option>
            <option value="up">Hausse</option>
            <option value="down">Baisse</option>
          </select>
        </div>

        <Button @click="submitSeason">Enregistrer la saison</Button>
      </div>

      <hr class="my-8" />

      <div v-if="seasons.length">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Chambre</TableHead>
              <TableHead>Début</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Direction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="s in seasons" :key="s.id">
              <TableCell>{{ getRoomName(s.id_room) }}</TableCell>
              <TableCell>{{ s.start_date }}</TableCell>
              <TableCell>{{ s.end_date }}</TableCell>
              <TableCell>{{ s.impact_percent }}%</TableCell>
              <TableCell>{{ s.direction === 'up' ? 'Hausse' : 'Baisse' }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div v-else class="text-muted">Aucune saisonnalité définie pour vos chambres.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

const client = useSupabaseClient()

const userHotelId = ref(null)
const rooms = ref([])
const seasons = ref([])
const loading = ref(true)

const newSeason = ref({
  id_room: '',
  start_date: '',
  end_date: '',
  impact_percent: 0,
  direction: ''
})

onMounted(async () => {
  await loadUserHotel()
  if (userHotelId.value) {
    await loadRooms()
    await loadSeasons()
  }
  loading.value = false
})

async function loadUserHotel() {
  const { data, error } = await client.from('user_informations').select('id_hotel').single()
  if (data && !error) {
    userHotelId.value = data.id_hotel
  }
}

async function loadRooms() {
  const { data } = await client.from('room').select('id, description').eq('id_hotel', userHotelId.value)
  rooms.value = data
}

async function loadSeasons() {
  const roomIds = rooms.value.map(r => r.id)
  if (!roomIds.length) return

  const { data } = await client
    .from('seasonality')
    .select('*')
    .in('id_room', roomIds)
  seasons.value = data || []
}

function getRoomName(roomId) {
  const room = rooms.value.find(r => r.id === roomId)
  return room ? room.description : 'Chambre inconnue'
}

async function submitSeason() {
  if (
    !newSeason.value.id_room ||
    !newSeason.value.start_date ||
    !newSeason.value.end_date ||
    !newSeason.value.direction
  ) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }

  const { error } = await client.from('seasonality').insert([newSeason.value])
  if (error) {
    alert('Erreur lors de l’enregistrement : ' + error.message)
  } else {
    await loadSeasons()
    resetForm()
    alert('Saison enregistrée.')
  }
}

function resetForm() {
  newSeason.value = {
    id_room: '',
    start_date: '',
    end_date: '',
    impact_percent: 0,
    direction: ''
  }
}
</script>


<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)

const contacts = JSON.parse(localStorage.getItem('Listes')) || []

const contact = ref(
  contacts.find(c => c.id === id)
)

function retour() {
  router.push('/')
}

function modifier() {
  router.push('/modifier/' + id)
}
</script>

<template>
  <div class="container">

    <div class="entete">
      <h1>Détails du contact</h1>
      <p>Informations complètes du contact sélectionné</p>
    </div>

    <div v-if="contact" class="carte">

      <img
        :src="contact.photo || 'https://placehold.co/150x150'"
        :alt="contact.nom"
        class="photo"
      >

      <h2>{{ contact.prenom }} {{ contact.nom }}</h2>

      <div class="informations">

        <div class="information">
          <span>Identifiant :</span>
          <p>{{ contact.id }}</p>
        </div>

        <div class="information">
          <span>Nom :</span>
          <p>{{ contact.nom }}</p>
        </div>

        <div class="information">
          <span>Prénom :</span>
          <p>{{ contact.prenom }}</p>
        </div>

        <div class="information">
          <span>Téléphone :</span>
          <p>{{ contact.telephone }}</p>
        </div>

        <div class="information">
          <span>Email :</span>
          <p>{{ contact.email }}</p>
        </div>

      </div>

      <div class="actions">
        <button class="retour" @click="retour">
          Retour
        </button>

        <button class="modifier" @click="modifier">
          Modifier
        </button>
      </div>

    </div>

    <div v-else class="erreur">
      <h2>Contact introuvable !</h2>
      <button class="retour" @click="retour">
        Retour à la liste
      </button>
    </div>

  </div>
</template>

<style scoped>
.container {
  max-width: 700px;
  margin: 40px auto;
  padding: 25px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px #ccc;
}

.entete {
  text-align: center;
  background: #1976d2;
  color: white;
  padding: 20px;
  border-radius: 8px;
}

.entete h1 {
  margin: 0;
}

.entete p {
  margin-bottom: 0;
}

.carte {
  text-align: center;
  padding: 25px;
}

.photo {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #1976d2;
}

.carte h2 {
  color: #1976d2;
  margin: 15px 0 25px;
}

.informations {
  text-align: left;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

.information {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 12px;
}

.information:last-child {
  border-bottom: none;
}

.information span {
  font-weight: bold;
  color: #1976d2;
}

.information p {
  margin: 0;
  color: #555;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
}

button {
  padding: 11px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.retour {
  background: #7f8c8d;
}

.modifier {
  background: #0866d8;
}

button:hover {
  opacity: 0.85;
}

.erreur {
  text-align: center;
  padding: 30px;
}

@media (max-width: 600px) {
  .information {
    flex-direction: column;
    gap: 5px;
  }

  .actions {
    flex-direction: column;
  }
}
</style>

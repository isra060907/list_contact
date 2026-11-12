
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const id = route.params.id

let liste = JSON.parse(localStorage.getItem('Listes')) || []

const contact = ref({
  nom: '',
  prenom: '',
  telephone: '',
  email: '',
  photo: ''
})

const erreur = ref('')

if (id) {
  const c = liste.find(c => c.id == id)

  if (c) {
    contact.value = { ...c }
  }
}

function choisirImage(event) {
  const fichier = event.target.files[0]

  if (fichier) {
    if (!fichier.type.startsWith('image/')) {
      erreur.value = 'Veuillez choisir une image valide'
      return
    }

    const lecteur = new FileReader()

    lecteur.onload = () => {
      contact.value.photo = lecteur.result
      erreur.value = ''
    }

    lecteur.readAsDataURL(fichier)
  }
}

function enregistrer() {
  erreur.value = ''

  if (
    contact.value.nom.trim() === '' ||
    contact.value.prenom.trim() === '' ||
    contact.value.telephone.trim() === '' ||
    contact.value.email.trim() === ''
  ) {
    erreur.value = 'Tous les champs sont obligatoires'
    return
  }

  const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailValide.test(contact.value.email)) {
    erreur.value = 'Adresse e-mail invalide'
    return
  }

  if (id) {
    const index = liste.findIndex(c => c.id == id)

    if (index === -1) {
      erreur.value = 'Contact introuvable'
      return
    }

    liste[index] = {
      ...contact.value,
      id: Number(id)
    }
  } else {
    const nouveau = {
      id: liste.length > 0
        ? Math.max(...liste.map(c => c.id)) + 1
        : 1,
      ...contact.value
    }

    liste.push(nouveau)
  }

  localStorage.setItem('Listes', JSON.stringify(liste))

  alert('Enregistrement effectué')

  router.push('/')
}

function retour() {
  router.push('/')
}
</script>

<template>
  <div class="container">

    <h1>
      {{ id ? 'Modifier un contact' : 'Ajouter un contact' }}
    </h1>

    <form @submit.prevent="enregistrer">

      <div class="modifier-container">

        <div class="image-pc">

          <div class="cadre-image">

            <img
              v-if="contact.photo"
              :src="contact.photo"
              :alt="contact.nom"
            >

            <p v-else>Aucune image</p>

          </div>

          <label class="choisir">
            Galerie

            <input
              type="file"
              accept="image/*"
              @change="choisirImage"
              hidden
            >
          </label>

          <label class="choisir camera">
            Caméra

            <input
              type="file"
              accept="image/*"
              capture="environment"
              @change="choisirImage"
              hidden
            >
          </label>

        </div>

        <div class="formulaire">

          <label>Nom *</label>
          <input
            type="text"
            v-model="contact.nom"
            required
          >

          <label>Prénom *</label>
          <input
            type="text"
            v-model="contact.prenom"
            required
          >

          <label>Téléphone *</label>
          <input
            type="tel"
            v-model="contact.telephone"
            required
          >

          <label>E-mail *</label>
          <input
            type="email"
            v-model="contact.email"
            required
          >

          <div class="liens">

            <a
              :href="'tel:' + contact.telephone"
              class="appeler"
              v-if="contact.telephone"
            >
              Appeler
            </a>

            <a
              :href="'mailto:' + contact.email"
              class="email"
              v-if="contact.email"
            >
              E-mail
            </a>

          </div>

        </div>

      </div>

      <p v-if="erreur" class="erreur">
        {{ erreur }}
      </p>

      <div class="actions">

        <button
          type="button"
          class="annuler"
          @click="retour"
        >
          Retour
        </button>

        <button
          type="submit"
          class="enregistrer"
        >
          Enregistrer
        </button>

      </div>

    </form>

  </div>
</template>

<style scoped>
.container {
  max-width: 950px;
  margin: 40px auto;
  padding: 25px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px #ccc;
}

h1 {
  background-color: #1976d2;
  color: white;
  padding: 15px;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 25px;
}

.modifier-container {
  display: flex;
  gap: 25px;
  align-items: flex-start;
}

.image-pc {
  width: 40%;
  text-align: center;
}

.cadre-image {
  width: 100%;
  height: 230px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  overflow: hidden;
}

.cadre-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.choisir {
  display: inline-block;
  background-color: #e5e9ed;
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin: 5px;
}

.choisir:hover {
  background-color: #d0d7df;
}

.camera {
  background-color: #dceeff;
  color: #0866d8;
}

.formulaire {
  width: 60%;
}

.formulaire label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
  color: #333;
}

input[type="text"],
input[type="tel"],
input[type="email"] {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

input:focus {
  border-color: #1976d2;
}

.liens {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.liens a {
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
}

.appeler {
  background-color: #27ae60;
}

.email {
  background-color: #0866d8;
}

.erreur {
  color: red;
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.enregistrer {
  background-color: #0866d8;
}

.annuler {
  background-color: #7f8c8d;
}

button:hover {
  opacity: 0.85;
}

@media (max-width: 650px) {
  .modifier-container {
    flex-direction: column;
  }

  .image-pc,
  .formulaire {
    width: 100%;
  }
}
</style>

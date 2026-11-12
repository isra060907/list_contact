
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const contactsInitiaux = [
  {
    id: 1,
    nom: "Ben Ahmed",
    prenom: "Ali",
    telephone: "22123456",
    email: "ali@gmail.com",
    photo: "https://i.pravatar.cc/300?img=12"
  },
  {
    id: 2,
    nom: "Gribi",
    prenom: "Sara",
    telephone: "28965478",
    email: "sara@gmail.com",
    photo: "https://i.pravatar.cc/300?img=47"
  },
  {
    id: 3,
    nom: "Jmil",
    prenom: "Mohamed",
    telephone: "9952147",
    email: "mohamed@gmail.com",
    photo: "https://i.pravatar.cc/300?img=13"
  },
  {
    id: 4,
    nom: "Haddad",
    prenom: "Noura",
    telephone: "54214996",
    email: "noura@gmail.com",
    photo: "https://i.pravatar.cc/300?img=44"
  },
  {
    id: 5,
    nom: "Mansouri",
    prenom: "Yamina",
    telephone: "23123456",
    email: "yamina@gmail.com",
    photo: "https://i.pravatar.cc/300?img=14"
  }
]

const contacts = ref(
  JSON.parse(localStorage.getItem('Listes')) || contactsInitiaux
)

if (!localStorage.getItem('Listes')) {
  localStorage.setItem('Listes', JSON.stringify(contactsInitiaux))
}
function ajouter() {
  router.push('/ajouter')
}

function modifier(id) {
  router.push('/modifier/' + id)
}

function details(id) {
  router.push('/details/' + id)
}
</script>

<template>
  <div class="container">

    <div class="entete">
      <div>
        <h1>Gestion des contacts</h1>
        <p>Consultez et gérez votre liste de contacts</p>
      </div>

      <button class="ajouter" @click="ajouter">
        + Ajouter
      </button>
    </div>

    <h2>Liste des contacts</h2>

    <div class="liste">

      <div
        class="contact"
        v-for="c in contacts"
        :key="c.id"
      >

        <img
          :src="c.photo || 'https://placehold.co/100x100'"
          :alt="c.nom"
          class="photo"
        >

        <div class="informations">
          <h3>{{ c.prenom }} {{ c.nom }}</h3>
          <p>📞 {{ c.telephone }}</p>
          <p>✉️ {{ c.email }}</p>
        </div>

        <div class="actions">
          <button
            class="details"
            @click="details(c.id)"
          >
            Détails
          </button>

          <button
            class="modifier"
            @click="modifier(c.id)"
          >
            Modifier
          </button>
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 25px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px #ccc;
}

.entete {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

h2 {
  color: #1976d2;
  margin: 25px 0;
}

.liste {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}

.photo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #1976d2;
}

.informations {
  flex: 1;
}

.informations h3 {
  color: #1976d2;
  margin: 0 0 10px;
}

.informations p {
  margin: 5px 0;
  color: #555;
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.ajouter {
  background: #27ae60;
}

.details {
  background: #7f8c8d;
}

.modifier {
  background: #0866d8;
}

button:hover {
  opacity: 0.85;
}

@media (max-width: 650px) {
  .entete {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .contact {
    flex-wrap: wrap;
  }

  .informations {
    min-width: 150px;
  }

  .actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>

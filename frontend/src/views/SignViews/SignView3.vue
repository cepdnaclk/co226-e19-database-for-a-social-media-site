<template>
    <div class="sign">
        <form @submit.prevent="submit">
            <h3>Allmost There</h3>
            <div class="profile-pic">
                <label for="profpic" class="img">
                    <p :class="hasImg">Choose a picture</p>
                    <img :src="imgTempSrc" alt="">
                </label>
                <input id="profpic" type="file" @change="fileHandle" accept=".jpg, .png">
            </div>
            <div class="form-input">
                <label for="">Affiliation</label>
                <input type="text" placeholder="job" v-model="affiliation">
            </div>
            <div class="form-input">
                <label for="">Bio</label>
                <textarea rows="5" placeholder="I am ..." v-model="bio"></textarea>
            </div>
            <div class="form-input">
                <label>Interests</label>
                <input type="text" placeholder="sports" v-model="searchText">
                <div class="deck">
                    <div class="pill" v-for="(interest, index) in filterInterest" :key="index">
                        <input :id="`int${index}`" type="checkbox" :value="interest" v-model="interests">
                        <label :for="`int${index}`">
                            <span>{{ interest }}</span>
                            <img src="../../assets/check.png" alt="">
                        </label>
                    </div>
                </div>
            </div>
            <button type="submit">Finish</button>
        </form>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


const store = useStore()
const router = useRouter()

const imgTempSrc = ref("")
const hasImg = ref("")
const file = ref()
const fileHandle = (e) => {
    file.value = e.target.files[0]
    imgTempSrc.value = URL.createObjectURL(e.target.files[0])
    hasImg.value = "hasimg"
}

const interestsList = [
    "Sports",
    "Music",
    "Art",
    "Cooking",
    "Travel",
    "Technology",
    "Fashion",
    "Photography",
    "Reading",
    "Gaming",
    "Fitness",
    "Movies",
    "Dancing",
    "Nature",
    "Writing",
    "Science",
    "History",
    "Cycling",
    "Yoga",
    "DIY",
    "Animals",
    "Hiking",
    "Singing",
    "Swimming",
    "Cars",
    "Drawing",
    "Coding",
    "Languages",
    "Mathematics",
    "Food",
    "Coffee",
    "Tea",
    "Pets",
    "Cooking",
    "Baking",
    "Gardening",
    "Vintage",
    "Fashion",
    "Shopping",
    "Volunteering",
    "Crafts",
    "Board Games",
    "Puzzles",
    "Mindfulness",
    "Meditation",
    "Running",
    "Surfing",
    "Skating",
    "Skydiving",
    "Skiing",
    "Snowboarding",
    "Horseback Riding",
    "Camping",
    "Concerts",
    "Theater",
    "Musicals",
    "Comedy",
    "History",
    "Politics",
    "Documentaries",
    "Podcasts",
    "Cooking Shows",
    "Outdoor Adventures",
    "Fashion Design",
    "Interior Design",
    "Sculpting",
    "Pottery",
    "Calligraphy",
    "Archery",
    "Fishing",
    "Chess",
    "Billiards",
    "Painting",
    "Origami",
    "Film-making",
    "Stargazing",
    "Astronomy",
    "Model Building",
    "Woodworking",
    "Virtual Reality",
    "Robotics",
    "Gardening",
    "Rock Climbing",
    "Fitness Training",
    "Online Courses",
    "Space Exploration",
    "Antique Collecting",
    "Fashion Photography",
    "Graphic Design",
    "Cookbook Authoring",
    "Local History",
    "Travel Photography",
    "Sustainable Living",
    "Aquarium Keeping",
    "Outdoor Photography",
    "Jewelry Making",
    "Bird Watching",
];

const searchText = ref("")
const filterInterest = computed(() => {
    return interestsList.reduce((filtered, interest) => {
        if (interest.toLowerCase().includes(searchText.value.toLowerCase())) {
            filtered.push(interest);
        }
        return filtered;
    }, []);
})

const affiliation = ref()
const bio = ref()
const interests = ref()

const submit = async () => {
    const formdata = new FormData()
    formdata.append('u_id', store.state.currentSignupUser)
    formdata.append('profile_picture', file.value)

    try {
        await axios.post("/profile_picture/upload", formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        await axios.post("/sign-up/final", {
            bio: bio.value,
            interests: interests.value
        })
    }
    catch (err) {
        store.commit("addError", err.response.data.error)
    }
}

</script >

<style scoped>
.sign {
    display: flex;
    align-items: center;
}

.sign .left {
    width: 50%;
    height: 500px;
    object-fit: contain;
}

.sign form {
    width: 100%;
    max-width: 600px;
    margin: auto;
}

.form-input textarea {
    width: 100%;
    border: none;
    margin-bottom: 1rem;
    background: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
    padding-inline: 10px;
    margin: 0;
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 300;
}

.form-input textarea:focus {
    outline: none;
}

.profile-pic {
    display: flex;
    align-items: center;
    justify-content: center;
}

.profile-pic input {
    display: none;
}

.profile-pic .img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    cursor: pointer;
}

.profile-pic .img p {
    font-weight: 300;
    font-size: 0.9rem;
    z-index: 2;
}

.profile-pic .img p.hasimg {
    box-shadow: 0 0 0 100px #00000055;
    background: #00000055;
    color: white;
    font-weight: 500;
    opacity: 0;
    transition: 0.5s all;
}

.profile-pic .img:hover p.hasimg {
    opacity: 1;
}

.profile-pic .img img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
}

.form-input .deck {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1rem 10px;
    max-height: 150px;
    overflow-y: scroll;
}

.form-input .deck .pill label {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    border: 1px solid #029432;
}

.form-input .deck .pill label img {
    opacity: 0;
}

.form-input .deck .pill input {
    display: none;
}

.form-input .deck .pill input:checked+label {
    background: #029432;
    color: white;
    font-weight: 500;
}

.form-input .deck .pill input:checked+label img {
    opacity: 1;
}
</style>
import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjAzYmY5NWYyYzA4ZmVlYmIxMWIzYjZmYmMxZTRkOCIsInN1YiI6IjY0ODlhZmY1OTkyNTljMDBlMmY3NjE5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.26KU_696lSCwm-Giq2c7Yo5FqC8tRCZQlioZ8iKx1uM"
  }
})
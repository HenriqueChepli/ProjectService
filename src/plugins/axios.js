import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTYwYjY4N2E0ODA3OWE3N2FmM2VhZTYwZDE0NzQ5YSIsIm5iZiI6MTczMTM1MzM2OC4yMjAwNzU2LCJzdWIiOiI2NzMyNTkzNzYwN2U4YWEyMGVmNjZlNjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hG1akkhE9B_AeqPIFjPMNkSZlW781QUudpEgs49m3yE`,
  },
})

export default api

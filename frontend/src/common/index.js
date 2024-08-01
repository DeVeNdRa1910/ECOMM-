const backendDomain = "http://localhost:5050"

const SummaryApi = {
  signUp:{
    url: `${backendDomain}/api/signup`,
    method: "post"
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post"
  }
}

export default SummaryApi;
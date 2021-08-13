const searchModule = (() => {
  const BASE_URL = "http://localhost:3000/api/v1/search"

  return {
    searchUsers: async () => {
      const query = document.getElementById("search").value

      const res = await fetch(BASE_URL + "?q=" + query)
      const result = await res.json()
      document.getElementById("users-list").innerHTML = "";
      result.forEach(user => {
        const body = document.createElement("tr")
        const keys = ["id", "name", "profile", "date_of_birth", "created_at", "updated_at"]
        keys.forEach(key => {
          const data = document.createElement("td");
          data.innerHTML = user[key];
          body.insertAdjacentElement("beforeend", data);
        })
        document.getElementById("users-list").insertAdjacentElement("beforeend", body)
      })

    }
  }
})()
const usersModule = (() => {
  const BASE_URL = "http://localhost:3000/api/v1/users"

  // ヘッダーの設定
  const headers = new Headers()
  headers.set("Content-Type", "application/json")

  const handleError = async (res) => {
    const resJson = await res.json()

    switch(res.status) {
      case 200:
        alert(resJson.message)
        window.location.href = "/"
        break;
      case 201:
        alert(resJson.message)
        window.location.href = "/"
        break;
      case 400:
        // リクエストのパラメータ間違い
        alert(resJson.error)
        break;
      case 404:
        // リクエストのリソースが見つからない
        alert(resJson.error)
        break;
      case 404:
        // サーバーの内部エラー
        alert(resJson.error)
        break;
      default:
        alert("何らかのエラーが発生しました")
        break;
    }
  }

  return {
    fetchAllUsers: async () => {
      const res = await fetch(BASE_URL)
      const users = await res.json()
      users.forEach(user => {
        const body = document.createElement("tr")
        const keys = ["id", "name", "profile", "date_of_birth", "created_at", "updated_at"]
        keys.forEach(key => {
          const data = document.createElement("td");
          data.innerHTML = user[key];
          body.insertAdjacentElement("beforeend", data);
        })
        const edit = document.createElement("td");
        edit.innerHTML = `<a href="edit.html?uid=${user.id}">編集</a>`
        body.insertAdjacentElement("beforeend", edit);
        document.getElementById("users-list").insertAdjacentElement("beforeend", body)
      })
    },
    createUser: async () => {
      const name = document.getElementById("name").value
      const profile = document.getElementById("profile").value
      const dateOfBirth = document.getElementById("date-of-birth").value

      // リクエストのbody
      const body = {
        name: name,
        profile: profile,
        date_of_birth: dateOfBirth,
      }

      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      })

      return handleError(res)
    },
    setExisitingValue: async (uid) => {
      const res = await fetch(BASE_URL + "/" + uid)
      const resJson = await res.json()
      document.getElementById("name").value = resJson.name
      document.getElementById("profile").value = resJson.profile
      document.getElementById("date-of-birth").value = resJson.date_of_birth
    },
    saveUser: async (uid) => {
      const name = document.getElementById("name").value
      const profile = document.getElementById("profile").value
      const dateOfBirth = document.getElementById("date-of-birth").value

      // リクエストのbody
      const body = {
        name: name,
        profile: profile,
        date_of_birth: dateOfBirth,
      }

      const res = await fetch(BASE_URL + "/" + uid, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body)
      })

      return handleError(res)
    },
    deleteUser: async (uid) => {
      const ret = window.confirm("このユーザーを削除しますか？")
      if(!ret) {
        return false
      } else {
        const res = await fetch(BASE_URL + "/" + uid, {
          method: "DELETE",
          headers: headers,
        })
        return handleError(res)
      }
    }
  }
})()
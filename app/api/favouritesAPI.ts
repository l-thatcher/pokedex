import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL =
  "http://laravel.test.react-native-back-end.orb.local/api/favourites";

export async function getFavourites() {
  const token = await AsyncStorage.getItem("authToken");
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log("Get favs response:", data);
  return data;
}

export async function addFavourite(name: string) {
  const token = await AsyncStorage.getItem("authToken");
  console.log("saving:", name, "with token:", token);

  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pokemon_name: name }),
  });
  const saveData = await res.json();
  console.log("Save fave resp", saveData.favorite);

  return saveData.favorite;
}

export async function removeFavourite(name: string) {
  const token = await AsyncStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/${name}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Remove favourite response status:", response);
}

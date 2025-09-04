const API_URL =
  "http://laravel.test.react-native-back-end.orb.local/api/recently-viewed";

export async function getRecents() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addRecent(name: string) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

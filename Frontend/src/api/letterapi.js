const API = "https://whispernote-1.onrender.com";

export const api = {
  createLetter: (text) =>
    fetch(`${API}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    }).then(res => res.json()),

  getLetter: (id) =>
    fetch(`${API}/letter/${id}`).then(res => res.json()),

  replyLetter: (id, text) =>
    fetch(`${API}/letter/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    }).then(res => res.json()),

 
  getAllLetters: () =>
    fetch(`${API}/show-all-data`).then(res => res.json())

    ,

  deleteLetter: (id) =>
    fetch(`${API}/delete-one/${id}`, {
      method: "DELETE"
    }).then(res => res.json())
};

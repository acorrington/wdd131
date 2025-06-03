

const year = document.querySelector("#year");
const today = new Date();
year.innerHTML = today.getFullYear();

const modified = document.querySelector("#modified");
const lastModified = new Date(document.lastModified);
modified.innerHTML = lastModified.toString();
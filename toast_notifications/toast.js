// script.js

let icon = {
    submit:
        '<span class="material-symbols-outlined">task_alt</span>',
    failed:
        '<span class="material-symbols-outlined">error</span>',
    warning:
        '<span class="material-symbols-outlined">warning</span>',
    information:
        '<span class="material-symbols-outlined">info</span>',
};
const data = {
    submit: 'Assignment submitted successfully',
    failed: 'Assignment submission failed',
    warning: 'Assignment submission critically failed',
    information: 'Assignment submission information: failed',
}

const btnsList = document.querySelectorAll(".btn");

function createToast(type) {
    console.log("Toast notification created", type);
    const toastDiv = document.createElement("div")
    toastDiv.classList.add("toast-notifications")
    toastDiv.innerText = `${icon[type]} ${data[type]}`

    const progressBar = document.createElement("div")
    progressBar.classList.add("progress")
    toastDiv.appendChild(progressBar)

    document.body.appendChild(toastDiv)
}

btnsList.forEach(btn => {
    btn.addEventListener("click", () => {
        createToast(btn.classList[1])
    })
})
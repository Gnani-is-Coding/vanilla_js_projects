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
let width = 0;
let timerId = null
let toastDiv = undefined;
function runTimer() {
    return new Promise((resolve, reject) => {
        timerId = setInterval(() => {
            width += 4;
            if (width > 100) {
                clearInterval(timerId)
                width = 0;
                return resolve()
            }
            document.querySelector(".progress").style.width = `${width}%`;
        }, 100)
    })



}

async function createToast(type) {
    if (toastDiv) {
        width = 1;
        clearInterval(timerId)
        document.body.removeChild(toastDiv)
    }
    toastDiv = document.createElement("div")
    toastDiv.classList.add("toast-notifications")
    toastDiv.innerText = `${icon[type]} ${data[type]}`

    const progressBar = document.createElement("div")
    progressBar.classList.add("progress")
    toastDiv.appendChild(progressBar)

    document.body.appendChild(toastDiv)

    await runTimer()

    document.body.removeChild(toastDiv)
    toastDiv = undefined
}

btnsList.forEach(btn => {
    btn.addEventListener("click", () => {
        createToast(btn.classList[1])
    })
})
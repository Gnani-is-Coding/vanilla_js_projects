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
    information: 'Information about assignment',
}

const btnsList = document.querySelectorAll(".btn");
let width = 0;
let timerId = null
let toastDiv = undefined;
function runTimer(toastDiv) {
    return new Promise((resolve, reject) => {
        timerId = setInterval(() => {
            width += 4;

            if (width > 100) {
                clearInterval(timerId)
                width = 1;
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
    toastDiv.classList.add("toast-notifications", type)
    toastDiv.innerHTML = `${icon[type]} ${data[type]}`

    const progressBar = document.createElement("div")
    progressBar.classList.add("progress")
    toastDiv.appendChild(progressBar)

    toastDiv.style.transform = "translate(- 25px)"
    document.body.appendChild(toastDiv)

    toastDiv.addEventListener("transitionend", () => {
        if (toastDiv) {
            document.body.removeChild(toastDiv)
            toastDiv = undefined
        }

    })

    await runTimer(toastDiv)
    toastDiv.style.transform = "translate(calc(100% + 25px))"

}

btnsList.forEach(btn => {
    btn.addEventListener("click", () => {
        createToast(btn.classList[1])
    })
})
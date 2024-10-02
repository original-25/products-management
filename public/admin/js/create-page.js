
const preview = document.querySelector(".preview-image");
const inputImage = document.querySelector("input[name='thumbnail']");


if(preview) {
    const image = preview.querySelector("img");
    const close = preview.querySelector("[close-preview]");

    inputImage.addEventListener("change", () => {
        const file = inputImage.files[0];
        if(file) {
            image.src=URL.createObjectURL(file);
        }
    })

    close.addEventListener("click", (e) => {
        image.src=""
    })

}

const alertError = document.querySelector("[error-validate]");

if(alertError) {
    setTimeout(() => {
        alertError.classList.add("alert-hidden")
    }, parseInt(alertError.getAttribute('time')));
}
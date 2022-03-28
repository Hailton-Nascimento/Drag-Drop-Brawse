const $dragArea = document.querySelector(".drag-area");
const $dragText = $dragArea.querySelector("header");
const $button = $dragArea.querySelector("button");
const $input = $dragArea.querySelector("input");


const checkedIsImage = (file) => {
    const { type } = file;
    const validExtension = ["image/jpg", "image/png", "image/jpeg"];
    return validExtension.some((item) => type === item);
};

const showWarning = () => {
    $dragArea.classList.add("error")
    $dragText.innerHTML = "Só são aceitas extenções:<br> .png .jpeg e .jpg";
    setTimeout(() => {
            $dragArea.classList.remove("error");
            $dragText.innerHTML = "Arraste e solte para<br> carregar o arquivo.";
        },
        2000);
}
const showFile = (file) => {
    const isImage = checkedIsImage(file);
    if (!isImage) {
        $dragArea.classList.remove("active");
        showWarning();
        return;
    }
    const fileReader = new FileReader(file);
    fileReader.onload = () => {
        const fileURL = fileReader.result;
        const templateImage = `<img src="${fileURL}" alt=''/>`;
        $dragArea.innerHTML = templateImage;
    };
    fileReader.readAsDataURL(file)
}

$dragArea.addEventListener("dragover", () => {
    event.preventDefault();
    console.log("esta em cima");
    $dragArea.classList.add("active");
    $dragText.innerHTML = "Solte para fazer<br>upload do arquivo.";
});

$dragArea.addEventListener("dragleave", () => {
    event.preventDefault();
    $dragArea.classList.remove("active");
    $dragText.innerHTML = "Arraste e solte para<br> carregar o arquivo.";
});

$dragArea.addEventListener("drop", () => {
    event.preventDefault();
    const file = event.dataTransfer.files[0]
    showFile(file);

});

$button.onclick = () => $input.click();

$input.addEventListener("change", () => {
    showFile(event.target.files[0]);
});
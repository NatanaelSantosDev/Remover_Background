

let photo = document.getElementById('picture');
let file = document.getElementById('fileimg');

// Adiciona um ouvinte de evento ao input de arquivo para monitorar alterações
file.addEventListener('change', () => {
    if (file.files.length > 0) {
        let reader = new FileReader();

        reader.onload = () => {
            photo.src = reader.result;
        }

        reader.readAsDataURL(file.files[0]);
    }
});

function handleUpload() {
    const image = file.files[0];

    if (!image) {
        console.error("Nenhum arquivo selecionado.");
        return;
    }

    const formData = new FormData();
    formData.append("image_file", image);
    formData.append('size', 'auto');

    const apiKey = "zjPysSChg7FvK15thmtaLMAy";

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey,
        },
        body: formData
    })
        .then(function (response) {
            return response.blob();
        })
        .then(function (blob) {
            const url = URL.createObjectURL(blob);
            imageURL = url;

            const img = new Image();
            img.onload = function () {
                const width = img.width;
                const height = img.height;

                const imgElement = document.createElement('img');
                imgElement.src = url;
                imgElement.width = width;
                imgElement.height = height;

                const bgRemoved = document.getElementById('bgRemoved');

                // Verifica se a div e a imagem não são nulas antes de manipular a div
                if (bgRemoved) {
                    // Limpa a div e adiciona a nova imagem
                    bgRemoved.innerHTML = '';
                    bgRemoved.appendChild(imgElement);
                } else {
                    console.error("Element with ID 'bgRemoved' not found");
                }
            };

            img.src = url;
        })
        .catch((error) => {
            console.error("Erro na solicitação de remoção de fundo:", error);
        });

    console.log("clicked");
}

file.addEventListener('click', (event) => {
    // Impede a propagação do evento para evitar clicar no input duas vezes
    event.stopPropagation();
});




function downloadFile() {
    var anchorElement = document.createElement('a');
    anchorElement.href = imageURL;
    anchorElement.download = 'no-bg.png';
    document.body.appendChild(anchorElement);

    anchorElement.click();

    document.body.removeChild(anchorElement);
}



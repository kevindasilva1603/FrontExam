document.addEventListener('DOMContentLoaded', function () {
    loadFormData()
    generatePackingList()
})

document
    .getElementById('packingForm')
    .addEventListener('submit', function (event) {
        event.preventDefault()
        saveFormData()
        generatePackingList()
        document.getElementById('resetButton').style.display = 'inline-block'
    })

document.getElementById('resetButton').addEventListener('click', function () {
    resetForm()
    this.style.display = 'none'
})

function saveFormData() {
    const nights = document.getElementById('nights').value
    const climate = document.getElementById('climate').value
    localStorage.setItem('nights', nights)
    localStorage.setItem('climate', climate)
}

function loadFormData() {
    const savedNights = localStorage.getItem('nights')
    const savedClimate = localStorage.getItem('climate')

    if (savedNights) {
        document.getElementById('nights').value = savedNights
    }
    if (savedClimate) {
        document.getElementById('climate').value = savedClimate
    }
}
function resetForm() {
    document.getElementById('nights').value = ''
    document.getElementById('climate').value = 'modere'
    document.getElementById('packingList').innerHTML = ''
    localStorage.removeItem('nights')
    localStorage.removeItem('climate')
}

function generatePackingList() {
    const nights = document.getElementById('nights').value
    const climate = document.getElementById('climate').value
    let listItems = [
        { label: 'Un sac à dos/valise' },
        { label: `${Math.min(nights, 10)} paire(s) de chaussettes` },
        { label: `${Math.min(nights, 10)} sous-vêtement(s)` },
        { label: `${Math.min(nights, 10)} t-shirt(s)` },
        { label: `${nights < 4 ? 1 : nights <= 6 ? 2 : 3} pull(s)/sweat(s)` },
        { label: `${nights < 4 ? 1 : nights <= 6 ? 2 : 3} pantalon(s)` },
    ]

    if (climate !== 'chaud') {
        listItems.push({ label: 'Une veste' })
    }

    if (nights > 6) {
        listItems.push({ label: '1 paire de chaussures' })
    }

    if (climate === 'chaud') {
        listItems.push({ label: 'Tongs/claquettes' })
        listItems.push({ label: 'Lunettes de soleil' })
        listItems.push({ label: 'Maillot de bain' })
    } else if (climate === 'froid') {
        listItems.push({ label: 'Gants' })
        listItems.push({ label: 'Bonnet' })
        listItems.push({ label: 'Écharpe' })
        listItems.push({ label: 'Chaussettes épaisses' })
    }

    let packingListHTML = ''
    if (nights > 10) {
        packingListHTML += `<div class="advice-message">Si vous partez en voyage plus de 10 nuits, faites des machines. Voyagez léger.</div>`
    }

    packingListHTML += listItems
        .map(
            (item) => `<div>
                <input type="checkbox" id="${item.label}" name="${item.label}">
                <label for="${item.label}">${item.label}</label>
            </div>`
        )
        .join('')

    const packingList = document.getElementById('packingList')
    packingList.innerHTML = packingListHTML
    document.getElementById('resetButton').style.display = 'block'
}

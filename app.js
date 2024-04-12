let baseUrl = 'http://localhost:3030/jsonstore/gifts/';

let loadPresentsButton = document.getElementById('load-presents')
let giftListElement = document.getElementById('gift-list')
let addBtnElement = document.getElementById('add-present')
let editBtnElement = document.getElementById('edit-present')
let giftInputField = document.getElementById('gift')
let forInputField = document.getElementById('for')
let priceInputField = document.getElementById('price')

const loadGifts = async () => {
    let response = await fetch(baseUrl)
    let data  = await response.json()

    giftListElement.innerHTML = ''

    for (const gift of Object.values(data)) {
        let giftSockElement = addGiftElement(gift['gift'], gift['for'], gift['price'], gift['_id'])
        giftListElement.appendChild(giftSockElement)
    }

    

    function addGiftElement (gift, forWho, price, _id) {
        let giftP = document.createElement('p')
        giftP.textContent = gift
        let forP = document.createElement('p')
        forP.textContent = forWho
        let priceP = document.createElement('p')
        priceP.textContent = price

        let contentElement = document.createElement('div')
        contentElement.setAttribute('class', 'content')
        contentElement.appendChild(giftP)
        contentElement.appendChild(forP)
        contentElement.appendChild(priceP)

        let changeBtn = document.createElement('button')
        changeBtn.setAttribute('class', 'change-btn')
        changeBtn.textContent = 'Change'

        let deleteBtn = document.createElement('button')
        deleteBtn.setAttribute('class', 'delete-btn')
        deleteBtn.textContent = 'Delete'

        deleteBtn.addEventListener('click', async () => {
            const response = await fetch(`${baseUrl}/${_id}`, {
                method: 'DELETE'
            });

            loadGifts();
        })

        let buttonsContainerElement  = document.createElement('div')
        buttonsContainerElement.setAttribute('class', 'buttons-container')
        buttonsContainerElement.appendChild(changeBtn)
        buttonsContainerElement.appendChild(deleteBtn)

        let giftSockElement = document.createElement('div')
        giftSockElement.setAttribute('class', 'gift-sock')
        giftSockElement.appendChild(contentElement)
        giftSockElement.appendChild(buttonsContainerElement)

        return giftSockElement
    }
}

loadPresentsButton.addEventListener('click', loadGifts)

addBtnElement.addEventListener('click', async () => {
    let gift = giftInputField.value
    let forVal = forInputField.value
    let price = priceInputField.value

    if (gift.length === 0 || forVal.length === 0 || price.length === 0){
        return
    }

    let response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({gift, for: forVal, price}),
    })

    await loadGifts();

    giftInputField.value = ''
    forInputField.value = ''
    priceInputField.value = ''
})
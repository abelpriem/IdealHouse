(function() {
    const lat = 40.4238362
    const lng = -3.6848187
    const mapa = L.map('mapa-inicio').setView([lat, lng], 6)

    let markers = new L.FeatureGroup().addTo(mapa)
    console.log(markers)

    let properties = []

    const filters = {
        category: '',
        price: ''
    }

    const categoriesSelect = document.querySelector('#categories')
    const pricesSelect = document.querySelector('#prices')

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa)

    categoriesSelect.addEventListener('change', option => {
        filters.category = +option.target.value
        filterProperties()
    })

    pricesSelect.addEventListener('change', option => {
        filters.price = +option.target.value
        filterProperties()
    })

    const obteinProperties = async () => {
        try {
            const url = '/properties'
            const response = await fetch(url)
            properties = await response.json()

            showProperties(properties.propiedades)

        } catch (error) {
            console.log(error)
        }
    }

    const showProperties = propiedades => {
        markers.clearLayers()

        propiedades.forEach(element => {
            const marker = new L.marker([element?.lat, element?.lng], {
                autoPan: true
            })
            .addTo(mapa)
            .bindPopup(`
                <p class="text-indigo-600 font-bold">${element?.category.name}</p>
                <h1 class="text-xl font-extrabold my-2">${element?.title}</h1>
                <img src='/uploads/${element?.image}' alt="Imagen de la Propiedad ${element?.title}">
                <p class="text-gray-600 font-bold">${element?.price.name}</p>
                <a href="/property/${element.id}" class="bg-indigo-600 block py-2 text-center font-bold">Ver propiedad</a>
            `)

            markers.addLayer(marker)
        })
    }

    const filterProperties = () => {
        const result = properties.propiedades.filter(filterCategory).filter(filterPrice)
        showProperties(result)
    }

    const filterCategory = (property) => {
        return filters.category ? +property.categoryId === filters.category : property
    }

    const filterPrice = (property) => {
        return filters.price ? +property.priceId === filters.price : property
    }

    obteinProperties()
})()

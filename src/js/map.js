(function() {

    const lat = document.querySelector('#lat').value || 40.4238362;
    const lng = document.querySelector('#lng').value || -3.6848187;
    const mapa = L.map('mapa').setView([lat, lng ], 16);

    let marker

    // USE PROVIDER AND GEOCODER
    const geocodeService = L.esri.Geocoding.geocodeService()

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa)

    // PIN
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    })
    .addTo(mapa)

    // LAT AND LONG DETECTED
    marker.on('moveend', function(e) {
        marker = e.target

        const position = marker.getLatLng()
        mapa.panTo(new L.LatLng(position.lat, position.lng))

        // OBTAIN STREET ADRESS
        geocodeService.reverse().latlng(position, 13).run(function(error, result) {
            // console.log(result)

            marker.bindPopup(result.address.LongLabel)

            // SAVE LOCATION DATA
            document.querySelector('.street').textContent = result.address.Address ?? ''
            document.querySelector('#street').value = result.address.Address ?? ''
            document.querySelector('#lat').value = result.latlng.lat ?? ''
            document.querySelector('#lng').value = result.latlng.lng ?? ''
        })
    })
})()
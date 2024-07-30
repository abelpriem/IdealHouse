import path from 'path'

export default {
    mode: 'development',
    entry: {
        mapa: './src/js/map.js',
        addImage: './src/js/addImage.js',
        showMap: './src/js/showMap.js',
        initMap: './src/js/initMap.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}
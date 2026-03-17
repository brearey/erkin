// получение координат
function success(pos) {
  const my_lat = pos.coords.latitude
  const my_lon = pos.coords.longitude
  console.log(my_lat, my_lon)
  
  // Arrays
  const distances = []
  data.features.forEach(byraan => {
    const lat1 = byraan.geometry.coordinates[1]
    const lon1 = byraan.geometry.coordinates[0]
    const d = calculateDistance(lat1, lon1, my_lat, my_lon)
    distances.push(d)
  })

  // Find min
  let minDistance = 1000000
  let minIndex = 0
  for (let i = 0; i < distances.length; i++) {
    if (distances[i] < minDistance) {
      minDistance = distances[i]
      minIndex = i
    }
  }
  console.log(data.features[minIndex].properties.iconCaption)
  console.log(minDistance, "km")
  const byraan = document.getElementById("byraan")
  const bName = data.features[minIndex].properties.iconCaption
  const bDesc = data.features[minIndex].properties.description

  const result = `Доброго времени суток! Ближайший быраан - "${bName}" находится на расстоянии ${Math.round(minDistance)} км от Вас. ${bDesc}`
  byraan.innerHTML = result
}
function error(err) {
  console.log(err.message)
}
navigator.geolocation.getCurrentPosition(success, error)

function calculateDistance(lat1, lon1, lat2, lon2) {
  // Радиус Земли в километрах
  const R = 6371;

  // Переводим градусы в радианы
  const toRadians = (degrees) => degrees * Math.PI / 180;

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  // Формула гаверсинусов
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Расстояние в километрах
  const distance = R * c;

  return distance;
}
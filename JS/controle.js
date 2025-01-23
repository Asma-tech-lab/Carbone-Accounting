
const co2Levels = [800, 1200, 1800]; // Les limites des niveaux de CO2
let currentCO2 = 800; // Niveau initial de CO2
const co2Data = []; // Pour stocker les données de CO2
const timeLabels = []; // Pour stocker les étiquettes de temps (ex: "0s", "40s", etc.)

// Configuration initiale du graphique
const ctx = document.getElementById('co2Chart').getContext('2d');
const co2Chart = new Chart(ctx, {
    type: 'line',  // Exemple: 'line', 'bar', 'pie', 'radar'
    data: {
        labels: timeLabels, // Les étiquettes des temps
        datasets: [{
            label: 'Niveau de CO2',
            data: co2Data, // Les données de CO2
            borderColor: 'rgba(255, 99, 132, 1)', // Couleur de la courbe
            fill: false,
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Temps (en secondes)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'CO2 (ppm)'
                },
                min: 0,
                max: 3000,
            }
        }
    }
});

// Fonction pour générer une émission aléatoire de CO2
function generateCO2Emission() {
    const emission = Math.floor(Math.random() * 200) + 200; // Valeur aléatoire entre 200 et 400 ppm
    return emission;
}

// Fonction pour mettre à jour les données et ajouter un nouveau point au graphique
function updateCO2Graph() {
    const emission = generateCO2Emission();
    currentCO2 += emission;

    // Déterminer le niveau de CO2
    let level;
    if (currentCO2 <= co2Levels[0]) {
        level = 'Niveau 1';
    } else if (currentCO2 <= co2Levels[1]) {
        level = 'Niveau 2';
    } else if (currentCO2 <= co2Levels[2]) {
        level = 'Niveau 3';
    } else {
        level = 'Niveau 4';
    }

    co2Data.push(currentCO2);
    timeLabels.push(`${co2Data.length * 40}s`); // Ajouter le label du temps à chaque 40 secondes

    // Mettre à jour le graphique avec les nouvelles données
    co2Chart.update();
}

// Simuler l'émission de CO2 toutes les 30 secondes et mettre à jour le graphique toutes les 40 secondes
let emissionInterval = setInterval(() => {
    updateCO2Graph(); // Met à jour les données et le graphique
}, 30000); // Émission toutes les 30 secondes

// Mettre à jour le graphique toutes les 40 secondes
setInterval(() => {
    co2Chart.update();
}, 40000); // Mise à jour toutes les 40 secondes

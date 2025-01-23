document.addEventListener("DOMContentLoaded", () => {
    const svgObject = document.getElementById("monSvg");
    if (svgObject) {
        svgObject.addEventListener("load", () => {
            const svgDoc = svgObject.contentDocument;
            if (svgDoc) {

                const start = svgDoc.querySelector("#path1");
                const BTRA = svgDoc.querySelector("#BTR-A");
                const BTRB = svgDoc.querySelector("#BTR-B");
                const BTRC = svgDoc.querySelector("#BTR-C");
                const BTRD = svgDoc.querySelector("#BTR-D");

                // Named variables for CO2 elements
                const co2A = svgDoc.querySelector("#CO2A");       // Associated with BTRA
                const co2B1 = svgDoc.querySelector("#CO2B-1");   // Associated with BTRB
                const co2B2 = svgDoc.querySelector("#CO2B-2");   // Associated with BTRB
                const co2C = svgDoc.querySelector("#CO2C");      // Associated with BTRC
                const co2D = svgDoc.querySelector("#CO2D");      // Associated with BTRD

                // Array for iteration
                const co2Elements = [co2B1, co2B2, co2A, co2D, co2C];

                if (start && co2Elements.every(el => el)) {
                    // Start button logic
                    start.addEventListener("click", () => {
                        const currentColor = start.style.fill;

                        if (currentColor === "red") {
                            start.style.fill = "green"; // Switch start to green
                            BTRA.style.fill = "green";
                            BTRB.style.fill = "green";
                            BTRC.style.fill = "green";
                            BTRD.style.fill = "green";
                        
                            co2A.style.display = "block";
                            co2B1.style.display = "block";
                            co2B2.style.display = "block";
                            co2C.style.display = "block";
                            co2D.style.display = "block";
                            changeColorOverTime(co2A, 5000); // Dégradé fluide sur 3 secondes
                            changeColorOverTime(co2B2, 5000); // Dégradé fluide sur 3 secondes
                            changeColorOverTime(co2B1, 5000); // Dégradé fluide sur 3 secondes
                            changeColorOverTime(co2C, 5000); // Dégradé fluide sur 3 secondes
                            changeColorOverTime(co2D, 5000); // Dégradé fluide sur 3 secondes
                        } else {
                            start.style.fill = "red"; // Switch start to red
                            BTRA.style.fill = "red";
                            BTRB.style.fill = "red";
                            BTRC.style.fill = "red";
                            BTRD.style.fill = "red";

                            co2Elements.forEach(el => el.style.display = "none");
                        }
                    });

                    // Individual button controls
                    BTRA.addEventListener("click", () => {
                        if (BTRA.style.fill === "green") {
                            BTRA.style.fill = "red";
                            co2A.style.display = "none";
                        } else {
                            BTRA.style.fill = "green";
                            co2A.style.display = "block";
                            changeColorOverTime(co2A, 5000); // Dégradé fluide sur 3 secondes

                        }
                    });

                    BTRB.addEventListener("click", () => {
                        if (BTRB.style.fill === " green") {
                            BTRB.style.fill = "red";
                            co2B1.style.display = "none";
                            co2B2.style.display = "none";
                        } else {
                            BTRB.style.fill = "green";
                            co2B1.style.display = "block";
                            co2B2.style.display = "block";
                            changeColorOverTime(co2B1, 5000); // Dégradé fluide sur 3 secondes
                            changeColorOverTime(co2B2, 5000); // Dégradé fluide sur 3 secondes

                        }
                    });

                    BTRC.addEventListener("click", () => {
                        if (BTRC.style.fill === "green") {
                            BTRC.style.fill = "red";
                            co2C.style.display = "none";
                        } else {
                            BTRC.style.fill = "green";
                            co2C.style.display = "block";
                            changeColorOverTime(co2C, 5000); // Dégradé fluide sur 3 secondes

                        }
                    });

                    BTRD.addEventListener("click", () => {
                        if (BTRD.style.fill === "green") {
                            BTRD.style.fill = "red";
                            co2D.style.display = "none";
                        } else {
                            BTRD.style.fill = "green";
                            co2D.style.display = "block";
                            changeColorOverTime(co2D, 5000); // Dégradé fluide sur 3 secondes

                        }
                    });
                }
            }
        });
    }
});

function changeColorOverTime(element, duration) {
    const startColor = { r: 220, g: 220, b: 220 };
    const endColor = { r: 0, g: 0, b: 0 };
    const startTime = performance.now();

    function animateColor(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentColor = {
            r: Math.round(startColor.r + (endColor.r - startColor.r) * progress),
            g: Math.round(startColor.g + (endColor.g - startColor.g) * progress),
            b: Math.round(startColor.b + (endColor.b - startColor.b) * progress),
        };

        const colorString = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
        element.style.fill = colorString;

        if (progress < 1) {
            requestAnimationFrame(animateColor);
        }
    }

    requestAnimationFrame(animateColor);
}


//CO2 POLAR CHART





document.addEventListener("DOMContentLoaded", () => {
  const svgObject = document.getElementById("monSvg");
  const updateInterval = 2000; // Mise à jour toutes les 2 secondes
  const increment = 0.4; // kg/h émis toutes les 2 secondes

  // Initialisation des émissions de CO₂
  const co2Levels = {
      A: 0,
      B: 0, // Regroupe B1 et B2
      C: 0,
      D: 0,
  };

  // Drapeaux pour contrôler l'arrêt des émissions
  const isRunning = {
      global: true, // État général (lié au bouton Start)
      A: true,
      B: true,
      C: true,
      D: true,
  };

  // Configuration du graphique Polar Area
  const ctx = document.getElementById("co2PolarChart").getContext("2d");
  const co2PolarChart = new Chart(ctx, {
      type: "polarArea",
      data: {
          labels: ["Zone A", "Zone B", "Zone C", "Zone D"],
          datasets: [
              {
                  label: "Niveau de CO₂ (kg/secondes)",
                  data: [co2Levels.A, co2Levels.B, co2Levels.C, co2Levels.D],
                  backgroundColor: [
                      "rgba(255, 99, 132, 0.6)", // Zone A
                      "rgba(54, 162, 235, 0.6)", // Zone B
                      "rgba(153, 102, 255, 0.6)", // Zone C
                      "rgba(255, 159, 64, 0.6)", // Zone D
                  ],
              },
          ],
      },
      options: {
          responsive: true,
          plugins: {
              legend: { position: "top" },
          },
          scales: {
              r: {
                  beginAtZero: true,
                  title: { display: true, text: "Niveau de CO₂ (kg/h)" },
              },
          },
      },
  });

  let BTRA, BTRB, BTRC, BTRD; // Déclaration globale des variables
  let start, CO2B1, CO2B2;

  // Fonction pour générer une valeur aléatoire de CO₂
  function getRandomCO2() {
      return (Math.random() * 10).toFixed(2); // Valeur aléatoire entre 0 et 10 kg/h
  }

  // Fonction pour mettre à jour les émissions de CO₂
  function updateCo2Levels() {
      if (
          isRunning.global &&
          BTRA?.style.fill === "green" &&
          BTRB?.style.fill === "green" &&
          BTRC?.style.fill === "green" &&
          BTRD?.style.fill === "green"
      ) {
          co2Levels.A += parseFloat(getRandomCO2());
          co2Levels.B += parseFloat(getRandomCO2());
          co2Levels.C += parseFloat(getRandomCO2());
          co2Levels.D += parseFloat(getRandomCO2());
      } else {
          if (isRunning.A && BTRA?.style.fill === "green") co2Levels.A += increment;
          if (isRunning.B && BTRB?.style.fill === "green") co2Levels.B += increment * 2;
          if (isRunning.C && BTRC?.style.fill === "green") co2Levels.C += increment;
          if (isRunning.D && BTRD?.style.fill === "green") co2Levels.D += increment;
      }

      co2PolarChart.data.datasets[0].data = [
          co2Levels.A,
          co2Levels.B,
          co2Levels.C,
          co2Levels.D,
      ];

      co2PolarChart.update();
  }

  const interval = setInterval(updateCo2Levels, updateInterval);

  if (svgObject) {
      svgObject.addEventListener("load", () => {
          const svgDoc = svgObject.contentDocument;

          if (svgDoc) {
              BTRA = svgDoc.querySelector("#BTR-A");
              BTRB = svgDoc.querySelector("#BTR-B");
              BTRC = svgDoc.querySelector("#BTR-C");
              BTRD = svgDoc.querySelector("#BTR-D");
              start = svgDoc.querySelector("#path1");
              CO2B1 = svgDoc.querySelector("#CO2B-1");
              CO2B2 = svgDoc.querySelector("#CO2B-2");

              const toggleCo2Elements = (isRunning, elements) => {
                  elements.forEach((el) => {
                      if (el) el.style.display = isRunning ? "block" : "none";
                  });
              };

              if (start) {
                  start.addEventListener("click", () => {
                      isRunning.global = !isRunning.global;
                      start.style.fill = isRunning.global ? "green" : "red";
                  });
              }

              if (BTRA) {
                  BTRA.addEventListener("click", () => {
                      isRunning.A = !isRunning.A;
                      BTRA.style.fill = isRunning.A ? "green" : "red";
                  });
              }

              if (BTRB) {
                  BTRB.addEventListener("click", () => {
                      isRunning.B = !isRunning.B;
                      BTRB.style.fill = isRunning.B ? "green" : "red";
                      toggleCo2Elements(isRunning.B, [CO2B1, CO2B2]);
                  });
              }

              if (BTRC) {
                  BTRC.addEventListener("click", () => {
                      isRunning.C = !isRunning.C;
                      BTRC.style.fill = isRunning.C ? "green" : "red";
                  });
              }

              if (BTRD) {
                  BTRD.addEventListener("click", () => {
                      isRunning.D = !isRunning.D;
                      BTRD.style.fill = isRunning.D ? "green" : "red";
                  });
              }
          }
      });
  }
});



// CO2CHART


  document.addEventListener("DOMContentLoaded", () => {
    const ctxLinear = document.getElementById("co2Chart").getContext("2d");
  
    let totalCO2 = 0;
    const timestamps = [];
  
    const co2LinearChart = new Chart(ctxLinear, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Total CO₂ Emissions (kg) en temps Réel",
            data: [],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            pointRadius: 5,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Time (seconds)" } },
          y: { beginAtZero: true, title: { display: true, text: "Total CO₂ (kg)" } },
        },
      },
    });
  
    function calculateTotalCO2() {
      totalCO2 += Math.random() * 10; // Données fictives pour tester
      const currentTime = new Date()
        .toLocaleTimeString([], {  minute: "2-digit"});
  
      timestamps.push(currentTime);
      co2LinearChart.data.labels = [...timestamps];
      co2LinearChart.data.datasets[0].data.push(totalCO2);
  
      co2LinearChart.update();
    }
  
    setInterval(calculateTotalCO2, 10000); // Met à jour toutes les 10 secondes
  });
  
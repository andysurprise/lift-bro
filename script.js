document.addEventListener("DOMContentLoaded", () => {
    const selectionScreen = document.getElementById("selection-screen");
    const workoutScreen = document.getElementById("workout-screen");
    const confirmButton = document.getElementById("confirm-lifts");
    const liftOptions = document.querySelectorAll("#lift-options input");
    const liftName = document.getElementById("lift-name");
    const progressBar = document.getElementById("progress-bar");
    const setCount = document.getElementById("set-count");
    const nextSetButton = document.getElementById("next-set");

    let selectedLifts = [];
    let currentLiftIndex = 0;
    let currentSet = 0;

    // Add emoji to the title screen
    const emojiElement = document.createElement("div");
    emojiElement.textContent = "🏋️‍♂️"; // Flexed biceps emoji
    emojiElement.style.fontSize = "2rem";
    emojiElement.style.textAlign = "center";
    const titleElement = document.querySelector("#selection-screen h1");
    titleElement.insertAdjacentElement("afterend", emojiElement);

    // Set default selections
    const squatOption = Array.from(liftOptions).find(option => option.value === "Squat");
    if (squatOption) squatOption.checked = true;

    liftOptions.forEach(option => {
        option.addEventListener("change", () => {
            if (option.value === "Bench Press" && option.checked) {
                const chinUpsOption = Array.from(liftOptions).find(opt => opt.value === "Chin-Ups");
                if (chinUpsOption) chinUpsOption.checked = true;
            }

            if (option.value === "Overhead Press" && option.checked) {
                const barCurlsOption = Array.from(liftOptions).find(opt => opt.value === "Bar Curls");
                if (barCurlsOption) barCurlsOption.checked = true;
            }
        });
    });

    confirmButton.addEventListener("click", () => {
        selectedLifts = Array.from(liftOptions)
            .filter(option => option.checked)
            .map(option => option.value);

        if (selectedLifts.length > 0) {
            selectionScreen.classList.remove("active");
            selectionScreen.classList.add("hidden");
            workoutScreen.classList.remove("hidden");
            workoutScreen.classList.add("active");
            startWorkout();
        } else {
            alert("Please select at least one lift.");
        }
    });

    nextSetButton.addEventListener("click", () => {
        if (currentSet < 5) {
            currentSet++;
            updateProgress();
        } else if (currentLiftIndex < selectedLifts.length - 1) {
            currentLiftIndex++;
            currentSet = 0;
            startWorkout();
        } else {
            alert("Workout complete! Great job!");
            location.reload();
        }
    });

    function startWorkout() {
        liftName.textContent = selectedLifts[currentLiftIndex];
        currentSet = 0;
        nextSetButton.textContent = "Next Set"; // Reset button text
        updateProgress();
    }

    function updateProgress() {
        progressBar.style.width = `${(currentSet / 5) * 100}%`;
        setCount.textContent = `Set ${currentSet} of 5`;

        if (currentSet === 5) {
            nextSetButton.textContent = "Next Lift";
        }
    }

    // Adjust font size and center content for mobile optimization
    document.querySelectorAll("label, button, h1, p").forEach(element => {
        element.style.fontSize = "larger";
        element.style.textAlign = "center";
    });

    document.getElementById("app").style.cssText = `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        padding: 20px;
        box-sizing: border-box;
    `;

    document.body.style.margin = "0";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
});

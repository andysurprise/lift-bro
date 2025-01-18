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

    confirmButton.addEventListener("click", () => {
        selectedLifts = Array.from(liftOptions)
            .filter(option => option.checked)
            .map(option => option.value);

        if (selectedLifts.length > 0) {
            selectionScreen.classList.add("hidden");
            workoutScreen.classList.remove("hidden");
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
        updateProgress();
    }

    function updateProgress() {
        progressBar.style.width = `${(currentSet / 5) * 100}%`;
        setCount.textContent = `Set ${currentSet} of 5`;
    }
});
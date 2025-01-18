const app = document.getElementById('app');

let lifts = [
    { name: 'Squat', selected: true },
    { name: 'Bench Press', selected: false },
    { name: 'Overhead Press', selected: false },
    { name: 'Chin-ups', selected: false },
    { name: 'Bar Curls', selected: false }
];

let selectedLifts = [];
let currentLiftIndex = 0;
let currentSet = 0;

function showSelectionScreen() {
    app.innerHTML = `
        <div id="selection-screen">
            <h1>🏋️‍♂️ Lift Bro</h1>
            <p>Select your lifts for today:</p>
            <div id="lift-options">
                ${lifts.map((lift, index) => `
                    <label>
                        <input type="checkbox" data-index="${index}" ${lift.selected ? 'checked' : ''}>
                        ${lift.name}
                    </label>
                `).join('')}
            </div>
            <button onclick="confirmSelection()">Confirm</button>
        </div>
    `;

    document.querySelectorAll('#lift-options input').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = e.target.dataset.index;
            lifts[index].selected = e.target.checked;

            // Auto-select logic
            if (lifts[index].name === 'Bench Press' && e.target.checked) {
                lifts.find(lift => lift.name === 'Chin-ups').selected = true;
            } else if (lifts[index].name === 'Overhead Press' && e.target.checked) {
                lifts.find(lift => lift.name === 'Bar Curls').selected = true;
            }

            showSelectionScreen();
        });
    });
}

function confirmSelection() {
    selectedLifts = lifts.filter(lift => lift.selected);
    if (selectedLifts.length > 0) {
        currentLiftIndex = 0;
        currentSet = 0;
        showWorkoutScreen();
    } else {
        alert('Please select at least one lift!');
    }
}

function showWorkoutScreen() {
    const lift = selectedLifts[currentLiftIndex];

    app.innerHTML = `
        <div id="workout-screen">
            <h1>${lift.name}</h1>
            <p id="set-count">Set ${currentSet + 1} of 5</p>
            <button onclick="nextSet()">${currentSet < 4 ? 'Next Set' : 'Next Lift'}</button>
            <div id="progress-bar-container">
                <div id="progress-bar" style="width: ${(currentSet / 5) * 100}%"></div>
            </div>
        </div>
    `;
}

function nextSet() {
    currentSet++;

    if (currentSet < 5) {
        showWorkoutScreen();
    } else {
        currentSet = 0;
        currentLiftIndex++;

        if (currentLiftIndex < selectedLifts.length) {
            showWorkoutScreen();
        } else {
            showCompletionScreen();
        }
    }
}

function showCompletionScreen() {
    app.innerHTML = `
        <div id="completion-screen">
            <h1>Workout Complete! 💪</h1>
            <button onclick="showSelectionScreen()">Start Over</button>
        </div>
    `;
}

showSelectionScreen();

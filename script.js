let interval;
document.getElementById('set-countdown').addEventListener('click', function() {
    const birthdayInput = document.getElementById('birthday').value;
    const birthTimeInput = document.getElementById('birth-time').value;

    if (!birthdayInput || !birthTimeInput) {
        alert("Please fill in all fields!");
        return;
    }

    const [hours, minutes] = birthTimeInput.split(':').map(Number);
    const birthday = new Date(birthdayInput);
    birthday.setHours(hours, minutes, 0, 0);
    const now = new Date();
    const currentYear = now.getFullYear();
    let age = currentYear - birthday.getFullYear();
    const birthdayThisYear = new Date(currentYear, birthday.getMonth(), birthday.getDate(), hours, minutes);

    if (now < birthdayThisYear) {
        age -= 1;
    }

    const nextNextBirthday = new Date(currentYear + (now >= birthdayThisYear ? 1 : 0), birthday.getMonth(), birthday.getDate(), hours, minutes);

    function updateCountdown() {
        const now = new Date();
        const distanceToNextNextBirthday = nextNextBirthday - now;
        const microsecondsToNextNextBirthday = distanceToNextNextBirthday * 1000;
        const outputElement = document.getElementById('output');
        const ageDecimal = age + (distanceToNextNextBirthday / (1000 * 60 * 60 * 24 * 365)); // Add decimal part
        outputElement.innerHTML = `Age is ${ageDecimal.toFixed(9)}`;
    }

    clearInterval(interval);
    updateCountdown();
    interval = setInterval(updateCountdown, 100);

    document.getElementById('input-container').style.display = 'none';
    document.getElementById('output').style.display = 'block';
    document.getElementById('close-button').style.display = 'block';

    document.getElementById('close-button').addEventListener('click', function() {
        window.electron.closeApp();
    });

    window.onbeforeunload = function() {
        clearInterval(interval);
    };
});
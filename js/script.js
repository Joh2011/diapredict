function predictDiabetes() {
    let age = document.getElementById('age').value;
    let gender = document.getElementById('gender').value;
    let bmi = document.getElementById('bmi').value;
    let hypertension = document.getElementById('hypertension').value;
    let heart_disease = document.getElementById('heartDisease').value;
    let HbA1c_level = document.getElementById('hba1c').value;
    let blood_glucose_level = document.getElementById('glucose').value;
    let smokingHistory = document.getElementById('smokingHistory').value;

    let gender_Female = 0;
    let gender_Male = 0;
    let gender_Other = 0;

    if (gender === 'male') {
        gender_Male = 1;
    } else if (gender === 'female') {
        gender_Female = 1;
    }

    let smoking_history_noInfo = 0;
    let smoking_history_current = 0;
    let smoking_history_ever = 0;
    let smoking_history_former = 0;
    let smoking_history_never = 0;

    if (smokingHistory === 'never') {
        smoking_history_noInfo = 0
        smoking_history_current = 0
        smoking_history_ever = 0
        smoking_history_former = 0
        smoking_history_never = 1
        smoking_history_notCurrent = 0
    } else if (smokingHistory === 'former') {
        smoking_history_noInfo = 0
        smoking_history_current = 0
        smoking_history_ever = 1
        smoking_history_former = 1
        smoking_history_never = 0
        smoking_history_notCurrent = 0
    } else if (smokingHistory === 'current') {
        smoking_history_noInfo = 0
        smoking_history_current = 1
        smoking_history_ever = 1
        smoking_history_former = 0
        smoking_history_never = 0
        smoking_history_notCurrent = 0
    } else {
        smoking_history_noInfo = 1;
    }

    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'age': age,
            'hypertension': hypertension,
            'heart_disease': heart_disease,
            'bmi': bmi,
            'HbA1c_level': HbA1c_level,
            'blood_glucose_level': blood_glucose_level,
            'gender_Female': gender_Female,
            'gender_Male': gender_Male,
            'gender_Other' : gender_Other,
            'smoking_history_noInfo': smoking_history_noInfo,
            'smoking_history_current': smoking_history_current,
            'smoking_history_ever': smoking_history_ever,
            'smoking_history_former': smoking_history_former,
            'smoking_history_never': smoking_history_never,
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = data.message + '\nAccuracy: ' + data.accuracy;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'An error occurred, please try again.';
    });
}

from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

model = joblib.load('xgboost_model.pkl')

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    age = float(data['age'])
    hypertension = int(data['hypertension'])
    heart_disease = int(data['heart_disease'])
    bmi = float(data['bmi'])
    HbA1c_level = float(data['HbA1c_level'])
    blood_glucose_level = float(data['blood_glucose_level'])
    
    gender_female = int(data.get('gender_Female', 0))
    gender_male = int(data.get('gender_Male', 0))
    gender_other = 1 - (gender_female + gender_male)

    smoking_history_noInfo = int(data.get('smoking_history_noInfo', 0))
    smoking_history_current = int(data.get('smoking_history_current', 0))
    smoking_history_ever = int(data.get('smoking_history_ever', 0))
    smoking_history_former = int(data.get('smoking_history_former', 0))
    smoking_history_never = int(data.get('smoking_history_never', 0))
    smoking_history_notCurrent = int(data.get('smoking_history_notCurrent', 0))

    input_data = np.array([
        age,
        hypertension,
        heart_disease,
        bmi,
        HbA1c_level,
        blood_glucose_level,
        gender_female,
        gender_male,
        gender_other,
        smoking_history_noInfo,
        smoking_history_current,
        smoking_history_ever,
        smoking_history_former,
        smoking_history_never,
        smoking_history_notCurrent
    ], dtype=float).reshape(1, -1)

    prediction = model.predict(input_data)

    if prediction[0] == 1:
        message = "You are at risk for diabetes."
    else:
        message = "You are not at risk for diabetes."

    return jsonify({
        'prediction': int(prediction[0]),
        'message': message,
        'accuracy': "97.24% (based on training data)"
    })


if __name__ == '__main__':
    app.run(debug=True)

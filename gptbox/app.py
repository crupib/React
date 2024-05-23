from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/run-script', methods=['POST'])
def run_script():
    try:
        data = request.get_json()
        script_output = subprocess.check_output(['python3', 'chatapi.py'], universal_newlines=True)
        return jsonify({'output': script_output})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()

# ConvAI: AI Insights and Guidance for Effective Communication

**ConvAI** is an **AI-powered platform** that helps you enhance your communication skills through personalized conversations. It features tools like **AI Voice Chat and AI-Powered Duo Chat**, offering real-time feedback and suggestions to improve your speaking abilities and express yourself effectively.

****

## Local Environment Setup

1. Clone the Repository
   
```bash
git clone https://github.com/Rishi-Jain2602/Conversational-AI-Coach.git
```

2. Create Virtual Environment

```bash
cd backend
virtualenv venv
venv\Scripts\activate  # On Windows
source venv/bin/activate  # On macOS/Linux
```

3. Install the Project dependencies

- 3.1 Navigate to the **Backend** Directory and install Python dependencies:

```python
cd backend
pip install -r requirements.txt
```

- 3.2 Navigate to the **Frontend** Directory and install Node.js dependencies: `npm install`

4. Run the React App

Start the React app with the following command: `npm start`

- The server will be running at `http://localhost:3000`.

5. Run the Backend (FastAPI App)

Open a new terminal and run the backend:

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
- The server will be running at `http://127.0.0.1:8000`.


****


## Note
1. Make sure you have Python 3.x and npm 10.x installed
2. It is recommended to use a virtual environment for backend to avoid conflict with other projects.
3. If you encounter any issue during installation or usage please contact rishijainai262003@gmail.com or rj1016743@gmail.com

## Backend Setup

Follow these steps to get the backend up and running on your local machine:

1. **git clone** repo
2. **cd path_to/backend**
3. **mkdir .venv**
4. Activate the virtual environment:
   **pipenv shell** (to deactivate virtual environment command is: **deactivate**)
5. Install the required dependencies from Pipfile:
   **pipenv install**
6. Run Server:
   **python manage.py runserver**

Make sure that **pipenv** has been installed on your system

To make a request to the server, it is essential to include in the Headers
**Authorization: ApiKey vladyslav:adsadsad21221323**

link to admin panel **<http://127.0.0.1:8000/admin/>**

## Frontend Setup

1. **cd path_to/frontend**
2. **npm install**
3. **npm run dev**

![project image](./assets/project1.png)

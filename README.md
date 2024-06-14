# Anterior product assignment

## Dev

### Backend

Requires a Python 3.11 environment.

```bash
cd backend
pip install -r requirements.txt
fastapi run
```

Server runs on http://0.0.0.0:8000

```bash
curl http://localhost:8000/health
```

### Frontend

```bash
cd frontend
npm install
npm run build
npm run start
```

Frontend runs on http://localhost:3000

### OpenAPI

The backend exposes an OpenAPI schema (through FastAPI). This is used by the frontend to generate TypeScript schema/hooks.

After changes to the backend API, re-generate the TypeScript API:

```bash
# fastapi server should be running on port 8000
make gen-openapi
```

### Database

Backend serialises the cases to a sqlite DB.

## Instructions

View instructions for completing this take-home assignment [here](https://co-helm.notion.site/Senior-Product-Engineer-Take-Home-6e82ec45cc2a46b59a0d9ee3aeb9449c).

# Anterior product assignment

## Dev

### Docker

```bash
docker-compose up
```

View the frontend at http://localhost:3000

Backend will run at http://localhost:8000

```bash
curl http://localhost:8000/health
curl http://localhost:8000/cases
```

### OpenAPI

The backend exposes an OpenAPI schema (through FastAPI). This is used by the frontend to generate TypeScript schema/hooks.

After changes to the backend API, re-generate the TypeScript API:

```bash
# fastapi server should be running on port 8000
make gen-openapi
```

### Database

Backend serialises the cases to a sqlite DB.

## What I would have done differently

- [ ] Tests!
  - [ ] Pytest
  - [x] Playwright browser tests
  - [ ] Jest component tests
- [ ] Use a component framework, e.g. ShadCN
- [ ] Real file upload, using object storage
- [ ] Prepare the environments, e.g. using env specific config

## Instructions

View instructions for completing this take-home assignment [here](https://co-helm.notion.site/Senior-Product-Engineer-Take-Home-6e82ec45cc2a46b59a0d9ee3aeb9449c).

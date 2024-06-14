
.PHONY:gen-openapi
gen-openapi:
	wget -O ./openapi/backend.json http://localhost:8000/openapi.json
	cd frontend && npm run generate:api

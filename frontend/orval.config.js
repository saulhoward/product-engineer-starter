module.exports = {
    api: {
      output: {
        mode: 'tags-split',
        target: 'api/api.ts',
        client: 'react-query',
      },
      input: {
        target: '../openapi/backend.json',
      },
    },
  };
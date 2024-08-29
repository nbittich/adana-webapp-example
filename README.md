# Adana TODO WEBAPP

An example of web app created with [adana](https://github.com/nbittich/adana).
The code of the backend is [here](/server.adana) .
This is an MVP, we currently store data in an array, while it would be nice to have
an sqlite integration.

### To run the example:

- Run the server (check the dockerfile if you'd like to run it locally, it might not work on windows though):

```
docker run --rm -p 8000:8000 nbittich/adana-webapp-example

```

- Goto http://localhost:8000

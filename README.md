# Distance Calculator UI

## Tech Stack

- NodeJs v15.14.0
- Npm 7.7.6
- Dockerized environment (Docker version 20.10.8)
- Coded with React v17.0.2 (with mostly TypeScript)
- react-data-table-component
- react-bootstrap
- react-simple-maps (to show the office locations on the map)

### How to run

- You can run this project via Docker, to to this:

```bash
git clone https://github.com/soysaltan/wm-ui
docker build -t wm/ui ./
docker run --rm -it -p 3000:3000 --name wm-ui wm/ui
```

or

- To run on your host, you need to have NodeJs and NPM installed (see **Tech Stack Section**)

```bash
git clone https://github.com/soysaltan/wm-ui
npm install && npm cache clean --force && npm start
```

if everything went well, open [http://localhost:3000](http://localhost:3000) on your browser.

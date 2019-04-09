# GraphQl Blogging App

Dependencies

- `Docker`

- `Node Js`

- `Postgres`

Clone this repo `https://github.com/charisschomba/GraphQl-blogging-app.git`

Cd to `GraphQl-blogging-app`

Create a folder named `config` to host different envs

In the config dir create a file named dev.env with the following variables

- `PRISMA_ENDPOINT=http://localhost:4466`

- `PRISMA_SECRET=random string`

- `JWT_SECRET=random string`

Run `yarn install` to install required dependencies

Cd to `GraphQl-blogging-app/prisma`

Start docker

Run `docker-compose up`

Run `prisma deploy -e ./config/dev.env`

Cd `GraphQl-blogging-app`

Run `yarn run dev` to start the server

On your browser navigate to `localhost:4000`

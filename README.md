# IdealHouse [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)[![Netlify Status](https://api.netlify.com/api/v1/badges/b6605ef0-438b-4f66-825d-6f6a000e696f/deploy-status)](https://app.netlify.com/sites/hiinit-web-terminal/deploys)

![IdealHouse](https://github.com/user-attachments/assets/822ef1a0-9e7e-4d9c-a7bb-6cacdf02bf0a)

> The IdealHouse web application is a real estate sales portal, clone or Idealista type, created with the `PUG template engine` and `Tailwind` for the implementation of styles.

> It has two-step authentication via `email` and user portal, with which you can navigate through the user's properties and receive messages from other clients as well as the generic part where you can list and view all the properties and their locations.

> https://idealhouse.onrender.com/

## SUMMARY

`IdealHouse`

- [x] A complete SPA with PUG and Tailwind to advertise properties or houses for sale
- [x] Using `MULTER` librery and `FS` package from NodeJS to upload images and associate them with certain properties
- [x] Two-setp user authentication: `register` account & `email` verification
- [x] Implement `CRUD system`: edit data properties and delete them.
- [x] Use of the `LEAFLET`library to use `maps` and locate properties: streets, pins and coordinates.

## VIDEO

https://github.com/user-attachments/assets/20c4a0c3-2512-46b5-b972-0525349b7421

## MODELS

`USER`

```yaml
{
  "name": { type: Datatypes.STRING, allowNull: false },
  "email": { type: Datatypes.STRING, allowNull: false, unique: true },
  "password": { type: Datatypes.STRING, allowNull: false },
  "token": Database.BOOLEAN,
  "confirm": Database.BOOLEAN,
}
```

`PROPERTY`

```yaml
{
  "id":
    {
      type: Datatypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  "title": { type: Datatypes.STRING, allowNull: false },
  "description": { type: Datatypes.TEXT, allowNull: false },
  "room": { type: Datatypes.INTEGER, allowNull: false },
  "bath": { type: Datatypes.INTEGER, allowNull: false },
  "parking": { type: Datatypes.INTEGER, allowNull: false },
  "street": { type: Datatypes.STRING, allowNull: false },
  "lat": { type: Datatypes.STRING, allowNull: false },
  "lng": { type: Datatypes.STRING, allowNull: false },
  "image": { type: Datatypes.STRING, allowNull: false },
  "publicate":
    { type: Datatypes.BOOLEAN, allowNull: false, defaultValue: false },
}
```

`CATEGORIES`

```yaml
{ "name": { type: Datatypes.STRING, allowNull: false } }
```

`PRICES`

```yaml
{ "name": { type: Datatypes.STRING, allowNull: false } }
```

`MESSAGES`

```yaml
{ "message": { type: Datatypes.STRING, allowNull: false } }
```

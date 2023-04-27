migrate((db) => {
  const collection = new Collection({
    "id": "h05ojpkeete2xzq",
    "created": "2023-04-24 08:12:20.226Z",
    "updated": "2023-04-24 08:12:20.226Z",
    "name": "discussion",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8cdnk9gk",
        "name": "topic",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fgq7pf9e",
        "name": "users",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "x1ixhkaq",
        "name": "created_at",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("h05ojpkeete2xzq");

  return dao.deleteCollection(collection);
})

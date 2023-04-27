migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h05ojpkeete2xzq")

  collection.name = "discussions"

  // remove
  collection.schema.removeField("8cdnk9gk")

  // remove
  collection.schema.removeField("x1ixhkaq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ijbwy9zq",
    "name": "channel",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ov9ieeyv",
    "name": "messages",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h05ojpkeete2xzq")

  collection.name = "discussion"

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("ijbwy9zq")

  // remove
  collection.schema.removeField("ov9ieeyv")

  return dao.saveCollection(collection)
})

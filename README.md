[![main](https://github.com/basketry/rel/workflows/build/badge.svg?branch=main&event=push)](https://github.com/basketry/rel/actions?query=workflow%3Abuild+branch%3Amain+event%3Apush)
[![master](https://img.shields.io/npm/v/@basketry/rel)](https://www.npmjs.com/package/@basketry/rel)

# Relational Metadata

The `rel` metadata type provides a syntax for defining relationships between types.

## `primaryKey`

Use `primaryKey` to indicate that a property is the primary key of an object.

Applied to:

- Property

Schema:

- `primaryKey` [`true`] - Value (always `true`) that indicates that the parent property is the object's primary key.

Example:

```json
{ "primaryKey": true }
```

Example in context (JSONSchema/OpenAPI):

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "x-rel": { "primaryKey": true } // Indicates that "id" is this object's primary key
    },
    "name": { "type": "string" },
    "value": { "type": "number" }
  }
}
```

## `foreignKey`

Add `foreignKey` to indicate a foreign key relationship to a type's primary key.

Applied to:

- Property
- Parameter

Schema:

- `foreignKey/type` [String] - Name of the foreign type. (Note that the type does not need to be defined locally.)
- `foreignKey/property` [String] - Name of the primary key property on the foreign type.
- `foreignKey/many` [Boolean (optional)] - When `true`, indicates that there may be many of the parent type associated to one of the foreign type. If `false` or not supplied, then it is understood that there is a one-to-one relationship between the two types.

Example:

```json
{
  "foreignKey": {
    "type": "user",
    "property": "id",
    "many": true
  }
}
```

### Property

Add a foreign key to a property to indicate that the value of that property is the primary key of another type.

Example in context (JSONSchema/OpenAPI):

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "widgetId": {
      "type": "string",
      "x-rel": {
        "foreignKey": {
          // Indicates that "widgetId" refers to the "id" property on the type "widget"
          "type": "widget",
          "property": "id",
          "many": true
        }
      }
    },
    "value": { "type": "number" }
  }
}
```

### Parameter

Add a foreign key to a method parameter to indicate that the supplied argument(s) are the primary key of a particular type. The `many` property has no effect when applied to parameters.

Example in context (OpenAPI):

```json
{
  "operationId": "getGizmos",
  "parameters": [
    {
      "name": "widgetId",
      "in": "query",
      "type": "string",
      "x-rel": {
        "foreignKey": {
          // Indicates that "widgetId" refers to the "id" property on the type "widget"
          "type": "widget",
          "property": "id"
        }
      }
    }
  ]
}
```

## `edge`

Add `edge` to a type to define a many-to-many edge between to types. For example, to define a many-to-many edge between the `product` and `order` types, create a `productOrder` type with a foreign key to both products and orders. Then, add an `edge` rel object that includes both foreign key properties. Doing so will establish the many-to-many relationship.

Often, only defining two foreign keys is enough to describe the relationship between types. The "edge" metadata indicates that the decorated type is not a first-class domain object, but rather data that describes the relationship between two other first-class domain objects. If the decorated type is relevant on its own (eg. you don't need to _also_ query for one or both of the related types), then you probably don't need to apply `edge` metatdata.

Schema:

- `edge` [Array(String, String)] - A tuple continaing the name of two properties on this type that are foreign keys to the two joined types.

Usage:

```json
{ "edge": ["productId", "orderId"] }
```

Example in context (JSONSchema/OpenAPI):

```json
{
  "type": "object",
  "x-rel": {
    "edge": ["productId", "orderId"] // Indicates that this type is an "edge" between products and orders
  },
  "properties": {
    "id": { "type": "string" },
    "quantity": { "type": "integer" },
    "productId": {
      "type": "string",
      "x-rel": {
        "foreignKey": {
          // foreign key to product type
          "type": "product",
          "property": "id",
          "many": true
        }
      }
    },
    "orderId": {
      "type": "string",
      "x-rel": {
        "foreignKey": {
          // foreign key to order type
          "type": "order",
          "property": "id",
          "many": true
        }
      }
    }
  }
}
```

---

## For contributors:

### Run this project

1.  Install packages: `npm ci`
1.  Build the code: `npm run build`
1.  Run it! `npm start`

Note that the `lint` script is run prior to `build`. Auto-fixable linting or formatting errors may be fixed by running `npm run fix`.

### Create and run tests

1.  Add tests by creating files with the `.test.ts` suffix
1.  Run the tests: `npm t`
1.  Test coverage can be viewed at `/coverage/lcov-report/index.html`

### Publish a new package version

1. Ensure latest code is published on the `main` branch.
1. Create the new version number with `npm version {major|minor|patch}`
1. Push the branch and the version tag: `git push origin main --follow-tags`

The [publish workflow](https://github.com/basketry/rel/actions/workflows/publish.yml) will build and pack the new version then push the package to NPM. Note that publishing requires write access to the `main` branch.

---

Generated with [generator-ts-console](https://www.npmjs.com/package/generator-ts-console)

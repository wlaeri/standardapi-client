# StandardAPI Client
A javascript client for making [StandardAPI](https://github.com/waratuman/standardapi) calls.

## Installation

Using npm:

```bash
$ npm install standardapi-client
```

Using yarn:

```bash
$ yarn add standardapi-client
```

## Implementation

First the client must be instantiated.

```node
import StandardAPIClient from 'standardapi-client';

const client = StandardAPIClient({
  baseURL: API_BASE_URL
})
```

If the Rails server uses authorization headers you can add them on instantiation.

```node
import StandardAPIClient from 'standardapi-client';

const client = StandardAPIClient({
  baseURL: API_BASE_URL,
  headers: {
    'Api-Key': API_KEY,
    'Api-Version': API_VERSION,
  }
})
```

## Usage
Essentially, StandardAPI Client extends [axios](https://github.com/axios/axios) under the hood, adding four methods `create`, `read`, `update`, and `destroy` for making StandardAPI calls.

### client.create(baseModel, params)
Sends a POST request to the Rails server to create a record.

```node
const response = await client.create('todos', {
  description: 'Update the StandardAPI Client docs.',
  priority: 'MEDIUM'
})

console.log(response.data) // Newly created todo record.
```

### client.read(baseModel, params)
Sends a GET request to the Rails server to query a record set.

```node
const response = await client.read('todos', {
  limit: 5,
  offset: 10,
  where: {
    priority: 'HIGH'
  },
  include: {
    photos: true
  },
  order: {
    created_at: 'desc'
  }
})

console.log(response.data) // The array of todo records that match the query parameters.
```

### client.update(baseModel, params)
Sends a PATCH request to the Rails server to update a record.

```node
const response = await client.update('todos', {
  id: '',
  priority: 'HIGH'
})

console.log(response.data) // The updated todo record.
```

### client.destroy(baseModel, params)
Sends a DELETE request to the Rails server to destroy a record.

```node
const response = await client.delete('todos', {
  id: '',
})

console.log(response.data) // The deleted todo record.
```

## Resources

* [StandardAPI Docs](https://github.com/waratuman/standardapi)

## License

[MIT](LICENSE)

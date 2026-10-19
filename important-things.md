# Important Things

## JavaScript Object vs JSON

**JS object** is a data structure that lives in memory inside your JavaScript program.
**JSON** (JavaScript Object Notation) is a text format for storing and sending data. It is always a string.

### Key differences

| | JS Object | JSON |
|---|---|---|
| What it is | In-memory data structure | Text (string) format |
| Keys | Quotes optional: `{ name: "A" }` | Must be double-quoted: `{ "name": "A" }` |
| String quotes | Single, double or backticks | Double quotes only |
| Values allowed | Strings, numbers, booleans, `null`, `undefined`, functions, symbols, Dates, etc. | Only strings, numbers, booleans, `null`, arrays, objects |
| Functions / `undefined` | Allowed | Not allowed (dropped when stringified) |
| Comments | Allowed | Not allowed |
| Trailing commas | Allowed | Not allowed |
| Used for | Working with data in code | Sending data between client and server, storing in files |

### Example

```js
// JS object
const user = {
  name: "Prashant",
  age: 31,
  greet() { console.log("hi"); },
};

// JSON (a string)
const json = '{"name":"Prashant","age":31}';
```

### Converting between them

```js
JSON.stringify(user); // JS object -> JSON string  (greet is dropped)
JSON.parse(json);     // JSON string -> JS object
```

### Why it matters in devTinder

- HTTP requests and responses send **JSON text**, not JS objects.
- In Express, `express.json()` middleware runs `JSON.parse` on the request body so `req.body` is a JS object.
- `res.json(obj)` runs `JSON.stringify` for you before sending.




## Reading data from the URL in Express

### 1) Query string: `/xyz?userId=123` uses `req.query`

```js
app.get("/xyz", (req, res) => {
    const { userId } = req.query;   // "123"
    res.send(userId);
});
```

### 2) Route param: `/xyz/123` uses `req.params`

Name the param in the route with `:`.

```js
app.get("/xyz/:userId", (req, res) => {
    const { userId } = req.params;  // "123"
    res.send(userId);
});
```

### Notes

- Both values are always **strings**. Convert with `Number(userId)` if you need a number.
- Query params are optional and can be many: `/xyz?userId=123&age=30` gives `req.query = { userId: "123", age: "30" }`.
- Route params are part of the path, so the route only matches if they're present. Multiple are allowed: `/xyz/:userId/:postId`.
- This works for any method (`get`, `post`, `patch`, etc.).
- In Express 5, `req.query` is a getter. Read from it, but don't assign to it.

**When to use which:** use route params to identify a specific resource (`/user/123`). Use query params for filtering, sorting or pagination (`/users?age=30&page=2`).

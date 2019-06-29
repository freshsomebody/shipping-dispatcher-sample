# Shipping-dispatcher-sample
A small sample simulate how a dispatcher may arrange the wares collection, trailers and route.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Go through
1. Open http://localhost:8080 in the browser
2. Input the require fields
  - 2.1 Select the ware collection
  - 2.2 Select the trailer
  - 2.3 Select the routing cities
3. Click on Submit button
4. The page should be directed to http://localhost:8080/mission
  - Page http://localhost:8080/mission is not yet beautified

## Todo
> Todo items will be implemented in the "enhancement" branch
### Craft the mission page
- [ ] Right now the mission page directly shows the JSON data. It should be beautified for user friendly.

### Suggested journey
- [ ] Can integrate with APIs, like Google maps APIs, to provides more useful suggestions.

### Interact with the backend and database
- [ ] It currently uses mock data. It should fetch and update data to the backend in the real case.

### Known bugs
- [X] The total weight in the dispatcher page won't reset after destroyed
- [X] The selected trailer won't reset after destroyed

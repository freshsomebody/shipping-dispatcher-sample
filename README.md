# Shipping-dispatcher-sample
A small sample simulate how a dispatcher may arrange the wares collection, trailers and route.

## Project setup
```
npm install
```

### Execute the fronend and beackend programs
Frontend
```
npm run serve
```
Backend
```
npm run database
```

### Lints and fixes files
```
npm run lint
```

### Reset the data in the database
```
npm run reset-db
```

## Go through
1. Open http://localhost:8080 in the browser
2. Input the require fields
  - 2.1 Select the ware collection
  - 2.2 Select the trailer
  - 2.3 Select the routing cities
3. Click on Submit button
4. The page should be directed to http://localhost:8080/mission/:MISSION_ID
  - Page http://localhost:8080/mission/:MISSION_ID is not yet beautified

## Todo
> versions greater than 1.0.0 were committed after the 3 hours deadline
### Craft the mission page
- [ ] Right now the mission page directly shows the JSON data. It should be beautify for user friendly.

### Suggested journey
- [ ] Can integrate with APIs, like Google maps APIs, to provides more precise suggestion.

### Interact with the backend and database
- [X] It currently uses mock data. It should fetch and update data to the backend in the real case.
  - Add json-server to simulate a RESTful backend server
  - Fetch the data from the RESTful backend instead of static mockData files

### Known bugs
- [X] The total weight in the dispatcher page won't reset after destroyed
- [X] The selected trailer won't reset after destroyed

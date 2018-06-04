// Notes on your routes:

// - Each route should receive at least one test case

// - If your route could send back a different status for different kinds of requests (ex. if a GET route for /api/users/:userId could return a single user with status of 200, or a 404 if no user is found, there should be a test for each case).

// - Do not just test to make sure that the response body is an array or an object - make sure that the data is what you expect! If a GET request should send back data with specific fields populated (for example, by using eager loading or scopes), make sure that your response body has those fields. Likewise, if a PUT or POST should create or modify data, make sure that the data in your response body actually matches the intended change.

// - The tests for your routes should treat your route like a black box: for a given request, you should expect to receive some kind of response back. You should not test anything about the implementation of the route itself.

// 	- For example, using a spy to see if a certain Sequelize method was used would be a bad idea. What if you change your mind about which Sequelize method to use later? What if you stop using Sequelize altogether and swap in a different ORM? Your test would now be useless - the reason we wanted this test in the first place was so that we could change the way we implement the route, and confirm that it still worked!

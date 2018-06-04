// Good Redux tests include:
// Your reducer should get at least one test case for each action it consumes
// Each action creator deserves a test case (even though they seem very simple - think of it as a free pass)!
// For thunk creators and thunks, you should test that they:
	// Make the appropriate network request(s) (if they do this)
	// Eventually invoke the dispatch method with certain actions (spying on the dispatch method using sinon is recommended here)
		// Note the emphasis on actions - you should test that the dispatch method is invoked with certain action objects - NOT that certain action creators were invoked (see below)
// For thunk creators and thunks, you should NOT test:
	// The actual result of the network request - this is the job of your server tests!
	// That certain (synchronous) action creators are invoked - this is the job of your action creator tests.

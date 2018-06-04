// Good React tests include:
// Any JavaScript expressions you write in your JSX (using curly braces {}) should get a test case
// Any methods you write in a class component should be tested.
// For event handlers - test the method itself by mock data for the event (or whatever input the method should receive). Test that the method is registered as a listener correctly by using a spy (libraries like sinon can help here).
// These should be separate test cases because attaching the handler to the listener is not contingent upon the handler being written properly. Your click handler could work just fine, but if it's never being attached, that's a problem. Likewise, you could be attaching the right method to the right listener, but perhaps that method doesn't work the way it should. Having two separate test cases allows you to quickly diagnose what kind of problem you have.

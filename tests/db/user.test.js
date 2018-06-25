// What makes good Sequelize test cases:
//
// Any methods that you write deserve tests (instanceMethods, classMethods, hooks, and model validator methods)
// Do not write tests for code that Sequelize owns - methods like findAll, create, update, etc, and field validations like allowNull.
// Extra note on validations: generally, you should only test model validator methods - the non-trivial methods that you write to validate your model instances. Simple validations like allowNull and other field aspects like defaultValue should not be tested by you - they are Sequelize's responsibility.
// When in doubt, a good rule of thumb is that if you had to write some logic, or do anything more than simply supply a value, you should test it.

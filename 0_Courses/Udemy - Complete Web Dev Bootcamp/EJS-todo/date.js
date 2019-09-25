//jshint esversion:6

// Binding exports to function in our custom date.js module
// Don't include () so that function isn't actually called
// Can bind multiple functions to module methods (enables multiple bindings)

exports.getDate = function() {
  const today = new Date();
  // Used to format the date

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  return today.toLocaleDateString("en-US", options);
}

exports.getDay = function() {
  const today = new Date();
  // Used to format the date

  const options = {
    weekday: "long"
  };

  return today.toLocaleDateString("en-US", options);
}

var api = require("./api").default();

api.player.conferenceStats();

process.on("unhandledRejection", function(error) {
  console.error(error);
  process.exit(1);
});

const fs = require("fs");

fs.writeFileSync(
  "ormconfig.json",
  JSON.stringify(require("./ormconfig")),
  "utf8"
);

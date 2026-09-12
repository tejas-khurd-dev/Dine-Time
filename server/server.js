const app = require("./src/app");
const connectDB = require("./src/config/database");

const start = async () => {
  await connectDB();
  app.listen(process.env.PORT || 4000, () =>
    console.log("server is running")
  );
};

start();

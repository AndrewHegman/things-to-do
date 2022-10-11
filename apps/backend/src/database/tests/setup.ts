import { connect } from "mongoose";

const setup = async () => {
  try {
    await connect("mongodb://localhost:27017/");
  } catch (e) {
    throw new Error(`Unable to connect to mongo: ${e}`);
  }
};

export default setup;

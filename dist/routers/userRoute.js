"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userRouter = _express.default.Router();
userRouter.get('/createadmin', (0, _expressAsyncHandler.default)(async (req, res) => {
  try {
    const user = new _userModel.default({
      name: 'admin',
      email: 'admin@example.com',
      password: 'parthenterprise',
      isAdmin: true
    });
    const createdUser = await user.save();
    res.send(createdUser);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}));
userRouter.post('/signin', (0, _expressAsyncHandler.default)(async (req, res) => {
  const signinUser = await _userModel.default.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if (!signinUser) {
    res.status(401).send({
      message: 'Invalid Email or Password'
    });
  } else {
    res.send({
      _id: signinUser._id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: (0, _utils.generateToken)(signinUser)
    });
  }
}));
userRouter.post('/register', (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = new _userModel.default({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const createdUser = await user.save();
  if (!createdUser) {
    res.status(401).send({
      message: 'Invalid User Data'
    });
  } else {
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: (0, _utils.generateToken)(createdUser)
    });
  }
}));
userRouter.put('/:id', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.params.id);
  if (!user) {
    res.status(404).send({
      message: 'User Not Found'
    });
  } else {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: (0, _utils.generateToken)(updatedUser)
    });
  }
}));
var _default = userRouter;
exports.default = _default;
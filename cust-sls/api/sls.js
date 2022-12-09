'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const RuleController = require('./index');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(
    JSON.stringify({
      code: 0,
      message: `Server time: ${new Date().toString()}`,
    }),
  );
});

// get user list
app.get('/rules', async (req, res) => {
  const data = await RuleController.getRuleList();
  res.send(
    JSON.stringify({
      code: 0,
      data,
    }),
  );
});

// get user list
app.get('/rule/:id', async (req, res) => {
    const { id } = req.params;
    const data = await RuleController.getRuleById(id);
    res.send(
      JSON.stringify({
        code: 0,
        data,
      }),
    );
  });

// add new user
app.post('/rule', async (req, res) => {
  let result = '';
  try {
    const {json} = req.body;
    const data = await RuleController.createRule(json);
    result = {
      code: 0,
      data: data,
      message: 'Insert Success',
    };
  } catch (e) {
    result = {
      code: e.code,
      message: `Insert Fail: ${e.message}`,
    };
  }

  res.send(JSON.stringify(result));
});

// delete user
app.delete('/user/:id', async (req, res) => {
  let result = '';
  try {
    const { id } = req.params;
    const data = await RuleController.deleteUserById(id);
    result = {
      code: 0,
      data,
      message: 'Delete Success',
    };
  } catch (e) {
    result = {
      code: 1002,
      data: e,
      message: 'Delete Fail',
    };
  }

  res.send(JSON.stringify(result));
});

module.exports = app;

import express from 'express';
import bodyParser from 'body-parser';
import hadron from '@brainhubeu/hadron-core';
import jsonProvider from '@brainhubeu/hadron-json-provider';
import cors from 'cors';
import chalk from 'chalk';
import postSchema from './serializationSchemas/post';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.NODE_PORT || 8080;
const ENV = process.env.ENV;

jsonProvider(['src/routes/*'], ['js'])
  .then(routes => hadron(
    app,
    [
      require('@brainhubeu/hadron-express'),
      require('@brainhubeu/hadron-serialization'),
    ],
    {
      routes,
      serializer: {
        parsers: { post: JSON.stringify },
        schemas: [postSchema],
      },
    },
  ))
  .then(container => {
    app.listen(PORT, function() {
      console.log(chalk.green(`Server running on http://localhost:${this.address().port}`)); // eslint-disable-line no-console
    });
  }).catch(error => {
    console.error(chalk.red('Error initializing hadron:'), error);
  });

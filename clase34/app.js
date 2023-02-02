const express = require('express');
const AWS = require('aws-sdk');

//const credentials = new AWS.SharedIniFileCredentials();
//AWS.config.credentials = credentials;
AWS.config.update({
  region: 'us-east-1'
});

const sns = new AWS.SNS()
// ejemplo de arn arn:aws:sns:us-east-1:1234567890:notificaciones
const SNS_TOPIC_ARN = 'arn:aws:sns:Region:XXXXXXXX:notificaciones'

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'product-inventory';

const app = express();
app.use(express.json());

app.get('/', (req, res) => { res.send('test api') })

app.get('/api/productos', async (req, res) => {
  const params = {
    TableName: TABLE_NAME
  }
  try {
    const productos = await scanDynamoRecords(params);
    res.json(productos);
  } catch (error) {
    console.error('Ocurrió un error: ', error);
    res.sendStatus(500);
  }
})

app.get('/api/productos/:id', (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      'productId': req.params.id
    }
  }
  dynamodb.get(params).promise()
    .then(response => {
      res.json(response.Item);
    })
    .catch(error => {
      console.error('Ocurrió un error: ', error);
      res.sendStatus(500);
    })
})

app.post('/api/productos', (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Item: req.body
  }
  dynamodb.put(params).promise()
    .then(() => {
      console.log('se guardó')
      const prod = JSON.stringify(req.body)
      return sns.publish({
        Message: `nuevo producto agregado! ${prod}`,
        Subject: 'nuevo producto',
        TopicArn: SNS_TOPIC_ARN
      }).promise()
    })
    .then(data => {
      console.log('se notificó')
      console.log(data)

      const body = {
        Operation: 'SAVE',
        Message: 'SUCCESS',
        Item: req.body
      }
      res.json(body);
    })
    .catch(error => {
      console.error('Ocurrió un error: ', error);
      res.status(500).end();
    })
})

app.put('/api/productos/:id', (req, res) => {
  const item = {
    ...req.body,
    productId: req.params.id
  }
  const params = {
    TableName: TABLE_NAME,
    Item: item
  }
  dynamodb.put(params).promise()
    .then(() => {
      const body = {
        Operation: 'UPDATE',
        Message: 'SUCCESS',
        Item: item
      }
      res.json(body);
    })
    .catch(error => {
      console.error('Ocurrió un error: ', error);
      res.sendStatus(500);
    })
})

app.delete('/api/productos/:id', (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      'productId': req.params.id
    },
    ReturnValues: 'ALL_OLD'
  }
  dynamodb.delete(params).promise()
    .then(response => {
      const body = {
        Operation: 'DELETE',
        Message: 'SUCCESS',
        Item: response
      }
      res.json(body);
    })
    .catch(error => {
      console.error('Ocurrió un error: ', error);
      res.sendStatus(500);
    })
})

async function scanDynamoRecords(scanParams) {
  try {
    let dynamoData = await dynamodb.scan(scanParams).promise();
    const items = dynamoData.Items
    while (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey;
      dynamoData = await dynamodb.scan(scanParams).promise();
      items.push(...dynamoData.Items);
    }
    return items;
  } catch (error) {
    throw new Error(error);
  }
}

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Escuchando en puerto ${server.address().port}`);
})
server.on('error', error => { console.log(error) })

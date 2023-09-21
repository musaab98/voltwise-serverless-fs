const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: "us-east-1"  // Replace with your desired region if different
});

exports.handler = async (event, context) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: 'Product ID must be provided' })
    };
  }

  const id = event.pathParameters.id;
  const body = JSON.parse(event.body);

  if (!body || !body.productname) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: 'Product name must be provided in the request body' })
    };
  }

  const pn = body.productname;
  const tableName = "voltwise-products"; 

  const params = {
    TableName: tableName,
    Key: {
      id: { S: id },
    },
    UpdateExpression: "SET productname = :n",
    ExpressionAttributeValues: {
      ":n": { S: pn },
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await client.send(new UpdateItemCommand(params));
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*"
      },
      body: JSON.stringify({ message: 'Product updated successfully', updatedItem: data.Attributes })
    };
  } catch (err) {
    console.error(err);
    let responseBody;
    let statusCode;

    // Check if the error is due to the item not being found
    if (err.name === 'ConditionalCheckFailedException') {
      responseBody = JSON.stringify({ message: `Product with ID ${id} not found` });
      statusCode = 404;
    } else {
      responseBody = JSON.stringify({ message: 'Unable to update product' });
      statusCode = 500; 
    }

    return {
      statusCode: statusCode,
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*"
      },
      body: responseBody
    };
  }
};

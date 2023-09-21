const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { ScanCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({
  region: "us-east-1"  // Replace with your desired region if different
});

exports.handler = async (event, context) => {
  const params = {
    TableName: "voltwise-products"
  };

  try {
    const data = await client.send(new ScanCommand(params));
    return {
      statusCode: 200, // 200 for successful GET request
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*"
      },
      body: JSON.stringify(data.Items)
    };
  } catch (err) {
    console.error(err);
    let responseBody;
    let statusCode;

    // Check if the error is due to the table not existing
    if (err.name === 'ResourceNotFoundException') {
      responseBody = JSON.stringify({ message: `Products table not found` });
      statusCode = 404; // 404 for resource not found
    } else {
      responseBody = JSON.stringify({ message: `Unable to get products` });
      statusCode = 500; // 500 for internal server error
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

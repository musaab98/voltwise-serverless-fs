const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({
  region: "us-east-1"  // Replace with your desired region if different
});
const TABLE_NAME = "voltwise-products";

exports.handler = async (event, context) => {
    const { id, productname } = JSON.parse(event.body);

    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: { S: id },
            productname: { S: productname }
        },
    };

    try {
        await client.send(new PutItemCommand(params));
        return {
            statusCode: 201,  // Resource created
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*"
            },
            body: JSON.stringify({ message: `Product added successfully: id, ${id} - pn, ${productname}` })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,  // Internal server error
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*"
            },
            body: JSON.stringify({ message: `Unable to add product: id, ${id} - pn, ${productname}` })
        };
    }
};

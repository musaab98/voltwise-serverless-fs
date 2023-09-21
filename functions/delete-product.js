const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({
  region: "us-east-1"  // Replace with your desired region if different
});

const TABLE_NAME = "voltwise-products";

exports.handler = async (event, context) => {
    const { id } = event.pathParameters;

    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: { S: id }
        }
    };

    try {
        await client.send(new DeleteItemCommand(params));
        return {
            statusCode: 204,  // No content, indicates success but doesn't return content
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*"
            },
            body: JSON.stringify({ message: `Product ${id} deleted successfully` })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,  // Internal server error
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*"
            },
            body: JSON.stringify({ message: `Unable to delete product ${id}` })
        };
    }
};

import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Letters";

export const createLetter = async (letter) => {
  await dynamodb.put({
    TableName: TABLE_NAME,
    Item: letter
  }).promise();
};

export const getLetterById = async (id) => {
  const result = await dynamodb.get({
    TableName: TABLE_NAME,
    Key: { _id: id }
  }).promise();

  return result.Item;
};

export const addReply = async (id, message) => {
  await dynamodb.update({
    TableName: TABLE_NAME,
    Key: { _id: id },
    UpdateExpression: "SET messages = list_append(messages, :msg)",
    ExpressionAttributeValues: {
      ":msg": [message]
    }
  }).promise();
};

export const getAllLetters = async () => {
  const result = await dynamodb.scan({
    TableName: TABLE_NAME
  }).promise();

  return result.Items;
};

export const deleteLetter = async (id) => {
  await dynamodb.delete({
    TableName: TABLE_NAME,
    Key: { _id: id }
  }).promise();
};

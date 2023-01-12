export async function handler(event: string, context: string) {
    console.log("Stage name = " + process.env.stageName);
    return {
        body: 'Hello from Lambda function',
        statusCode: 200,
    };
}
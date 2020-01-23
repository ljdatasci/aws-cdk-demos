const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const bucketName = process.env.BUCKET;

exports.handler = async function(event: { httpMethod: any; path: string; }, context: any) {
  try {
    let method = event.httpMethod;

    let params = {
        Bucket: bucketName
    };

    if(method === 'GET'){
        if(event.path === "/"){
          const data = await s3.listObjectsV2(params).promise();
            let body = {
                photos: data.Contents?.map(function(e: { Key: string | undefined; }) {return e.Key})
            };
            return {
                statusCode: 200,
                headers: {},
                body: JSON.stringify(body)
            };
        }
    }

    return {
        statusCode: 400,
        headers: {},
        body: "We only accept GET, POST, and DELETE, not " + method
      };

} catch(err){
    let resp = err.stack || JSON.stringify(err, null, 2);
    return {
      statusCode: 400,
      headers: {},
      body: resp
    }
  }  
}


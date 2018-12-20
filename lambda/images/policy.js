const aws = require('aws-sdk')

const S3 = new aws.S3()

function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

exports.handler = (event, context, callback) => {
  S3.createPresignedPost({
    Bucket: process.env.Bucket,
    Fields: {
      Key: guid(),
      Acl: 'public-read',
    },
  }, callback)
}
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    env: {
        contentApi: 'willow.cdn.content.amplience.net'
    },
    poweredByHeader: false
}
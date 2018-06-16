const checkDbSize = async collection => {
  return await collection.stats((err, stats) => {
    console.log(stats)
    return stats
  })
}

module.exports = {
  checkDbSize
}
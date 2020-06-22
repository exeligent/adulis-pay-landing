module.exports={
  renderHome: async (req,res,next)=>{
    try {
      res.render("index")
    } catch (error) {
      console.log('error', error)
      res.json("server error!")
    }
  }
}
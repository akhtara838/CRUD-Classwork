
var courses = [
    {
        title:"Raspberry Cake",
        cost: 50
    },
    {
        title:"Lemon Souffle",
        cost: 40
    },
    {
        title:"Black Forest Cake",
        cost: 60
    },
]
module.exports = {
    index:(req,res) =>
    {
        res.render("index");
    }
}
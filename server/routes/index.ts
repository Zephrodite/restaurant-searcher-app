var Router = require('express');
var SearchResults = require('../models/SearchResults');
var router = Router();

router.get("/searchresults", async (req : any , res : any) => {
    const searchresults = await SearchResults.find();
    console.log(searchresults);
    res.json(searchresults);
});

// router.delete("/searchresults", async (req : any , res : any) => {
//     const searchresults = await SearchResults.find();
//     for(let i =0; i++ ; i < searchresults.length-1) {
//         searchresults.splice(i,1)
//     }

// });


router.post("/searchresults", async (req : any , res : any) => {
    const {  search_value, places } = req.body;
    const newSearchResult = new SearchResults({  search_value, places });
    await newSearchResult.save();
    // console.log(newSearchResult.id);
    res.json(newSearchResult);
});
router.get("/searchresults/:id", async  (req : any , res : any) => {
    try {
        const SearchResult = await SearchResults.findById(req.params.id);

        if (!SearchResult) return res.status(404).json({ message : "Search Result not found" })

        res.send(SearchResult);
    } catch (error : any ) {
        return res.status(500).send(error)
    }

});

router.delete("/searchresults/:id", async (req : any, res : any) => {
    try {
        const newSearchResults = await SearchResults.findByIdAndDelete(req.params.id);

        if(!newSearchResults) return res.status(404).json({ message : "Search Result not found" })
        return  res.json(newSearchResults);

    } catch (error : any) {
        return res.status(500).send(error);
    }
   
  });


module.exports = router;
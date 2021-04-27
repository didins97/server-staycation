const Item = require('../models/Item');
const Treasure = require('../models/Activity');
const Traveler = require('../models/Booking');
const Category = require('../models/Category');

module.exports = {
    landingPage : async (req, res) => {
        try {
            const mostPicked = await Item.find()
                .select('_id city country unit price title imageId')
                .limit(5)
                .populate({path: 'imageId', select: 'imageUrl'})

            const category = await Category.find()
                .select('_id name')
                .populate({
                    path: 'itemId', 
                    select: '_id title city country isPopular imageId',
                    perDocumentLimit: 4,
                    option: { sort: {sumBooking: -1} },
                    populate: {
                        path: 'imageId', 
                        select: '_id imageUrl',
                        perDocumentLimit: 1
                    }
                })

            const traveler = await Traveler.find()
            const treasure = await Treasure.find()
            const item = await Item.find()

            for(let i = 0; i < category.length; i++){
                for(let x = 0; x < category[i].itemId.length; x++){
                    const item = await Item.findOne({ _id: category[i].itemId[x]._id });
                    item.isPopular = false;
                    await item.save();
                    if(category[i].itemId[0] === category[i].itemId[x]){
                        item.isPopular = true;
                        await item.save();
                    }
                }
            }

            testimonial = {
                id: "asd1233uasdads1",
                imageUrl: "images/testimonial2.jpg",
                name : "Happy Family",
                rate: 4.55,
                content: "What a great trip with my family and I should try again next time soon",
                familyName: "didin",
                familyOccupation: "-"
            }
            
                
            res.status(200).json({
                hero : {
                    travelers : traveler.length,
                    treasure : treasure.length,
                    cities : item.length
                },
                mostPicked,
                category,
                testimonial
            })
        } catch (error) {
            console.log(error);
            res.json(500).json({message: 'internal server error'})
        }
    }
}
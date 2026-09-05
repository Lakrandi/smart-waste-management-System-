const Feedback = require('../models/Feedback');
const Complaint = require('../models/Complaint');


exports.createFeedback = async (req, res) => {
  try {

    // Authentication check
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }

    const {
      rating,
      comment,
      serviceType,
      complaintId,
      type
    } = req.body;


    const userId =
      req.user._id || req.user.id;


    const numericRating = Number(rating);

    if (
      !numericRating ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        message:
          "Rating must be between 1 and 5"
      });
    }


    let complaint = null;


     

    if (complaintId) {

     

      complaint = await Complaint.findOne({
        _id: complaintId,

        user: userId,

        status: {
          $regex: /^resolved$/i
        },

        isRated: {
          $ne: true
        }
      });


      if (!complaint) {
        return res.status(403).json({
          message:
            "You can only rate your own resolved complaints that have not already been rated."
        });
      }

    }


     

    const newFeedback = new Feedback({

      user: userId,

      rating: numericRating,

      comment:
        comment || '',

      serviceType:
        serviceType ||
        type ||
        (complaintId
          ? 'complaint'
          : 'general'),

      complaint:
        complaintId || null

    });


    await newFeedback.save();


    

    if (complaint) {

      complaint.isRated = true;

      await complaint.save();

    }


    res.status(201).json({

      message:
        "Feedback submitted successfully",

      data:
        newFeedback

    });


  } catch (error) {

    console.error(
      "Feedback creation error:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }
};


 
exports.getAllFeedbacks = async (req, res) => {

  try {

    const feedbacks =
      await Feedback.find()

        .populate(
          'user',
          'name email'
        )

        .populate(
          'complaint',
          'title district status'
        )

        .sort({
          createdAt: -1
        });


    res.status(200).json(
      feedbacks
    );


  } catch (error) {

    console.error(
      "Get feedback error:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }

};



// 3. Delete feedback
 
exports.deleteFeedback = async (req, res) => {

  try {

    const feedback =
      await Feedback.findById(
        req.params.id
      );


    if (!feedback) {

      return res.status(404).json({
        message:
          "Feedback not found"
      });

    }


    await feedback.deleteOne();


    res.status(200).json({

      message:
        "Feedback deleted successfully"

    });


  } catch (error) {

    console.error(
      "Delete feedback error:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }

};
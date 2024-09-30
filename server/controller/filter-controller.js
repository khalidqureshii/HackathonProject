import express from "express";
import User from "../models/user-model.js";

const getAllProfiles = async(req, res) => {
    try {
        const profiles = await User.find().select({location:1, bio:1, username:1, industry:1, userType: 1})
        res.status(200).json({msg: "Successful", allProfiles: profiles});
    }
    catch (err) {
        console.log("Couldn't get shit");
        return res.status(404).message("Not found");
    }
}

const getProfiles = async(req, res) => {
    try {
      const { userType, industry, location } = req.body;
      const filter = {};
      if (userType) filter.userType = userType;
      if (industry) filter.industry = industry;
      if (location) filter.location = { $regex: location, $options: 'i' }; 
      const filtProfiles = await User.find(filter).select({location:1, bio:1, username:1, industry:1, userType: 1});
      res.status(200).json({msg: "Successful", filteredProfiles: filtProfiles});
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
};

const getUserProfile = async(req, res) => {
    try {
        const { userId } = req.body;
        const filtProfiles = await User.find({_id: userId});
        res.status(200).json({msg: "Successful", filteredProfiles: filtProfiles});
    } catch (err) {
      console.error(err);
    res.status(500).send('Server error');
    }
}

const updateIncoming = async(req, res) => {
  const { userId, incoming } = req.body;

  try {
    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { $set: { incoming } },
      { new: true } // Return the updated document
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Incoming list updated', updatedProfile });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

export {getAllProfiles, getProfiles, getUserProfile, updateIncoming};
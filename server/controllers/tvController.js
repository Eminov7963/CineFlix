const TvShow = require("../modules/tvModule");

// 📌 Tüm TV dizilerini getir
const getAllTvShows = async (req, res) => {
  try {
    const tvShows = await TvShow.find({});
    if (!tvShows || tvShows.length === 0) {
      return res.status(404).json({ error: "TV Shows not found!" });
    }
    res.status(200).json({
      data: tvShows,
      message: "All TV shows fetched successfully!",
      error: null,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error!" });
  }
};

// 📌 Belirli bir TV dizisini ID ile getir
const getTvShowByID = async (req, res) => {
  const { id } = req.params;
  try {
    const tvShow = await TvShow.findById(id);
    if (!tvShow) {
      return res.status(404).json({ error: "TV Show not found!" });
    }
    res.status(200).json({
      data: tvShow,
      message: "TV Show fetched successfully!",
      error: null,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error!" });
  }
};

// 📌 Yeni bir TV dizisi ekle
const postTvShow = async (req, res) => {
  try {
    const newTvShow = new TvShow({ ...req.body });
    await newTvShow.save();

    res.status(201).json({
      data: newTvShow,
      message: "TV Show successfully added!",
      error: null,
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding TV Show!" });
  }
};

// 📌 Belirli bir TV dizisini güncelle
const updateTvShow = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTvShow = await TvShow.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTvShow) {
      return res.status(404).json({ message: "TV Show not found!" });
    }
    res.json({
      updatedTvShow,
      message: "TV Show updated successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating TV Show!" });
  }
};

// 📌 Belirli bir TV dizisini sil
const deleteTvShow = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTvShow = await TvShow.findByIdAndDelete(id);
    if (!deletedTvShow) {
      return res.status(404).json({ error: "TV Show not found!" });
    }
    res.status(200).json({
      data: deletedTvShow,
      message: "TV Show deleted successfully!",
      error: null,
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting TV Show!" });
  }
};

module.exports = {
  getAllTvShows,
  getTvShowByID,
  postTvShow,
  updateTvShow,
  deleteTvShow,
};

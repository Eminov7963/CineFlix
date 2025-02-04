const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true }, // Film adı
  description: { type: String, required: true }, // Film açıklaması
  releaseDate: { type: Date, required: true }, // Yayın tarihi
  genre: [{ type: String, required: true }], // Türler (Array olabilir)
  rating: { type: Number, min: 0, max: 10, required: true }, // IMDb veya benzeri puan
  duration: { type: Number, required: true }, // Süre (dakika cinsinden)
  director: { type: String, required: true }, // Yönetmen
  cast: [{ type: String, required: true }], // Oyuncular listesi
  poster: { type: String, required: true }, // Afiş URL'si
  trailer: { type: String }, // Fragman URL'si (Opsiyonel)
  language: { type: String, required: true }, // Dil
  country: { type: String, required: true }, // Ülke
  isTrending: { type: Boolean, default: false }, // Trend olup olmadığını belirten flag
});

const ModuleMovie = mongoose.model("products", movieSchema);

module.exports = ModuleMovie;
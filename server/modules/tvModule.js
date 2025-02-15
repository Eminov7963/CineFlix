const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tvShowSchema = new Schema({
  title: { type: String, required: true }, // Dizi adı
  description: { type: String, required: true }, // Açıklama
  releaseDate: { type: Date, required: true }, // İlk yayın tarihi
  genre: [{ type: String, required: true }], // Türler (Array olabilir)
  rating: { type: Number, min: 0, max: 10, required: true }, // IMDb puanı
  seasons: { type: Number, required: true }, // Sezon sayısı
  episodes: { type: Number, required: true }, // Toplam bölüm sayısı
  isOngoing: { type: Boolean, default: true }, // Devam ediyor mu?
  director: { type: String, required: true }, // Yönetmen
  cast: [{ type: String, required: true }], // Oyuncular listesi
  poster: { type: String, required: true }, // Afiş URL'si
  trailer: { type: String }, // Fragman URL'si (Opsiyonel)
  language: { type: String, required: true }, // Dil
  country: { type: String, required: true }, // Ülke
  isTrending: { type: Boolean, default: false }, // Trend olup olmadığı
});

const TvShow = mongoose.model("tvshows", tvShowSchema);

module.exports = TvShow;

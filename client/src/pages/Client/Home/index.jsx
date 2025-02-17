import React, { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "../../../redux/services/product";
import { useGetAllTvShowsQuery } from "../../../redux/services/tvApi";
import { logout } from "../../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaHeart, FaRegHeart, FaPlay, FaInfoCircle } from "react-icons/fa";
import { toggleFavorites } from "../../../redux/features/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaComputer } from "react-icons/fa6";
import { MdOutlinePhonelinkSetup } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { FaRegSmileWink } from "react-icons/fa";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const { data, error, isLoading } = useGetAllCategoriesQuery();
  const {
    data: tvData,
    error: tvError,
    isLoading: tvLoading,
  } = useGetAllTvShowsQuery();

  const wishlist = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setProducts(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (tvData) {
      setTvShows(tvData.data);
    }
  }, [tvData]);

  useEffect(() => {
    if (error?.status === 401 || tvError?.status === 401) {
      dispatch(logout());
      navigate("/login");
    }
  }, [error, tvError, dispatch, navigate]);

  // **Filmler için yönlendirme**
  const handleClick = (movie) => {
    navigate(`/home/movie/${movie._id}`, { state: { movie } });
  };

  // **TV Şovları için detay sayfaasına yönlendirme**
  const handleTvShowClick = (tvShow) => {
    navigate(`/home/tv/${tvShow._id}`, { state: { tvShow } });
  };

  return (
    <main>
      {/* FILMLER */}
      <section className={styles.products}>
        <h1>THE MOST POPULAR 10 MOVIES</h1>
        {isLoading && <p>Ürünler yükleniyor...</p>}
        {error && (
          <p>{error.message || "Ürünler alınırken bir hata oluştu."}</p>
        )}

        {products.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 1500 }}
          >
            {products.slice(0, 10).map((movie) => (
              <SwiperSlide key={movie._id}>
                <div
                  className={styles.productItem}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClick(movie)}
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className={styles.productImage}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>Ürün bulunamadı.</p>
        )}
      </section>
      <section className={styles.total1}>
        <div className={styles.head}>
          <h3>More Reasons to Join</h3>
        </div>
        <div className={styles.bottom}>
          <div className={styles.boxs}>
            <h1>Enjoy on your TV</h1>
            <p>
              Watch on Smart TVs, Playstation, Xbox, Apple TV, Blu-ray players,
              and more.
            </p>
            <FaComputer />
          </div>
          <div className={styles.boxs}>
            <h1> To watch movie offline</h1>
            <p>
              Save your favorites easily and always you have something to watch.
            </p>
            <MdOutlinePhonelinkSetup />
          </div>
          <div className={styles.boxs}>
            <h1>Watch everywhere</h1>
            <p>
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
            <FaCode />
          </div>
          <div className={styles.boxs}>
            <h1>Create profiles for kids</h1>
            <p>
              Send kids on adventures with their favorite characters in a space
              made just for them.
            </p>
            <FaRegSmileWink />
          </div>
        </div>
      </section>
      {/* TV ŞOVLARI */}
      <section className={styles.tv}>
        <div className={styles.tvcontain}>
          <div className={styles.head}>
            <h1>Popular TV Shows</h1>
            <p>Trending in Superhero TV Shows</p>
          </div>
          <div className={styles.bottom}>
            {tvLoading && <p>TV Şovları yükleniyor...</p>}
            {tvError && (
              <p>
                {tvError.message || "TV şovları alınırken bir hata oluştu."}
              </p>
            )}
            {tvShows.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className={styles.tvSwiper}
              >
                {tvShows.map((tvShow) => (
                  <SwiperSlide key={tvShow._id}>
                    <div className={styles.tvCard}>
                      <img
                        src={tvShow.poster}
                        alt={tvShow.title}
                        className={styles.tvImage}
                      />
                      <div className={styles.tvInfo}>
                        <h3>{tvShow.title}</h3>
                        <p>{tvShow.genre.join(", ")}</p>
                        <div className={styles.buttons}>
                          <button
                            className={styles.trailer}
                            onClick={() => handleClick(tvShow)}
                          >
                            <FaPlay /> Trailer
                          </button>
                          <button
                            className={styles.detail}
                            onClick={() => handleTvShowClick(tvShow)}
                          >
                            <FaInfoCircle /> Details
                          </button>
                          <button
                            className={styles.wishlist}
                            onClick={() => {
                              dispatch(toggleFavorites(tvShow));
                            }}
                          >
                            {!wishlist?.items.find(
                              (q) => q._id === tvShow._id
                            ) ? (
                              <FaRegHeart />
                            ) : (
                              <FaHeart />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>TV şovu bulunamadı.</p>
            )}
          </div>
        </div>
      </section>
      <section className={styles.open}>
        <div className={styles.contain}>
          <h2>Frequently Asked Questions</h2>
          <ul className={styles.accordion}>
            <li>
              <input type="radio" name="accordion" id="first" />

              <label htmlFor="first">What is the CineFlix</label>
              <div className={styles.content}>
                <p>
                  CineFlix is a streaming service that offers a wide variety of
                  award-winning TV shows, movies, anime, documentaries, and more
                  on thousands of internet-connected devices. You can watch as
                  much as you want, whenever you want without a single
                  commercial – all for one low monthly price. There's always
                  something new to discover and new TV shows and movies are
                  added every week!
                </p>
              </div>
            </li>
            <li>
              <input type="radio" name="accordion" id="second" />

              <label htmlFor="second">How much does CineFlix cost?</label>
              <div className={styles.content}>
                <p>
                  Watch CineFlix on your smartphone, tablet, Smart TV, laptop,
                  or streaming device, all for one fixed monthly fee. Plans
                  range from EUR 7.99 to EUR 11.99 a month (pre-tax). No extra
                  costs, no contracts.
                </p>
              </div>
            </li>
            <li>
              <input type="radio" name="accordion" id="third" />

              <label htmlFor="third">Where can l watch?</label>
              <div className={styles.content}>
                <p>
                  Watch anywhere, anytime. Sign in with your CineFlix account to
                  watch instantly on the web at cineflix.com from your personal
                  computer or on any internet-connected device that offers the
                  CineFlix app, including smart TVs, smartphones, tablets,
                  streaming media players and game consoles. You can also
                  download your favorite shows with the iOS or Android app. Use
                  downloads to watch while you're on the go and without an
                  internet connection. Take CineFlix with you anywhere.
                </p>
              </div>
            </li>
            <li>
              <input type="radio" name="accordion" id="fourth" />

              <label htmlFor="fourth">How do l cancel?</label>
              <div className={styles.content}>
                <p>
                  CineFLix is flexible. There are no pesky contracts and no
                  commitments. You can easily cancel your account online in two
                  clicks. There are no cancellation fees – start or stop your
                  account anytime.
                </p>
              </div>
            </li>
            <li>
              <input type="radio" name="accordion" id="fifth" />

              <label htmlFor="fifth">What can l watch on CineFlix?</label>
              <div className={styles.content}>
                <p>
                  CineFLix has an extensive library of feature films,
                  documentaries, TV shows, anime, award-winning CineFLix
                  originals, and more. Watch as much as you want, anytime you
                  want.
                </p>
              </div>
            </li>
            <li>
              <input type="radio" name="accordion" id="six" />

              <label htmlFor="six">Is CineFlix good for kids?</label>
              <div className={styles.content}>
                <p>
                  The CineFLix Kids experience is included in your membership to
                  give parents control while kids enjoy family-friendly TV shows
                  and movies in their own space. Kids profiles come with
                  PIN-protected parental controls that let you restrict the
                  maturity rating of content kids can watch and block specific
                  titles you don’t want kids to see.
                </p>
              </div>
            </li>
            <li>
              <input type="radio" name="accordion" id="seven" />

              <label htmlFor="seven">Why am l seeing this language?</label>
              <div className={styles.content}>
                <p>
                  Your browser preferences determine the language shown here.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Home;

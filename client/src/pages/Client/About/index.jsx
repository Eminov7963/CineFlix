import React from "react";
import styles from "./index.module.scss";

const About = () => {
  return (
    <div className={styles.aboutSection}>
      <div className={styles.imageContainer}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJWlQW1Wb1x7HFmnswHKKja5at0rCwcw3K_IVzSGZz8lkb6Sqddanrc4Zj6YK3c1iaW_I&usqp=CAU"
          alt="CineFlix About"
        />
      </div>
      <div className={styles.textContainer}>
        <h1>What is CineFlix?</h1>
        <p>
          CineFlix is a global social network for independent film discussions
          and discoveries. Use it as a diary to share and record your opinions
          about the movies you've watched, or simply keep track of the films
          you've seen in the past.
        </p>
        <p>
          Showcase your favorites on your profile page. Rate, review, and tag
          films as you add them. Find and follow your friends to see what movies
          they are enjoying.
        </p>
        <p>
          <strong>We have apps for iOS, Android, and Apple TV.</strong>
          Paid members enjoy an ad-free experience, personalized stats,
          streaming filters, and more! <a href="#">Learn more about Pro.</a>
        </p>

        <h2>General Use</h2>
        <p>
          How should you use CineFlix? The short answer: however you like! We
          recommend new members check out our <a href="#">Welcome page</a> for
          helpful tips. The easiest way to interact is by marking films you've
          seen using the ‘eye’ icon on each poster.
        </p>
        <p>
          You can log films to your Diary using the ‘+ Log’ button on our
          website or the ‘+’ button in our app. Add reviews, ratings, and tags
          to films you’ve watched, and create collections of your favorites!
        </p>
        <p>
          <strong>Can I watch films on CineFlix?</strong>
          No, CineFlix is not a streaming service, but we provide links to films
          available on various platforms.
        </p>

        <h2>Marking vs. Logging</h2>
        <p>
          What’s the difference between marking a film watched and logging it?
        </p>
        <p>
          Marking a film as <strong>‘watched’</strong> (using the ‘eye’ icon or
          rating it) tells CineFlix you’ve seen it before. This is a great way
          to track past films without specifying a date.
        </p>
        <p>
          Logging a film (via the ‘+ Log’ button) records <strong>when</strong>{" "}
          you watched it, adding it to your Diary and Recent Activity. Pro
          members with at least ten logs per year can generate a **Year in
          Review** summary.
        </p>

        <h2>Removing a Film</h2>
        <p>Can I remove a film from my watched list?</p>
        <p>
          Yes! You can unmark a film by clicking the green “eye” icon again.
          However, you’ll also need to delete any associated diary entries,
          reviews, or ratings from the film’s page.
        </p>

        {/* Additional Section */}
        <h2>
          I’ve been marking films watched instead of logging them to my Diary.
          How can I fix this?
        </h2>
        <p>
          You can retrospectively add diary entries for films you’ve marked as
          watched, in order to complete your Diary. If you need the activity
          dates for when you marked each film, these are included in your
          account export bundle, which you can download in Settings. (If you’d
          like to automate this process and you know your way around a computer,
          grab the relevant CSV file from the export bundle, rename the Date
          column to Watched Date, and then use our importer to add the diary
          entries to your account—you’ll have the chance to check them before
          they’re finalized.)
        </p>

        <h2>What’s the difference between liking and rating a film?</h2>
        <p>
          You can ‘like’ a film any time to show you enjoyed it, which builds up
          your Profile and Likes pages, or rate films (via the film’s page, or
          by logging it, or using the Actions menu on any poster) to give your
          friends a better idea of how much you loved (or hated) it, and they’ll
          see this on your Ratings page and in their activity feed (if it’s part
          of a review or diary entry). If you provide ratings for films, you can
          later sort films by these ratings, useful for making year-end lists.
          It’s no problem to use both ratings and likes (or neither).
        </p>
      </div>
    </div>
  );
};

export default About;

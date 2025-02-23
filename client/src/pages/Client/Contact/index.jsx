import React from "react";
import styles from "./index.module.scss";

const Contact = () => {
  return (
    <div className={styles.contactSection}>
      <div className={styles.imageContainer}>
        <img
          src="https://s.ltrbxd.com/static/img/contact-poster.d71f6341.jpg"
          alt="Contact Us"
        />
      </div>
      <div className={styles.textContainer}>
        <h1>Contact Letterboxd</h1>
        <p>
          We’d love to hear from you regarding any aspect of Letterboxd. Please
          check our <a href="#">Frequent Questions</a> page, and if your enquiry
          is not answered there, send it to us by email (use the links below or
          click the “Help” button in the bottom right corner of this page) and
          general messages of delight or dismay via email.
        </p>

        <p>
          Please direct email enquiries to one of the following addresses only
          (mass mails will be ignored):
        </p>

        <div className={styles.emailList}>
          <p>
            <strong>Email:</strong>
            <br />
            <p>cineflix199@gmail.com</p>
          </p>

          <p>
            <strong>Instagram:</strong>
            <br />
            <p>emin_eminov13</p>
          </p>

          <p>
            <strong>Facebook:</strong>
            <br />
            <p>Emin Eminov</p>
          </p>
        </div>

        <p>
          To make feature requests, please use our{" "}
          <a href="#">Feedback channel</a>. Your feature may already have been
          requested by another member, so check first, and add a vote or comment
          to their entry.
        </p>
      </div>
    </div>
  );
};

export default Contact;

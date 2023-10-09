import "../styles/contactinformation.css"

export const ContactInformation = () =>{

    return(
        <section className="contact-info">
          <h2>Contact Information</h2>
          <address>
            MoveX<br/>
            ..............<br/>
            ..............<br/>
            Phone: <a href="tel:00000000">000-00 00 000</a><br/>
            Email: <a href="mailto:contact@movex.com">contact@movex.com</a>
          </address>
          <a href="https://www.google.com/maps/search/?api=1&query=59.3773681%2C13.4880617">View on map</a>
      </section>
    )
}
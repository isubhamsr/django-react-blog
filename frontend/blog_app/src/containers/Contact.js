import React from 'react'

export default function Contact() {
    return (
        <body class="bg-light">

            <div class="container">
                <div class="py-4 text-center">
                    <h2>Contact Us</h2>
                </div>
                    <div>

                        <label for="fname">First Name</label>
                        <input type="text" id="fname" className="name" name="firstname" placeholder="Your name.." />

                        <label for="lname">Last Name</label>
                        <input type="text" id="lname" name="lastname" className="name" placeholder="Your last name.." />

                        <label for="lname">Email</label>
                        <input type="text" id="email" name="email" className="name" placeholder="Enter Your Email" />

                        <label for="subject">Message</label>
                        <textarea id="subject" name="subject" placeholder="Write something.." style={{height:200}}></textarea>

                        {/* <input type="submit" value="Submit"> */}
                        <button className="button my-4">Submit</button>

                    </div>
                </div>
        </body>
    )
}

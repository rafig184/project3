
import logoImage from '../../../../assets/logoWhite.png';


function Footer() {


    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src={logoImage} alt="Travelos Logo" />
                    </div>
                    <div className="footer-links">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href={isAdminDestination()}>Destinations</a></li>
                            <li><a href="#whyus">About Us</a></li>
                            <li><a href={isAdminContactUs()}>Contact Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-social">
                    <ul>
                        <li><a href="#"><i className="pi pi-facebook"></i></a></li>
                        <li><a href="#"><i className="pi pi-twitter"></i></a></li>
                        <li><a href="#"><i className="pi pi-instagram"></i></a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Travelos. All rights reserved.
            </div>
        </footer>
    );
}



function isAdminDestination() {
    if (localStorage.getItem("role") === "admin") {
        return "#adminVacation"
    } else {
        return "#userVacation"
    }
}


function isAdminContactUs() {
    if (localStorage.getItem("role") === "user") {
        return "/contactUs"
    } else {
        return "#"
    }
}

export default Footer;

// "#adminVacation" || "#userVacation"
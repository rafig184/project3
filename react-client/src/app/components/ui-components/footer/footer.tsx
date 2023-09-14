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
                            <li><a href="#">Destinations</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact</a></li>
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

export default Footer;
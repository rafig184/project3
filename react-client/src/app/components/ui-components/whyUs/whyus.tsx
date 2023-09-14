import SvgIcon from '@mui/material/SvgIcon';
import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';


export default function WhyUs() {
    return <div className="whyUs">
        <h2 style={{ paddingTop: "2%", paddingBottom: "2%" }}>Why choosing Travelos?</h2>
        <div className='innerWhyUS' >
            <div>
                <SvgIcon style={{ transform: "scale(1.7)" }} component={AirplanemodeActiveOutlinedIcon} fontSize='large' />
                <p style={{ color: "#818181", fontSize: "larger" }}>We offer competitive prices and<br></br>
                    exclusive deals with industry<br></br>
                    experience and strong partnerships.</p>
            </div>
            <div>
                <SvgIcon style={{ transform: "scale(1.7)" }} component={SupportAgentOutlinedIcon} fontSize='large' />
                <p style={{ color: "#818181", fontSize: "larger" }}>We prioritize personalized, travel<br></br>
                    experiences that match your preferences,<br></br>
                    backed by exceptional customer service.</p>
            </div>
            <div>
                <SvgIcon style={{ transform: "scale(1.7)" }} component={HealthAndSafetyOutlinedIcon} fontSize='large' />
                <p style={{ color: "#818181", fontSize: "larger" }}>We prioritize your safety<br></br>
                    and convenience for a memorable<br></br>
                    and worry-free journey.</p>
            </div>
        </div>


    </div>
}
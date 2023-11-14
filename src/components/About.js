import React from "react";
// import { Button } from "react-bootstrap";
// import { useNavigate } from "react-router";
import myPhoto from "../photo/img.jpeg";

const About = () => {
  // const navigate = useNavigate();
  // const handleLogout = async () => {
  //   try {
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <>
     <div className="">
      <div className="con"  >
        <p>
        <strong>
                ברוכים הבאים לקטניונת, קולקטיב צרכנות נבונה מבית בר קיימא - התנועה לקיימות עברית. 
        </strong>
        </p>
        <img src={myPhoto} alt="" className="profile-picture" />
        </div>
        <p className="intro" >

          
         <strong> מי לא רוצה לרכוש מוצרים איכותיים, ללא אריזות ובמחירים קטנים? </strong>
          <br />
          <br />
          <strong><strong style={{ color: "red" }}>הצטרפו אלינו לאירועים משמחים בכל רחבי הארץ!</strong></strong>
          <br />
          <br />
          <strong>מה זה "בר קיימא" ?</strong>
          <br />
          בר קיימא - התנועה לקיימות עברית, היא תנועת צעירים וצעירות שעוסקת בחיבור בין סביבה וקיימות למורשת ישראל ויהדות. בר קיימא עוסקת בקהילות, אורח חיים בר קיימא ומיזמים חינוכיים שמחברים בין מגזרים שונים. 
          <br />
          <br />
          
          <strong>עמותות שותפות</strong>
            <br/>
          <a  href="https://jsy.org.il/" target="_blank" rel="noopener noreferrer"   className="link-text rounded-sm group hover:text-black hover:no-underline underline-offset-2 decoration-[1px] cursor-pointer duration-500 underline">
            הישיבה החילונית
          </a>
          <br />
          <a   href="https://www.tevaivri.org.il/" target="_blank" rel="noopener noreferrer"   className="link-text rounded-sm group hover:text-black hover:no-underline underline-offset-2 decoration-[1px] cursor-pointer duration-500 underline">
          טבע עברי- בר קיימא
          </a>
        </p>
        
      </div>
      <style>
        {`
        .underline-on-hover:hover {
          text-decoration: underline;
        }
        `}
      </style>
      <br/>
      {/* <div className="button-container">
        <div className="d-grid gap-2">
          <Button variant="primary" className="butreturn" onClick={handleLogout}>
            חזור
          </Button>
        </div>
      </div> */}
     
    </>
  );
};

export default About;


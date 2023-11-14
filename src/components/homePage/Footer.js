import React from 'react';
import { logo,visa, mastercard } from '../../assets/assetsindex';

const Footer = () => {
  return (
    <div className='my-bg-color text-[#949494] py-5 font-sans'>
      <div className='max-w-screen-xl mx-auto items-end grid grid-cols-3'>
        {/* Footer content */}
        <div className='flex flex-col gap-7'>
            <img className='footer-logo w-28 h-28 mr-2' src={logo} alt='logo' />
            <div className='inline-flex'>
                <img className='footer-logo w-20 h-16 ' src={visa} alt='visa' />
                <img className='footer-logo w-20 h-16 ' src={mastercard} alt='mastercard' />
            </div>
        </div>
        <div className='my-font text-black text-center mb-6'>
        <h2 className='my-font text-2xl text-black mb-4 text-right gap-4'>לאתר אותנו</h2>
            <div className='my-font text-right text-base flex flex-col gap-4'>
                <p className='gap-4'>שם העמותה: בר קיימא - התנועה לקיימות עברית</p>
                <p className='gap-4'>אימייל: kaiamutivrit@gmail.com</p>
                <p className='gap-4'>פייסבוק: <a href="https://www.facebook.com/kaiamutivrit/">https://www.facebook.com/kaiamutivrit</a></p>
                <p className='gap-4'>אינסטגרם: <a href="https://www.instagram.com/bar.kaima?igshid=Mnd6Mm9nZHpob2Q%3D">https://www.instagram.com/bar.kaima</a></p>

            </div>
        </div>
        <div className='my-font text-black text-center mb-6'>
        <h2 className='my-font text-2xl text-black mb-4 text-right gap-4'>מקורות ללוגו</h2>
            <div className='my-font text-right text-base flex flex-col gap-4'>
                <p className='gap-4'><a href="https://freeicons.io/profile/3484">BECRIS</a> on <a href="https://freeicons.io">freeicons.io</a></p>
                <p className='gap-4'><a target="_blank" href="https://icons8.com/icon/wGuzkqVfuhjf/account-skin-type-3">Account Skin Type 3</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a></p>
                <p className='gap-4'><a href="https://www.vecteezy.com/free-vector/map-logo">Map Logo Vectors by Vecteezy</a></p>
                <p className='gap-4'><a href="https://www.cleanpng.com/png-credit-card-visa-logo-mastercard-visa-logo-svg-vec-6259577/">Visa Logo by CLEANPNG</a></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

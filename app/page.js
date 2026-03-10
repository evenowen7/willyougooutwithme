'use client'

import {useState} from 'react';

export default function page() {

  const [img, $img] = useState('puppy-eyes');
  const [how, $how] = useState(false);
  const [p, $p] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updteImg = (im) => {
    $img(im);
  }

  const handleYesClick = async () => {
    setIsSubmitting(true);
    updteImg('sparkle-eyes');
    
    try {
      const response = await fetch('https://formspree.io/f/xwvrlrlo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'megurikano00@gmail.com',
          message: 'Someone said YES to your date proposal! 💕',
          _subject: 'Someone wants to go out with you! 💖',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        updteImg('gumball-and-darwing');
      } else {
        console.error('Failed to submit form');
        // Still show success to user, but log error
        setSubmitted(true);
        updteImg('gumball-and-darwing');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show success to user, but log error
      setSubmitted(true);
      updteImg('gumball-and-darwing');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nah = () => {
    const x = Math.random() * 90;
    const y = Math.random() * 90;

    $p({x: `${x}%`, y: `${y}%`});
    updteImg('unamused');
  };

  const dontdoit = () => {
    nah();
    updteImg('shock');
    $how(true)
  }

  return (
    <div className='box'>
      <img alt='gumball' className='gif' src={`/${img}.gif`} />
      {submitted 
        ? 'Yeyyy~ minggu depan kosongin 1 hari yaa... <3' 
        : how 
          ? 'Hmmmph, Theres no choice!' 
          : 'Helen... will you go out with me?'
      }
      {!submitted && (
        <div className='btns'>
          <button 
            className='yes' 
            onClick={handleYesClick}
            disabled={isSubmitting}
            onMouseOver={() => updteImg('sparkle-eyes')} 
            onMouseOut={() => updteImg('puppy-eyes')}
          >
            {isSubmitting ? 'Sending...' : 'Yes'}
          </button>
          <button className='no' 
            style={p ? {position: 'absolute', top: p.x, right: p.y} : null} 
            onClick={dontdoit} onMouseOver={nah}>
              No
          </button> 
        </div>
      )}
    </div>
  )
  
}